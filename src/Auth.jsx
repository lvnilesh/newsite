import { useState } from 'react'
import { supabase } from './supabaseClient'

export default function Auth() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')

  const handleLogin = async event => {
    event.preventDefault()

    setLoading(true)
    console.log(process.env.NODE_ENV)
    const { error } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        emailRedirectTo:
          process.env.NODE_ENV === 'development'
            ? 'http://localhost:5173'
            : 'https://new.cloudgenius.app'
      }
    })

    if (error) {
      alert(error.error_description || error.message)
    } else {
      alert('Check your email for the login link!')
    }
    setLoading(false)
  }

  return (
    <div className='row flex flex-center'>
      <div className='col-6 form-widget '>
        <h1 className='header'>Cloud Genius®</h1>
        <p className='description'>Sign in via a link you will receive in your email below.</p>
        <form className='form-widget' onSubmit={handleLogin}>
          <div>
            <input
              id='email'
              autoComplete='email'
              className='inputField'
              type='email'
              placeholder='Your email'
              value={email}
              required={true}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div>
            <button className={'button block'} disabled={loading}>
              {loading ? <span>Loading</span> : <span>Send me that link</span>}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
