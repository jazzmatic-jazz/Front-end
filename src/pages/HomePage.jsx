import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import RegisterUser from './RegisterUser'

const HomePage = () => {
  
  let {user, logOutUser} = useContext(AuthContext)
  console.log(user, "user")
  return (
    <div className='home-page'>
       
        {user ? (<p onClick={logOutUser}> Logout</p>)
        :(<Link to="/login">Login</Link>? <Link to="/register">Register</Link> :(<HomePage/>)
        )}
        
        
        {user && <p>Hello{user.name}</p>}
       
    </div>
  )
}

export default HomePage