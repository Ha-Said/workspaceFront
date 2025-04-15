import { useState, useEffect, useRef } from "react";
import { markNotificationSeen, getNotifications, markMultipleAsRead } from "../../ApiCalls/apiCalls"; 

const NotificationComponent = ({ userId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]); 
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const notificationsData = await getNotifications(userId); 
        setNotifications(notificationsData);
      } catch (error) {
        console.error("Error fetching notifications", error);
      }
    };
    fetchNotifications();
  }, [userId]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleMarkAsSeen = async () => {
    try {
      const unreadNotifications = notifications.filter(notification => !notification.isRead);
      
      const unreadNotificationIds = unreadNotifications.map((notification) => notification._id);

      if (unreadNotificationIds.length > 0) {
        console.log("Sending unread notification IDs:", unreadNotificationIds);
        // Send the array of IDs to markMultipleAsRead API
        await markMultipleAsRead({ ids: unreadNotificationIds });
        
        const updatedNotifications = notifications.map((notification) => ({
          ...notification,
          isRead: true 
        }));
        setNotifications(updatedNotifications);
      }
    } catch (error) {
      console.error("Error marking notifications as seen", error);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) {
            handleMarkAsSeen(); // Mark notifications as seen when opened
          }
        }}
        className="relative inline-flex items-center p-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        <svg
          className="w-4 h-4"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 16"
        >
          <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
          <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
        </svg>
        <span className="sr-only">Notifications</span>
        <div className="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-1.5 -end-1.5 dark:border-gray-900">
          {notifications.filter((notification) => !notification.isRead).length} {/* Show unread notifications count */}
        </div>
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg p-2 z-50 max-h-80 overflow-y-auto">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div 
                key={notification._id} 
                className={`p-2 border-b last:border-none ${notification.isRead ? 'bg-gray-50' : 'bg-white'}`}
              >
                <h4 className="text-sm font-bold">{notification.title}</h4>
                <p className="text-xs text-gray-600">{notification.message}</p>
              </div>
            ))
          ) : (
            <div className="p-2 text-center text-gray-500">No notifications</div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationComponent;