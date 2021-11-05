import React, { useState, useEffect} from 'react'
import FadeIn from 'react-fade-in';
import { generatePath, useHistory } from 'react-router'
import {Row, Container, Col, Card, Button} from 'react-bootstrap'

const Edittask = (props) => {
  const history = useHistory(); 

  const [newVals, setNewVals] = useState({
    title: props.task.title,
    description: props.task.description,
    type: props.task.type,
    suburb: props.task.suburb,
    image: null,
    date: props.task.date,
    budgettype: props.task.budgettype,
    budgetamount: props.task.budgetamount
  })
  const handleChange = (event)=>{
    const {name, value} = event.target
    setNewVals ((preValue)=>{  
      return {
        ...preValue,
        [name]: value
      }
    })
    console.log(`name: ${name} value: ${value}`)
  }
  const handleClick =()=>{
    fetch(`/tasks/${props.task._id}`, {
      method: "PATCH",  
      headers: {    "Content-type": "application/json"  },  
      body: JSON.stringify(newVals)}) 
    .then(response => {    console.log(response.status);     
      return response.json();  })  
    .then(data => console.log(data)) //no log on success - 200
    .catch(err => {
        console.log("Error:" + err) //why saying error, patch works
    })
    history.push(generatePath(`/findtask`));
  }
  return (
    <div id='editTask' className='find-task'>
      <hr/>
      <FadeIn>
        <h3 className='mt-3'>Make changes to {props.task.title}</h3>
        <Row>
          <Col sm={9} md={7}>
            <div className='d-flex justify-content-end mt-3'>
              <label for='title'>Title: </label>
              <input  
                id='title'       
                onChange = {handleChange}
                name = {'title'}
                type="text"
                value = {newVals.title}
              />
            </div>
            <div className='d-flex justify-content-end'>
              <label htmlFor='description'>Description: </label>
              <input  
                id='description'       
                onChange = {handleChange}
                name = {'description'}
                type="text"
                value = {newVals.description}
              />
            </div>
            <div className='d-flex justify-content-end'>
              <label htmlFor='budgetamount'>Budget: </label>
              <input  
                id='budgetamount'       
                onChange = {handleChange}
                name = {'budgetamount'}
                type="number"
                value = {newVals.budgetamount}
              />
            </div>
          </Col>
          <Col sm={12} md={3}>
            <Button className='p-3 m-5' variant='outline-success' onClick={handleClick} >CHANGE</Button>
          </Col>
        </Row>
      </FadeIn>
    </div>
  )
}
export default Edittask