import react from 'react';
import {Route, Link} from 'react-router-dom'
import { useSelector } from 'react-redux'
import LoadingToRedirect from "./LoadingtoRedirect";

const UserRoute= ({children, ...rest})=>{
    //access user from state object.
    const {user} = useSelector((state)=>({...state}));
    return user && user.token ? (
        <Route {...rest} render={() => children} />
    ) : (<LoadingToRedirect />
    );
}

export default UserRoute;