import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import firebase from 'firebase';
import { Menu } from 'antd';
import {useDispatch} from 'react-redux';
import {useHistory} from "react-router-dom";
import { HomeTwoTone, UserAddOutlined,UserOutlined,SettingOutlined, AppstoreOutlined,LogoutOutlined } from '@ant-design/icons';
//destructure of menu.item
const { SubMenu,Item } = Menu;



const Header = () =>{
    const [current, setCurrent]  = useState('home');
    let history = useHistory();
    let dispatch = useDispatch();
const handleClick = (e)=>{
    //console.log(e.key);
    // set the current state
    setCurrent(e.key);
}
const logout = () =>{
      firebase.auth().signOut()
    dispatch({
        type: 'LOGOUT',
        payload: null,
    })
    history.push('/login')
}
    return(
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
            <Item key="home" icon={<HomeTwoTone />}>
               <Link to="/">Home</Link>
            </Item>
            <Item key="register" icon={<UserAddOutlined />} className="float-right">
               <Link to="/register">Register</Link>
            </Item>
            <Item key="login" icon={<UserOutlined />} className=' float-right'>
                <Link to="/login">Login</Link>
            </Item>

            <SubMenu icon={<SettingOutlined />} title="Username">
                    <Item key="setting:1">Option 1</Item>
                    <Item key="setting:2">Option 2</Item>
                <Item icon={<LogoutOutlined />}  onClick={logout}>Logout</Item>
            </SubMenu>
        </Menu>
    )
}

export default Header;