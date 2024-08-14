// // src/components/UserProfile.js

// import React from 'react';
// import useAuth from '../hooks/useAuth';

// const UserProfile = () => {
//   const { user, logout } = useAuth();

//   const handleLogout = () => {
//     logout({ returnTo: window.location.origin });
//   };

//   return (
//     <div>
//       <h1>User Profile</h1>
//       <img src={user.picture} alt="Profile" />
//       <h2>{user.name}</h2>
//       <p>{user.email}</p>
//       <button onClick={handleLogout}>Logout</button>
//     </div>
//   );
// };

// export default UserProfile;
