import React from 'react'
import { FiLogIn } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import Button from '../../components/common/Button'
import './styles.scss'

export default function Landing() {
    return (
        <div id="page-landing">
            <div className="content">
                <div className="card">
                    <header>
                        <img 
                            className="investree-logo"
                            src={require('../../assets/images/icons/investree.svg')} 
                            alt="Investree"
                        />
                        <h4>
                            Investree
                        </h4>
                    </header>
                    <main>
                        <div className="apresentation-text">
                            <h1 className="title">
                                Financial control in a easy way
                            </h1>
                            <p className="description">
                                Total and real-time control of all financial assets in your portfolio.
                            </p>
                            <Link
                                to='/home'
                                className='btn-link'
                            >
                                <span>
                                    <FiLogIn />
                                </span>
                                <p>
                                    Let's start
                                </p>
                            </Link>
                            <img 
                                className="icon-money"
                                src={require('../../assets/images/icons/money-bag.svg')} 
                                alt="$"
                            />
                            {/* <img 
                                className="icon-money"
                                src={require('../../assets/images/icons/money-circle.svg')} 
                                alt="$"
                            /> */}
                        </div>
                        <div className="apresentation-image">
                            <img 
                                className="logo"
                                src={require('../../assets/images/home/landing/landingPage.svg')} 
                                alt="Logo" 
                            />
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
}
