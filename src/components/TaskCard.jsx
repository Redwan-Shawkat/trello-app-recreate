/** @format */

import { useState} from "react";
import { Draggable } from "react-beautiful-dnd";

import { useSelector, useDispatch } from "react-redux";

import { icons } from "../assets";

import AddItemForm from "./AddItemForm";

const TaskCard = ({ task, index }) => {

  // const board = useSelector((storeState) => storeState.board);
  // const list = useSelector((storeState) => storeState.list);
  // const task = useSelector((storeState) => storeState.task);

  const dispatch = useDispatch();

  const [taskTitle, setTaskTitle] = useState(task.title);
  const [editMode, setEditMode] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    
    dispatch({
      type: "task/UPDATE_TASK_TITLE",
      payload: {
        id: task.id,
        title: taskTitle,
      },
    });

    setEditMode(false);
  };

  const removeHandler = () => {
    
    dispatch({
      type: "task/REMOVE_TASK",
      payload: task.id,
    });

    dispatch({
      type: "list/REMOVE_TASK_ID_FROM_A_LIST",
      payload: {
        id: task.listId,
        taskId: task.id,
      },
    });

    dispatch({
      type: "board/REMOVE_TASK_ID_FROM_A_BOARD",
      payload: {
        id: task.boardId,
        taskId: task.id,
      },
    });
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => {
       
        return (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            {!editMode ? (
              <div onClick={() => setEditMode(true)} className='task-card'>
                <p>{task.title}</p>
                <img
                  src={icons.crossIcon}
                  alt=''
                  className='add-item-icon'
                  onClick={removeHandler}
                />
              </div>
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
          </div>
        );
      }}
    </Draggable>
  );
};

export default TaskCard;
