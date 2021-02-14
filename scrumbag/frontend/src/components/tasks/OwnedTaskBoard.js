import React, { Fragment } from 'react';
import Form from './TaskForm'
import MeetingForm from './MeetingForm'
import Tasks from './Tasks';
import { useLocation } from 'react-router-dom'

export default function OwnedTaskBoard() {
    const taskboard = useLocation().state.taskboard
    console.log(taskboard)
    return (
        <Fragment>
            <Form taskboard={taskboard} />
            <MeetingForm taskboard={taskboard} />
            <Tasks taskboard={taskboard} />

        </Fragment>
    );
}