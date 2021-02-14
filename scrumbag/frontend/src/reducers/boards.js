import { GET_COMMENTS, GET_ASSIGNEMENTS, ADD_ASSIGNEE, ADD_COMMNET, ADD_MEETING, ADD_BOARD, DELETE_BOARD, GET_BOARDS, CLEAR_BOARDS, GET_MEMBER_BOARDS, ADD_TASK, GET_TASKS } from '../actions/types.js';

const initialState = {
    boards: [],
    member_boards: [],
    meetings: [],
    tasks: [],
    comments: [],
    assignments: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_BOARDS:
            return {
                ...state,
                boards: action.payload,
            };
        case DELETE_BOARD:
            return {
                ...state,
                boards: state.boards.filter((board) => board.id !== action.payload),
            };
        case ADD_BOARD:
            return {
                ...state,
                leads: [...state.leads, action.payload],
            };
        case CLEAR_BOARDS:
            return {
                ...state,
                leads: [],
            };

        case GET_MEMBER_BOARDS:
            return {
                ...state,
                member_boards: action.payload,
            };
        case ADD_MEETING:
            return {
                ...state,
                meetings: [...state.meetings, action.payload]
            }
        case ADD_TASK:
            return {
                ...state,
                tasks: [...state.tasks, action.payload]
            }
        case GET_TASKS:
            return {
                ...state,
                tasks: action.payload,
            };
        case ADD_COMMNET:
            return {
                ...state,
                comments: [...state.comments, action.payload]
            }
        case ADD_ASSIGNEE:
            return {
                ...state,
                assignments: [...state.assignments, action.payload]
            }
        case GET_ASSIGNEMENTS:
            return {
                ...state,
                assignments: action.payload,
            };
        case GET_COMMENTS:
            console.log("Reduktor")
            console.log(action.payload)
            return {
                ...state,
                comments: action.payload
            }
        default:
            return state;
    }
}