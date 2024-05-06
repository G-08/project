'use client'
import React from 'react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <div>
        <ul className='flex justify-between m-10 item-center'>
            <div>
                <Link href='/'>
                    <li>home</li>
                </Link>
            </div>
            <div className='flex gap-10'>
                <Link href='/profilo'>
                    <li>profilo</li>
                </Link>
                <Link href='auth/login'>
                    <li>login</li>
                </Link>
                <Link href='auth/registrazione'>
                    <li>registrazione</li>
                </Link>
            </div>
        </ul>
    </div>
  )
}

export default Navbar