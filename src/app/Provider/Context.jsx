"use client"
import React, { useContext, useEffect } from 'react'

const Context = React.createContext();
const Provider = ({ children }) => {
    const [loggedIn, setLoggedIn] = React.useState(false);

    useEffect(() => {
        const token = localStorage.getItem('auth-token')
        if (token) {
            setLoggedIn(true)
        }
    }, [])

    return (
        <Context.Provider value={{ loggedIn, setLoggedIn }}>
            {children}
        </Context.Provider>
    )
}

export function useCustomContext() {
    return useContext(Context)
}

export default Provider