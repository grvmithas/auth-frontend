import React,{useState} from 'react'
import {ERORR_MESSAGES} from '../../constants'
import authApi from '../../api/auth'
import './auth.css'
import { Link } from 'react-router-dom'

function Signin() {

  const [form,setForm]=useState({
    email:'',
    password:''
  })
  const [error,setError]=useState({
    email:'',
    password:''
  })
  const [apiRes,setApiRes]=useState({
    error:'',
    loading:false
  })

  const handleChange=(e)=>{
    setForm({
      ...form,
      [e.target.name]:e.target.value
    })
  }

  const validateForm=()=>{
    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    let isValid=true
    let errorNew={}
    if(!form.email.match(regex)){
      errorNew['email']= ERORR_MESSAGES.emailFormat
      isValid=false
    }
    if(form.password.length<=8){
      errorNew['password']=ERORR_MESSAGES.passwordFormat
      isValid=false
    }
    setError(errorNew)
    return isValid
  }

  const doSignIn= async()=>{
    setApiRes({
      ...apiRes,
      error:'',
      loading: true
    })
    const {data,error}=await authApi.signinApi(form.email,form.password)
    if(error){
      setApiRes({
        ...apiRes,
        error,
        loading:false
      })
    }
    console.log(data,error)
  }

  const handleSubmit=(e)=>{
    e.preventDefault()
    const isValid= validateForm()
    if(isValid){
      doSignIn()
      //call api and set localstate
    }
  }
  return(
    <div className="root">
      <form 
        noValidate
        onSubmit={(e)=>handleSubmit(e)}
        className={apiRes.loading?'loading':''}
      >
        <div className="header">Login</div>
        <Link to='/signup'>New user? Signup</Link>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={(e)=>handleChange(e)}
          className={error.email ?'inputError':''}
          placeholder="abc@example.com"></input>
        {error.email && <span className="error">{error.email}</span>}
        <input 
          type="password"
          name="password"
          value={form.password}
          onChange={(e) => handleChange(e)}
          className={error.email ? 'inputError' : ''}
          placeholder="Password">
        </input>
        {error.password && <span className="error">{error.password}</span>}
        <button
          type="submit"
          disabled={!form.email || !form.password}
          className="btn">Signin</button>
      </form>
    </div>
  )
}

// #endregion

export default Signin