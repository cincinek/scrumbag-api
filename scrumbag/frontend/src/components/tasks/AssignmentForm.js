import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addAssignee } from '../../actions/boards';



export class AssignmentForm extends Component {
    state = {
        login: ''
    };

    static propTypes = {
        addAssignee: PropTypes.func.isRequired,
    };

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    onSubmit = (e) => {
        e.preventDefault();
        const { login } = this.state;
        const task = this.props.task;

        const assignee = { login, task };
        this.props.addAssignee(assignee);
        this.setState({
            login: ''
        });
    };

    render() {


        const { login } = this.state;
        return (
            <div className="card card-body mt-4 mb-4" style={{ width: 40 + "%", float: "right" }}>
                <h2>Add assignee</h2>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Login</label>
                        <input
                            className="form-control"
                            type="text"
                            name="login"
                            onChange={this.onChange}
                            value={login}
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

export default connect(null, { addAssignee })(AssignmentForm);