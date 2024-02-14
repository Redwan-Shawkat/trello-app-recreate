/** @format */

import { useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import { icons } from "../assets";

import AddItem from "./AddItem";
import AddItemForm from "./AddItemForm";


import { useSelector, useDispatch } from "react-redux";

import TaskCard from "./TaskCard";

const TaskList = ({ taskList }) => {
  const [editMode, setEditMode] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");

  const board = useSelector((storeState) => storeState.board);
  const list = useSelector((storeState) => storeState.list);
  const task = useSelector((storeState) => storeState.task);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();

    const newTaskId = Date.now() + "";

    dispatch({
      type: "task/CREATE_TASK",
      payload: {
        id: newTaskId,
        title: taskTitle,
        listId: taskList.id,
        boardId: taskList.boardId,
      },
    });

    dispatch({
      type: "list/ADD_TASK_ID_TO_A_LIST",
      payload: { id: taskList.id, taskId: newTaskId },
    });

    dispatch({
      type: "board/ADD_TASK_ID_TO_A_BOARD",
      payload: { id: taskList.boardId, taskId: newTaskId },
    });

    setEditMode(false);
    setTaskTitle("");
  };

  const removeHandler = () => {
    dispatch({ type: "list/REMOVE_LIST", payload: taskList.id });
    dispatch({
      type: "board/REMOVE_LIST_ID_FROM_A_BOARD",
      payload: { id: taskList.boardId, listId: taskList.id },
    });
    taskList.tasks.forEach((taskId) => {
      dispatch({ type: "task/REMOVE_TASK", payload: taskId });
    });
  };

  return (
    <Droppable droppableId={taskList.id}>
      {(provided) => {
        
        return (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className='list-container'
          >
            <div className='list-title-container'>
              <h5>{taskList.title}</h5>
              <img
                onClick={removeHandler}
                src={icons.crossIcon}
                alt=''
                className='add-item-icon'
              />
            </div>
            {taskList.tasks
              .map((item) => {
                return task.find((ele) => ele.id === item);
              })
              .map((task, index) => (
                <TaskCard index={index} key={task.id} task={task} />
                
              ))}
            {!editMode ? (
              <AddItem setEditMode={setEditMode} />
            ) : (
              <AddItemForm
                title={taskTitle}
                onChangeHandler={(e) => {
                  setTaskTitle(e.target.value);
                }}
                setEditMode={setEditMode}
                submitHandler={submitHandler}
              />
            )}
            {provided.placeholder}
          </div>
        );
      }}
    </Droppable>
  );
};

export default TaskList;
