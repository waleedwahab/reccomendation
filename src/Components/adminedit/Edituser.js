import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { db } from '../../Auth/firebase';
import {
  doc,
  updateDoc,
  collection,
  
} from 'firebase/firestore';
import './UserForm.css';

const Edituser = () => {
  const location = useLocation();
  const [email, setEmail] = useState(location.state.user.email);
  const [name, setName] = useState(location.state.user.name);
  const [id, setId] = useState(location.state.user.id);
  const [phoneNumber, setPhoneNumber] = useState(location.state.user.phoneNo);
  const [role, setRole] = useState(location.state.user.role);

  const item = location.state.user;
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleIdChange = (e) => {
    setId(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const userRef = doc(db, 'users', item.docId);
      
     
      await updateDoc(userRef,{
        email: email,
        name: name,
        id: id,
        phoneNo: phoneNumber,
        role: role,
      });
      alert('User data updated successfully!');
    } catch (error) {
      console.error(error);
      alert('Error updating user data.');
    }
  };

  return (
    <div className="user-form-container">
      <h1>User Data</h1>
      <form onSubmit={handleUpdate}>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" value={email} onChange={handleEmailChange} required />
        </div>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" value={name} onChange={handleNameChange} required />
        </div>
        <div className="form-group">
          <label>ID:</label>
          <input type="text" value={id} onChange={handleIdChange} required />
        </div>
        <div className="form-group">
          <label>Phone Number:</label>
          <input type="tel" value={phoneNumber} onChange={handlePhoneNumberChange} required />
        </div>
        <div className="form-group">
          <label>Role:</label>
          <input type="text" value={role} onChange={handleRoleChange} required />
        </div>
        <button type="submit">Edit User</button>
      </form>
    </div>
  );
};

export default Edituser;
