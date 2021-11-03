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

  //HANDLE INPUT CHANGE
  const handleChange = (event)=>{
    const {name, value} = event.target
    setLogin ((preValue)=>{  
      return {
        ...preValue,
        [name]: value
      }
    })
    console.log(`register: ${login}`)
    console.log(`name: ${name} value: ${value}`)
  }
  //HANDLE POST/GET CLICK
  const handleSubmit = (e) => {
    console.log('handleSubmit')
    console.log(`register: ${login}`)
    console.log(login)
    e.preventDefault()
    axios.post('http://localhost:8080/login', login)
    .then(response => {  
      // how to get res.json({  success:true, redirectUrl: '/'}) ??????
      if (response.data.success) { setRedirect(true) }
      console.log('RESPONSE: '+ response); //why these not working???
      // console.log(response.data);
      // console.log(response.data.redirectUrl);
    }, 
    (error) => {
      console.log(error);
    })
    // history.push('/')
  }
  if (redirect) {
    return <Redirect to='/'/>;
  }
  return (
    <div>
      <br/><br/>
      <br/><br/>
      <br/><br/>
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