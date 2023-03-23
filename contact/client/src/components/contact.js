import React from 'react';
import Popup from './popup';
import './css/contact.css';
import axios from 'axios';


class Contact extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            name : '',
            phoneNumber : '',
            email : '',
            message : '',
            sent : false,
            showPopup : false
        }
    }

    handleFullName = event =>{
        this.setState({
            name : event.target.value
        })

    }

    handlePhoneNumber = event =>{
        this.setState({
            phoneNumber :event.target.value
        })

    }

    handleEmail = event =>{
        this.setState({
            email :event.target.value
        })
    }

    handleMessage = event =>{
        this.setState({
            message :event.target.value
        })
    }

    handleSubmit = async event =>{
        event.preventDefault();
       
        await axios.post('/api/sendEmail',this.state).then(res => {
            this.setState({
                sent : true
            })
        }).then( () => this.setState({
            showPopup:true
        })).catch( () => this.setState({
            showPopup : true
        }))
    }

    resetForm = event =>
    {
        this.setState({
            name : '',
            phoneNumber : '',
            email : '',
            message : '',
            sent : false,
            showPopup : false
        })
    }

    render(){
        return(
            <>
            <div className='form'>
                <h1>Contact us</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className='text_field'>
                        <input type = 'text' required value={this.state.name} onChange={this.handleFullName} />
                        <span></span>
                        <label>Full name</label>
                    </div>
                    <div className='text_field'>
                        <input type='number' required  value={this.state.phoneNumber }onChange={this.handlePhoneNumber}  />
                        <span></span>
                        <label>Phone Number</label>
                    </div>
                    <div className='text_field'>
                        <input type='email' required value={this.state.email} onChange={this.handleEmail}  />
                        <span></span>
                        <label className='email'>Email</label>
                    </div>
                    <div className='text_field'>
                        <textarea type='text' required value={this.state.message} onChange={this.handleMessage}  />
                        <span className='textarea_span'></span>
                        <label className='textarea_label'>Message</label> 
                    </div>
                    <div className='button'>
                        <button type='submit' value={this.state.submit} onChange={this.handleSubmit}>Send</button>
                    </div>
                </form>
            </div> 
            {
                this.state.sent && this.state.showPopup ? 
                <Popup msg = 'Message has been sent successfully!' resetForm = {this.resetForm}/> : this.state.showPopup ? 
                <Popup msg = 'Message has not been sent something went wrong!' resetForm = {this.resetForm} /> : null      
            }
            </>
        )
    }
}

export default Contact;


