import React, { useState, useEffect} from 'react'
import { useParams , useHistory } from "react-router-dom";
import Edittask from './Edittask';

const Taskitem =()=> {
  const history = useHistory()
  const { id } = useParams()
  const [task, setTask] = useState([]) 
  const [toEdit, setToEdit] = useState(false)

  useEffect(() => {getTask()}, [] )

  let getTask =()=>{   // get task from db
    console.log('get task')
    fetch(`http://localhost:8080/tasks/${id}`)
    .then(response=> response.json())
    .then((data) => {
      console.log(data)
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
          <p>{task.title}</p>
          <p>{task.description}</p>
          <p>{task.suburb}</p>
          <p>{dateReadable}</p>
          <p>{task.type}</p>
          <p>{task.budgettype}</p>
          <p>{task.budgetamount}</p>
          <p>Task Item Id: {id}</p>
          <p>Obj _id: {task._id}</p>

          <br/><br/>
          <button onClick={handleBack} >BACK</button>

          <br/><br/>
          <button onClick={handleEdit} >EDIT</button>
          {toEdit === true ? <Edittask task={task} /> :  null}

        </div>
}
export default Taskitem

