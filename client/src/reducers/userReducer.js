export function userReducer (state = null,  action){
    //switch to update the state
    switch (action.type) {
        case "LOGGED_IN_USER" :
            return action.payload;
        case"LOGOUT":
            return action.payload;
        default:
            return state;
    }
}

