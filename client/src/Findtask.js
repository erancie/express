import React, { useState, useEffect, useCallback, nextPath } from 'react'
import { useHistory, generatePath } from 'react-router-dom'
import { Link } from 'react-router-dom'
import {Row, Container, Col, Card, Button} from 'react-bootstrap'
// import { axios } from 'axios'
import Topnav from './Topnav'

const Findtask = () => {
  const history = useHistory(); 
  const [findState, setFindState] = useState({
    searchTerm: '',
    suburbTerm: '',
    fromDate: '2021-10-01',
    toDate: '2021-10-30'
  })
  // const [id, setId] = useState();

  const handleChange = (event)=>{
    const {name, value } = event.target
    setFindState((preValue)=>{  
      return {
        ...preValue,
        [name]: value
      }
    })
  }
  //Date() to string
  const dateString = (date) => {
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
    let dateTime = new Date(props.date); //from ISO
    let dateReadable = dateString(dateTime) //to string

    return <div onClick={()=>handleClickTask(props.id)} className='column'>
      <p>{props.title}</p>
      <p>{props.description}</p>
      <p>{props.suburb}</p>
      <p>{dateReadable}</p>
      <button onClick={(e) => {props.delete(e, props.id)}}>X</button>
    </div>
  }
  /////////////////////////////////////////////////////////////
  //FILTER & MAP TASKS/////////////////////////////////////////
  const TaskList =(props)=> { 
    const [DBTasks, setDBTasks] = useState([])     // create state for tasks
    useEffect(() => getTasks(), [])    // load tasks
    let getTasks =()=>{     // get list of tasks from db
      fetch('http://localhost:8080/tasks')
      .then(response=> response.json() )
      .then((data) => {
        setDBTasks(data)
      })
    }
    //filter for title
    const filteredTasks = DBTasks.filter((task)=>{
      let filtered = task.title.toLowerCase().includes(props.search.toLowerCase())
      return filtered
    })
    //filter for suburb
    const intersection = filteredTasks.filter((task) => {
      // console.log(task)
      let filtered = task.suburb?.toLowerCase().includes(props.suburb.toLowerCase()) //? nullchecker
      return filtered
    })
    //filter for date
    let resultFilter = intersection.filter((task) => {
      let date = new Date(task.date);//ISO
      let from = new Date(findState.fromDate)
      let to = new Date(findState.toDate)
      if (date >= from && date <= to)
       return task 
    });
    const handleRemove = function(e, id) {
      e.stopPropagation()
      let newArray = DBTasks.filter(item => item._id !== id)
      setDBTasks(newArray);
    }
    return ( ///////////////////////////////////////////////
      <div className='row'>
        {resultFilter.map((task, index) => 
          <TaskCard 
            key = {task._id}
            id = {task._id}
            title = {task.title}
            description = {task.description}
            suburb = {task.suburb}
            date = {task.date}
            delete = {handleRemove}
          />
        )}
      </div>
    )
  }

  return (
    <div>
        <Topnav />
        <br/><br/><br/><br/>
        <input         //SEARCH FIELD
          onChange = {handleChange}
          name= {'searchTerm'}    //need name same as state to handle complex state
          type="text"
          placeholder = "search title"
          value = {findState.searchTerm}
        />
        <input         //SEARCH FIELD
          onChange = {handleChange}
          name = {'suburbTerm'}
          type="text"
          placeholder = "search suburb"
          value = {findState.suburbTerm}
        />
        <input         //SEARCH FIELD
          onChange = {handleChange}
          name={'fromDate'}
          type="date"
          value = {findState.fromDate}
        />
        <input         //SEARCH FIELD
          onChange = {handleChange}
          name={'toDate'}
          type="date"
          value = {findState.toDate}
        />
        <TaskList search={findState.searchTerm} 
                  suburb={findState.suburbTerm} 
                  from={findState.fromDate} 
                  to={findState.toDate}                  
        />
    </div>
  )
}
export default Findtask
