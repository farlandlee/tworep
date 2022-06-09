import React, { useState } from 'react'

import { connect } from 'react-redux'
import ReCAPTCHA from "react-google-recaptcha"
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/pro-duotone-svg-icons'
import {ReactTitle} from 'react-meta-tags'
const baseURL = process.env.NODE_ENV === 'production'? 'https://api.tworeporters.com/send/' : 'http://localhost:3000/send/'

const Contact = (props) => {
    const [data, setData] = useState({
        name: '',
        email: '',
        message: '',
        recaptcha: ''
    })

    const recaptchaRef = React.createRef()

    const onNameChange = (event) => {
        document.getElementById("send-message").innerHTML = ""
        setData({
            ...data,
            name: event.target.value
        })
    }

    const onEmailChange = (event) => {
        document.getElementById("send-message").innerHTML = ""
        setData({
            ...data,
            email: event.target.value
        })
    }

    const onMessageChange = (event) => {
        document.getElementById("send-message").innerHTML = ""
        setData({
            ...data,
            message: event.target.value
        })
    }

    const onRecaptchaChange = (value) => {
        document.getElementById("send-message").innerHTML = ""
        setData({
            ...data,
            recaptcha: value
        })
    }

    const resetForm = () => {
        setData({
            name: '',
            email: '',
            message: '',
            recaptcha: ''
        })
    }

    const button = document.getElementById("submit-button")
    const icon = document.getElementById("submit-button-icon")


    const handleSubmit = (e) => {
        e.preventDefault()
        if(
            typeof data.recaptcha === 'undefined' || 
            data.recaptcha === ''
        ) {
            document.getElementById("send-message").innerHTML = "<div class=\"alert alert-danger\" role=\"alert\" >Please complete the recaptcha challenge at the bottom of the form.</div>"
            return;
        }
        button.disabled = true
        icon.classList.remove('d-none')
        axios({
            method: "POST", 
            url: baseURL, 
            data: data
        }).then((response)=> {
            icon.classList.add('d-none')
            button.disabled = false
            console.log(response)
            if (response.data.status === 'success') {
                document.getElementById("send-message").innerHTML = "<div class=\"alert alert-success\" role=\"alert\">Message Sent Successfully!</div>"
                resetForm()
            } else if(response.data.status === 'fail') {
                document.getElementById("send-message").innerHTML = "<div class=\"alert alert-danger\" role=\"alert\" >Message failed to send.</div>"
            }
        })
    }
    
    return (
        <div className="container contact-us">
            <ReactTitle title="Contact Us | contact journalists Joe Albright and Marcia Kunstel | PRINT | tworeporters.com"/>
            <h2 className="page-title">{props.title}</h2>
            <div className="page-intro">
                Joe Albright and Marcia Kunstel ask researchers and others to notify us using the form below when any article in this archive is citied or reproduced in another document or publication.
            </div>
            <div className="contact-us-container">
                <div id="send-message"></div>
                <form id="contact-form" onSubmit={handleSubmit} >
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            name="name"
                            id="name" 
                            onChange={onNameChange}
                            defaultValue={data.name}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            aria-describedby="emailHelp" 
                            onChange={onEmailChange}
                            name="email"
                            id="email"
                            defaultValue={data.email}
                            required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Message</label>
                        <textarea
                            name="message"
                            id="message" 
                            className="form-control" 
                            rows="5" 
                            onChange={onMessageChange} 
                            defaultValue={data.message}
                            required></textarea>
                    </div>
                    <div className="form-group">
                        <ReCAPTCHA
                            ref={recaptchaRef}
                            sitekey={process.env.REACT_APP_RECAPTCHA_PUBLIC_KEY}
                            onChange={onRecaptchaChange}
                            theme="light"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" id="submit-button" >
                        <FontAwesomeIcon className="d-none" id="submit-button-icon" icon={faSpinner} size="lg" color="#ffffff" spin />
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )
};

const mapStateToProps = state => ({
    ...state
})

export default connect(mapStateToProps, {})(Contact)

// var element = document.getElementById('element');
// element.classList.add('class-1');
// element.classList.add('class-2', 'class-3');
// element.classList.remove('class-3');