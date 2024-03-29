import axios from 'axios'
import React , {useState} from 'react'
import { Redirect } from 'react-router'
import './css/main.css'

 const Register = () => {

  //STATE
  const [register, setRegister] =  useState({
    firstname: "",
    lastname: "",
    email: "",
    country: "Australia",
    password: "",
    password2: "",
    address: "",
    address2: "",
    city: "",
    state: "VIC",
    phoneNumber: "",
    zip: "",
    terms: false
  })
  console.log(register)
  //redirect
  const [redirect, setRedirect] = useState(false)
  //HANDLE INPUT CHANGE
  const handleChange = (event)=>{
    const {name, value} = event.target
    setRegister ((preValue)=>{  
      return {
        ...preValue,
        [name]: value
      }
    })
    console.log(`register: ${register}`)
    console.log(`name: ${name} value: ${value}`)
  }
  //HANDLE POST CLICK
  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('/users', register)
    //spa client code navigating to another client view using 'to=' instead of 'href' will be caught by the react router instead of requesting the server API directly
    //spa client code requesting internal API resources (JSON) via http will be handled by server side API routes

    //Spa client code will use
    //an absolute path for requesting External API resources ie.  - 'http://' 
    //a root relative path from the domain root in the browser for requesting internal API resources. 
        //(even though it sits in client/build on the server environment)
        //
        //all client side code will use the web root for relative http request paths 

        //SEE: https://www.youtube.com/watch?v=fZjKc2kMKYU 
    .then(res => {
      if (res.data.success) {setRedirect(true)}
    },
    (err)=>{console.log(err)})
  }
  if (redirect) {
    return <Redirect to='/login'/>;

  }
  return (
    <div className="left">
      <div className="container d-flex justify-content-end mt-5">
        <a href="/login" className="btn btn-primary">LOGIN</a>
      </div>

      <div className="container header">
        <h1>Customer Registration</h1> 
      </div>

      <div className="container">

        <form> 
          <div className="form-group">
            <label htmlFor="country">Country</label>
            <select name='country' onChange={handleChange} value={register.country} id='country' class="form-control form-select form-select-lg mb-3" aria-label=".form-select-lg Country" required>
              {/* <option selected>Country</option> */}
              <option value="Australia">Australia</option>
              <option value="USA">USA</option>
              <option value="Saudi Arabia">Suadi Arabia</option>
              <option value="China">China</option>
              <option value="England">England</option>
            </select>
          </div>

          <div className="form-row">

            <div className="form-group col-md-6">
              <label htmlFor="firstname">First Name</label>
              <input type="text" id='firstName' value={register.firstname} name='firstname' onChange={handleChange} class="form-control" aria-label="First name" minLength="3" required></input>
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="lastname">Last Name</label>
              <input type="text" id='lastname' value={register.lastname} name='lastname' onChange={handleChange} class="form-control" aria-label="Last name" required></input>
            </div>

            <div className="form-group col-md-7">
              <label htmlFor="inputEmail4">Email</label>
              <input type="email" value={register.email} name='email' onChange={handleChange} class="form-control" id="inputEmail4" required></input>
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputPassword">Password</label>
              <input  value={register.password} name='password' type="password" onChange={handleChange} class="form-control" id="inputPassword" minLength="8" required></input>
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputPassword2">Retype Password</label>
              <input   value={register.password2} name='password2' type="password" onChange={handleChange} class="form-control" id="inputPassword2" minLength="8" required></input>
            </div>

          </div>

          <div className="form-group">
            <label htmlFor="inputAddress">Address</label>
            <input type="text" value={register.address} name="address" onChange={handleChange} class="form-control" id="inputAddress" required></input>
          </div>
          <div className="form-group">
            {/* <!-- <label for="inputAddress2"></label> --> */}
            <input type="text" name='address2'  value={register.address2} onChange={handleChange} class="form-control" id="inputAddress2"></input>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="inputCity">City</label>
              <input name='city'  value={register.city} type="text" onChange={handleChange} class="form-control" id="inputCity" required></input>
            </div>

            <div className="form-group col-4 col-lg-4">
              <label htmlFor="inputState">State</label>
              <select name='state'  value={register.state} onChange={handleChange} id="inputState" class="form-control" required>
                {/* <option selected>Select..</option> */}
                <option value='VIC'>VIC</option>
                <option value='NSW'>NSW</option>
                <option value='QLD'>QLD</option>
                <option value='WA'>WA</option>
                <option value='SA'>SA</option>
                <option value='TAS'>TAS</option>
                <option value='ACT'>ACT</option>
                <option value='NT'>NT</option>
              </select>
            </div>

            <div className="form-group col-4 col-md-2">
              <label htmlFor="inputZip">Zip</label>
              <input type="text" value={register.zip} name="zip" onChange={handleChange} class="form-control" id="inputZip"></input>
            </div>
            <div className="form-group col-5 col-md-6">
              <label htmlFor="phoneNumber">Contact Number</label>
              <input type="text" value={register.phoneNumber} name="phoneNumber" onChange={handleChange} class="form-control" id="phoneNumber"></input>
            </div>
          </div>
          <div className="form-group">
            <div className="form-check">
              <input name='terms' onChange={handleChange} className="form-check-input" type="checkbox" id="terms"></input>
              <label className="form-check-label" htmlFor="terms">
                I agree to the <a href="#">Terms & Conditions</a>
              </label>
            </div>
          </div>
          <button onClick={(e)=>handleSubmit(e)} className="btn btn-primary mb-5">Sign in</button>
        </form>
        
      </div>
    </div>
  )
}
export default Register
