import React, { useState, useEffect, ReactNode } from 'react'

import api from '../../../services/api'
import enviroment from '../../../config/enviroment'
import './styles.scss'

interface TableSettings {
    module: string | object | any
    entityPath: string
    className?: string
    callbackList?: boolean
    buttons: TableButtons
    columns: TableColumn[]
    [key: string]: any
}

interface TableColumn {
    name: string
    data: string
    replace?: (param: string) => ReactNode
}

interface TableButtons {
    delete: boolean
    deleteValidation?: boolean
    update: boolean
    updateValidation?: boolean
}

export default function CrudTable({ settings, history, match }: {settings:TableSettings, history: any, match: any}) {

    const [ data, setData ] = useState([])
	const [ loading, setLoading ] = useState(true)
    const [ rowsPerPage, setRowsPerPage ] = useState(10)
    
    function list(query= '') {
		const request = api.get(`${enviroment.apiURL[settings.module]}${settings.entityPath}${query}`)

        request.then(response => {
            setData(response.data)
            console.log(response)
			setLoading(false)
		})
		.catch(error => {
			setLoading(false)
			console.log(error)
		})
    }
    
    useEffect(() => {
		if(window.location.search) {
            list(window.location.search)
		} else if(!match.params.query && !window.location.search){
            list()
		}
	}, [window.location.pathname, window.location.search])

    return (
        data?.length > 0 ?
            <div className="crudTable">
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            {settings.columns.map((head, index) => 
                                <th key={index}>
                                    {head.name}
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, indexRow) =>
                            <tr key={indexRow}>
                                <td>
                                    
                                </td>
                                    {settings.columns.map((field, index) =>
                                        <td key={index}>
                                            {field.replace ? 
                                                field.replace(row)
                                            :
                                                row[field.data]
                                            }
                                        </td>
                                    )}
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        :
            loading ? 
                <div className="loading">
                    LOADING
                </div>
            :
                <div className="no-data">
                    NO DATA
                    {console.log(data)}
                </div>
    )
}
