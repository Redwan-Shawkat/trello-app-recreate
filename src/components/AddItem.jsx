import React from 'react';
import {icons} from "../assets"
// import { useSelector, useDispatch } from 'react-redux';

const AddItem = ({ listAddItem, setEditMode }) => {
  // const board = useSelector((state) => state.board);
  // const dispatch = useDispatch();

  return (
    <div
      className={
        listAddItem ? "add-item list-add-item" : "add-item task-add-item"
      }
      onClick={() => setEditMode(true)}
    >
      <img src={icons.plusIcon} alt='' className='add-item-icon' />
      <p className='add-item-text'>
        {listAddItem ? "Add a list" : "Add a task"}
      </p>
    </div>
  );  
};

export default AddItem