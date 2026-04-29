"use client"
import React, { useContext, useEffect } from 'react'
import { getAuthToken } from '../helper';

const Context = React.createContext();
const Provider = ({ children }) => {
    const [loggedIn, setLoggedIn] = React.useState(false);
    useEffect(() => {
        const token = getAuthToken()
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