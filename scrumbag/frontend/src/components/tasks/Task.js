import React, { Fragment, useState } from 'react';
import CommentForm from './CommentForm'
import AssignmentForm from './AssignmentForm';
import Comments from './Comments'
import Assignments from './Assignments';
import { updateTask } from '../../actions/boards'
import { useDispatch } from "react-redux";
import { useLocation } from 'react-router-dom'

export default function OwnedTaskBoard() {
    const task = useLocation().state;
    const dispatch = useDispatch()
    const [taskStage, setStage] = useState(task.stage);

    function update() {
        console.log(task.id)
        console.log(taskStage)
        dispatch(updateTask(task.id, taskStage))
    }

    return (
        <Fragment>
            <div style={{ clear: "both" }}>
                <h1>{task.name}</h1>
                Stage:

                <select
                    value={taskStage}

                    onChange={(e) => { setStage(e.target.value); console.log(e) }}
                    style={{ marginRight: "20px" }}
                >
                    <option value="b">Backlog</option>
                    <option value="i">In progress</option>
                    <option value="r">Review</option>
                    <option value="c">Completed</option>
                </select>
                {"\t"}
                <button className="btn btn-primary" onClick={update}>
                    Update
                </button>
            </div>
            <CommentForm task={task.id} />
            <AssignmentForm task={task.id} />
            <Assignments task={task.id} />
            <Comments task={task.id} />



        </Fragment >
    );
}