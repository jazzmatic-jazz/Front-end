import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {ReactComponent as ArrowLeft} from '../assests/arrow-left.svg'

function NotePage () {

  const history = useNavigate()

  let {id} = useParams()
  const [note, setNote] = useState('')

  useEffect(() => {
    getNote()
  
  }, [id])
  
  let getNote = async()=>{
    if (id === 'new') return 
    let response = await fetch (`/api/notes/${id}/`)
    let data = await response.json()
    setNote(data)
  }

  let createNote = async () => {
    fetch('/api/notes/create/', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(note)
    })
}

  let updateNote = async ()=>{
      fetch(`/api/notes/${id}/update/`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(note)
      })
  }

  let deleteNote = async () =>{
    fetch(`/api/notes/${id}/delete/`,{
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    history('/')
  }

  let handleSubmit = (e) =>{
    
    if (id !== 'new' && !note.body)
    {
      deleteNote()
    }
    else if(id !=='new'){
      updateNote()
    } 
    else if(id =='new' && note !== null){
      createNote()
    }
    history('/note')
  }

  return (
    <div className='note'>
      <div className="note-header">
        <h3>
        
           <ArrowLeft onClick={handleSubmit}/>
       
        </h3>
        {id !== 'new' ? (
          <button onClick={deleteNote}> Delete</button>)
        :(
          <button onClick={handleSubmit} > Done</button>
        )}
       
      </div>
      <textarea onChange={(e)=>{setNote({...note, 'body':e.target.value})}} value={note.body}>{note.body}</textarea>
    </div>
  )
}

export default NotePage