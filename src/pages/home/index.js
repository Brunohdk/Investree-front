import React, { useState, ReactNode } from 'react'
import { useHistory } from 'react-router-dom'
import { BsFillPlusCircleFill } from 'react-icons/bs'
import { GrSearch } from 'react-icons/gr'
import { Tag, Space } from 'antd';

import Table from '../../components/crud/Table'
import Form from '../../components/crud/Form'
import './styles.scss'




const formSettings= {
    module: 'investree',
    entityPath: 'operation',
    inputs: [
        {
            type: 'select',
            name: 'asset',
            label: 'Asset',
            size: 6,
            default: '',
            fieldKey: {
                value: 'name',
                name: 'name'
            },
            dataSource: {
                module: 'investree',
                entityPath: 'asset'
            },
            required: true
        },
        {
            type: 'input',
            name: 'amount',
            label: 'Amount',
            size: 6,
            default: '',
            required: true
        },
        {
            type: 'input',
            name: 'value',
            label: 'Value',
            inputType: 'number',
            size: 6,
            default: '',
            required: true
        },
        {
            type: 'calendar',
            name: 'date',
            label: 'Date',
            size: 6,
            default: new Date(),
            required: true
        }
    ]
}

const tableSettings = {
    module: 'investree',
    entityPath: 'operation',
    buttons: {
        delete: true,
        update: true
    },
    columns: [
        {
            name: 'Asset',
            data: 'asset'
        },
        {
            name: 'Amount',
            data: 'amount'
        },
        {
            name: 'Value',
            data: 'value'
        },
        {
            name: 'Date',
            data: 'date'
        },
    ]
}

export default function Home({ match }) {

  const [ toggleForm, setToggleForm ] = useState(false)

  const history = useHistory()
    
    return (
        <div className="home">
          {toggleForm ? 
            <>
                <header className="home-header">
                    <div className="add-button-wrapper">
                        <p className="title">
                            Back
                        </p>
                        <span onClick={() => setToggleForm(false)}>
                            <BsFillPlusCircleFill size={24}/>
                        </span>
                    </div>
                    <div className="filter-button">
                    <span>
                        <GrSearch size={20}/>
                    </span>
                    </div>
                </header>
                <main>
                    <Form 
                      settings={formSettings}
                      setToggleForm={setToggleForm}
                      history={history}
                      match={match}
                    />
                </main>
            </>
          :
            <>
                <header className="home-header">
                    <div className="add-button-wrapper">
                        <p className="title">
                            Add
                        </p>
                        <span onClick={() => setToggleForm(true)}>
                            <BsFillPlusCircleFill size={24}/>
                        </span>
                    </div>
                    <div className="filter-button">
                    <span>
                        <GrSearch size={20}/>
                    </span>
                    </div>
                </header>
                <main className="home-main">
                    <Table 
                        settings={tableSettings}
                        history={history}
                        match={match}
                    />
                </main>
            </>
          }
        </div>
    )
}
