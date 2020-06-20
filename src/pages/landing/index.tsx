import React from 'react'
import { Link } from 'react-router-dom'

import './styles.scss'

export default function Landing() {
    return (
        <div id="page-landing">
            <div className="content">
                <header>
                    <h4>
                        Investree
                    </h4>
                </header>
                <main>
                    <div className="apresentation-text">
                        <h1>
                            Ajudando você a controlar melhor seus investimentos!
                        </h1>
                        <p>
                            Controle total e em tempo real de todos os seus ativos e sua carteira.
                        </p>
                        <Link to="/home">
                        
                        </Link>
                    </div>
                    <div className="apresentation-image">
                        <img 
                            src={require('../../assets/images/home/landing/landingPage.svg')} 
                            alt="Logo" 
                            className="logo"
                        />
                    </div>
                </main>
            </div>
        </div>
    )
}
