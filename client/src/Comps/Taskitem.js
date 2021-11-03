import React, { useState, useEffect} from 'react'
import { useParams , useHistory } from "react-router-dom";
import Edittask from './Edittask';
import Topnav from '../Topnav';
import FadeIn from 'react-fade-in';
// import { ReactCSSTransitionGroup } from 'react-transition-group'; // ES6
// import { CSSTransition } from 'react-transition-group';


const Taskitem =()=> {
  const history = useHistory()
  const { id } = useParams()
  const [task, setTask] = useState([]) 
  const [toEdit, setToEdit] = useState(false)

  useEffect(() => {getTask()}, [] )

  let getTask =()=>{   // get task from db
    fetch(`http://localhost:8080/tasks/${id}`)
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
            <div>
              <p style={{marginTop: '100px'}}>{task.title}</p>
              <p>{task.description}</p>
              <p>{task.suburb}</p>
              <p>{dateReadable}</p>
              <p>Task Type: {task.type}</p>
              <p>Budget Type-- {task.budgettype}</p>
              <p>Budget Amount-- {task.budgetamount}</p>
              <p>Task Item Id: {id}</p>
              <p>Obj _id: {task._id}</p>
              <br/><br/>
              <button onClick={handleBack} >BACK</button>
              <br/><br/>
              <button onClick={handleEdit} >EDIT</button>
            </div>
          </FadeIn>
          
          {toEdit === true ? <Edittask task={task} /> :  null}
          
        </div>
}
export default Taskitem

