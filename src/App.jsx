import { useState } from "react";

//

const App = () => {
  const [showModal, setShowModal] = useState(false);

  const lsTodos = JSON.parse(localStorage.getItem("todos")) ?? [];

  const [todos, setTodos] = useState(lsTodos);

  const [inputValue, setInputValue] = useState("");

  const [selectValue, setSelectValue] = useState("inComplete");

  const [selectFilter, setSelectFilter] = useState("All");

  const [isEdit, setIsEdit] = useState(false);

  const [itemIdEdit, setItemIdEdit] = useState("");

  console.log(itemIdEdit, "itemIdEdit");

  const resetForm = () => {
    setInputValue("");
    setSelectValue("All");
  };

  return (
    <div className="flex flex-col gap-20 px-16">
      {/* header */}
      <header />

      {/* Body */}
      <main className="flex flex-col gap-2">
        <div className="flex justify-between">
          <button
            onClick={() => {
              setShowModal(true);
              setIsEdit(false);
            }}
            className="text-gray-100 bg-indigo-600 px-[20px] py-2 rounded-md"
          >
            Add Task
          </button>

          <select
            value={selectFilter}
            onChange={(e) => setSelectFilter(e.target.value)}
            className="bg-gray-200 text-gray-900 border-none"
          >
            <option defaultChecked>All</option>
            <option>complete</option>
            <option>inComplete</option>
          </select>
        </div>

        <ul className="flex flex-col gap-2 bg-gray-200 p-4 rounded-md">
          {todos
            .filter((todo) => {
              if (selectFilter === "All") {
                return todo;
              } else if (selectFilter === "complete") {
                return todo.status === "complete";
              } else if (selectFilter === "inComplete") {
                return todo.status === "inComplete";
              }
            })
            .map((todo, index) => (
              <li
                key={index}
                className="flex justify-between bg-white p-2 rounded-sm"
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`w-6 h-6 rounded-sm ${
                      todo.status === "complete"
                        ? "bg-green-700"
                        : "bg-gray-400"
                    }`}
                  ></div>
                  <div className="flex flex-col">
                    <span
                      className={`text-gray-950  ${
                        todo.status === "complete" ? "line-through" : ""
                      }`}
                    >
                      {todo.title}
                    </span>
                    <span className="text-xs">
                      {todo.createDate.toString()}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setTodos((prev) => {
                        const filterd = prev.filter(
                          (item) => item.id !== todo.id
                        );

                        localStorage.setItem("todos", JSON.stringify(filterd));
                        //[{title:"ff"},{title: "ee"}].filter((item)=> item.title !== todo.title)
                        return filterd;
                      });
                    }}
                    className="w-8 transition-colors hover:bg-gray-300 h-8 rounded-sm bg-gray-200 flex justify-center items-center "
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M9.40627 2.8906C9.7772 2.3342 10.4017 2 11.0704 2H12.9296C13.5983 2 14.2228 2.3342 14.5937 2.8906L15.5 4.25H19.25C19.6642 4.25 20 4.58579 20 5C20 5.41421 19.6642 5.75 19.25 5.75H4.75C4.33579 5.75 4 5.41421 4 5C4 4.58579 4.33579 4.25 4.75 4.25H8.5L9.40627 2.8906ZM15 22H9C6.79086 22 5 20.2091 5 18V7H19V18C19 20.2091 17.2091 22 15 22ZM10 10.25C10.4142 10.25 10.75 10.5858 10.75 11V18C10.75 18.4142 10.4142 18.75 10 18.75C9.58579 18.75 9.25 18.4142 9.25 18L9.25 11C9.25 10.5858 9.58579 10.25 10 10.25ZM14 10.25C14.4142 10.25 14.75 10.5858 14.75 11V18C14.75 18.4142 14.4142 18.75 14 18.75C13.5858 18.75 13.25 18.4142 13.25 18V11C13.25 10.5858 13.5858 10.25 14 10.25Z"
                        fill="#808080"
                      />
                    </svg>
                  </button>

                  <button
                    onClick={() => {
                      setItemIdEdit(todo.id);
                      setShowModal(true);

                      setInputValue(todo.title);
                      setSelectValue(todo.status);
                      setIsEdit(true);
                    }}
                    className="w-8 h-8 rounded-sm bg-gray-200 flex justify-center items-center hover:bg-gray-300 transition-colors"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M2.75 6C2.75 4.20507 4.20507 2.75 6 2.75H12C12.4142 2.75 12.75 2.41421 12.75 2C12.75 1.58579 12.4142 1.25 12 1.25H6C3.37665 1.25 1.25 3.37665 1.25 6V18C1.25 20.6234 3.37665 22.75 6 22.75H18C20.6234 22.75 22.75 20.6234 22.75 18V12C22.75 11.5858 22.4142 11.25 22 11.25C21.5858 11.25 21.25 11.5858 21.25 12V18C21.25 19.7949 19.7949 21.25 18 21.25H6C4.20507 21.25 2.75 19.7949 2.75 18V6ZM16.419 2.67708C17.3218 1.77431 18.7855 1.77431 19.6883 2.67708L21.3229 4.31171C22.2257 5.21449 22.2257 6.67818 21.3229 7.58096L19.8736 9.03028C19.7598 8.97394 19.6401 8.91302 19.516 8.84767C18.6806 8.40786 17.6892 7.79057 16.9493 7.05069C16.2095 6.31082 15.5922 5.31945 15.1524 4.48403C15.087 4.35989 15.0261 4.24018 14.9697 4.12639L16.419 2.67708ZM15.8887 8.11135C16.7642 8.98687 17.8777 9.67594 18.7595 10.1444L13.06 15.8438C12.7064 16.1975 12.2475 16.4269 11.7523 16.4977L8.31963 16.9881C7.5568 17.097 6.90295 16.4432 7.01193 15.6804L7.50231 12.2477C7.57305 11.7525 7.80248 11.2936 8.15616 10.94L13.8556 5.24053C14.3241 6.12234 15.0131 7.23582 15.8887 8.11135Z"
                        fill="#808080"
                      />
                    </svg>
                  </button>
                </div>
              </li>
            ))}

          {todos.length === 0 && <span className="text-center">No Task</span>}
        </ul>
      </main>

      {/* Modal */}
      {showModal && (
        <div className="fixed w-full top-0  left-0 h-screen bg-black/40">
          <div className="fixed flex flex-col gap-8 top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2 bg-stone-300 w-10/12 p-8 rounded-md">
            <div className="flex justify-between">
              <span>{isEdit ? "Update Task" : "Add Task"}</span>
              <button
                onClick={() => {
                  setShowModal(false);
                }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.22748 7.22699C7.52038 6.9341 7.99525 6.9341 8.28814 7.22699L12.0005 10.9393L15.7128 7.22705C16.0057 6.93415 16.4805 6.93415 16.7734 7.22705C17.0663 7.51994 17.0663 7.99481 16.7734 8.28771L13.0611 12L16.7734 15.7123C17.0663 16.0052 17.0663 16.48 16.7734 16.7729C16.4805 17.0658 16.0057 17.0658 15.7128 16.7729L12.0005 13.0607L8.28814 16.773C7.99525 17.0659 7.52038 17.0659 7.22748 16.773C6.93459 16.4801 6.93459 16.0052 7.22748 15.7123L10.9398 12L7.22748 8.28765C6.93459 7.99476 6.93459 7.51989 7.22748 7.22699Z"
                    fill="#808080"
                  />
                </svg>
              </button>
            </div>

            <div className="flex flex-col gap-2">
              <span>Todo</span>
              <input
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                }}
                className="p-2 rounded-md border-none"
              />
            </div>
            <div className="flex flex-col gap-2">
              <span>Status</span>
              <select
                onChange={(e) => {
                  setSelectValue(e.target.value);
                }}
                value={selectValue}
                className=" p-2 rounded-md  text-gray-900 border-none"
              >
                <option>complete</option>
                <option defaultChecked>inComplete</option>
              </select>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  if (isEdit) {
                    setTodos((prev) => {
                      const updateTodos = prev.map((item) => {
                        if (item.id === itemIdEdit) {
                          return {
                            title: inputValue,
                            status: selectValue,
                            createDate: new Date(),
                          };
                        }
                      });

                      localStorage.setItem(
                        "todos",
                        JSON.stringify(updateTodos)
                      );

                      return updateTodos;
                    });
                  } else {
                    setTodos((prev) => {
                      return [
                        ...prev,
                        {
                          id: Math.random().toString(16).slice(2),
                          title: inputValue,
                          status: selectValue,
                          createDate: new Date(),
                        },
                      ];
                    });

                    localStorage.setItem(
                      "todos",
                      JSON.stringify([
                        ...todos,
                        {
                          id: Math.random().toString(16).slice(2),
                          title: inputValue,
                          status: selectValue,
                          createDate: new Date(),
                        },
                      ])
                    );
                  }

                  resetForm();

                  setShowModal(false);
                }}
                className="px-5 py-2 text-white bg-indigo-700 rounded-md"
              >
                {isEdit ? "Update Task" : "Add Task"}
              </button>
              <button
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
                className="px-5 py-2 bg-gray-400 text-gray-700 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
