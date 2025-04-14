import React, { useEffect, useState } from "react";
import { useNotifications } from "../context/notificationsProvider";



export const NotificationList = () => {
const [notifications, setNotifications] = useState([])
    const backendUrl = 'http://localhost:3000';

    const { showNotifications, removeNotification } = useNotifications()

    useEffect(() => {   
        const user_id = localStorage.getItem("user_id");

        const getNotifications = async () => {
            try{
                const response = await fetch(`${backendUrl}/api/getNotifications/${user_id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const data = await response.json();
                console.log(data)
                if (response.ok) {
                    // Assuming the API returns an array of notifications
                    setNotifications(data.notifications)
                    console.log(notifications)
                    console.error("Error fetching notifications:", data);
                }
            }
            catch (error) {    
                console.error("Error fetching notifications:", error);
            }
        }
        getNotifications();
    },[ ]);

    



    return (
        showNotifications &&
        <div className="fixed top-4 right-6 w-80 bg-white shadow-lg rounded-2xl p-4 z-50 ">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Notifications</h2>
            {notifications.length === 0 ? (
                <p className="text-gray-500 text-center text-sm">No notifications available.</p>
            ) : (
                <ul className="space-y-4">
                    {notifications.map((notification) => (
                        <li
                            key={notification.id}
                            className={`flex justify-between items-center p-3 rounded-lg shadow-sm ${
                                notification.type === "success"
                                    ? "bg-green-50 border-l-4 border-green-500"
                                    : notification.type === "error"
                                    ? "bg-red-50 border-l-4 border-red-500"
                                    : notification.type === "warning"
                                    ? "bg-yellow-50 border-l-4 border-yellow-500"
                                    : "bg-gray-50 border-l-4 border-gray-400"
                            }`}
                        >
                            <div className="flex items-center space-x-3">
                                {/* Icon based on notification type */}
                                {notification.type === "success" && (
                                    <span className="text-green-500 text-xl">✔</span>
                                )}
                                {notification.type === "error" && (
                                    <span className="text-red-500 text-xl">✖</span>
                                )}
                                {notification.type === "warning" && (
                                    <span className="text-yellow-500 text-xl">⚠</span>
                                )}
                                {!["success", "error", "warning"].includes(notification.type) && (
                                    <span className="text-gray-500 text-xl">ℹ</span>
                                )}

                                {/* Message and timestamp */}
                                <div>
                                    <h2>{notification.title}</h2>
                                    <p className="text-sm font-medium text-gray-700">
                                        {notification.description}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {new Date(notification.timestamp).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => removeNotification(notification.id)}
                                className="text-red-400 hover:text-red-600 text-xs font-bold focus:outline-none"
                            >
                                Dismiss
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default NotificationList;
