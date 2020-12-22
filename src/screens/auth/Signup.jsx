import React, { useState } from 'react'
import { ERORR_MESSAGES, TOKEN_KEY } from '../../constants'
import authApi from '../../api/auth'
import './auth.css'
import { Link } from 'react-router-dom'

function Signup() {

  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword:'',
    phone:'',
    username:'',
    name:{
      first:'',
      last:''
    }
  })
  const [error, setError] = useState({
    email: '',
    password: '',
  })
  const [apiRes, setApiRes] = useState({
    error: '',
    loading: false,
    token:null
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleNameChange=(e)=>{
    setForm({
      ...form,
      name:{
        ...form.name,
        [e.target.name]:e.target.value
      }
    })
  }
  const validateForm = () => {
    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    let isValid = true
    let errorNew = {}
    if (!form.email.match(regex)) {
      errorNew['email'] = ERORR_MESSAGES.emailFormat
      isValid = false
    }
    if (form.password.length < 8) {
      errorNew['password'] = ERORR_MESSAGES.passwordFormat
      isValid = false
    }
    if(form.confirmPassword!==form.password){
      error['confirmPassword']=ERORR_MESSAGES.confirmPassword
    }
    if(form.first===''){
      error['first']=ERORR_MESSAGES.required
    }
    setError(errorNew)
    return isValid
  }

  const doSignUp = async () => {
    setApiRes({
      ...apiRes,
      error: '',
      loading: true,
      token:null
    })
    // eslint-disable-next-line no-unused-vars
    const {confirmPassword,...rest}=form
    const { data, error } = await authApi.signupApi(rest)
    if (error) {
      setApiRes({
        ...apiRes,
        error,
        loading: false
      })
    }else {
      setApiRes({
        ...apiRes,
        error:'',
        loading: false,
        token:data.token
      })
      localStorage.setItem(TOKEN_KEY,data.token)
    }
  
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const isValid = validateForm()
    if (isValid) {
      doSignUp()
      //call api and set localstate
    }
  }


  return (
    <div className="root">
      <form
        noValidate
        onSubmit={(e) => handleSubmit(e)}
        className={apiRes.loading ? 'loading' : ''}
      >
        <div className="header">Signup</div>
        <Link to="/signin">Already Registered? Signin</Link>
        <input
          name="first"
          value={form.name.first}
          onChange={(e) => handleNameChange(e)}
          className={error.first ? 'inputError' : ''}
          placeholder="First name"></input>
        {error.first && <span className="error">{error.first}</span>}
        <input
          name="last"
          value={form.last}
          onChange={(e) => handleNameChange(e)}
          className={error.email ? 'inputError' : ''}
          placeholder="Last name"></input>
        <input
          name="username"
          value={form.username}
          onChange={(e) => handleChange(e)}
          className={error.username ? 'inputError' : ''}
          placeholder="User name"></input>
        {error.first && <span className="error">{error.username}</span>}

        <input
          name="email"
          value={form.email}
          onChange={(e) => handleChange(e)}
          className={error.email ? 'inputError' : ''}
          placeholder="Email">
        </input>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={(e) => handleChange(e)}
          className={error.email ? 'inputError' : ''}
          placeholder="Password">
        </input>
        {error.password && <span className="error">{error.password}</span>}
        <input
          type="password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={(e) => handleChange(e)}
          className={error.email ? 'inputError' : ''}
          placeholder="Confirm password">
        </input>
        {error.confirmPassword && <span className="error">{error.confirmPassword}</span>}
        <input
          name="phone"
          value={form.phone}
          onChange={(e) => handleChange(e)}
          className={error.phone ? 'inputError' : ''}
          placeholder="Phone">
        </input>
        
        <button
          type="submit"
          className="btn">Signin</button>
        {apiRes.token && <span className="success">{'successfully registered!'}</span>}
      </form>
    </div>
  )
}

// #endregion

export default Signup