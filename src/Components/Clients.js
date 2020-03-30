import React, { Component } from 'react'
import './Clients.css'
import Client from './Client';

export default class Clients extends Component {

    state = {
        search: null,
        allClients: []
    }


    componentDidMount(){
        fetch(`http://localhost:3000/users/index`)
        .then(resp => resp.json())
        .then(allClients => this.setState({allClients}))
    }

    handleSearch = e => {
        const search = e.target.value
        if (search.length > 1) {
            this.setState({search})
        } else if (search.length < 1){
            this.setState({search: null})
        }
 
    }

    render() {
        const { allClients } = this.state
        return (
            <div>
                <h1>Clients</h1>
                <input className='search-bar' onChange={this.handleSearch} name='search' type='text'/>
                <div className='clients-container'>
                    {allClients&& allClients[0]&&

                    allClients.map(client => (
                        <Client client={client}/>
                    ))

                    }
                    {allClients&& !allClients[0]&&
                        <h2>None</h2>
                    }
                </div>
            </div>
        )
    }
}
