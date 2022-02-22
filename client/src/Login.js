import React, { useState, pushState } from 'react'
import {useHistory, generatePath } from 'react-router-dom'
import { Redirect } from 'react-router'
import axios from 'axios'


const Login = () => {
  const history = useHistory()
  //STATE
  const [login, setLogin] =  useState({
    email: '',
    password: ''
  })
  const [redirect, setRedirect] = useState(false)

  //HANDLE INPUT CHANGE (from all inputs)
  const handleChange = (event)=>{
    const {name, value} = event.target //get input name and value from event
    setLogin ((preValue)=>{  //pass in prev vals
      return {
        ...preValue, //include previous values
        //declare dynamic property according to input name
        [name]: value,      //dynamic property - declared inside obj lit
        // ['name']: value, //static property in object lits use the string 'name'
        // name: value      //static property in object lits use the string 'name'

        //NOTE: Use brackets inside object literals to adign property names dynamically
      }
    })
    console.log(`register: ${login}`)
    console.log(`name: ${name} value: ${value}`)
  }
  //HANDLE POST/GET CLICK
  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('/login', login)
    .then(response => {  
      if (response.data.success) { setRedirect(true) }
    }, 
    (error) => {
      console.log(error);
    })
  }
  if (redirect) {
    return <Redirect to='/'/>;
  }
  return (
    <div>
      <div class="row d-flex justify-content-center">
        <div class="card col-md-4 m-4 align-center">
          <article class="card-body">
          <a href="/register" class="float-right btn btn-outline-primary">Sign up</a>
          <h4 class="card-title mb-4 mt-1">Sign in</h4>          
            <form >
              <div class="form-group">
                <label>Your email</label>
                <input onChange={handleChange} value={login.email} name="email" class="form-control" placeholder="Email" type="email" />
              </div> 

              <div class="form-group">
                <a class="float-right" href="#">Forgot?</a>
                <label>Your password</label>
                <input onChange={handleChange} value={login.password} name='password' class="form-control" placeholder="******" type="password" />
              </div> 

              <div class="form-group"> 
                <div class="checkbox">
                  <label> Save password </label> 
                  <input type="checkbox" />
                </div> 
              </div>  

              <div class="form-group">
                  <button onClick={(e)=>handleSubmit(e)} class="btn btn-primary btn-block"> Login  </button>
              </div>                                                           
            </form>

          </article>
        </div>
      </div>
    </div>
  )
}
export default Login

      // console.log(response.status);
      // console.log(response.statusText);
      // console.log(response.headers);
      // console.log(response.config);

    // fetch('http://localhost:8080/login', {
    //   method: 'post',
    //   headers: {'Content-Type': 'application/json'},
    //   body : JSON.stringify(login)
    // })
    // .then(response => response)
    // .then(data => { console.log(data) })
    // .catch(err => { console.log("Error:" + err) })