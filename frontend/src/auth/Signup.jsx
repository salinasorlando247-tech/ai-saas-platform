import React, { useState } from 'react';
import api from '../../utils/api';

export default function Signup() {
  const [form, setForm] = useState({ name:'', email:'', password:'' });

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await api.post('/auth/signup', form);
    localStorage.setItem('token', res.data.token);
    alert('Signup successful!');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
      <input type="text" placeholder="Name" onChange={e=>setForm({...form,name:e.target.value})} required />
      <input type="email" placeholder="Email" onChange={e=>setForm({...form,email:e.target.value})} required />
      <input type="password" placeholder="Password" onChange={e=>setForm({...form,password:e.target.value})} required />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 mt-2 rounded">Signup</button>
    </form>
  );
}
