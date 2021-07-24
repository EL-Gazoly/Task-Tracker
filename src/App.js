import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import {useState , useEffect} from 'react'
import Task from './components/Task';
import Footer from './components/Footer';
import About from './components/About';
import {BrowserRouter as Router,Route} from 'react-router-dom';

function App() {
  const [showAddTask, setShowAddTask]=useState(false)
  const [tasks , setTasks]= useState([])
  
  useEffect(() => {
    const getTasks = async () =>{
      const taskFromServer = await fetchTasks()
      setTasks(taskFromServer)
    }
    getTasks()
  }, [])

   const fetchTasks =async () => {
    const res =await fetch('http://localhost:8080/tasks')
    const data = await res.json()
    console.log(data)
    return data

  }
  const fetchTask =async (id) => {
    const res =await fetch(`http://localhost:8080/tasks/${id}`)
    const data = await res.json()
    console.log(data)
    return data

  }
    //Add Task 
    const addTask = async (task)=>{
      const res= await fetch('http://localhost:8080/tasks',{
        method : 'POST',
        headers : {
          'Content-type': 'application/json',
        },
        body : JSON.stringify(task),

      })
      const data =await res.json();

      setTasks([...tasks,data])
  /* const id=Math.floor(Math.random()*10000)+1

   const newTask={id, ...task}
   setTasks([...tasks,newTask])*/
    } 


    //Delete Task
    const deleteTask =async (id) =>{
      await fetch(`http://localhost:8080/tasks/${id}`,{
        method: 'DELETE'

      })

     setTasks(tasks.filter((task)=>task.id !==id))
    }

    const toggleReminder=async (id) => {
      const taskToToggle = await fetchTask(id)
      const updTask={...taskToToggle, reminder:!taskToToggle.reminder}
      
      const res= await fetch(`http://localhost:8080/tasks/${id}`,{
        method : 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(updTask)

      })
         const data= await res.json()

     setTasks(
       tasks.map((task)=>
       task.id===id ? {...task,reminder: data.reminder} :task
       )
     )
    }

  return (   
    <Router>
    <div className="container">

     <Header onAdd={()=>setShowAddTask
     (!showAddTask)
     }
     showAdd={showAddTask} 
     />


   <Route path="/" exact render={(props)=>(
     <>

     {showAddTask && <AddTask onAdd={addTask}/>}

   {
   tasks.length >0 ?
   <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/> 
   : 
   'no Task to Show'
   }

     </>
   )} />
   <Route path="/about" component={About}/>
   <Footer />
    </div>
    </Router>
    //mynf34 nktb component bra el fragment aly fo2h da 
  );
}

export default App;
