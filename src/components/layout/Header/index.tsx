import React, { useState } from 'react'
import { Menu, Dropdown } from 'antd';
import { FaUserTie } from 'react-icons/fa';
import { FiMenu, FiX } from 'react-icons/fi';
import { NavLink } from 'react-router-dom'
import { ReactComponent as InvestreeLogo } from '../../../assets/images/icons/investree.svg'

import './styles.scss'

const dropdownMenu = (
    <Menu>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
          My Profile
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
          Logout
        </a>
      </Menu.Item>
    </Menu>
  );

const MenuLinks = () => {
    return (
        <ul>
            <li>
                <NavLink to='/'>
                    Following
                </NavLink>
            </li>
            <li>
                <NavLink to='/'>
                    Features
                </NavLink>
            </li>
            <li>
                <NavLink to='/'>
                    Fake Wallet
                </NavLink>
            </li>
            <li>
                <NavLink to='/'>
                    About
                </NavLink>
            </li>
        </ul>
    )
}

export default function Header() {
    const [ toggleMobileMenu, setToggleMobileMenu ] = useState(false)

    return (
        <header id="header-layout">
            <div className="container">
                <div className="logo">
                    <InvestreeLogo 
                        className="investree-logo"
                    />
                    <h2 className="investree-text">
                        Investree
                    </h2>
                </div>
                <div className="wrapper">
                    <div className="features">
                        <MenuLinks />
                    </div>
                    <div className="divisor"></div>
                    <Dropdown 
                        overlay={dropdownMenu}
                        placement="bottomRight"
                        className="user-info-dropdown"
                    >
                        <a>
                            <FaUserTie size={18} />
                            <p className="user-name">
                                Andrew Math
                            </p>
                        </a>
                    </Dropdown>
                    <div className="header-mobile-menu-icon">
                        <a onClick={() => setToggleMobileMenu(prevState => !prevState)}
                        >
                            {toggleMobileMenu ?
                                <FiX 
                                    size={26}
                                    className="close-icon-menu-mobile"
                                />
                            :
                                <FiMenu size={24} />
                            }
                        </a>
                    </div>
                    {toggleMobileMenu && 
                        <div className="header-mobile-menu">
                            <MenuLinks />
                            <ul className="user-settings">
                                <li>
                                    <NavLink to='/'>
                                        My Profile
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/'>
                                        Logout
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                    }
                </div>
            </div>
        </header>
    )
}
