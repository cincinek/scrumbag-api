import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

import Header from './layout/Header';

import Alerts from './layout/Alerts';
import Login from './accounts/Login';
import Register from './accounts/Register';
import PrivateRoute from './common/PrivateRoute';
import history from './common/hstory';
import BoardsDashboard from './taskboard/BoardsDashboard'
import OwnedTaskBoard from './tasks/OwnedTaskBoard'
import MemberTaskBoard from './tasks/MemberTaskboard'
import Task from './tasks/Task'

import { Provider } from 'react-redux';
import store from '../store';
import { loadUser } from '../actions/auth';

// Alert Options
const alertOptions = {
    timeout: 3000,
    position: 'top center',
};

class App extends Component {
    componentDidMount() {
        store.dispatch(loadUser());
    }

    render() {
        return (
            <Provider store={store}>
                <AlertProvider template={AlertTemplate} {...alertOptions}>
                    <Router history={history}>
                        <Fragment>
                            <Header />
                            <Alerts />
                            <div className="container">
                                <Switch>
                                    <PrivateRoute exact path="/" component={BoardsDashboard} />
                                    <PrivateRoute exact path="/taskboard" component={OwnedTaskBoard} />
                                    <PrivateRoute exact path="/membertaskboard" component={MemberTaskBoard} />
                                    <PrivateRoute exact path="/task" component={Task} />
                                    <Route exact path="/register" component={Register} />
                                    <Route exact path="/login" component={Login} />
                                </Switch>
                            </div>
                        </Fragment>
                    </Router>
                </AlertProvider>
            </Provider>

        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));