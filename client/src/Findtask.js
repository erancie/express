import React, { useState, useEffect } from 'react'
import { useHistory, generatePath } from 'react-router-dom'
import {Row, Container, Col, Card, Button} from 'react-bootstrap'
import Topnav from './Topnav'
import FadeIn from 'react-fade-in/lib/FadeIn'
import pic from './Assets/pic-place.png'

const Findtask = () => {
  const history = useHistory(); 
  const [findState, setFindState] = useState({
    searchTerm: '',
    suburbTerm: '',
    fromDate: '2021-10-01',
    toDate: '2021-11-30'
  })
  const handleChange = (event)=>{
    const {name, value } = event.target
    setFindState((preValue)=>{  
      return {
        ...preValue,
        [name]: value
      }
    })
  }
  const dateString = (date) => {   //Date() to string
    let dateReadable = date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate();
    return dateReadable
  }
  /////////////////////////////////////
  // TASK CARD ////////////////////////
  const TaskCard =(props)=> {
    const handleClickTask = (id) => { 
      console.log(`from clicked task - ${id}`)
      const path = generatePath("/findtask/:id", { id })
      history.push(path);
    }
    const dateTime = new Date(props.date); // ISO to Date
    const dateReadable = dateString(dateTime) // Date to String
    const cardStyle = {
      width: '18rem',
    }
    const buttonStyle = {
      width: '50px',
      position: 'absolute',
      bottom: '10px',
      right: '10px'
    }
    return (
      <Col key={props.key} onClick={()=>handleClickTask(props.id)} className='column' xs='12' md='6' lg='4' xl='3'>
        <Card className='m-5 item-hover' style={cardStyle}>
          <Card.Body  style={{position: 'relative'}}>
            <Card.Title style={{fontSize: '1.8rem'}}>{props.title}</Card.Title>
            <Card.Img src={pic} />
            <Card.Text>{props.description}</Card.Text>
            <Card.Text>Location: {props.suburb}</Card.Text>
            <Card.Text className='mb-5'>Date: {dateReadable}</Card.Text>
            <Button variant="outline-warning" style ={buttonStyle}
                    onClick={(e) => {props.delete(e, props.id)}}>X</Button>
                    {/* remove using parent function ^^ to alter parent state (DBTasks) */}
          </Card.Body>
        </Card>

      </Col>
    )
  }
  //////////////////////////////////////////
  //FILTER & MAP TASKS//////////////////////
  const TaskList =(props)=> { 
    const [DBTasks, setDBTasks] = useState([])   // create state for tasks
    useEffect(() => getTasks(), [])    // load tasks
    let getTasks =()=>{     // get list of tasks from db
      fetch('/tasks')
      .then(response=> response.json() )
      .then((data) => {
        setDBTasks(data)
      })
    }
    //filter for title
    const filteredTasks = DBTasks.filter((task)=>{
      let filtered = task.title?.toLowerCase().includes(props.search.toLowerCase())
      return filtered
    })
    //filter for suburb
    const intersection = filteredTasks.filter((task) => {
      let filtered = task.suburb?.toLowerCase().includes(props.suburb.toLowerCase()) //? nullchecker
      return filtered
    })
    //filter for date
    let resultFilter = intersection.filter((task) => {
      let date = new Date(task.date);//ISO to Date
      let from = new Date(findState.fromDate)//String to Date
      let to = new Date(findState.toDate)
      if (date >= from && date <= to)
       return task 
    });
    const handleRemove = function(e, id) { 
      e.stopPropagation()
      let newArray = DBTasks.filter(item => item._id !== id)
      setDBTasks(newArray);
    }
    return ( 
      <Container fluid>
        <Row style={{justifyContent: 'center'}}>
          {resultFilter.map((task, index) =>
          <div> 
            <TaskCard 
              key = {task._id}
              id = {task._id}
              title = {task.title}
              description = {task.description}
              suburb = {task.suburb}
              date = {task.date}
              delete = {handleRemove} //pass function so child can delete from parent state
            />
          </div>
          )}
        </Row>
      </Container>
    )
  }

  return (
    <div className='find-task'>
        <Topnav />
        <div className='tasks-hero'>
          <h1>Find a task</h1>
        </div>
        {/* <br/><br/><br/><br/> */}
        <Row>
          <Col xs={12} md={2} />
          <Col xs={12} md={4} >
            <input           
              onChange = {handleChange}
              name= {'searchTerm'}    //need name same as state property to handle complex state
              type="text"
              placeholder = "search title"
              value = {findState.searchTerm}
            />
            <input          
              onChange = {handleChange}
              name = {'suburbTerm'}
              type="text"
              placeholder = "search suburb"
              value = {findState.suburbTerm}
            />
          </Col>
          <Col xs={12} md={4} >
            <input          
              onChange = {handleChange}
              name={'fromDate'}
              type="date"
              value = {findState.fromDate}
            />
            <input          
              onChange = {handleChange}
              name={'toDate'}
              type="date"
              value = {findState.toDate}
            />
          </Col>
          <Col xs={12} md={2} />
        </Row>
        <FadeIn>
          <TaskList search={findState.searchTerm} 
                    suburb={findState.suburbTerm} 
                    from={findState.fromDate} 
                    to={findState.toDate}                  
          />
        </FadeIn>
    </div>
  )
}
export default Findtask

