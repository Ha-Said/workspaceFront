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
            setAnnouncements(response);
        }
        fetchAnnouncements();
    }, []);

    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    return ( 
        <div className="space-y-4">
             <button
                    onClick={() => setShowForm(true)}
                    className="px-2 py-1 text-white bg-blue-600 rounded hover:bg-blue-700"
                  >
                    Post An Announcement
                  </button>
            {showForm && <AnnouncementForm isOpen={showForm} toggleModal={() => setShowForm(false)} />}
            {announcements.map((announcement, index) => (
                <AnnouncementsCard 
                    key={index} 
                    title={announcement.title} 
                    description={announcement.description} 
                    date={formatDate(announcement.date)} 
                />
            ))}
        </div>
    );
}