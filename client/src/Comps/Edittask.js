import React, { useState, useEffect} from 'react'
import FadeIn from 'react-fade-in';
import { generatePath, useHistory } from 'react-router'


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

    fetch(`http://localhost:8080/tasks/${props.task._id}`, {
      method: "PATCH",  
      headers: {    "Content-type": "application/json"  },  
      body: JSON.stringify(newVals)}) 
    .then(response => {    console.log(response.status);     
      return response.json();  })  
    .then(data => console.log(data)) //no log on success - 200
    .catch(err => {
        console.log("Error:" + err) //why saying error, patch works
    })
    // history.push(generatePath(`/findtask/${props.task._id}`));
    //find refresh option
    history.push(generatePath(`/findtask`));
    
  }
  return (
    <div>
      <hr/>
      <FadeIn>
      <div>
        <label for='title'>Title: </label>
        <input  
          id='title'       
          onChange = {handleChange}
          name = {'title'}
          type="text"
          // placeholder = "enter new title"
          value = {newVals.title}
        />
      </div>

      <div>
        <label htmlFor='description'>Description: </label>
        <input  
          id='description'       
          onChange = {handleChange}
          name = {'description'}
          type="text"
          // placeholder = "enter new description"
          value = {newVals.description}
        />
      </div>

      <div>
        <label htmlFor='budgetamount'>budgetamount: </label>
        <input  
          id='budgetamount'       
          onChange = {handleChange}
          name = {'budgetamount'}
          type="number"
          // placeholder = "enter new description"
          value = {newVals.budgetamount}
        />
      </div>
      <button onClick={handleClick} >CHANGE</button>
      </FadeIn>

    </div>
  )
}
export default Edittask