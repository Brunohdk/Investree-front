import React from 'react'
import { Link } from 'react-router-dom'

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
                            <h1>
                                Financial control in a easy way
                            </h1>
                            <p>
                                Total and real-time control of all financial assets in your portfolio.
                            </p>
                            <Link to="/home">
                            
                            </Link>
                        </div>
                        <div className="apresentation-image">
                            <img 
                                className="logo"
                                src={require('../../assets/images/home/landing/landingPage.svg')} 
                                alt="Logo" 
                            />
                            {/* <img 
                                className="icon-money"
                                src={require('../../assets/images/icons/money-bag.svg')} 
                                alt="$"
                            />
                            <img 
                                className="icon-money"
                                src={require('../../assets/images/icons/money-circle.svg')} 
                                alt="$"
                            /> */}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
}
