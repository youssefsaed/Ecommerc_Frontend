import React, { useContext, useState } from 'react';
import styles from './Login.module.css';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import axios from 'axios';
import { BaseUrl } from '../../utils/baseUrl';
import { Link, useNavigate } from 'react-router-dom';
import { BallTriangle } from 'react-loader-spinner'
import { userContext } from '../../context/user.context';


export default function Login() {
  const [loading, isLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const navigate = useNavigate()
  const {setUserToken}=useContext(userContext)
  async function loginForm(values) {
    isLoading(true)
    let { data } = await axios.post(`${BaseUrl}/auth/signin/`, values)
   
      .catch(err => {
        isLoading(false)
        setErrorMessage(err.response.data.message)
      })
    if (data.message == 'success') {
      isLoading(false)
      localStorage.setItem('token',data.token)
      setUserToken(data.token)
      navigate('/')
    }
  }
  let validationSchema = Yup.object({
    email: Yup.string().email('invalid-email').required('email is required'),
    password: Yup.string().matches(new RegExp(/^[a-zA-Z0-9]{6,20}$/), 'Invalid password').required('password is required'),
  })

  const formic = useFormik({
    initialValues: {
      email: '',
      password: '',
    }, validationSchema,
    onSubmit: loginForm
  })
  return <>
    <form onSubmit={formic.handleSubmit}>

      <div className="container w-75 p-4">
        {errorMessage && <div className='bg-main rounded p-2 text-center'>{errorMessage}</div>}

        <h2>login</h2>

        <label htmlFor="email">Email</label>
        <input value={formic.values.email} id='email' type="email" className="form-control my-2" name="email" onChange={formic.handleChange} onBlur={formic.handleBlur} />
        {formic.errors.email && formic.touched.email && < div className="text-main p-2 my-2">{formic.errors.email}</div>}

        <label htmlFor="password">Password</label>
        <input value={formic.values.password} id='password' type="password" className="form-control my-2" name="password" onChange={formic.handleChange} onBlur={formic.handleBlur} />
        {formic.errors.password && formic.touched.password && <div className="text-main p-2 my-2">{formic.errors.password}</div>}


        {loading ?
          <button className='btn bg-main px-0' type='button'>
            <BallTriangle
              height={25}
              width={100}
              radius={5}
              color="#fff"
              ariaLabel="ball-triangle-loading"
              wrapperClass={{}}
              wrapperStyle=""
              visible={true}
            />
          </button>
          :
          <div>
            <button disabled={!(formic.isValid && formic.dirty)} type='submit' className='btn bg-main cursor-pointer text-white '>submit</button>
            <span className='mx-2'><Link className='text-decoration-none text-main' to={'/register'} >register now</Link></span>
          </div>

        }

      </div>

    </form >
  </>
}

