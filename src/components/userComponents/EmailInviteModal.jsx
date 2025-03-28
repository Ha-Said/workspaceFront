import React, { useState, useEffect } from 'react';
import { sendBooking } from '../../ApiCalls/apiCalls';

export function EmailForm({ isOpen, toggleModal, booking }) {
  const [emails, setEmails] = useState(['']);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    user: '',
  });
  const [username, setUsername]=useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
          setFormData((prevData) => ({
            ...prevData,
            user: user.id,
          }));
          
     setUsername(user.name);
     console.log(username)
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchBookings();
  }, []);

  const handleEmailChange = (index, event) => {
    const newEmails = [...emails];
    newEmails[index] = event.target.value;
    setEmails(newEmails);
  };

  const handleAddEmail = () => {
    setEmails([...emails, '']);
  };

  const handleRemoveEmail = (index) => {
    const newEmails = emails.filter((_, i) => i !== index);
    setEmails(newEmails);
  };const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const organizerEmail = user.email;
      
      const formatDate = (date) => new Date(date).toISOString().split("T")[0];
      
      const bookingData = {
        emails: emails.join(" "),
        startDate: formatDate(booking.startTime),
        endDate: formatDate(booking.endTime),
        message: message || "This is an auto generated email by our Coworking website",
        organizerEmail,
        username: user.name,      
        location: booking.workspace.name + " " + booking.workspace.location,
      };
  
      await sendBooking(bookingData);
      toggleModal();
    } catch (error) {
      console.error("Error sending booking:", error);
    }
  };
  

  return (
    <>
      {isOpen && (
        <div
          id="crud-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Create New Booking
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={toggleModal}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <form className="p-4 md:p-5" onSubmit={handleSubmit}>
                <div className="grid gap-4 mb-4 grid-cols-2">
                  <div className="col-span-2">
                    <label
                      htmlFor="emails"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Invite Users by Email
                    </label>
                    {emails.map((email, index) => (
                      <div key={index} className="flex items-center mb-2">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => handleEmailChange(index, e)}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveEmail(index)}
                          className="ml-2 text-red-600 hover:text-red-800"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={handleAddEmail}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Add Email
                    </button>
                  </div>
                  <div className="col-span-2">
                    <label
                      htmlFor="message"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      rows="4"
                    ></textarea>
                  </div>
                </div>
                <button
                  type="submit"
                  className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <svg
                    className="me-1 -ms-1 w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  send invites
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}