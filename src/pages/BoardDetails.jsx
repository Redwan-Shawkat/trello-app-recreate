/** @format */

import { useState } from "react";
import { useParams, Link } from "react-router-dom";

import { DragDropContext } from "react-beautiful-dnd";

import AddItem from "../components/AddItem";
import AddItemForm from "../components/AddItemForm";
import TaskList from "../components/TaskList";

import { useSelector, useDispatch } from "react-redux";

const BoardDetails = () => {
  const board = useSelector((storeState) => storeState.board);
  const list = useSelector((storeState) => storeState.list);
  const task = useSelector((storeState) => storeState.task);

  const dispatch = useDispatch();

  const [editMode, setEditMode] = useState(false);
  const [listTitle, setListTitle] = useState("");

  const { boardId } = useParams();

  

  const renderedList = list.filter((item) => item.boardId === boardId);

  const submitHandler = (e) => {
    e.preventDefault();

    const newListId = Date.now() + "";

    dispatch({
      type: "list/CREATE_LIST",
      payload: { title: listTitle, boardId: boardId, id: newListId },
    });

    dispatch({
      type: "board/ADD_LIST_ID_TO_A_BOARD",
      payload: { id: boardId, listId: newListId },
    });
    setEditMode(false);
    setListTitle("");
  };

  const dragEndHandler = (result) => {
    const { draggableId, source, destination } = result;
   
    if (!destination) {
      return;
    }
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    if (source.droppableId !== destination.droppableId) {
      dispatch({
        type: "task/CHANGE_LIST_ID_OF_A_TASK",
        payload: {
          id: draggableId,
          listId: destination.droppableId,
        },
      });
    }

    dispatch({
      type: "list/SORT_TASK_IDS_IN_LIST",
      payload: {
        draggableId,
        source,
        destination,
      },
    });
  };

  return (
    <DragDropContext onDragEnd={dragEndHandler}>
      <div className='d-flex m-top-sm flex-direction-row'>
        <Link to='/'>Back to Boards</Link>
        {renderedList.map((taskList) => (
          <TaskList key={taskList.id} taskList={taskList} />
          // <h1 key={taskList.id}>{taskList.title}</h1>
        ))}

        {!editMode ? (
          <AddItem listAddItem={true} setEditMode={setEditMode} />
        ) : (
          <AddItemForm
            title={listTitle}
            listForm={true}
            onChangeHandler={(e) => {
              setListTitle(e.target.value);
            }}
            setEditMode={setEditMode}
            submitHandler={submitHandler}
          />
        )}
      </div>
    </DragDropContext>
  );
};

export default BoardDetails;