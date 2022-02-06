import React from 'react'

import Form from 'react-bootstrap/Form'


export default function RegisterForm() {
    const options = [...Array(81).keys()];



    return(
        
          <Form className="px-3 d-flex flex-column justify-content-around container align-self-center" id="form" 
          action="/confirmation">
                <h3 className="text-center">Register</h3>
                <Form.Control type="text" name="firstName" required className="form-field mx-3" placeholder="First Name*" />
                <Form.Control type="text" name="lastName"required className="form-field mx-3" placeholder="Last Name*" />
                <Form.Control type="tel" name="phoneNumber" className="form-field mx-3" placeholder="Phone Number"/>
                <Form.Control type="email" name="email" required className="form-field mx-3 " placeholder="Email*" />
                <Form.Select type="select" name="age" defautvalue="Age" id="age-select" className="form-field mx-3">
                    {options.map(age => {
                        return(
                            <option key={age}>{age+18}</option>
                        )
                    })}
                </Form.Select>
                <Form.Control type="text" name="country" className="form-field mx-3" placeholder="Country" />
                <Form.Check >
                    <Form.Check.Input className="mx-3" required />
                    <Form.Check.Label >I certify that I am at least 18 years or older</Form.Check.Label>
                </Form.Check>
                <input type="submit" className="submit" value="Submit"></input>
          </Form>
        
    )
}