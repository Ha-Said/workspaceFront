import React, { useEffect, useState } from 'react';
import { getPaiments, confirmPaiment, cancelPaiment } from '../../ApiCalls/apiCalls'; 

export default function Billing() {
  const [paymentLogs, setPaymentLogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [visiblePayments, setVisiblePayments] = useState(10);
  const [showAll, setShowAll] = useState(false);
  const [activeTab, setActiveTab] = useState('pending'); // 'pending', 'confirmed', 'canceled'

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

  const handleShowAll = () => {
    setShowAll(true);
  };

  const handleConfirmPayment = (id) => {
    confirmPaiment(id)
      .then((response) => {
        if (response.success) {
          setPaymentLogs((prev) =>
            prev.map((payment) =>
              payment._id === id ? { ...payment, paimentStatus: 'Paid' } : payment
            )
          );
          alert('Payment confirmed successfully.');
        } else {
          console.error('Payment confirmation failed:', response.message);
        }
      })
      .catch((error) => console.error('Error confirming payment:', error));
  };

  const handleCancelPayment = (id) => {
    cancelPaiment(id, { isNoShow: false })
      .then((response) => {
        if (response.success) {
          setPaymentLogs((prev) =>
            prev.map((payment) =>
              payment._id === id ? { ...payment, paimentStatus: 'Cancelled' } : payment
            )
          );
          alert('Payment cancelled successfully.');
        } else {
          console.error('Payment cancellation failed:', response.message);
        }
      })
      .catch((error) => console.error('Error canceling payment:', error));
  };

  const handleMarkAsNoShow = (id) => {
    cancelPaiment(id, { isNoShow: true })
      .then((response) => {
        if (response.success) {
          setPaymentLogs((prev) =>
            prev.map((payment) =>
              payment._id === id ? { ...payment, paimentStatus: 'Cancelled' } : payment
            )
          );
          alert('Payment marked as no-show and user behavior score has been updated.');
        } else {
          console.error('Payment no-show marking failed:', response.message);
        }
      })
      .catch((error) => console.error('Error marking payment as no-show:', error));
  };

  const filteredPayments = paymentLogs.filter(
    (payment) =>
      payment._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (payment.member && payment.member.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (payment.member && payment.member.email.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const pendingPayments = filteredPayments.filter(
    (payment) =>
      payment.paimentStatus === 'Pending' ||
      payment.paimentStatus === 'pending'
  );
  const confirmedPayments = filteredPayments.filter(
    (payment) => payment.paimentStatus === 'Paid'
  );

  const canceledPayments = filteredPayments.filter(
    (payment) => payment.paimentStatus === 'Cancelled'
  );

  const getDisplayedPayments = (payments) => {
    if (showAll) return payments;
    return payments.slice(0, visiblePayments);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Payment Management
        </h1>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            className="block w-80 pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Search payments..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
      </div>

      <div className="mb-6">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('pending')}
              className={`${
                activeTab === 'pending'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Pending
              <span className="ml-2 px-2 py-0.5 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100">
                {pendingPayments.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('confirmed')}
              className={`${
                activeTab === 'confirmed'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Confirmed
              <span className="ml-2 px-2 py-0.5 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                {confirmedPayments.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('canceled')}
              className={`${
                activeTab === 'canceled'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Canceled
              <span className="ml-2 px-2 py-0.5 text-xs font-medium rounded-full bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100">
                {canceledPayments.length}
              </span>
            </button>
          </nav>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        {activeTab === 'pending' && (
          <div className="space-y-4">
            {pendingPayments.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400 text-center py-4">No pending payments</p>
            ) : (
              <>
                {getDisplayedPayments(pendingPayments).map((payment) => (
                  <div key={payment._id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Payment ID: {payment._id}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Amount: {payment.amount} DT</p>
                      </div>
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100">
                        Pending
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                      Due Date: {new Date(payment.dueDate).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                      Payer: {payment.member ? payment.member.name : 'Unknown'}
                    </p>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleConfirmPayment(payment._id)}
                        className="flex-1 px-3 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => handleCancelPayment(payment._id)}
                        className="flex-1 px-3 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleMarkAsNoShow(payment._id)}
                        className="flex-1 px-3 py-2 text-sm font-medium text-white bg-yellow-600 rounded-lg hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                      >
                        No-Show
                      </button>
                    </div>
                  </div>
                ))}
                {!showAll && visiblePayments < pendingPayments.length && (
                  <div className="flex justify-between items-center mt-4">
                    <button
                      onClick={handleShowMore}
                      className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 focus:outline-none"
                    >
                      Show More
                    </button>
                    <button
                      onClick={handleShowAll}
                      className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 focus:outline-none"
                    >
                      View All
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {activeTab === 'confirmed' && (
          <div className="space-y-4">
            {confirmedPayments.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400 text-center py-4">No confirmed payments</p>
            ) : (
              <>
                {getDisplayedPayments(confirmedPayments).map((payment) => (
                  <div key={payment._id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Payment ID: {payment._id}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Amount: {payment.amount} DT</p>
                      </div>
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                        Paid
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Date: {new Date(payment.date).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Payer: {payment.member ? payment.member.name : 'Unknown'}
                    </p>
                  </div>
                ))}
                {!showAll && visiblePayments < confirmedPayments.length && (
                  <div className="flex justify-between items-center mt-4">
                    <button
                      onClick={handleShowMore}
                      className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 focus:outline-none"
                    >
                      Show More
                    </button>
                    <button
                      onClick={handleShowAll}
                      className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 focus:outline-none"
                    >
                      View All
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {activeTab === 'canceled' && (
          <div className="space-y-4">
            {canceledPayments.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400 text-center py-4">No canceled payments</p>
            ) : (
              <>
                {getDisplayedPayments(canceledPayments).map((payment) => (
                  <div key={payment._id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Payment ID: {payment._id}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Amount: {payment.amount} DT</p>
                      </div>
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100">
                        Canceled
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Date: {new Date(payment.date).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Payer: {payment.member ? payment.member.name : 'Unknown'}
                    </p>
                  </div>
                ))}
                {!showAll && visiblePayments < canceledPayments.length && (
                  <div className="flex justify-between items-center mt-4">
                    <button
                      onClick={handleShowMore}
                      className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 focus:outline-none"
                    >
                      Show More
                    </button>
                    <button
                      onClick={handleShowAll}
                      className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 focus:outline-none"
                    >
                      View All
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}