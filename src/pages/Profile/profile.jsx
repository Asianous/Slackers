import React, { useState } from 'react';
import  {updatePassword}  from '../../utilities/users-service'

function UserProfile() {
  const [profilePicture, setProfilePicture] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [username, setUsername] = useState('');
  const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);

  const handleSubmitChangePassword = (event) => {
    event.preventDefault();

    // Get the values from the form fields
    const oldPassword = event.target.oldPassword.value;
    const newPassword = event.target.newPassword.value;

    // Call the function to change the password
    handleChangePassword(oldPassword, newPassword);

    // Clear the form and hide it
    event.target.reset();
    setShowChangePasswordForm(false);
  };

  const handleChangePassword = async (oldPassword, newPassword) => {
  const response = await updatePassword({oldPassword, newPassword})
    // Here you would call your authentication service or API to change the password
    // Implement proper security measures for changing passwords
    // Display a success message to the user
    console.log(response);
  };


  return (
    <div className="user-profile">
      {/* ...other profile display elements... */}
      <button onClick={() => setShowChangePasswordForm(true)}>Change Password</button>

      {showChangePasswordForm && (
        <form onSubmit={handleSubmitChangePassword}>
          <input type="password" name="oldPassword" placeholder="Old Password" />
          <input type="password" name="newPassword" placeholder="New Password" />
          <button type="submit">Change Password</button>
        </form>
      )}
    </div>
  );
}

export default UserProfile;
