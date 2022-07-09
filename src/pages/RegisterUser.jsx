import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'

const RegisterUser = () => {
    let {registerUser} = useContext(AuthContext)
    return (
      <div>
          <form onSubmit={registerUser}>
              <input type="email" name='email' placeholder='Enter Email' /><br />
              <input type="name" name='name' placeholder='Enter Name' /><br />
              <input type="password" name='password' placeholder='Enter Password' /><br />
              <input type="password" name='password2' placeholder='Confirm Password' /><br />
              <input type="submit"/>
          </form>
      </div>
    )
}

export default RegisterUser