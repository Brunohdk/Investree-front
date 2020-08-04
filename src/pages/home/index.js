import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { BsFillPlusCircleFill } from 'react-icons/bs'
import { GrSearch } from 'react-icons/gr'
import { format, addHours } from 'date-fns'

import Form from '../../components/pages/home'
import Table from '../../components/crud/Table'
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
            type: 'select',
            name: 'moreThanOneOrder',
            label: 'More than one order?',
            size: 6,
            default: false,
            fieldKey: {
                value: 'value',
                name: 'name'
            },
            data: [
                {
                    name: 'Yes',
                    value: true
                },
                {
                    name: 'No',
                    value: false
                }
            ],
            required: false,
            excludeBeforePost: true,
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
        deleteValidation: () => true,
        updateValidation: () => true
    },
    columns: [
        {
            name: 'Asset',
            data: 'asset'
        },
        {
            name: 'Amount',
            data: 'amountTotal'
        },
        {
            name: 'Average Price',
            data: 'valueAverage'
        },
        {
            name: 'Started Position In',
            data: 'startedPositionIn',
            replace: obj => format(addHours(new Date(obj.startedPositionIn), 3), 'dd/MM/yyyy HH:mm')
        },
        {
            name: 'createdAt',
            data: 'createdAt',
            replace: obj => format(addHours(new Date(obj.createdAt), 3), 'dd/MM/yyyy HH:mm')
        }
    ]
}

export default function Home({ match }) {

  const [ toggleForm, setToggleForm ] = useState(false)

  const history = useHistory()

  function originPath() {
    let originPath = (match.path).split('/')
    originPath.pop()

    return history.push(`${originPath.join('/')}`)
}

  useEffect(() => {
      if(match.params.query) {
          setToggleForm(true)
      }
  }, [match.params.query])
    
    return (
        <div className="home">
          {toggleForm ? 
            <>
                <header className="home-header">
                    <div className="add-button-wrapper">
                        <p className="title">
                            Back
                        </p>
                        <BsFillPlusCircleFill 
                            onClick={() => {
                                setToggleForm(false)
                                originPath()
                            }}
                            size={24}
                        />
                    </div>
                    <div className="filter-button">
                    <span>
                        <GrSearch size={20}/>
                    </span>
                    </div>
                </header>
                <main>
                    <Form 
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
                        <BsFillPlusCircleFill 
                            size={24}
                            onClick={() => setToggleForm(true)}
                        />
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
