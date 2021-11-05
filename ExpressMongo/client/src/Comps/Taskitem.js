import React, { useState, useEffect} from 'react'
import { useParams , useHistory } from "react-router-dom";
import {Row, Container, Col, Card, Button} from 'react-bootstrap'
import Edittask from './Edittask';
import Topnav from '../Topnav';
import FadeIn from 'react-fade-in';
import pic from '../Assets/pic-place.png'
import '../css/main.css'

// import { ReactCSSTransitionGroup } from 'react-transition-group'; // ES6
// import { CSSTransition } from 'react-transition-group';


const Taskitem =()=> {
  const history = useHistory()
  const { id } = useParams()
  const [task, setTask] = useState([]) 
  const [toEdit, setToEdit] = useState(false)

  useEffect(() => {getTask()}, [] )

  let getTask =()=>{   // get task from db
    fetch(`/tasks/${id}`)
    .then(response=> response.json())
    .then((data) => {
      console.log(data[0])
      setTask(data[0])
    })
  }

  let date = new Date(task.date); //from ISO
  let dateReadable = date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate();

  const handleBack=()=> {
    history.push('/findtask')
  }
  const handleEdit=()=> {
    setToEdit(prev=> !prev)
  }
  return <div >
          <Topnav />

          <FadeIn>
            {/* <Container fluid> */}
              <Card className='text' style={{fontSize: '1.6rem', border: 'none'}}>
                <Card.Title style={{marginTop: '100px', fontSize: '3rem'}}>{task.title}</Card.Title>
                <Card.Body style={{maxWidth: '1800px', margin: 'auto'}}>
                  <Row className='mb-4 p-4 align-items-center'>
                    <Col xs={12} md={1} />
                    <Col xs={12} md={5}>
                        <Card.Img src={pic} style={{width: '80%', boxShadow: '3px 4px 18px rgba(0, 0, 0, 0.18)'}} className='mb-3'/>
                    </Col>
                    <Col xs={12} md={5} className='py-4'>
                        <Card.Text><span>Description: </span>{task.description}</Card.Text>
                        <Card.Text><span>Location: </span>{task.suburb}</Card.Text>
                        <Card.Text><span>Date: </span>{dateReadable}</Card.Text>
                        <Card.Text><span>Type: </span>{task.type}</Card.Text>
                        <Card.Text><span>Budget: </span> ${task.budgetamount} {task.budgettype}</Card.Text>
                    </Col>
                    <Col xs={12} md={1} />
                  </Row>
                  <Button className='p-3 m-3' onClick={handleBack} variant='outline-warning' >BACK</Button>
                  <Button className='p-3 m-3' onClick={handleEdit} variant='outline-info' >EDIT</Button>
                </Card.Body>
              </Card>
            {/* </Container> */}
          </FadeIn>
          
          {toEdit === true ? <Edittask task={task} /> :  null}
        </div>
}
export default Taskitem

