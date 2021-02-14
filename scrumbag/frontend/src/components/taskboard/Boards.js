import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getBoards, deleteBoard } from '../../actions/boards';
import { Link } from 'react-router-dom';

export class Boards extends Component {
    static propTypes = {
        boards: PropTypes.array.isRequired,
        getBoards: PropTypes.func.isRequired,
        deleteBoard: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.props.getBoards();
    }

    rowClick() {
        console.log("przekieruj")
    }

    render() {
        return (
            <Fragment>
                <h2>My Boards</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.boards.map((board) => (
                            <tr key={board.id} onClick={this.rowClick}>

                                <td><Link to={{ pathname: "/taskboard/", state: { taskboard: board.id } }} >{board.name}</Link></td>
                                <td>{board.description}</td>
                                <td>
                                    <button
                                        onClick={this.props.deleteBoard.bind(this, board.id)}
                                        className="btn btn-danger btn-sm"
                                    >
                                        {' '}
                                        Delete
                  </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    boards: state.boards.boards,
});

export default connect(mapStateToProps, { getBoards, deleteBoard })(Boards);