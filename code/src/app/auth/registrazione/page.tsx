'use client'
import { getAntdFieldRequiredRule } from '@/app/helpers/validation'
import { Button, Form } from 'antd'
import Link from 'next/link'
import React from 'react'

function Registrazione() {
  return (
    <div>
      <Form className='w-[500px] gap-5' layout='vertical' >
        
        <h1 className='text-2x1 font-bold'>Registrazione</h1>
        <hr />
        <br />
    
        <Form.Item name="username" label="Username" rules={getAntdFieldRequiredRule('Per favore inserisci un username')}>
          <input type='text' />
        </Form.Item>
        <Form.Item name="email" label="Email" rules={getAntdFieldRequiredRule('Per favore inserisci un indirizzo email')}>
          <input type='email' />
        </Form.Item>
         
        <Button type='primary' htmlType='submit' block>
          Procedi
        </Button>

        <Link href="/auth/login" className='text-black'>
          Hai già un account? Fai l'accesso
        </Link>

      </Form>
      
    </div>
  )
}

export default Registrazione