import React, { useEffect, useState } from "react";
import AnnouncementsCard from "../../components/userComponents/announcementsCard";
import { getAllAnnouncements } from "../../ApiCalls/apiCalls";

export default function Announcements() {
    const [announcements, setAnnouncements] = useState([]);

    useEffect(() => {
        async function fetchAnnouncements() {
            const response = await getAllAnnouncements();
            const sortedAnnouncements = response.sort((a, b) => new Date(a.date) - new Date(b.date));
            setAnnouncements(sortedAnnouncements);
        }
        fetchAnnouncements();
    }, []);

    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    return ( 
        <div className="space-y-4">
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