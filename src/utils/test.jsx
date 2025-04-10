import React, { useState } from 'react';
import { createWorkspace } from './../ApiCalls/apiCalls'; 

const CreateWorkspaceForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    userId: '',
    capacity: '',
    amenities: '',
    location: '',
    pricePerHour: '',
    photo: null,
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'photo') {
      setFormData({ ...formData, photo: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('name', formData.name);
    data.append('type', formData.type);
    data.append('userId', formData.userId);
    data.append('capacity', formData.capacity);
    data.append('location', formData.location);
    data.append('pricePerHour', formData.pricePerHour);
    data.append('photo', formData.photo);

    const amenitiesArray = formData.amenities
      .split(',')
      .map(item => item.trim())
      .filter(item => item !== '');
    
    amenitiesArray.forEach((amenity, index) => {
      data.append(`amenities[]`, amenity);
    });

    try {
      const response = await createWorkspace(data);
      setMessage(`Workspace created: ${response.data.workspace.name}`);
    } catch (err) {
      console.error(err);
      setMessage('Error creating workspace');
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
      <input type="text" name="type" placeholder="Type" onChange={handleChange} required />
      <input type="text" name="userId" placeholder="User ID" onChange={handleChange} required />
      <input type="number" name="capacity" placeholder="Capacity" onChange={handleChange} required />
      <input type="text" name="amenities" placeholder="Amenities (comma-separated)" onChange={handleChange} />
      <input type="text" name="location" placeholder="Location" onChange={handleChange} required />
      <input type="number" step="0.01" name="pricePerHour" placeholder="Price per Hour" onChange={handleChange} required />
      <input type="file" name="photo" accept="image/*" onChange={handleChange} required />
      <button type="submit">Create Workspace</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default CreateWorkspaceForm;
