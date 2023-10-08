import React, { useState } from 'react';
import styles from './Register.module.css';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import axios from 'axios';
import { BaseUrl } from '../../utils/baseUrl';
import { Link, useNavigate } from 'react-router-dom';
import { BallTriangle } from 'react-loader-spinner'

export default function Register() {
  const [loading, isLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const navigate = useNavigate()
  async function registerForm(values) {
    isLoading(true)
    let { data } = await axios.post(`${BaseUrl}/auth/signup/`, values)
      .catch(err => {
        isLoading(false)
        setErrorMessage(err.response.data.message)
      })
    if (data.message == 'success') {
      isLoading(false)
      navigate('/login')
    }
  }
  let validationSchema = Yup.object({
    name: Yup.string().required('name is required').min(5).max(15),
    email: Yup.string().email('invalid-email').required('email is required'),
    phone: Yup.string().matches(new RegExp(/^0(11|10|12|15)[0-9]{8}$/), 'invalid phone number').required('phone is required'),
    password: Yup.string().matches(new RegExp(/^[a-zA-Z0-9]{6,20}$/), 'Invalid password').required('password is required'),
    rePassword: Yup.string().oneOf([Yup.ref('password')], 'repassword not match').required('rpassword is required')
  })

  const formic = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      rePassword: ''
    }, validationSchema,
    onSubmit: registerForm
  })
  return <>
    <form onSubmit={formic.handleSubmit}>

      <div className="container w-75 p-4">
        {errorMessage && <div className='bg-main rounded p-2 text-center'>{errorMessage}</div>}

        <h2>rigister</h2>
        <label htmlFor="name">name</label>
        <input value={formic.values.name} id='name' type="text" className="form-control my-2" name="name" onChange={formic.handleChange} onBlur={formic.handleBlur} />
        {formic.errors.name && formic.touched.name && <div className="text-main p-2 my-2">{formic.errors.name}</div>}

        <label htmlFor="email">Email</label>
        <input value={formic.values.email} id='email' type="email" className="form-control my-2" name="email" onChange={formic.handleChange} onBlur={formic.handleBlur} />
        {formic.errors.email && formic.touched.email && < div className="text-main p-2 my-2">{formic.errors.email}</div>}

        <label htmlFor="phone">Phone</label>
        <input id='phone' value={formic.values.phone} type="tel" onChange={formic.handleChange} onBlur={formic.handleBlur} name='phone' className='form-control my-2' />
        {formic.errors.phone && formic.touched.phone && <div className="text-main p-2 my-2">{formic.errors.phone}</div>}

        <label htmlFor="password">Password</label>
        <input value={formic.values.password} id='password' type="password" className="form-control my-2" name="password" onChange={formic.handleChange} onBlur={formic.handleBlur} />
        {formic.errors.password && formic.touched.password && <div className="text-main p-2 my-2">{formic.errors.password}</div>}

        <label htmlFor="rePassword">Re-Password</label>
        <input value={formic.values.rePassword} id='rePassword' type="password" className="form-control my-2" name="rePassword" onChange={formic.handleChange} onBlur={formic.handleBlur} />
        {formic.errors.rePassword && formic.touched.rePassword && <div className="text-main p-2 my-2">{formic.errors.rePassword}</div>}

        {loading ?
          <button className='btn bg-main' type='button'>
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
            <span className='mx-2'><Link className='text-decoration-none text-main' to={'/login'} >login now</Link></span>
          </div>
        }

      </div>

    </form >
  </>
}
