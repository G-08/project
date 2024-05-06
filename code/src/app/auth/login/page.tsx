'use client'
import { getAntdFieldRequiredRule } from '@/app/helpers/validation'
import { Button, Form } from 'antd'
import Link from 'next/link'
import React from 'react'

function Login() {
  return (
    <div>
      <Form className='w-[500px] gap-5' layout='vertical' >
        
        <h1 className='text-2x1 font-bold'>Login</h1>
        <hr />
        <br />

        <Form.Item name="email" label="Email" rules={getAntdFieldRequiredRule('Per favore inserisci un indirizzo email')}>
          <input type='email' />
        </Form.Item>
        <Form.Item name="password" label="Password" rules={getAntdFieldRequiredRule('Per favore inserisci la password')}>
          <input type='password' />
        </Form.Item> 

        <Button type='primary' htmlType='submit' block>
          Accedi
        </Button>

        <Link href="/auth/registrazione" className='text-black'>
          Non hai un account? Registrati
        </Link>

      </Form>
      
    </div>
  )
}

export default Login