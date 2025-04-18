import React, { useEffect, useState } from "react";
import AnnouncementsCard from "../../components/managerComponents/announcementsCard";
import { getAllAnnouncements } from "../../ApiCalls/apiCalls";
import { AnnouncementForm } from "../../components/managerComponents/createAnnouncement";

export default function ManagerAnnouncements() {
    const [announcements, setAnnouncements] = useState([]);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        async function fetchAnnouncements() {
            const response = await getAllAnnouncements();
            const sortedAnnouncements = response.sort((a, b) => new Date(b.date) - new Date(a.date));
            setAnnouncements(sortedAnnouncements);
        }
        fetchAnnouncements();
    }, []);

    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    return ( 
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Announcements
                </h1>
                <button
                    onClick={() => setShowForm(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                    <span>Post Announcement</span>
                </button>
            </div>

            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full mx-4">
                        <AnnouncementForm isOpen={showForm} toggleModal={() => setShowForm(false)} />
                    </div>
                </div>
            )}

            <div className="space-y-6">
                {announcements.length === 0 ? (
                    <div className="text-center py-12">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                        <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">No announcements yet</h3>
                        <p className="mt-1 text-gray-500 dark:text-gray-400">Get started by posting your first announcement.</p>
                    </div>
                ) : (
                    announcements.map((announcement, index) => (
                        <AnnouncementsCard 
                            key={index} 
                            title={announcement.title} 
                            description={announcement.description} 
                            date={formatDate(announcement.date)} 
                        />
                    ))
                )}
            </div>
        </div>
    );
}