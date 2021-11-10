import React, { useState } from 'react'
import { Form, Button, Container, Col, Row } from 'react-bootstrap'
import { useHistory, generatePath } from 'react-router'
import Topnav from './Topnav'
import FadeIn from 'react-fade-in/lib/FadeIn'

const Newtask = () => {
  const history = useHistory(); 
  const today = new Date()
  console.log(`today: ${today}`)

  const dateString = (date) => {   //Date() to string
    let dateReadable = date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate();
    return dateReadable
  }
  const todayString = dateString(today)
  console.log(`todayString: ${todayString}`)

  const [task, setTask] = useState({
    title: '',
    description: '',
    type: null,
    suburb: '',
    image: null,
    date: todayString, //converts back to Date if default submitted
    budgettype: null,
    budgetamount: null
  })
  const handleChange = (event)=>{
    const {name, value} = event.target
    setTask ((preValue)=>{  
      return {
        ...preValue,
        [name]: value
      }
    })
  }
  const handleOnclick = () => {
    console.log(task)
    fetch('/tasks', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body : JSON.stringify({
        title: task.title,
        description: task.description,
        type: task.type,
        suburb: task.suburb,
        image: task.image,
        date: task.date,
        budgettype: task.budgettype,
        budgetamount: task.budgetamount
      })
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => {
        console.log("Error:" + err)
    })
    history.push(generatePath('/findtask'))
  }
  const suburbInput = () => {
      return(
        <Form.Group as={Row} className="mb-3" controlId="suburb">
        <Form.Label className="my-3" column sm="2">Suburb</Form.Label>
        <Col sm='6'>
          <Form.Control type='text' 
                        name='suburb' 
                        value={task.suburb} 
                        placeholder="Enter suburb" 
                        onChange={handleChange} 
                        className="my-3"/>
        </Col>
        </Form.Group>
      ) 
  }
  const title =()=>{
    if(task.type === 'online'){
      return ' - Online'
    }else if (task.type === 'inperson') {
      return ' - In Person'
    }
  }
  const buttonStyle = {
    position: 'relative', 
    left: '25%', 
    width: '50%', 
    margin: '30px', 
    marginBottom: '60px',
    fontWeight: '500',
    fontSize: '1.5em',
    borderRadius: '25px'
  }
  const before = {
    height: '3rem',
    lineHeight: '10rem',
  }
  const dollar = {
    fontSize: '1.8em',
    paddingRight: '10px'
  }
  return (
    <div>
      <Topnav />
      <h1 style={{marginTop: '150px'}}>New Task <span style={{color: 'grey'}}>{title()}</span></h1>
      <FadeIn>
      <Container>
        <Form style={{textAlign: 'left'}}> {/* onSubmit={handleSubmit}  */}
          <h3 className="mt-5 mb-3">Select task type</h3>
          <Form.Group as={Row} className="mb-3" controlId="tasktype" required>
            <Col sm='4'><Form.Check name="type" 
                                    label="Online" 
                                    value='online' 
                                    onChange={handleChange} 
                                    className="mt-3 mb-3" 
                                    type="radio" 
                                    id="online" required /></Col>
            <Col sm='8'><Form.Check name="type" 
                                    label="In Person" 
                                    value='inperson' 
                                    onChange={handleChange} 
                                    className="mt-3 mb-3" 
                                    type="radio" 
                                    id="inperson" /></Col>
          </Form.Group>
          <h3 className="mt-5 mb-3">Describe your task</h3>
          <Form.Group as={Row} className="mb-3" controlId="title">
            <Form.Label column sm="2" className="my-3">Task title: </Form.Label>
            <Col sm='6'>
              <Form.Control onChange={handleChange} type='text' value={task.title} name='title' placeholder="Enter a task title" className="my-3"/>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="description">
            <Form.Label className="my-3" column sm="2">Description: </Form.Label>
            <Col sm='10'>
              <Form.Control onChange={handleChange} as="textarea" value={task.description} name='description' placeholder="Enter description" style={{ height: '100px' }} className="my-3"/>
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="image" className="mb-3">
            <Col sm='3'><Form.Label>Add a task image:</Form.Label></Col>
            {/* Image Upload -TO ADD */}
            <Col sm='5'><Form.Control onChange={handleChange} 
                                      name='image' type="file" 
                                      onChange={handleChange} 
                                      accept="image/png, image/jpeg"
                                      className="pb-3" style={{height: '2.8em'}}  /></Col>
          </Form.Group>
          <h3 className="mt-5 mb-3">Setting up your task </h3>

          <FadeIn>
            {task.type === 'inperson' ? suburbInput() : null }
          </FadeIn>
          {/* <Fade in={task.type==='inperson'}></Fade> */}

          <Form.Group as={Row} className="mb-3" controlId="date">
            <Form.Label className="my-3" column sm="2">Date: </Form.Label>
            <Col sm='6' >
              <Form.Control onChange={handleChange} 
                            type='date' 
                            name='date' 
                            value={task.date} className="my-3" />
            </Col>
          </Form.Group>
          <h3 className="mt-5 mb-3">Suggest your estimated budget amount</h3>
          <Form.Group as={Row} className="mb-3" controlId="budgetamount">
            <Col sm='3'><Form.Check onChange={handleChange} className="mt-3 mb-5" inline label="Total" value='total' name="budgettype" type="radio" id="total" /></Col>
            <Col sm='9'><Form.Check onChange={handleChange} className="mt-3 mb-5" inline label="Hourly Rate" value='hourly' name="budgettype" type="radio" id="hourly" /></Col>
            <Form.Label column sm="3">Budget amount: </Form.Label>
            <Col sm='4' className='d-flex' >
              <span style={dollar}>$</span>
              <Form.Control onChange={handleChange} value={task.budgetamount} type='number' style={before} name='budgetamount' placeholder="Enter amount" />
            </Col>
          </Form.Group>
          <Button variant="primary" 
                  style={buttonStyle} 
                  type="submit"
                  onClick={handleOnclick}
                  > POST TASK </Button>
        </Form>
      </Container >
      </FadeIn>
    </div>
  )
}

export default Newtask
