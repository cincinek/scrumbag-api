import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addMeeting } from '../../actions/boards';
import DateTimePicker from 'react-datetime-picker';


export class MeetingForm extends Component {
    state = {
        name: '',
        date: new Date()
    };

    static propTypes = {
        addMeeting: PropTypes.func.isRequired,
    };

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });
    onDateChange(d) {
        this.setState({ date: d })
    }
    onSubmit = (e) => {
        e.preventDefault();
        const { name, date } = this.state;
        const taskboard = this.props.taskboard;
        const url = `http://meet.jit.si/${name}_${this.props.taskboard}`
        const task = { name, date, taskboard, url };
        this.props.addMeeting(task);
        this.setState({
            name: '',
            date: new Date(),
        });
    };

    render() {


        const { name, date } = this.state;
        return (
            <div className="card card-body mt-4 mb-4" style={{ width: 40 + "%", float: "right" }}>
                <h2>Create meeting</h2>
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
                        <label>Date{"\n"}</label>
                        <DateTimePicker
                            onChange={(value) => this.onDateChange(value)}
                            value={date}
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

export default connect(null, { addMeeting })(MeetingForm);