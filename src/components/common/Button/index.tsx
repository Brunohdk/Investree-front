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
        <button className={`button_component ${size && `button_component--${size}`} ${outline && 'button_component--outline'}`}>
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
