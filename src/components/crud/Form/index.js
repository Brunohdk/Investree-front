import React from 'react'
import { Row, Col, Input } from 'antd'

import Label from '../../common/Label'
import { enviroment } from '../../../config/enviroment'

export default function CrudForm({ settings }) {
    return (
        <form>
            <Row gutter={16}>
                <Col
                    span={16}
                >
                    <Label text="Asset"/>
                    <Input type="text"/>
                </Col>
                <Col
                    span={8}
                >
                    <Label text="Amount"/>
                    <Input type="text"/>
                </Col>
                <Col
                    span={8}
                >
                    <Label text="Amount"/>
                    <Input type="text"/>
                </Col>
            </Row>
        </form>
    )  
}
