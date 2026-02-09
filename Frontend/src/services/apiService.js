import { getToken } from '../utils/auth.js';

export const apiFetch = async (url, options = {}) => {
    const headers = { 'Content-Type':'application/json', ...(options.headers || {}) };
    if(getToken()) headers['Authorization'] = `Bearer ${getToken()}`;
    const res = await fetch(url, {...options, headers});
    return res.json();
};
