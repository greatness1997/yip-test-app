import axios from 'axios';
import { credential } from '../../config';
import { useAuth } from '../Auth/AuthContext';



export const getItems = async (token) => {

    try {
        const url = `${credential.URL}/get/test`;
        const options = { headers: { Authorization: `Bearer ${token}` } }

        const res = await axios.get(url, options);
        const {status, data} = res.data

        if (status === "success") {
            return { status, data };
        }

    } catch (error) {
        const { message } = error.response.data
        return { status: "failed", message };
    }
    
};

export const createItem = async (token, formData) => {

    try {
        const url = `${credential.URL}/create/test`;
        const headers = {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
        };

        const res = await axios.post(url, formData, { headers });
        const {status, message} = res.data

        if (status !== "success") {
            return { status, message  };
        }else{
            return { status, message  };
        }

    } catch (error) {
        const { message } = error.response.data
        return { status: "failed", message };
    }
    
};

export const deleteItem = async (id, token) => {

    try {
        const url = `${credential.URL}/delete/${id}`;
        const options = { headers: { Authorization: `Bearer ${token}` } }

        const res = await axios.delete(url, options);
        const {status, message} = res.data

        if (status !== "success") {
            return { status, message  };
        }else{
            return { status, message  };
        }

    } catch (error) {
        const { message } = error.response.data
        return { status: "failed", message };
    }
    
};
