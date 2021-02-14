import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getMemberBoards } from '../../actions/boards';
import { Link } from 'react-router-dom';

export class Member extends Component {
    static propTypes = {
        member_boards: PropTypes.array.isRequired,
        getMemberBoards: PropTypes.func.isRequired,

    };

    componentDidMount() {
        this.props.getMemberBoards();
    }

    render() {
        return (
            <Fragment>
                <h2>Boards assigned to me</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {console.log(this.props.member_boards)}
                        {this.props.member_boards.map((board) => (
                            <tr key={board.id}>
                                <td><Link to={{ pathname: "/membertaskboard/", state: { taskboard: board.id } }} >{board.name}</Link></td>
                                <td>{board.description}</td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    member_boards: state.boards.member_boards,
});

export default connect(mapStateToProps, { getMemberBoards })(Member);