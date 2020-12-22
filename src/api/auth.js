import axiosInstance from './axiosInstance'
import {ERORR_MESSAGES} from '../constants'

const SIGNIN_URL='/auth/signin'
const SIGNUP_URL='auth/register'

export async function signinApi(email,password){
  try{
    const {data,error}= await axiosInstance.post(SIGNIN_URL,
      {
        email:email,
        password:password
      })
    return {data,error}
  }
  catch(e){
    return {error:e?.response?.data?.msg ||ERORR_MESSAGES.serverError }
  }
}

export async function signupApi(form){
  try{
    const {data,error}= await axiosInstance.post(SIGNUP_URL,{
      ...form
    })
    return {data,error}
  }
  catch(e){
    return {error:e?.response?.data?.msg ||ERORR_MESSAGES.serverError}
  }
}

export default {
  signinApi,
  signupApi,
}