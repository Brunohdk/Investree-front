import React, { useState, useEffect } from 'react'
import { Row, Col, Input, Spin } from 'antd'
import objectPath from 'object-path'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

import Button from '../../../components/common/Button'
import Select from 'react-select'
import api from '../../../services/api'
import Label from '../../common/Label'
import enviroment from '../../../config/enviroment'
import './styles.scss'

export default function CrudForm({ settings, setToggleForm, history, match }) {
    let defaultValue = {}
        settings.inputs.forEach(input => defaultValue[input.name] = input.default)

	const [ dataListEntities, setDataListEntities ] = useState([])
    const [ formData, setFormData ] = useState(defaultValue)    
	const [ submitForm, setSubmitForm ] = useState(false)
	const [ loadingData, setLoadingData ] = useState(true)
	const [ loadingActionRequest, setLoadingActionRequest ] = useState(false)

    function save(data) {
		setLoadingActionRequest(true)

        const request = api.post(`${enviroment.apiURL[settings.module]}${settings.entityPath}`, data)
        
        request.then(resp => {
            clearRequest()
        })
        .catch(err => console.log(err))
    }

	function update(data) {
		setLoadingActionRequest(true)

		const request = api.put(`${enviroment.apiURL[settings.module]}${settings.entityPath}/${data._id}`, data)

		request.then(response => {
			// Notification('success', 'update')
			setLoadingActionRequest(false)
			clearRequest()
		})
		.catch(error => {
			setLoadingActionRequest(false)
			// Notification('error', error)
			console.log(error)
		})
	}

	function listUnique(id) {
		const request = api.get(`${enviroment.apiURL[settings.module]}${settings.entityPath}/${id}`)

		request.then(response => {
			const data = response.data

			setFormData(data)
			setLoadingData(false)
		})
		.catch(error => {
			// Notification('error', error)
			console.log(error)
			setLoadingData(false)
		})
	}

	function list(params) {
		const request = api.get(`${enviroment.apiURL[params.module]}${params.entityPath}?limit=1000`)

		request.then(response => {
			const data = response.data
			setDataListEntities(prevState => ({...prevState, [params.entityPath]: data}))
			setLoadingData(false)
		})
		.catch(error => {
			// Notification('error', error)
			console.log(error)
			setLoadingData(false)
		})
	}

	function getData(input) {
		if(input.dataSource) {
			let inputData = dataListEntities[input.dataSource.entityPath]
			input.data = inputData

			return inputData
		} else {
			return input.data
		}
	}

	function handleSelectData(input) {
		let arr = []
		dataListEntities[input.dataSource.entityPath].map(item =>
			arr.push({
				value: item[input.fieldKey.value],
				label: (input.fieldKey.name).constructor.name === 'Array' ?
						concatLabelSelect(input.fieldKey.name, item)
					:
						item[input.fieldKey.name]
			})
		)
		return arr
	}

    function handleChange(e) {
        const { name, value } = e.target

        setFormData(prevState => ({...prevState, [name]: value}))
	}
	
	function handleformDataValidated() {
		settings.inputs.forEach(input => {
			if(input.excludeBeforePost)
				delete formData[input.name]
			if(input.replace)
				formData[input.name] = formData[input.name] && input.replace(formData[input.name])
		})
	}

	function handleSubmit(e) {
		e.preventDefault()
		setSubmitForm(true)

		if(validated()) {
			setSubmitForm(false)
			handleformDataValidated()

			formData._id ?
				update(formData)
			:
				save(formData)
		}
	}

    function concatLabelSelect(field, input) {
		let arr = []
		field.map(label => {
			arr.push(objectPath.get(input, label))
		})

		return arr.join(' - ')
	}

	function validated() {
		let isValid = true

		settings.inputs.forEach(input => {
			if(settings.validation && settings.validation(formData) === false)
				isValid = false
			if(input.required && (formData[input.name] === '' || formData[input.name] === null || formData[input.name].length === 0))
				isValid = false
			if((input.maxValue && parseInt(formData[input.name]) > input.maxValue) || (input.maxLength && formData[input.name].length > input.maxLength))
				isValid = false
			if(input.dataHidden && (formData[input.name] !== formData[input.mirror]))
				isValid = false
			if(input.validation && !input.validation(formData[input.name]))
				isValid = false

			return isValid
		})
		return isValid
	}

    function selectValueConvert(input) {
		let value = formData[input.name]

		if(value || value === false) {
			if(input.dataSource && dataListEntities[input.dataSource.entityPath]) {
				value = formData[input.name][input.fieldKey.value] || formData[input.name]

				let filteredData = dataListEntities[input.dataSource.entityPath].filter(item => item[input.fieldKey.value] === value)[0]

				return {
					label: (input.fieldKey.name).constructor.name === 'Array' ?
							concatLabelSelect(input.fieldKey.name, filteredData)
						:
							filteredData[input.fieldKey.name],
					value: filteredData[input.fieldKey.value]
				}
			} else if(!input.dataSource){
				let obj = {}

				input.data.map(item => {
					if(((input.fieldKey && item[input.fieldKey.value]) || item.value) === value) {
						obj = {
							value: value,
							label: input.fieldKey ? (input.fieldKey.name).constructor.name === 'Array' ?
										concatLabelSelect(input.fieldKey.name, item)
									:
										objectPath.get(item, input.fieldKey.name)
								:
										item.name
						}
					}
				})

				return obj
			}
		} else {
			return input.default
		}
	}

	function multipleSelectValueConvert(input) {
		if(formData[input.name] === undefined || formData[input.name] === null)
			formData[input.name] = []

		if(formData[input.name].length > 0 ) {
			let arr = []

			if(formData[input.name][0]._id) {
				formData[input.name].forEach(item => {
					arr.push({
						value: input.fieldKey ? objectPath.get(item, input.fieldKey.value) : item._id,
						label: input.fieldKey ? objectPath.get(item, input.fieldKey.name) : item.name
					})
				})
			} else if(typeof formData[input.name][0] === 'number') {

				getData(input).forEach(item => {
					if(dataListEntities[input.name]) {
						dataListEntities[input.name].forEach(value =>
							item.value === value &&
								arr.push({
									value: value,
									label: item[input.fieldKey.name]
								})
							)
					} else {
						formData[input.name].forEach(dataForm =>
							item.value === dataForm &&
								arr.push({
									value: dataForm,
									label: item.name
								})
						)
					}
				})
			} else if(formData[input.name][0].value) {
				return formData[input.name]
			}

			return arr
		} else {

			return input.default
		}
	}

    function clearRequest() {
        setToggleForm(false)
        setFormData(defaultValue)
        history.push('/')
	}
	
	useEffect(() => {
			if(match.params.query)
				listUnique(match.params.query)
			
			let inputDataSourceArr = settings.inputs.filter(input => input.dataSource)
			if(inputDataSourceArr.length === 0) {
				setLoadingData(false)
			} else {
				inputDataSourceArr.forEach(input => list(input.dataSource))
			}

	}, [])

    return (
		<form 
			onSubmit={handleSubmit}
			className="crudForm"
		>
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
                        {input.type === 'select' &&
                            <>
                                <Label text={input.label}/>
                                <Select 
                                    name={input.name}
                                    placeholder='Select...'
                                    isOptionDisabled={() => input.readOnly && input.readOnly(formData)}
                                    classNamePrefix={'reactselect'}
                                    value={selectValueConvert(input)}
                                    onChange={e => {
                                        setFormData(prevState => ({...prevState, [input.name]: e.value}))
                                    }}
                                    options={input.data ?
                                            input.data.map(item => {
                                                return {
                                                    value: item.value,
                                                    label: item.name
                                                }
                                            })
                                        :
                                            dataListEntities[input.dataSource.entityPath] && handleSelectData(input)
                                    }
                                />
                            </>
                        }
						{input.type === 'calendar' && 
							<>
								<Label text={input.label}/>
								<DatePicker 
									dateFormat='dd/MM/yyyy'
									selected={new Date(formData[input.name]) || ''}
									onChange={date => setFormData(prevState => ({...prevState, [input.name]: date}))}
								/>
							</>
						}
                    </Col>
                )}
            </Row>
			<div className="crudForm__btnGroup">
				{loadingActionRequest ?
					<Button 
						className="crudForm__btnGroup--loadingBtn"
						disabled
						outline
						icon={() => <Spin /> }
					/>
				:
					<Button 
						title='Save'
						size='small'
						onClick={e => handleSubmit(e)}
					/>
				}
				<Button 
					title='Cancel'
					size='small'
					link
					onClick={() => clearRequest()}
				/>
			</div>
        </form>
    )  
}
