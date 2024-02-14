/** @format */

export const taskReducer = (tasks = [], action) => {
  switch (action.type) {
    // -----> CASE 01
    case "task/CREATE_TASK": {
      const newTask = {
        id: Date.now() + "",
        title: action.payload.title,
        listId: action.payload.listId,
        boardId: action.payload.boardId,
      };

      return [...tasks, newTask];
    }

    // -----> CASE 02
    case "task/UPDATE_TASK_TITLE": {
      return tasks.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, title: action.payload.title };
        }

        return item;
      });
    }

    // -----> CASE 03
    case "task/CHANGE_LIST_ID_OF_A_TASK": {
      return tasks.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, listId: action.payload.listId };
        }

        return item;
      });
    }

    // -----> CASE 04
    case "task/CHANGE_BOARD_ID_OF_A_TASK": {
      return tasks.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, boardId: action.payload.boardId };
        }

        return item;
      });
    }

    // -----> CASE 05
    case "task/REMOVE_TASK": {
      return tasks.filter((item) => item.id !== action.payload);
    }

    default: {
      return tasks;
    }
  }
};
