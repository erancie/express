import React, { useState } from 'react'
import { Mongoose } from 'mongoose'
import Task from '../../models/Task'
import {Row, Container, Col, Card, Button} from 'react-bootstrap'

const Findtask = () => {

  const DBTasks = [] // how to get list of tasks from db???

  const [searchTerm, setSearchTerm] = useState('')

  const onSearchChange =(e)=> setSearchTerm(e.target.value) 

  //CHANGE TO BS CARD
  const TaskCard =(props)=> {
      return <div className='column'>
        <p>{props.title}</p>
        <p>{props.description}</p>
        <p>{props.type}</p>
        <p>{props.suburb}</p>
        <p>{props.date}</p>
        <p>{props.budgettype}</p>
        <p>{props.budgetamount}</p>
      </div>
  }

  //CHANGE TO BS CARD
  const TaskList =(props)=> {
    const filteredTasks = DBTasks.filter((task)=>{
      return task.name.toLowerCase().includes(props.search.toLowerCase())
    })
    return (                //MAP 
      <div className='row'>
        {filteredTasks.map((task) => 
          <TaskCard 
            // key = {task.key}
            title = {task.title}
            description = {task.description}
            type = {task.type}
            suburb = {task.suburb}
            date = {task.date}
            budgettype = {task.budgettype}
            budgetamount = {task.budgetamount}
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
          placeholder = "search tasks"
          value = {searchTerm}
        />
        <TaskList search={searchTerm}/>
    </div>
  )
}
export default Findtask



