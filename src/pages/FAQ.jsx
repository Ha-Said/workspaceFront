import React from "react";

const FAQ = () => {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
        <h2 className="mb-8 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
          Frequently Asked Questions
        </h2>
        <div className="grid pt-8 text-left border-t border-gray-200 md:gap-16 dark:border-gray-700 md:grid-cols-2">
          <div>
            <div className="mb-10">
              <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
                How can I book a workspace?
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                You can book a workspace through our platform by selecting your preferred coworking space, choosing a date and time, and confirming your reservation.
              </p>
            </div>
            <div className="mb-10">
              <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
                Can I modify or cancel my booking?
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Yes, you can modify or cancel your booking through your account dashboard before the reservation start time.
              </p>
            </div>
            <div className="mb-10">
              <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
                What amenities are available in coworking spaces?
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Amenities vary by coworking space but often include high-speed WiFi, meeting rooms, coffee stations, printers, and private offices.
              </p>
            </div>
          </div>
          <div>
            <div className="mb-10">
              <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
                How do I manage my coworking space on the platform?
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                As a coworking space owner, you can manage bookings, track user activity, and update availability from your admin dashboard.
              </p>
            </div>
            <div className="mb-10">
              <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
                Is there customer support available?
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Yes! If you have any issues, our support team is available to assist you. Simply contact us through the help section.
              </p>
            </div>
            <div className="mb-10">
              <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
                Do I need an account to book a workspace?
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Yes, you need to create an account to book and manage your reservations effectively.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
