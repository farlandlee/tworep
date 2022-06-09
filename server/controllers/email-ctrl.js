require('dotenv').config();
const axios = require('axios')
const creds = require('../email/config')
const nodemailer = require('nodemailer')
// const aws = require('aws-sdk')

const transport = {
    port: 465,
    host: "smtp.mail.us-west-2.awsapps.com",
    secure: true,
    auth: {
        user: creds.USER,
        pass: creds.PASS
    }
}

const transporter = nodemailer.createTransport(transport)

transporter.verify((error, success) => {
  if (error) {
    console.log(error)
  } else {
    console.log('Server is ready to take messages')
  }
})

sendEmail = (req, res, next) => {
    const name = req.body.name
    const email = req.body.email
    const message = req.body.message
    const token = req.body.recaptcha

    if(
        typeof req.body.recaptcha === 'undefined' ||
        req.body.recaptcha === '' || 
        req.body.recaptcha === null
    ) {
        res.json({
            status: 'fail',
            errors: 'recaptcha token not set'
        })
    }

    // Check Recaptcha token
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`
    /* https://developers.google.com/recaptcha/docs/verify
    * URL: https://www.google.com/recaptcha/api/siteverify
    * POST Parameters
    * secret	Required. The shared key between your site and reCAPTCHA. 
    * response	Required. The user response token provided by the reCAPTCHA client-side integration on your site.
    * 
    * API Response
    * The response is a JSON object:
    * {
    *     "success": true|false,
    *     "challenge_ts": timestamp,  // timestamp of the challenge load (ISO format yyyy-MM-dd'T'HH:mm:ssZZ)
    *     "hostname": string,         // the hostname of the site where the reCAPTCHA was solved
    *     "error-codes": [...]        // optional
    * }
    * missing-input-secret	The secret parameter is missing.
    * invalid-input-secret	The secret parameter is invalid or malformed.
    * missing-input-response	The response parameter is missing.
    * invalid-input-response	The response parameter is invalid or malformed.
    * bad-request	The request is invalid or malformed.
    * timeout-or-duplicate	The response is no longer valid: either is too old or has been used  previously.
    */
    
    const params = {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        url: url, 
        data: {}
    }
    axios(params).then((response)=> {
        console.log(response.data);
        if (response.data.success) {

            const content = ` name: ${name} \n email: ${email} \n message: ${message} `

            const mail = {
                from: creds.USER,
                to: creds.RECIPIENT,  // Change to email address that you want to receive messages on
                subject: 'New Message from tworeporters.com Contact Form',
                text: content
            }

            transporter.sendMail(mail, (err, data) => {
                if (err) {
                    res.json({
                        status: 'fail',
                        errors: err
                    })
                } else {
                    res.json({
                        status: 'success'
                    })
                }
            })
        } else {
            res.json({
                status: 'fail',
                errors: response.data['error-codes']
            })
        }
    })

}

module.exports = {
    sendEmail
}