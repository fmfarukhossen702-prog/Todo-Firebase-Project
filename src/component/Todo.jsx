import React, { useEffect, useState } from "react";
import { getDatabase, ref, set, push, onValue } from "firebase/database";

const Todo = () => {
  const [task, setTask] = useState("");
  const [data, setData] = useState({});
  const dataArr = Object.values(data || {});


  const handleClick = (e) => {
    e.preventDefault();
    const db = getDatabase();
    set(push(ref(db, "/todoName")), {
      todoName: task,
    }).then(setTask(""))
  };

  useEffect(() => {
    const db = getDatabase();
    // const starCountRef = ref(db, "posts/" + postId + "/starCount");
    onValue(ref(db, "todoName"), (snapshot) => {
      const data = snapshot.val();
      setData(data);
    });
  }, []);

  return (
    <div>
      <form className=" mx-auto mt-20 fieldset bg-[#d2cfcfe8] border-base-300 rounded-box w-lg border p-10 ">
        <h1 className=" text-4xl text-center mb- ">Todo Application</h1>
        <fieldset className=" fieldset">
          <label className="label font-semibold text-lg mt-4 ">
            Enter your task here
          </label>
          <input
            onChange={(e) => setTask(e.target.value)}
            type="text"
            value={task}
            className="input w-full my-3"
            placeholder="text"
          />
          {dataArr.map((items) => (
            <p  className="  w-full my-3 py-3 px-5 rounded-[5px] text-lg bg-[#00000020] "> {items.todoName} </p>
          ))}

          <button onClick={handleClick} className="btn btn-neutral mt-4">
            Submit
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default Todo;
