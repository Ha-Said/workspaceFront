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
                    type="button"
                    className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    id="user-menu-button"
                    
                  >qsdqsdqdqdqdqdqdqdqdqdqd </button>
            {showForm && <AnnouncementForm onClose={() => setShowForm(false)} />}
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