import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
// import Profile from './components/Profile/Profile';

const Profile = () => {
    // Mock user data (replace with API call or context data)
    const [user, setUser] = useState(null);

    // State for edit functionality
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        // Simulate fetching user data
        const fetchedUser = {
            name: "John Doe",
            email: "johndoe@example.com",
            profilePicture: "https://via.placeholder.com/150"
        };
        setUser(fetchedUser);
    }, []);

    const handleSave = () => {
        // Save updated user data (send to backend)
        alert("Profile updated successfully!");
        setIsEditing(false);
    };

    if (!user) {
        return <p>Loading profile...</p>;
    }

    return (
        <div className="container mt-5">
            <h1 className="text-center">Your Profile</h1>
            <div className="d-flex flex-column align-items-center">
                <img
                    src={user.profilePicture}
                    alt="Profile"
                    className="rounded-circle mb-3"
                    style={{ width: "150px", height: "150px" }}
                />
                {!isEditing ? (
                    <>
                        <h3>{user.name}</h3>
                        <p>Email: {user.email}</p>
                        <button
                            className="btn btn-primary"
                            onClick={() => setIsEditing(true)}
                        >
                            Edit Profile
                        </button>
                    </>
                ) : (
                    <form className="w-50">
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={user.name}
                                onChange={(e) =>
                                    setUser({ ...user, name: e.target.value })
                                }
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                value={user.email}
                                onChange={(e) =>
                                    setUser({ ...user, email: e.target.value })
                                }
                            />
                        </div>
                        <button
                            type="button"
                            className="btn btn-success me-2"
                            onClick={handleSave}
                        >
                            Save
                        </button>
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => setIsEditing(false)}
                        >
                            Cancel
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};
<Route path="/profile" element={<Profile />} />

export default Profile;
