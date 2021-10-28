import React, { useState, useEffect} from 'react'

const Edittask = (props) => {

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
    console.log(newVals)
  }
  // const patchTask = () => {  }
  const handleClick =()=>{
    // patchTask()
    fetch(`http://localhost:8080/tasks/${props.task._id}`, {
        _method: 'PATCH',
        crossDomain: true,
        xhrFields: {
            withCredentials: true
        },
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': ''
        },
        data: JSON.stringify(newVals)
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => {
        console.log("Error:" + err)
    })
  }
  return (
    <div>
      <hr/>
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
        <label for='description'>Description: </label>
        <input  
          id='description'       
          onChange = {handleChange}
          name = {'description'}
          type="text"
          // placeholder = "enter new description"
          value = {newVals.description}
        />
      </div>
      <button onClick={handleClick} >CHANGE</button>

    </div>
  )
}
export default Edittask