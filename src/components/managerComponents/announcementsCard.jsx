import React from 'react';

const AnnouncementsCard = ({ title, description, date }) => {
    return (
        <div className="p-10 w-full bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <div id="defaultTabContent">
                <div className="text-gray-500 dark:text-gray-400 mb-2">{date}</div>
                <h2 className="mb-5 text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">{title}</h2>
                <p className="text-gray-500 dark:text-gray-400">
                    {description}
                </p>
            </div>
        </div>
    );
};

export default AnnouncementsCard;