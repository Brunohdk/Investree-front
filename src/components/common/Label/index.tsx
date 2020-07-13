import React from 'react'

import './styles.scss'

interface Button {
    text: string
    size?: size
    color?: Boolean
}

type size = "small" | "medium" | "big"

export default function Button({ text, size, color }: Button) {
    return (
        <label className={`label_component ${size && size}`} >
            {text}
        </label>
    )
}
