import Cookies from 'js-cookie';
import { useState } from 'react';
import { useAuthContext } from "./useAuthContext";
import axios from 'axios';

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()


    const login = async (email, password) => {

        setIsLoading(true)
        setError(null)


        const response = await fetch("http://localhost:4000/api/users/login", {

            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })

        })

        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.message)
            console.log(json.message)
        }
        if (response.ok) {
            
            const getdata = async () => {
                const response = await axios.get(`https://ipapi.co/json/`)
                const ip = response.data.ip;
                const country = response.data.country_name;
                const city = response.data.city;

               
            }
            getdata();

            Cookies.set('user', JSON.stringify(json), { expires: 1 })
            Cookies.set('username', json.uname, { expires: 1 })
            Cookies.set('userLevel', json.role, { expires:1 })
            Cookies.set('token', json.token, { expires: 1 })
            dispatch({ type: 'LOGIN', payload: json })

            setIsLoading(false)

        }
    }

    return { login, isLoading, error }

}