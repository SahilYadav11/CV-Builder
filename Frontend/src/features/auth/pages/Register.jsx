import React, { useState } from 'react'
import { useNavigate, Link, Navigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import AppHeader from '../../../components/AppHeader'

const Register = () => {

    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const { loading, handleRegister, user } = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        try {
            await handleRegister({ username, email, password })
            navigate("/home")
        } catch (err) {
            setError(err.message)
        }
    }

    if (loading) {
        return (
            <main className="min-h-screen w-full flex justify-center items-center bg-bg-page text-2xl font-bold text-slate-400 animate-pulse">
                <h1>Loading...</h1>
            </main>
        )
    }

    if (user) {
        return <Navigate to="/home" replace />
    }

    return (
        <div className="min-h-screen w-full flex flex-col bg-bg-page">
            <AppHeader action="login" />
            <main className="flex-1 w-full flex justify-center items-center px-4 py-8">
            <div
                className="auth-card min-w-[350px] w-full max-w-md flex flex-col bg-bg-card rounded-2xl border border-border-color shadow-2xl"
                style={{ padding: '2.5rem', gap: '1.5rem' }}
            >
                <h1 className="text-3xl font-bold text-white text-center">Register</h1>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-sm text-center font-medium">
                        {error}
                    </div>
                )}

                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col"
                    style={{ gap: '1.25rem' }}
                >

                    <div className="input-group flex flex-col" style={{ gap: '0.5rem' }}>
                        <label className="text-sm font-semibold text-slate-300" htmlFor="username">Username</label>
                        <input
                            style={{ padding: '0.75rem 1rem' }}
                            className="outline-none rounded-xl bg-bg-input text-white border border-border-color placeholder-slate-500 focus:border-accent transition-all duration-200"
                            onChange={(e) => { setUsername(e.target.value) }}
                            type="text" id="username" name='username' placeholder='Enter username' />
                    </div>
                    <div className="input-group flex flex-col" style={{ gap: '0.5rem' }}>
                        <label className="text-sm font-semibold text-slate-300" htmlFor="email">Email</label>
                        <input
                            style={{ padding: '0.75rem 1rem' }}
                            className="outline-none rounded-xl bg-bg-input text-white border border-border-color placeholder-slate-500 focus:border-accent transition-all duration-200"
                            onChange={(e) => { setEmail(e.target.value) }}
                            type="email" id="email" name='email' placeholder='Enter email address' />
                    </div>
                    <div className="input-group flex flex-col" style={{ gap: '0.5rem' }}>
                        <label className="text-sm font-semibold text-slate-300" htmlFor="password">Password</label>
                        <input
                            style={{ padding: '0.75rem 1rem' }}
                            className="outline-none rounded-xl bg-bg-input text-white border border-border-color placeholder-slate-500 focus:border-accent transition-all duration-200"
                            onChange={(e) => { setPassword(e.target.value) }}
                            type="password" id="password" name='password' placeholder='Enter password' />
                    </div>

                    <button
                        style={{ padding: '0.75rem 1rem' }}
                        className="w-full bg-accent hover:bg-accent-dark text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 active:scale-98 cursor-pointer mt-2 flex items-center justify-center" >
                        Register
                    </button>

                </form>

                <p className="text-sm text-slate-400 text-center">
                    Already have an account? <Link className="text-accent hover:underline font-semibold" to={"/login"} >Login</Link>
                </p>
            </div>
            </main>
        </div>
    )
}

export default Register