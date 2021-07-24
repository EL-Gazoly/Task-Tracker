import { useState } from "react"

const AddTask = ({onAdd}) => {
 const [text,setText]= useState('')
 const [day,SetDay]= useState('')
 const [reminder,SetReminder]= useState(false)


const onSubmit=(e) =>{
    e.preventDefault()
    if(!text){
        alert('Please add a task')
        return
    }
    onAdd ({text, day ,reminder})
    setText('')
    SetDay('')
    SetReminder(false)



    
}
    return (
        <form className='add-form' onSubmit={onSubmit}>

            <div className='form-control'>
                <label>Task</label>
                <input type='text' placeholder='Add Task' value={text} onChange={(e)=>
                setText(e.target.value)}
                 />
            </div>
            
            <div className='form-control'>
                <label>Day & Time</label>
                <input type='text' placeholder='Add Day & Time'value={day} onChange={(e)=>
                SetDay(e.target.value)} />
            </div>
            
            <div className='form-control form-control-check'>
                <label>Set Reminder</label>
                <input type='checkbox' checked={reminder} value={reminder} onChange={(e)=>
                SetReminder(e.currentTarget.checked)}/>
            </div>

            <input type='submit' value='Save Task' className='btn btn-block'/>
        </form>
    )
}

export default AddTask
