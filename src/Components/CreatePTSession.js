import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import './CreateClass.css'

export default function CreatePTSession(props) {
    const [name, setName] = useState(null)
    const [location, setLocation] = useState(null)
    const [client, setClient] = useState(null)
    const [description, setDescription] = useState(null)
    const [date, setDate] = useState(null)
    const [time, setTime] = useState(null)
    const [errorMessage, setErrorMessage] = useState(false)
    const [success, setSuccess] = useState(false)
    const [clients, setClients] = useState([])
    const [price, setPrice] = useState(50)

    useEffect(() => {
        fetch('https://wod-with-faris-backend.herokuapp.com/users/index').then(resp => resp.json()).then(allClients => handleClients(allClients))
    }, [])

    const handleCreatePtSession = () => {
        if ( name && description && date && time && client && location && price  ){
            fetch("https://wod-with-faris-backend.herokuapp.com/ptsessions/create", {
                    method: "POST", 
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: name, 
                        description: description,
                        date: date,
                        time: time,
                        location: location,
                        paid: false,
                        price: parseInt(price),
                        coach_email: props.currentUser.email,
                        client_email: client
                    })
                }).then(resp => resp.json()).then(handleSuccess)
                .catch(errorMessage => setErrorMessage(errorMessage))
            } else {
                setErrorMessage("Please fill all fields")
            }
    }

    const handleSuccess = () => {
        setSuccess("PT Session Created!")
        setErrorMessage("")
        setName("")
        setDescription("")
        setDate("")
        setTime("")
        setClient("")
        setLocation("")
        setPrice("")
    }

    const handleClients = allClients => {
        const formatedClients = allClients[0]&& allClients.map(client => {
            return { label: client.first_name + " " + client.last_name, email: client.email }
        })
        setClients(formatedClients)
    }

    const handleSetClient = e => {
        setClient(e.email)
    }

    return (
        <div>
            <h1 className='create-class-title'>Create PT Session</h1>
                {success&&
                        <h2 className='success'>PT Session Created!</h2>
                }
                {errorMessage&&
                        <h2 className='error-message'>{errorMessage}</h2>
                }
                <div className='create-class-div'>
                    <h3 className='create-class-h3'>Name</h3>
                    <input name='name' value={name} onChange={(e) => setName(e.target.value)} className='create-class-input' type='text'/>
                    <h3 className='create-class-h3' >Description</h3>
                    <textarea name='description' value={description} onChange={(e) => setDescription(e.target.value)} className='create-class-textarea'/>
                    <h3 className='create-class-h3'>Date</h3>
                    <input name='date' value={date} onChange={(e) => setDate(e.target.value)} className='create-class-input' type='date'/>
                    <h3 className='create-class-h3'>Time</h3>
                    <input name='time' onChange={(e) => setTime(e.target.value)} className='create-class-input' type='time'/>
                    <h3 className='create-class-h3'>Location</h3>
                    <input name='location' value={location} onChange={(e) => setLocation(e.target.value)} className='create-class-input' type='text'/>
                    <h3 className='create-class-h3'>Price (CHF)</h3>
                    <input name='price' value={price} onChange={(e) => setPrice(e.target.value)} className='create-class-input' type='number'/>
                    <h3 className='create-class-h3'>Client</h3>
                    <Select className='activity-input' options={clients} onChange={handleSetClient}/>
                    <button className='create-pt-session-btn' onClick={handleCreatePtSession}>Create PT Session</button>
                </div>
        </div>
    )
}
