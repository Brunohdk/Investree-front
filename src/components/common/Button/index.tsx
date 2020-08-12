import React from 'react'

import './styles.scss'

interface Button {
    icon?: Function
    title: string
    size?: size
    outline?: Boolean
    onClick?: () => void
    disabled?: boolean
    className?: string
    link?: boolean
}

type size = "small" | "medium" | "big"

export default function Button({ icon, title, size, outline, onClick, disabled, link, className= '' }: Button) {
    return (
        <button 
            className={`button_component ${className} ${size ? `button_component--${size}` : ''} ${outline ? 'button_component--outline' : ''} ${link ?'button_component--link' : ''}`}
            onClick={onClick}
            disabled={disabled ? disabled : false}
        >
            {icon &&
                <span style={{marginRight: title && 10}}>
                    {icon()}
                </span>
            }
            <p>
                {title}
            </p>
        </button>
    )
}
