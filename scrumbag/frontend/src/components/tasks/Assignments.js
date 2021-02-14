import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAssignments } from '../../actions/boards';



export class Assignments extends Component {
    static propTypes = {
        assignments: PropTypes.array.isRequired,
        getAssignments: PropTypes.func.isRequired,

    };

    componentDidMount() {
        this.props.getAssignments(this.props.task);
        console.log(`task: ${this.props.task}`)
    }

    rowClick() {
        console.log("przekieruj")
    }


    render() {
        return (
            <Fragment >

                <div style={{ float: 'right', width: "40%" }}>
                    <h2>Assignees</h2>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Name</th>

                                <th />
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.assignments.map((assignment) => (
                                <tr key={assignment.id} onClick={this.rowClick}>


                                    <td>{assignment.name}</td>

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
    assignments: state.boards.assignments,
});

export default connect(mapStateToProps, { getAssignments })(Assignments);