
export const boardReducer = (boards = [], action) => {
    switch (action.type) {
      // -----> CASE 01
      case "board/CREATE_BOARD": {
        const newBoard = {
          id: Date.now() + "",
          title: action.payload,
          lists: [],
          tasks: [],
        };
        return [...boards, newBoard];
      }

      // -----> CASE 02
      case "board/UPDATE_BOARD_TITLE": {
        return boards.map((item) => {
          if (item.id === action.payload.id) {
            return {
              ...item,
              title: action.payload.title,
            };
          }
          return item;
        });
      }

      // -----> CASE 03
      case "board/REMOVE_BOARD": {
        return boards.filter((item) => item.id !== action.payload);
      }

      // -----> CASE 04
      case "board/ADD_LIST_ID_TO_A_BOARD": {
        return boards.map((item) => {
          if (item.id === action.payload.id) {
            return {
              ...item,
              tasks: [...item.tasks, action.payload.taskId],
            };
          }
          return item;
        });
      }

      // -----> CASE 05
      case "board/ADD_TASK_ID_TO_A_BOARD": {
        return boards.map((item) => {
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
      case "board/REMOVE_LIST_ID_FROM_A_BOARD": {
        return boards.map((item) => {
          if (item.id === action.payload.id) {
            return {
              ...item,
              lists: item.lists.filter(
                (item) => item !== action.payload.listId
              ),
            };
          }
          return item;
        });
      }

      // -----> CASE 07 
      case "board/REMOVE_TASK_ID_FROM_A_BOARD": {
        return boards.map((item) => {
          if (item.id === action.payload.id) {
            return {
              ...item,
              tasks: item.tasks.filter(
                (item) => item !== action.payload.taskId
              ),
            };
          }
        });
      }

      default:
        return boards;
    }
}