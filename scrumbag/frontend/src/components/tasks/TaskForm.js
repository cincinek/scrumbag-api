import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addTask } from '../../actions/boards';
import DateTimePicker from 'react-datetime-picker';

export class Form extends Component {
    state = {
        name: '',
        description: '',
        stage: 'b',
        due_date: new Date(),
    };

    static propTypes = {
        addTask: PropTypes.func.isRequired,
    };

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });
    onDateChange(d) {
        this.setState({ date: d })
    }
    onSubmit = (e) => {
        e.preventDefault();
        const { name, description, due_date, stage } = this.state;
        const taskboard = this.props.taskboard;
        const task = { name, description, due_date, stage, taskboard };
        this.props.addTask(task);
        this.setState({
            name: '',
            description: '',
            stage: 'b',
            due_date: new Date(),
        });
    };

    render() {
        const { name, description, due_date } = this.state;
        return (
            <div className="card card-body mt-4 mb-4" style={{ width: 40 + "%", float: "left", marginRight: "50px" }}>
                <h2>Add task</h2>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Name</label>
                        <input
                            className="form-control"
                            type="text"
                            name="name"
                            onChange={this.onChange}
                            value={name}
                        />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <input
                            className="form-control"
                            type="text"
                            name="description"
                            onChange={this.onChange}
                            value={description}
                        />
                    </div>
                    <div className="form-group">
                        <label>Stage{"\n"}</label>
                        <select onChange={(e) => this.setState({ stage: e.target.value })}>
                            <option selected value="b">Backlog</option>
                            <option value="i">In progress</option>
                            <option value="r">Review</option>
                            <option value="c">Completed</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Due date{"\n"}</label>
                        <DateTimePicker
                            onChange={(value) => this.onDateChange(value)}
                            value={due_date}
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default connect(null, { addTask })(Form);