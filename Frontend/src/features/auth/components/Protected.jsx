import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router";
import React from 'react'

const Protected = ({children}) => {
    const { loading,user } = useAuth()


    if(loading){
        return (
            <main className="min-h-screen w-full flex justify-center items-center bg-bg-page text-2xl font-bold text-slate-400 animate-pulse">
                <h1>Loading...</h1>
            </main>
        )
    }

    if(!user){
        return <Navigate to={'/login'} />
    }
    
    return children
}

export default Protected