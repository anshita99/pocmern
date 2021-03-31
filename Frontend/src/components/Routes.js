import React from 'react'
import { Switch, Route } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import Home from './Home';
import Details from './Details';
import Admin from './Admin';
import AdminControl from './AdminControl';

const Routes = () => {
    return (
        <>
            <Switch>
              
                <Route exact path="/" ><Home /></Route>
                <Route exact path="/login" ><Login /></Route>
                <Route exact path="/signup" ><Signup /></Route>
                <Route exact path="/detail">
                    <Details />
                </Route>
                <Route exact path="/admin"><Admin /></Route>

                <Route exact path='/all-details'>
                    <AdminControl/>
                </Route>
            </Switch>
        </>
    )
}
export default Routes;