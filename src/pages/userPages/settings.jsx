import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { updateMember } from "../../ApiCalls/apiCalls";

export default function Settings() {
  const { email } = useParams();
  const [user, setUser] = useState(null);
  const [updatedUser, setUpdatedUser] = useState({
    username: "",
    email: "",
    phone: "",
    photo: "",
    password: "", // Added password field
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
          setUser(storedUser);
          setUpdatedUser({
            username: storedUser.name || "",
            email: storedUser.email || "",
            phone: storedUser.phone || "",
            photo: storedUser.image || "https://via.placeholder.com/64",
            password: "", // Initialize password field
          });
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUpdatedUser((prev) => ({ ...prev, photo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", updatedUser.username);
      formData.append("email", updatedUser.email);
      formData.append("phone", updatedUser.phone);
      formData.append("password", updatedUser.password); // Append password field
      if (updatedUser.photo.startsWith("data:image")) {
        const blob = await fetch(updatedUser.photo).then((res) => res.blob());
        formData.append("image", blob, "profile.jpg");
      }

      if (user && user.id) {
        const response = await updateMember(user.id, formData);

        if (response) {
          setUser(response);
          localStorage.setItem("user", JSON.stringify(response));
          alert("Profile updated successfully!");
        } else {
          alert("Failed to update profile.");
        }
      } else {
        alert("User ID is missing.");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      alert("An error occurred while updating.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-900 text-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Account Settings</h2>

      <div className="flex items-center mb-8">
        <img
          className="w-16 h-16 rounded-full object-cover"
          src={updatedUser.photo}
          alt="User profile"
        />
        <div className="ml-4">
          <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="photo-upload" />
          <label htmlFor="photo-upload" className="cursor-pointer px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700">
            Upload
          </label>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="username" className="block mb-1 font-medium">
              Username*
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={updatedUser.username}
              onChange={handleInputChange}
              className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-1 font-medium">
              Email*
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={updatedUser.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block mb-1 font-medium">
              Phone Number
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={updatedUser.phone}
              onChange={handleInputChange}
              className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-1 font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={updatedUser.password}
              onChange={handleInputChange}
              className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-between">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 rounded-md hover:bg-blue-700 font-medium"
          >
            Save
          </button>
          <button className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
            Remove
          </button>
        </div>
      </form>
    </div>
  );
}
