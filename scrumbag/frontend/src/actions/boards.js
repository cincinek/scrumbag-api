import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { tokenConfig, getUserId } from './auth';

import { GET_COMMENTS, GET_ASSIGNEMENTS, ADD_ASSIGNEE, ADD_COMMNET, GET_TASKS, ADD_TASK, ADD_MEETING, DELETE_BOARD, ADD_BOARD, GET_BOARDS, GET_MEMBER_BOARDS } from './types';

export const addBoard = (board) => (dispatch, getState) => {
    const owner = getUserId(getState);
    const { name, description } = board
    const new_board = { name, description, owner };

    axios
        .post('api/taskboard/', new_board, tokenConfig(getState))
        .then((res) => {
            dispatch(createMessage({ addLead: 'Taskboard Created' }));
            dispatch({
                type: ADD_BOARD,
                payload: res.data,
            });
        })
        .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};
export const deleteBoard = (id) => (dispatch, getState) => {
    axios
        .delete(`api/taskboard/${id}/`, tokenConfig(getState))
        .then((res) => {
            dispatch(createMessage({ deleteLead: 'Board Deleted' }));
            dispatch({
                type: DELETE_BOARD,
                payload: id,
            });
        })
        .catch((err) => console.log(err));
};

export const getBoards = () => (dispatch, getState) => {
    const owner = getUserId(getState);
    axios.get(`api/listBoard?owner_id=${owner}`, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: GET_BOARDS,
                payload: res.data,
            });
        })
        .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));

}

export const getMemberBoards = () => (dispatch, getState) => {
    const member = getUserId(getState);
    axios.get(`api/memberOf?member_id=${member}`, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: GET_MEMBER_BOARDS,
                payload: res.data,
            });
        })
        .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));

}

export const addMeeting = (meeting) => (dispatch, getState) => {


    axios
        .post('api/meeting/', meeting, tokenConfig(getState))
        .then((res) => {
            dispatch(createMessage({ addMeeting: 'Meeting Created' }));
            dispatch({
                type: ADD_MEETING,
                payload: res.data,
            });
        })
        .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const getTasks = (board) => (dispatch, getState) => {

    axios.get(`api/task?board_id=${board}`, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: GET_TASKS,
                payload: res.data,
            });
        })
        .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));

}

export const addTask = (task) => (dispatch, getState) => {

    axios
        .post('api/task/', task, tokenConfig(getState))
        .then((res) => {
            dispatch(createMessage({ addLead: 'Task Created' }));
            dispatch({
                type: ADD_TASK,
                payload: res.data,
            });
        })
        .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};
export const deleteTask = (id) => (dispatch, getState) => {
    console.log("remove")
}

export const addComment = (comment) => (dispatch, getState) => {
    const comment_by = getUserId(getState);
    const { text, task } = comment
    const new_comment = { text, task, comment_by }

    axios
        .post('api/comments', new_comment, tokenConfig(getState))
        .then((res) => {
            dispatch(createMessage({ addMeeting: 'Meeting Created' }));
            dispatch({
                type: ADD_COMMNET,
                payload: res.data,
            });
        })
        .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const addAssignee = (body) => (dispatch, getState) => {
    axios
        .post('api/assignment', body, tokenConfig(getState))
        .then((res) => {
            dispatch(createMessage({ addMeeting: 'Assignment created' }));
            dispatch({
                type: ADD_ASSIGNEE,
                payload: res.data,
            });
        })
        .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const getAssignments = (task) => (dispatch, getState) => {
    console.log(`get assignment by task: ${task}`);
    axios
        .get(`api/assignmentList?task_id=${task}`, tokenConfig(getState))
        .then((res) => {

            dispatch({
                type: GET_ASSIGNEMENTS,
                payload: res.data,
            });
        })
        .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
}
export const getComments = (task) => (dispatch, getState) => {
    axios
        .get(`api/comments?task_id=${task}`, tokenConfig(getState))
        .then((res) => {
            console.log(res.data)
            dispatch({
                type: GET_COMMENTS,
                payload: res.data,
            });
        })
        .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
}

export const updateTask = (id, stage) => (dispatch, getState) => {
    const body = { id, stage }
    console.log(body)
    axios
        .post('api/updateTask', body, tokenConfig(getState))
        .then((res) => {
            dispatch(createMessage({ addMeeting: 'Task updated' }));

        })
        .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
}