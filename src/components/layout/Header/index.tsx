import React, { useState } from 'react'
import { Menu, Dropdown } from 'antd';
import { FaUserTie } from 'react-icons/fa';
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

export default function Header() {
    const [ toggleMobileMenu, setToggleMobileMenu ] = useState(false)

    return (
        <header id="header-layout">
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
                    <ul>
                        <li>Following</li>
                        <li>Wallet</li>
                        <li>Fake Wallet</li>
                        <li>About</li>
                    </ul>
                </div>
                <div className="divisor"></div>
                <Dropdown 
                    overlay={dropdownMenu}
                    className="user-info-dropdown"
                >
                    <a>
                        <FaUserTie size={18} />
                        <p className="user-name">
                            Andrew Math
                        </p>
                    </a>
                </Dropdown>
                <div className="header-menu-mobile-icon">
                    <span onClick={() => {
                        setToggleMobileMenu(prevState => !prevState)
                        console.log('a')
                    }}
                    >
                        <FaUserTie size={18} />
                    </span>
                </div>
                {console.log(toggleMobileMenu)}
                {toggleMobileMenu && 
                    <div className="header-menu-mobile">
                        <ul>
                            <li>Following</li>
                            <li>Wallet</li>
                            <li>Fake Wallet</li>
                            <li>About</li>
                        </ul>
                    </div>
                }
            </div>
        </header>
    )
}
