import React, {useState} from 'react';

const Register = () => {
    //create state to store user's email
    const [email, setEmail] = useState("");
    //handle form submit to firebase
    const handleSubmit = ()=>{

    }
    const registerForm = ()=> (
        <form onSubmit={handleSubmit}>
            {/*bind the value in the state email. When user is typing in the input field,
            grab value and put it in the state by the name of the email variable. Then on change we get the event handler.
            So whenever the user types something in we set the email to the target value */}
            <input type="email" className="form-control" value={email}
                   autoFocus
                   onChange={event => setEmail(event.target.value)}/>
                   <button type="submit" className="btn btn-raised">Register</button>
        </form>
    );
        return (
                <div className="container p-5">
                    <div className="row">
                        <div className="col-md-6 offset-md-3">
                            <h4 className="b-0 my-2">Register</h4>
                            {registerForm()}
                        </div>
                    </div>
                </div>
            );
}

export default Register;