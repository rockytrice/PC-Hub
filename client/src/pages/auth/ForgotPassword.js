import React, {useState, useEffect} from 'react';
import {auth} from '../../firebase';
import {toast} from 'react-toastify';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import {Button} from 'antd';
import { MailOutlined , LoadingOutlined,  } from '@ant-design/icons';
const ForgotPassword = ({history})=>{
    const [email, setEmail] = useState("")
    const [loading,setLoading] = useState(false);

const handleSubmit = async (e)=>{
    e.preventDefault();
setLoading(true)
    //    when user submits form, we send them the url where they can complete the pw reset
    const config = {
        //url for redirect on register
        url: process.env.REACT_APP_FORGOTPASSWORD_REDIRECT,
        handleCodeInApp: true,
    }
    await auth.sendPasswordResetEmail(email,config)
//get promise as response
   .then(()=>{
setEmail("")
       setLoading(false)
       toast.success("Check your email for Password reset link")
    })
        .catch((err)=>{
            setLoading(false);
            toast.error(err.message);
            console.log(err)
        });
}
    return <div className="container col-md-4 offset-md-4 p-5">
        {loading ? <div className=" col-md-4 offset-md-4 p-5"><LoadingOutlined style={{fontSize: 100}} /></div>: <h4>Forgot Password</h4>}
        <form onSubmit={handleSubmit}>
            <input type="email" className="form-control mb-4" value={email} onChange={(e)=> setEmail(e.target.value)}
                   autoFocus placeholder="Type your email"/>
            <Button onClick={handleSubmit}
                type="primary"
                    block
                    shape="round"
                    icon={<MailOutlined />}
                    size="large"
                    disabled={!email}>Submit
            </Button>
        </form>
    </div>
}

export default ForgotPassword;