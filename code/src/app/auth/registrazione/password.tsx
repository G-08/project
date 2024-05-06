'use client'
import { getAntdFieldRequiredRule } from '@/app/helpers/validation'
import { Button, Form } from 'antd'
import Link from 'next/link'
import React from 'react'

function Password() {
  return (
    <div>
      <Form className='w-[500px] gap-5' layout='vertical' >
        
        <h1 className='text-2x1 font-bold'>Inserimento Password</h1>
        <hr />
        <br />
    
        
        <Form.Item name="password" label="Password" rules={getAntdFieldRequiredRule('Per favore inserisci la password')}>
          <input type='password' />
        </Form.Item> 

        <Form.Item name="password" label="Ripeti password" rules={getAntdFieldRequiredRule('Per favore inserisci la password')}>
          <input type='password' />
        </Form.Item> 

        <Button type='primary' htmlType='submit' block>
          Conferma
        </Button>

        <Link href="/auth/login" className='text-black'>
          Hai già un account? Fai l'accesso
        </Link>

      </Form>
      
    </div>
  )
}

export default Password