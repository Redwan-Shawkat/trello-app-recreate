/** @format */

import { useDispatch } from "react-redux";
import { useState } from "react";

const BoardCreatingForm = () => {
    const [boardTitle, setBoardTitle] = useState("")

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!boardTitle.trim()){
            return alert(`Please Provide a Valid Board Title`)
        }
        dispatch({type: "board/CREATE_BOARD", payload: boardTitle})
        setBoardTitle("");
    }

    return (
        <div className="align-center m-top-md">
            <form action="" onSubmit={handleSubmit}>
                <input 
                    type="text"
                    value={boardTitle}
                    onChange={(e) => setBoardTitle(e.target.value)} />
                    <button type="submit"> Create Button </button>
            </form>
        </div>
    )
}

export default BoardCreatingForm;