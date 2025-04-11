import React, { useState } from 'react';
import { updateWorkspace } from '../../ApiCalls/apiCalls';

export function UpdateSpaceModal({ isOpen, toggleModal, workspace }) {
  const [formData, setFormData] = useState({
    name: workspace?.name || '',
    type: workspace?.type || 'desk',
    capacity: workspace?.capacity || '',
    amenities: workspace?.amenities?.join(', ') || '',
    location: workspace?.location || '',
    pricePerHour: workspace?.pricePerHour || '',
    photo: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      photo: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('type', formData.type);
      formDataToSend.append('capacity', formData.capacity);
      formDataToSend.append('amenities', formData.amenities);
      formDataToSend.append('location', formData.location);
      formDataToSend.append('pricePerHour', formData.pricePerHour);

      if (formData.photo) {
        formDataToSend.append('image', formData.photo);
      }

      await updateWorkspace(workspace._id, formDataToSend);
      console.log('Workspace updated successfully');
      toggleModal();
    } catch (error) {
      console.error('Error updating workspace:', error.response?.data || error.message);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50">
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200 dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Update Workspace
                </h3>
                <button
                  type="button"
                  onClick={() => toggleModal(null)}
                  className="text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg text-sm w-8 h-8 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                  </svg>
                </button>
              </div>
              <form className="p-4 md:p-5" onSubmit={handleSubmit}>
                <div className="grid gap-4 mb-4">
                  <InputField label="Workspace Name" name="name" value={formData.name} onChange={handleChange} required />
                  <SelectField
                    label="Type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    options={['desk', 'meetingRoom', 'privateOffice']}
                  />
                  <InputField label="Capacity" name="capacity" type="number" value={formData.capacity} onChange={handleChange} required />
                  <InputField
                    label="Amenities"
                    name="amenities"
                    value={formData.amenities}
                    onChange={handleChange}
                    placeholder="Comma-separated"
                    required
                  />
                  <InputField label="Location" name="location" value={formData.location} onChange={handleChange} required />
                  <InputField label="Price Per Hour" name="pricePerHour" type="number" value={formData.pricePerHour} onChange={handleChange} required />

                  <div>
                    <label htmlFor="photo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Upload Photo
                    </label>
                    <input
                      type="file"
                      name="photo"
                      id="photo"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Update Workspace
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function InputField({ label, name, value, onChange, type = 'text', required = false, placeholder }) {
  return (
    <div>
      <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
      />
    </div>
  );
}

function SelectField({ label, name, value, onChange, options }) {
  return (
    <div>
      <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {label}
      </label>
      <select
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
