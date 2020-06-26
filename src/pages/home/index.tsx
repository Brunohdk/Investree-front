import React from 'react'

import { useTheme } from '../../store'
import './styles.scss'

export default function Home() {

    const { theme, setTheme } = useTheme()
    
    return (
        <div id="home">
            <button
                onClick={() => setTheme('abc')}
            >
                {theme}
            </button>
        </div>
    )
}
