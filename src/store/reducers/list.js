/** @format */

export const listReducer = (lists = [], action) => {
  switch (action.type) {
    // -----> CASE 01
    case "list/CREATE_LIST": {
      const newList = {
        id: Date.now() + "",
        title: action.payload.title,
        boardId: action.payload.boardId,
        tasks: [],
      };

      return [...lists, newList];
    }

    // -----> CASE 02
    case "list/UPDATE_LIST_NAME": {
      return lists.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, title: action.payload.title };
        }

        return item;
      });
    }

    // -----> CASE 03
    case "list/REMOVE_LIST": {
      return lists.filter((item) => item.id !== action.payload);
    }

    // -----> CASE 04
    case "list/CHANGE_BOARD_ID_OF_A_LIST": {
      return lists.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, boardId: action.payload.boardId };
        }

        return item;
      });
    }

    // -----> CASE 05
    case "list/ADD_TASK_ID_TO_A_LIST": {
      return lists.map((item) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            tasks: [...item.tasks, action.payload.taskId],
          };
        }

        return item;
      });
    }

    // -----> CASE 06
    case "list/REMOVE_TASK_ID_FROM_A_LIST": {
      return lists.map((item) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            tasks: item.tasks.filter((tId) => tId !== action.payload.taskId),
          };
        }

        return item;
      });
    }

    // -----> CASE 07
    case "list/SORT_TASK_IDS_IN_LIST": {
      const { draggableId, source, destination } = action.payload;

      return lists.map((list) => {
        if (
          source.droppableId === destination.droppableId &&
          list.id === source.droppableId
        ) {
          const copyOfTaskIds = [...list.tasks];
          copyOfTaskIds.splice(source.index, 1);
          copyOfTaskIds.splice(destination.index, 0, draggableId);
          return {
            ...list,
            tasks: copyOfTaskIds,
          };
        }

        if (source.droppableId === list.id) {
          return {
            ...list,
            tasks: list.tasks.filter((itemId) => itemId !== draggableId),
          };
        }

        if (destination.droppableId === list.id) {
          return {
            ...list,
            tasks: [
              ...list.tasks.slice(0, destination.index),
              draggableId,
              ...list.tasks.slice(destination.index),
            ],
          };
        }

        return list;
      });
    }

    default: {
      return lists;
    }
  }
};
