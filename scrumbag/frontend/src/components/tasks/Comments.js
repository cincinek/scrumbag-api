import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getComments } from '../../actions/boards';


export class Comments extends Component {
    static propTypes = {
        comments: PropTypes.array.isRequired,
        getComments: PropTypes.func.isRequired,

    };

    componentDidMount() {
        this.props.getComments(this.props.task);
        console.log("i czemu to nie działa")
    }

    rowClick() {
        console.log("przekieruj")
    }



    render() {
        return (
            <Fragment >

                <div style={{ clear: "both" }}>
                    <h2>Comments</h2>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Comment</th>
                                <th>Commented by</th>

                                <th />
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.comments.map((comment) => (
                                <tr key={comment.id} onClick={this.rowClick}>

                                    <td>{comment.text}</td>
                                    <td>{comment.commented_by}</td>


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
    comments: state.boards.comments,
});

export default connect(mapStateToProps, { getComments })(Comments);