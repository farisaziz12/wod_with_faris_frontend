import React, { Component } from 'react'
import './Clients.css'
import Client from './Client';

export default class Clients extends Component {

    state = {
        search: null,
        allClients: []
    }


    componentDidMount(){
        fetch(`https://wod-with-faris.herokuapp.com/users/index`)
        .then(resp => resp.json())
        .then(allClients => this.setState({allClients}))
    }

    handleSearch = e => {
        const search = e.target.value
        if (search.length > 0) {
            this.setState({search})
        } else if (search.length === 0){
            this.setState({search: null})
        }
 
    }

    fuzzyMatch = (compareTerm ,term) => {
        if (term.length === 0)
            return 1;
        let string = compareTerm.toLowerCase();
        let compare = term.toLowerCase();
        let matches = 0;
        for (let i = 0; i < compare.length; i++) {
            string.indexOf(compare[i]) > -1 ? matches += 1 : matches -=1;
        }
        return matches / compareTerm.length;
    }

    sortSearch = (clients) => {
        const results = clients.map(client => [client, this.fuzzyMatch(client.first_name + " " + client.last_name, this.state.search)]);
        results.sort((a, b) => b[1] - a[1]);
        const filteredResults = results.filter(result => result[1] > 0)
        return filteredResults
    }

    render() {
        const { allClients, search } = this.state
        const alphebetizedClients = allClients.sort((a,b) =>  a.last_name.localeCompare(b.last_name))
        console.log(alphebetizedClients)
        const filteredClients = search? this.sortSearch(allClients) : alphebetizedClients
        return (
            <div>
                <h1>Clients</h1>
                <input className='search-bar' onChange={this.handleSearch} name='search' type='text'/>
                <div className='clients-container'>
                    {allClients&& allClients[0]&&

                    filteredClients.map(client => (
                        <Client client={search? client[0] : client}/>
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
