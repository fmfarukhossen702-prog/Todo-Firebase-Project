import React, { useEffect, useState } from "react";
import { getDatabase, ref, set, push, onValue, remove } from "firebase/database";
import { FaTrashCan } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";

const Todo = () => {
  const [task, setTask] = useState("");
  const [data, setData] = useState([]);
  const [edit, setEdit] = useState(false)
  const [value, setValue] = useState("")
  console.log(data)
  // const dataArr = Object.values(data || {});

  const handleClick = (e) => {
    e.preventDefault();
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

        arr.push({ value: item.val() , id : item.key});
        setData(arr);
      });
      // const data = snapshot.val();
      // setData(data);
    });
  }, []);

  const handleDelete = (id) => {
    const db = getDatabase();
    remove(ref(db, "/todoName/" + id));
  };
  const handleEdit = (value,id) =>{
    setEdit(!edit)
    setValue(value)
  }

  return (
    <div>
      <form className=" mx-auto mt-20 fieldset bg-[#d2cfcfe8] border-base-300 rounded-box w-full lg:w-lg border p-10 ">
        <h1 className=" text-4xl text-center mb- ">Todo Application</h1>
        <fieldset className=" fieldset">
          <label className="label font-semibold text-lg mt-4 ">
            Enter your task here
          </label>
          <input
            onChange={(e) => setTask(e.target.value)}
            type="text"
            value={ task}
            className="input w-full my-3"
            placeholder="text"
          />
          <ul>
            {data.map((item, index) => (
             
              <li
                key={index}
                className="  w-full my-3 py-3 px-5  rounded-[5px] flex justify-between items-center text-lg bg-[#00000020] "
              >
                <p className="  ">{item.value.todoName}   </p>

                <div className="flex gap-3 items-center">
                  <FaRegEdit onClick={() => handleEdit (item.value.todoName, item.id)} className="text-green-500 " />

                  <FaTrashCan
                    onClick={() => handleDelete(item.id)}
                    className=" cursor-pointer text-red-500 "
                  />
                </div>
              </li>
            ))}
          </ul>

          <button onClick={handleClick} className="btn btn-neutral mt-4">
            Submit
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default Todo;
