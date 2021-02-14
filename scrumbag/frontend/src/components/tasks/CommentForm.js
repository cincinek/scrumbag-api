import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addComment } from '../../actions/boards';


export class CommentForm extends Component {
    state = {
        text: ''
    };

    static propTypes = {
        addComment: PropTypes.func.isRequired,
    };

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    onSubmit = (e) => {
        e.preventDefault();
        const { text } = this.state;
        const task = this.props.task;
        const comment = { text, task };
        this.props.addComment(comment);
        this.setState({
            text: ''
        });
    };

    render() {
        const { text } = this.state;
        return (
            <div className="card card-body mt-4 mb-4" style={{ width: 40 + "%", float: "left", marginRight: "50px" }}>
                <h2>Add comment</h2>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Comment</label>
                        <input
                            className="form-control"
                            type="text"
                            name="text"
                            onChange={this.onChange}
                            value={text}
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

export default connect(null, { addComment })(CommentForm);