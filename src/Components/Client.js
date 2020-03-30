import React, { Component } from 'react'
import './Clients.css'
import PopPop from 'react-poppop';

export default class Client extends Component {

    state = {
        show: false
    }

    toggleShow = show => {
        this.setState({show: show});
      }

    render() {
        const { client } = this.props
        const { show } = this.state
        return (
            <div>
                <h3 onClick={this.toggleShow} className='client'>{client.first_name + " " + client.last_name}</h3>
                <PopPop position="centerCenter"
                        open={show}
                        closeBtn={true}
                        closeOnEsc={true}
                        onClose={() => this.toggleShow(false)}
                        closeOnOverlay={true}>
                            <div className='client-modal-container'>
                                <h3 className='client-txt'>{client.first_name + " " + client.last_name}</h3>
                            </div>
                </PopPop>
            </div>
        )
    }
}
