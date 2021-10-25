import React, { useState, useEffect } from 'react'
import { Mongoose } from 'mongoose'
import {Row, Container, Col, Card, Button} from 'react-bootstrap'
import { axios } from 'axios'
import Topnav from './Topnav'

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

  // search term states
      //make single state object
  const [searchTerm, setSearch] = useState('')
  const [suburbTerm, setSuburb] = useState('')
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
      //make single change function
  const onSearchChange =(e)=> setSearch(e.target.value) 
  const onSuburbChange =(e)=> setSuburb(e.target.value) 
  const onFromDateChange =(e)=> setFromDate(e.target.value) 
  const onToDateChange =(e)=> setToDate(e.target.value) 

  // CARD LAYOUT *** change to bootstrap
  const TaskCard =(props)=> {
    let dateTime = new Date(props.date); 
    let dateReadable = dateTime.getFullYear()+'-' + (dateTime.getMonth()+1) + '-'+dateTime.getDate();
    return <div className='column'>
      <p>{props.title}</p>
      <p>{props.description}</p>
      <p>{props.suburb}</p>
      <p>{dateReadable}</p>
    </div>
  }

  //FILTER & MAP TASKS
  const TaskList =(props)=> { 

    //filter for title
    const filteredTasks = DBTasks.filter((task)=>{
      let filtered = task.title.toLowerCase().includes(props.search.toLowerCase())
      return filtered
    })
    //filter for suburb
    const intersection = filteredTasks.filter((task) => {
      let filtered = task.suburb.toLowerCase().includes(props.suburb.toLowerCase())
      return filtered
    })
    //filter for date

    let resultFilter = intersection.filter((task) => {
      let date = new Date(task.date);
      let from = new Date(fromDate)
      let to = new Date(toDate)
      if (date >= from && date <= to)
       return task 
    });

    return ( 
      <div className='row'>
        {resultFilter.map((task) => 
          <TaskCard 
            // key = {task.key}
            title = {task.title}
            description = {task.description}
            suburb = {task.suburb}
            date = { task.date}
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
          onChange = {onFromDateChange}
          type="date"
          placeholder = "search date"
          value = {fromDate}
        />
        <input         //SEARCH FIELD
          onChange = {onToDateChange}
          type="date"
          placeholder = "search date"
          value = {toDate}
        />

        <TaskList search={searchTerm} suburb={suburbTerm} from={fromDate} to={toDate} />

    </div>
  )
}
export default Findtask

