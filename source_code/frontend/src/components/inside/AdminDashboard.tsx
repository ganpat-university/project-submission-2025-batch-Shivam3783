// frontend/src/components/ui/AdminDashboard.tsx
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";


interface UserActivity {
  user_id: string;
  email: string;
  event: string;
  timestamp: string;
  wishlist: { name: string; symbol: string }[];
}
const backendUrl = import.meta.env.VITE_BACKEND_FLASK_URL; // Make sure to set your backend URL in .env

const AdminDashboard: React.FC = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [userActivities, setUserActivities] = useState<UserActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is admin
    // if (user?.id !== "user_2vKuVuCtr64QbBIJnmVa71SwaVh") {
    //   navigate("/");
    //   return;

    const allowedUserIds = [
      "user_2vKuVuCtr64QbBIJnmVa71SwaVh",
      "user_2sRMtFIWMnQEulpPi82H04CCLPa",
      "user_2t497lCaXPnGwJldGyULcCc1H9S",
      "user_2ujK4aGw3bJ1pzd2XjqlPHOFPn3",
    ];
    
    if (!allowedUserIds.includes(user?.id)) {
      navigate("/");
      return;
    
    }

    const fetchActivities = async () => {
      try {
        // const res = await fetch("http://localhost:5000/clerk/user-activity", {
          const res = await fetch(`${backendUrl}/clerk/user-activity`, {
          headers: {
            'X-User-Id': user.id
          }
        });
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data: UserActivity[] = await res.json();
        console.log("Fetched user-activity:", data); // Check here in the browser console
        setUserActivities(data);
      } catch (err) {
        console.error("Error fetching user activity:", err); // Log the error
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, [user, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-2xl font-semibold text-gray-600 animate-pulse">
          Loading user activities...
        </div>
      </div>
    );
  }

  if (!loading && userActivities.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600">
        No user activity data found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          User Activity Dashboard
        </h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase">
                  Event
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase">
                  Timestamp
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase">
                  Wishlist
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {userActivities.map((activity) => (
                <tr key={activity.user_id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {activity.email}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {activity.event}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {activity.timestamp}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    <ul className="list-disc pl-5">
                      {activity.wishlist.map((item, i) => (
                        <li key={i}>
                          {item.name} ({item.symbol})
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
