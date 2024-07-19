
import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { credential } from '../../config';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const login = async (body) => {
        setLoading(true);
        try {
            const url = `${credential.URL}/auth/get-token`;
            const res = await axios.post(url, body);
            const { status, message, token } = res.data;

            if (status === "success") {
                setToken(token);
                setLoading(false);
                return { status: "success", message };
            } else {
                setLoading(false);
                setError(message);
                return { status: "failed", message };
            }
        } catch (error) {
            setLoading(false);
            setError(error.response?.data?.message || error.message);
            return { status: "failed", message: error.message };
        }
    };

    const logout = () => {
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ token, login, logout, loading, error }}>
            {children}
        </AuthContext.Provider>
    );
};
