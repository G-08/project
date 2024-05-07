import Link from 'next/link'
import React from 'react'

const Register = () => {
  return (
    <div className='flex min-h-screen flex-col items-center justify-between p-24'>
        <div>
            <h1>Registrazione mongobonni</h1>
            <form>

                <input type="text" className='text-black w-full border' placeholder='inserisci username' required/>
                <input type="email" className='text-black w-full border' placeholder='inserisci indirizzo email' required/>
                <input type="password" className='text-black w-full border' placeholder='inserisci password' required/>

                <button type='submit'>registrami</button>

            </form>
            <Link href="/login">Hai già un account? Effettua l'accesso</Link>
        </div>
    </div>
  )
}

export default Register