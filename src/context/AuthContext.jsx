import jwt_decode from 'jwt-decode'
import React, { createContext, useState } from 'react'
import { useHistory } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext()

export default AuthContext

export const AuthProvider = ({children})=>{

    let [authTokens, setAuthTokens] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')): null )
    const [user, setUser] = useState(()=> localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')): null
    )

    const history = useNavigate()
    
    let loginUser = async (e) => {
        e.preventDefault()
        console.log('Form submitted')
        let response =  await fetch('/api/login/',{
            method : 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'email':e.target.email.value, 'password': e.target.password.value})
        })

        let data = await response.json()

        if (response.status === 200){
            setAuthTokens(data)
            setUser(jwt_decode(data.token.access))
            localStorage.setItem('authTokens',JSON.stringify(data))
            history('/')
        }
        else{
            alert('Email or Password not correct!!')
        }

        console.log('data:', data)
        console.log('response:', response)

       
    }


    let registerUser = async (e) => {
        e.preventDefault()
        console.log('RegisterUser')
        let response =  await fetch('/api/register/',{
            method : 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'email':e.target.email.value, "name":e.target.name.value, 'password': e.target.password.value,
            'password2': e.target.password2.value, "tc": true})
        })
//user12345678
        let data = await response.json()

        if (response.status === 201){
            setAuthTokens(data)
            setUser(jwt_decode(data.token.access))
            localStorage.setItem('authTokens',JSON.stringify(data))
            history('/login')
        }
        else{
            alert('Email or Password not correct!!')
        }

        console.log('data:', data)
        console.log('response:', response)

       
    }

    let logOutUser = () =>{
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        history('/login')

    }
    
    let contextData = {
        user: user,
        loginUser: loginUser,
        logOutUser: logOutUser,
        registerUser: registerUser,
    }
    
    return(
        <AuthContext.Provider value={contextData}>
            {children}

        </AuthContext.Provider>
    )
}