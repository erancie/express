import React, { useState, useEffect } from 'react'
import { Mongoose } from 'mongoose'
import {Row, Container, Col, Card, Button} from 'react-bootstrap'
import { axios } from 'axios'

const Findtask = () => {

  // create state for tasks
  const [DBTasks, setDBTasks] = useState([]) 

  // load tasks
  useEffect(() => getTasks())

  // get list of tasks from db
  let getTasks =()=>{ 
    fetch('http://localhost:8080/findtask')
    .then(response=> response.json() )
    .then(data => {
      setDBTasks(data)
    })
  }

  //make single state object
  const [searchTerm, setSearchTerm] = useState('')
  const [suburbTerm, setSuburbTerm] = useState('')
  const [dateTerm, setDateTerm] = useState('')
  //make single change function
  const onSearchChange =(e)=> setSearchTerm(e.target.value) 
  const onSuburbChange =(e)=> setSuburbTerm(e.target.value) 
  const onDateChange =(e)=> setDateTerm(e.target.value) 

  // CARD LAYOUT *** change to bootstrap
  const TaskCard =(props)=> {
      return <div className='column'>
        <p>{props.title}</p>
        <p>{props.description}</p>
        <p>{props.suburb}</p>
        <p>{props.date}</p>
      </div>
  }

  //FILTER & MAP TASKS
  const TaskList =(props)=> { 
    const filteredTasks = DBTasks.filter((task)=>{
      let filtered = task.title.toLowerCase().includes(props.search.toLowerCase())
      //filter for suburb
      //filter for date
      return filtered
    })
    return ( 
      <div className='row'>
        {filteredTasks.map((task) => 
          <TaskCard 
            // key = {task.key}
            title = {task.title}
            description = {task.description}
            suburb = {task.suburb}
            date = {task.date}
          />
        )}
      </div>
    )
  }
  return (
    <div>
        <input         //SEARCH FIELD
          onChange = {onSearchChange}
          type="text"
          placeholder = "search title"
          value = {searchTerm}
        />
        <input         //SEARCH FIELD
          onChange = {onSuburbChange}
          type="text"
          placeholder = "search suburb"
          value = {suburbTerm}
        />
        <input         //SEARCH FIELD
          onChange = {onDateChange}
          type="text"
          placeholder = "search date"
          value = {dateTerm}
        />

        <TaskList search={searchTerm} suburb={suburbTerm} date={dateTerm}/>

    </div>
  )
}
export default Findtask



