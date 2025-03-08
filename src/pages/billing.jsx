import React, { useEffect, useState } from 'react';
import { getPaiments } from '../ApiCalls/apiCalls'; 

export function Billing() {
  const [paymentLogs, setPaymentLogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [visiblePayments, setVisiblePayments] = useState(10);

  useEffect(() => {
    getPaiments()
      .then((data) => {
        if (Array.isArray(data)) {
          console.log('Fetched payment logs:', data);
          setPaymentLogs(data);
        } else {
          console.error('Expected an array but got:', data);
        }
      })
      .catch((error) => console.error('Error fetching payment logs:', error));
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleShowMore = () => {
    setVisiblePayments((prev) => prev + 10);
  };

  // Filter payments based on search query
  const filteredPayments = paymentLogs.filter(
    (payment) =>
      payment._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (payment.member && payment.member.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (payment.member && payment.member.email.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  console.log('Filtered payments:', filteredPayments); 

  const pendingPayments = filteredPayments.filter(
    (payment) =>
      payment.paimentStatus === 'Pending' ||
      payment.paimentStatus === 'Pending Confirmation'
  );
  const confirmedPayments = filteredPayments.filter(
    (payment) => payment.paimentStatus === 'Paid'
  );

  console.log('Pending payments:', pendingPayments); 
  console.log('Confirmed payments:', confirmedPayments); 

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Pending Payments
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {pendingPayments.map((payment) => (
          <div
            key={payment._id}
            className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
          >
            <div className="p-5">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Payment ID: {payment._id}
              </h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Amount: ${payment.amount}
              </p>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Due Date: {payment.dueDate}
              </p>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Payer: {payment.member ? payment.member.name : 'Unknown'}
              </p>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Status: {payment.paimentStatus === 'Pending Payment' ? 'Waiting to be Paid' : 'Waiting to be Confirmed'}
              </p>
              {payment.paimentStatus === 'Pending Payment' && (
                <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Pay Now
                </button>
              )}
              {payment.paimentStatus === 'Pending Confirmation' && (
                <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                  Confirm Payment
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Confirmed Payment Logs Section */}
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Confirmed Payment Logs
      </h2>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        {/* Search Bar */}
        <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white dark:bg-gray-900">
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="table-search-payments"
              className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search payments"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
        </div>
        {/* Table */}
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Payment ID</th>
              <th scope="col" className="px-6 py-3">Amount</th>
              <th scope="col" className="px-6 py-3">Date</th>
              <th scope="col" className="px-6 py-3">Payer Name</th>
              <th scope="col" className="px-6 py-3">Payer Email</th>
            </tr>
          </thead>
          <tbody>
            {confirmedPayments.slice(0, visiblePayments).map((payment) => (
              <tr
                key={payment._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4">{payment._id}</td>
                <td className="px-6 py-4">${payment.amount}</td>
                <td className="px-6 py-4">{payment.date}</td>
                <td className="px-6 py-4">{payment.member ? payment.member.name : 'Unknown'}</td>
                <td className="px-6 py-4">{payment.member ? payment.member.email : 'Unknown'}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {visiblePayments < confirmedPayments.length && (
          <div className="flex justify-center mt-4">
            <button
              onClick={handleShowMore}
              className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
            >
              Show More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}