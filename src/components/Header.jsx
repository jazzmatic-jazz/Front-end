import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const Header = () => {
  let {user, logOutUser} = useContext(AuthContext)
  return (
    <div className='app-header'>
       
        
        <Link to="/"> <h1>Note List</h1></Link>
        {user ? (<p onClick={logOutUser}> Logout</p>):(
          <Link to="/login">Login</Link>
        )}
        
        
        {user && <p>Hello{user.username}</p>}
       
    </div>
  )
}

export default Header