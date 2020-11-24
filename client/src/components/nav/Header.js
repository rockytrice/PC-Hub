import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import { Menu } from 'antd';
import { HomeTwoTone, UserAddOutlined,UserOutlined } from '@ant-design/icons';
//destructure of menu.item
const { SubMenu,Item } = Menu;



const Header = () =>{
    const [current, setCurrent]  = useState('home')
const handleClick = (e)=>{
    //console.log(e.key);
    // set the current state
    setCurrent(e.key);
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

            <SubMenu key="SubMenu" icon={<UserAddOutlined />} title="username">
                    <Menu.Item key="setting:1">Option 1</Menu.Item>
                    <Menu.Item key="setting:2">Option 2</Menu.Item>
            </SubMenu>
        </Menu>
    )
}

export default Header;