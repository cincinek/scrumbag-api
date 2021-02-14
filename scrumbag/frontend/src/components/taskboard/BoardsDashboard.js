import React, { Fragment } from 'react';
import Form from './TaskForm';
import Boards from './Boards';
import Member from './Member';

export default function BoardsDashboard() {
    return (
        <Fragment>
            <Form />
            <Boards />
            <Member />

        </Fragment>
    );
}