import React from 'react'

import './styles.scss'

interface Button {
    icon?: Function
    children: string
    size?: size
    outline?: Boolean
}

type size = "small" | "medium" | "big"

export default function Button({ icon, children, size, outline }: Button) {
    return (
        <button 
            id="button-component" 
            className={`${size && size} ${outline && 'outline'}`}
        >
            {icon &&
                <span>
                    {icon()}
                </span>
            }
            <p>
                {children}
            </p>
        </button>
    )
}
