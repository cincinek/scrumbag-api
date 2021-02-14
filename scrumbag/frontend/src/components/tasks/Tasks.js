import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getTasks, deleteTask } from '../../actions/boards';
import { Link } from 'react-router-dom';

export class Tasks extends Component {
    static propTypes = {
        tasks: PropTypes.array.isRequired,
        getTasks: PropTypes.func.isRequired,
        deleteTask: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.props.getTasks(this.props.taskboard);
    }

    rowClick() {
        console.log("przekieruj")
    }

    stage(s) {
        switch (s) {
            case 'b':
                return "Backlog"
            case 'i':
                return "In progress"
            case 'r':
                return "Review"
            case 'c':
                return "Completed"
        }
    }

    render() {
        return (
            <Fragment >
                <div style={{ width: "40%", float: "right" }}>
                    <Link to={{ pathname: "/meetings/", state: { taskboard: this.props.taskboard.id } }}>
                        <button className="btn btn-primary" style={{ float: "right", margin: "20px" }}>
                            Upcoming meetings
                    </button>
                    </Link>
                    <Link to={{ pathname: "/Members/", state: { taskboard: this.props.taskboard.id } }}>
                        <button className="btn btn-primary" style={{ float: "right", margin: "20px" }}>
                            Members
                    </button>
                    </Link>
                </div>
                <div style={{ clear: "both" }}>
                    <h2>Current tasks</h2>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Due date</th>
                                <th>Stage</th>
                                <th />
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.tasks.map((task) => (
                                <tr key={task.id} onClick={this.rowClick}>

                                    <td><Link to={{ pathname: "/task/", state: { id: task.id, name: task.name, stage: task.stage } }} >{task.name}</Link></td>
                                    <td>{task.description}</td>
                                    <td>{task.due_date}</td>
                                    <td>{this.stage(task.stage)}</td>
                                    <td>
                                        <button
                                            onClick={this.props.deleteTask.bind(this, task.id)}
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
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    tasks: state.boards.tasks,
});

export default connect(mapStateToProps, { getTasks, deleteTask })(Tasks);