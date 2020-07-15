import React, { useState } from 'react'
import { Row, Col, Input } from 'antd'

import api from '../../../services/api'
import Label from '../../common/Label'
import { enviroment } from '../../../config/enviroment'

export default function CrudForm({ settings }) {
    let defaultValue = {}
        settings.inputs.forEach(input => defaultValue[input.name] = input.default)

    const [ formData, setFormData ] = useState(defaultValue)    

    function handleSubmit(e) {
        e.preventDefault()
        
        api.post('/asset', formData)
            .then(resp => console.log('ok'))
            .then(err => console.log(err))
    }

    function handleChange(e) {
        const { name, value } = e.target

        setFormData(prevState => ({...prevState, [name]: value}))
    }

    return (
        <form onSubmit={handleSubmit}>
            <Row gutter={16}>
                {settings.inputs.map((input, index) => 
                    <Col
                        span={input.size}
                        key={index}
                    >
                        {input.type === 'input' &&
                            <>
                                <Label text={input.label} />
                                <Input 
                                    type="text"
                                    name={input.name}
                                    required={input.required}
                                    value={formData[input.name] || ''}
                                    onChange={handleChange}
                                />
                            </>
                        }
                    </Col>
                )}
            </Row>
            <button onClick={e => handleSubmit(e)}>
                teste
            </button>
        </form>
    )  
}
