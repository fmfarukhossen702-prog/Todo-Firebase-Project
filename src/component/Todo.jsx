import React, { useEffect, useState } from "react";
import {
  getDatabase,
  ref,
  set,
  push,
  onValue,
  remove,
  update,
} from "firebase/database";
import { FaTrashCan } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { FaLocationArrow } from "react-icons/fa";
import { FaArrowRotateLeft } from "react-icons/fa6";

// import image from '../assets/images.jpeg'
const Todo = () => {
  const [task, setTask] = useState("");
  const [data, setData] = useState([]);
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState("");
  const [idName, setIdName] = useState("");

  // const dataArr = Object.values(data || {});

  const handleClick = (e) => {
    e.preventDefault();
    if (task.trim() === "") {
      return;
    }
    const db = getDatabase();
    set(push(ref(db, "/todoName")), {
      todoName: task,
    }).then(setTask(""));
  };

  useEffect(() => {
    const db = getDatabase();
    onValue(ref(db, "todoName/"), (snapshot) => {
      let arr = [];

      snapshot.forEach((item) => {
        arr.unshift({ value: item.val(), id: item.key });
      });
      setData(arr);
      // const data = snapshot.val();
      // setData(data);
    });
  }, []);

  const handleDelete = (id) => {
    const db = getDatabase();
    remove(ref(db, "/todoName/" + id));
  };
  const handleEdit = (value, id) => {
    setEdit(!edit);
    setIdName(id);
    setValue(value);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const db = getDatabase();
    update(ref(db, "/todoName/" + idName), {
      todoName: value,
    });
    setEdit(false);
    setValue("");
    setIdName("");
  };
  const handleAllData = () => {
    const db = getDatabase();
    remove(ref(db, "/todoName/"));
  };

  return (
    <div className=" bg-[#d43d3d] text-white! bg-[url(./assets/images.jpeg)] bg-cover  pt-10  bg-center bg-no-repeat h-screen ">
      <form className="  max-h-[90vh] fieldset bg-[#ffffff14] py-5 mx-auto   border-base-300 rounded-box w-full lg:w-lg border p-10 ">
        <h1 className=" text-4xl text-center mb- ">Todo Application</h1>
        <fieldset className="   fieldset">
          <label className="label font-semibold text-lg mt-4 ">
            Enter your task here
          </label>
          <input
            onChange={(e) =>
              edit ? setValue(e.target.value) : setTask(e.target.value)
            }
            type="text"
            value={edit ? value : task}
            className="input bg-[#ffffff42] w-full my-3"
            placeholder="text"
          />
          {data.length > 0 && (
            <div className=" flex justify-between items-center pr-5">
              <div
                onClick={handleAllData}
                className="flex items-center gap-2 py-1 px-2 bg-[#000000] border border-[#ea1818] rounded-[5px] w-30 justify-center text-[#ca0a0a] text-[14px]  cursor-pointer"
              >
                All data <FaTrashCan />
              </div>
              <div>
                {edit ? (
                  <FaArrowRotateLeft
                    className=" text-[#07c9ff] text-lg  cursor-pointer  "
                    onClick={handleUpdate}
                  />
                ) : (
                  <FaLocationArrow
                    className=" text-[#07c9ff] text-lg  cursor-pointer "
                    onClick={handleClick}
                  />
                )}
              </div>
            </div>
          )}
          <ul className=" max-h-[150px] overflow-y-auto ">
            {data.map((item, index) => (
              <li
                key={index}
                className="  w-full my-3 py-3 px-5  rounded-[5px] flex justify-between items-center text-lg bg-[#ffffff36] "
              >
                {item.value.todoName}

                <div className="flex gap-3 items-center">
                  <FaRegEdit
                    onClick={() => handleEdit(item.value.todoName, item.id)}
                    className="text-green-500 cursor-pointer "
                  />

                  <FaTrashCan
                    onClick={() => handleDelete(item.id)}
                    className=" cursor-pointer text-red-500 "
                  />
                </div>
              </li>
            ))}
          </ul>
          {edit ? (
            <button onClick={handleUpdate} className="btn btn-neutral mt-4">
              Update
            </button>
          ) : (
            <button onClick={handleClick} className="btn btn-neutral mt-4">
              Submit
            </button>
          )}
        </fieldset>
      </form>
    </div>
  );
};

export default Todo;
