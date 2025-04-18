import React, { useEffect, useState } from "react";
import {
  getAllBookings,
  setBookingCancelled,
  setBookingConfirmed,
  createPaiment,
  addAvailabilityToWorkspace,
  createActionLog,
  gemini
} from "../../ApiCalls/apiCalls";
import BookingDetails from "./bookingInfoCard";
import { Toast } from "../common/Toast";

function Modal({ children, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-2xl w-full p-6 relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}

export default function UpcomingBookingsTable() {
  const [bookings, setBookings] = useState([]);
  const [visibleBookings, setVisibleBookings] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [showAIAnalysis, setShowAIAnalysis] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    async function fetchBookings() {
      try {
        const data = await getAllBookings();
        console.log("Retrieved bookings:", data); 
        setBookings(data);
        
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
          setCurrentUser(storedUser);
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
        showToast("Error fetching bookings");
      }
    }
    fetchBookings();
  }, []);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Cancel booking
  const handleCancel = async (id) => {
    try {
      const bookingToCancel = bookings.find((booking) => booking._id === id);
      if (!bookingToCancel) {
        showToast("Booking not found");
        return;
      }

      await setBookingCancelled(id);
      
      if (currentUser) {
        const actionLogData = {
          action: 'cancelled booking',
          userId: currentUser.id,
          details: `Booking cancelled for workspace: ${bookingToCancel.workspace?.name || 'Unknown'}`,
          entityId: id,
          entityType: 'booking'
        };
        await createActionLog(actionLogData);
      }
      
      setBookings((prev) => prev.filter((booking) => booking._id !== id));
      showToast("Booking cancelled successfully");
    } catch (error) {
      console.error("Error cancelling booking:", error);
      showToast("Error cancelling booking");
    }
  };

  const handleConfirm = async (id) => {
    try {
      const confirmedBooking = bookings.find((booking) => booking._id === id);
      if (!confirmedBooking) {
        showToast("Booking not found");
        return;
      }

      await setBookingConfirmed(id);
      
      if (currentUser) {
        const actionLogData = {
          action: 'confirming booking',
          userId: currentUser.id,
          details: `Booking confirmed for workspace: ${confirmedBooking.workspace?.name || 'Unknown'}`,
          entityId: id,
          entityType: 'booking'
        };
        await createActionLog(actionLogData);
      }

      const startTime = new Date(confirmedBooking.startTime);
      const endTime = new Date(confirmedBooking.endTime);
      const hours = Math.abs(endTime - startTime) / 36e5;
      const amount = hours * confirmedBooking.workspace.pricePerHour;
      
      const paimentData = {
        amount,
        date: new Date(),
        member: confirmedBooking.user,
        space: confirmedBooking.workspace,
        dueDate: new Date(confirmedBooking.endTime),
      };

      await createPaiment(paimentData);
      
      if (currentUser) {
        const paymentActionLogData = {
          action: 'created payment',
          userId: currentUser.id,
          details: `Payment created for booking: ${amount} for ${hours} hours`,
          entityId: confirmedBooking._id,
          entityType: 'payment'
        };
        await createActionLog(paymentActionLogData);
      }

      await addAvailabilityToWorkspace(confirmedBooking.workspace._id, {
        startTime: confirmedBooking.startTime,
        endTime: confirmedBooking.endTime,
      });

      setBookings((prev) => prev.filter((booking) => booking._id !== id));
      showToast("Booking confirmed successfully");
    } catch (error) {
      console.error("Error confirming booking:", error);
      showToast("Error confirming booking");
    }
  };

  const handleDetails = (id) => {
    setSelectedBookingId(id);
  };

  // Show more bookings
  const handleShowMore = () => {
    setVisibleBookings((prev) => prev + 5);
  };

  // Filter bookings based on search and date criteria
  const filteredBookings = bookings.filter((booking) => {
    const search = searchQuery.toLowerCase();
    return (
      booking.status === 'pending' && (  // Only show pending bookings
        booking.workspace?.name?.toLowerCase().includes(search) ||
        booking._id.toLowerCase().includes(search) ||
        booking.startTime.toLowerCase().includes(search) ||
        booking.endTime.toLowerCase().includes(search)
      )
    );
  });

  const upcomingBookings = filteredBookings.filter(
    (booking) => new Date(booking.startTime) > new Date()
  );

  const handleAIAnalysis = async () => {
    try {
      setIsAnalyzing(true);
      const analysisData = upcomingBookings.map(booking => ({
        workspaceName: booking.workspace?.name || 'Unknown',
        startTime: new Date(booking.startTime).toLocaleString(),
        endTime: new Date(booking.endTime).toLocaleString(),
        userName: booking.user?.name || 'Unknown',
        behaviorScore: booking.user?.behaviourScore || { totalScore: 0, noShows: 0, violations: 0 },
        pricePerHour: booking.workspace?.pricePerHour || 0
      }));

      const prompt = `Analyze these upcoming workspace bookings and provide insights about user behavior patterns, potential risks, and recommendations for the manager. Here's the data: ${JSON.stringify(analysisData)}`;
      
      const response = await gemini(prompt);
      setAiAnalysis(response.response);
      setShowAIAnalysis(true);
    } catch (error) {
      console.error('Error getting AI analysis:', error);
      showToast('Failed to get AI analysis');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="p-4">
      <header className="flex flex-col md:flex-row items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-700 dark:text-white">
          Upcoming Bookings
        </h2>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search for bookings"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mt-2 md:mt-0 px-4 py-2 border rounded-lg w-80 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
          />
          <button
            onClick={handleAIAnalysis}
            disabled={isAnalyzing}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {isAnalyzing ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <span>AI Assessment</span>
              </>
            )}
          </button>
        </div>
      </header>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs uppercase bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-4 py-3">Space Name</th>
              <th className="px-4 py-3">User</th>
              <th className="px-4 py-3">Behavior Score</th>
              <th className="px-4 py-3">No Shows</th>
              <th className="px-4 py-3">Violations</th>
              <th className="px-4 py-3">Start</th>
              <th className="px-4 py-3">End</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {upcomingBookings.slice(0, visibleBookings).map((booking) => {
              const behaviorScore = booking.user?.behaviourScore || { totalScore: 0, noShows: 0, violations: 0 };
              const scoreColor = behaviorScore.totalScore >= 0 ? 'text-green-500' : 
                               behaviorScore.totalScore >= -2 ? 'text-yellow-500' : 
                               'text-red-500';
              
              return (
                <tr
                  key={booking._id}
                  className="bg-white dark:bg-gray-800 border-b hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="px-4 py-3">
                    {booking.workspace?.name || "N/A"}
                  </td>
                  <td className="px-4 py-3">
                    {booking.user?.name || "N/A"}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`font-semibold ${scoreColor}`}>
                      {behaviorScore.totalScore}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {behaviorScore.noShows}
                  </td>
                  <td className="px-4 py-3">
                    {behaviorScore.violations}
                  </td>
                  <td className="px-4 py-3">
                    {new Date(booking.startTime).toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    {new Date(booking.endTime).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 space-x-2">
                    <button
                      className="px-3 py-1 text-white bg-red-600 rounded hover:bg-red-700"
                      onClick={() => handleCancel(booking._id)}
                    >
                      Cancel
                    </button>
                    <button
                      className="px-3 py-1 text-white bg-green-600 rounded hover:bg-green-700"
                      onClick={() => handleConfirm(booking._id)}
                    >
                      Confirm
                    </button>
                    <button
                      className="px-3 py-1 text-white bg-blue-600 rounded hover:bg-blue-700"
                      onClick={() => handleDetails(booking._id)}
                    >
                      Details
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {visibleBookings < upcomingBookings.length && (
        <div className="flex justify-center mt-4">
          <button
            onClick={handleShowMore}
            className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            Show More
          </button>
        </div>
      )}

      {toastMessage && (
        <div className="fixed bottom-4 right-4 z-50">
          <Toast
            message={toastMessage}
            onClose={() => setToastMessage(null)}
          />
        </div>
      )}
      
      {selectedBookingId && (
        <Modal onClose={() => setSelectedBookingId(null)}>
          <BookingDetails bookingId={selectedBookingId} />
        </Modal>
      )}

      {showAIAnalysis && (
        <Modal onClose={() => setShowAIAnalysis(false)}>
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Recommended Bookings
              </h3>
              <button
                onClick={() => setShowAIAnalysis(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 space-y-4">
              {aiAnalysis.split('\n').map((line, index) => {
                if (line.startsWith('• Workspace:')) {
                  const bookingDetails = aiAnalysis.split('\n')
                    .slice(index, index + 5)
                    .reduce((acc, detail) => {
                      const [label, value] = detail.split(':').map(s => s.trim());
                      if (value) {
                        acc[label.replace('• ', '')] = value;
                      }
                      return acc;
                    }, {});

                  return (
                    <div key={index} className="bg-white dark:bg-gray-700 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-600">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {bookingDetails['Workspace']}
                        </h4>
                        <span className="px-2 py-1 text-sm rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                          Score: {bookingDetails['Behavior Score']?.split(' ')[0] || 'N/A'}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">User:</span>
                          <span className="ml-2 text-gray-900 dark:text-white">{bookingDetails['User']}</span>
                        </div>
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Date:</span>
                          <span className="ml-2 text-gray-900 dark:text-white">{bookingDetails['Date']}</span>
                        </div>
                        <div className="col-span-2">
                          <span className="text-gray-600 dark:text-gray-400">Time:</span>
                          <span className="ml-2 text-gray-900 dark:text-white">{bookingDetails['Time']}</span>
                        </div>
                      </div>
                    </div>
                  );
                }
                return null;
              })}
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setShowAIAnalysis(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
