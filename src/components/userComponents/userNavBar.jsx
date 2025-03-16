import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import calendar from '../../assets/calendar.svg';
import community from '../../assets/community.svg';
import rooms from '../../assets/room.svg';
import {logoutUser} from '../../ApiCalls/apiCalls';
export function UserNavbar() {
  const location = useLocation();
  const currentPath = location.pathname;
  const [user, setUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Schedule', path: '/user/schedule', icon: calendar },
    { name: 'Announcements', path: '/user/announcements', icon: community },
    { name: 'Spaces', path: '/user/spaces', icon: rooms },
  ];

  const activePage = navLinks.find((link) => link.path === currentPath);
  const activePageTitle = activePage ? activePage.name : 'Dashboard';

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsUserMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
          setUser(storedUser);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="min-h-full">
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                onClick={toggleMobileMenu}
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              <h1 className="text-lg font-semibold text-gray-900 dark:text-white">{activePageTitle}</h1>
            </div>
            <div className="flex items-center">
              <div className="flex items-center ml-3">
                <div>
                  <button
                    type="button"
                    className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                  >
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="w-8 h-8 rounded-full"
                      src={user?.photo ? `http://localhost:5000/${user.photo}` : 'http://localhost:5000/uploads/placeholder.jpg'}
                      alt="user photo"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/path/to/default/photo.jpg';
                      }}
                    />
                  </button>
                </div>
                <div
                  className={`z-50 mt-2 text-base list-none bg-white divide-y divide-gray-100 rounded-sm shadow-sm dark:bg-gray-700 dark:divide-gray-600 ${
                    isUserMenuOpen ? 'block' : 'hidden'
                  }`}
                  id="dropdown-user"
                >
                  <div className="px-4 py-3">
                    <p className="text-sm text-gray-900 dark:text-white">
                      {user?.name || 'User Name'}
                    </p>
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300">
                      {user?.email || 'user@example.com'}
                    </p>
                  </div>
                  <ul className="py-1">
                    <li>
                      <Link
                        to="/user/dashboard"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/user/settings"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Settings
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/user/earnings"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Earnings
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/logout"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        onClick={() => {
                          logoutUser();
                          window.location.href = '/login';
                        }}
                      >
                        Sign out
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}
        aria-label="Sidebar"
      >
        <div className="h-full flex flex-col px-3 pb-4 overflow-y-auto">
  <ul className="space-y-2 font-medium">
    {navLinks.map((link) => (
      <li key={link.name}>
        <Link
          to={link.path}
          className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
            currentPath === link.path ? 'bg-indigo-600 text-white' : ''
          }`}
        >
          <img
            src={link.icon}
            alt={`${link.name} icon`}
            className="inline-block h-5 w-5 mr-2"
          />
          <span className="ml-3">{link.name}</span>
        </Link>
      </li>
    ))}
  </ul>
  
  {/* Push this to the bottom */}
  
  <Link to="/user/settings" className="mt-auto flex items-center p-2 font-bold text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700  ">
  Settings
   </Link>
  <Link
    className="flex items-center p-2 font-bold text-red-900 rounded-lg dark:text-red hover:bg-gray-100 dark:hover:bg-red-700 mb-15"
    onClick={() => {
      logoutUser();
      window.location.href = '/login';
    }}
  >
    Logout
  </Link>
</div>
      </aside>
    </div>
  );
}
