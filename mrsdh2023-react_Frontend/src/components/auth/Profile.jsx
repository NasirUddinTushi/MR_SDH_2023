import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { changePasswordSchema } from '@/schemas/auth.schemas';
import { useProfile, useUpdateProfile, useChangePassword, useLogout } from '@/hooks/auth.hook';
import { FaEye, FaEyeSlash, FaUser, FaEnvelope, FaPhone, FaCamera } from 'react-icons/fa';

const Profile = () => {
  const { data: profile, isLoading: profileLoading } = useProfile();
  const { mutate: updateProfile, isPending: updatePending } = useUpdateProfile();
  const { form: changePasswordForm, mutate: changePassword, isPending: changePasswordPending } = useChangePassword();
  const { mutate: logout, isPending: logoutPending } = useLogout();

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors },
    reset: resetPasswordForm,
  } = changePasswordForm;

  const [profileData, setProfileData] = useState({
    name: profile?.data?.name || '',
    email: profile?.data?.email || '',
    phone: profile?.data?.phone || '',
  });

  const [profilePhoto, setProfilePhoto] = useState(null);

  React.useEffect(() => {
    if (profile?.data) {
      setProfileData({
        name: profile.data.name || '',
        email: profile.data.email || '',
        phone: profile.data.phone || '',
      });
    }
  }, [profile]);

  const handleProfileUpdate = () => {
    const formData = new FormData();
    
    if (profilePhoto) {
      formData.append('profile_photo', profilePhoto);
    }
    if (profileData.name) {
      formData.append('name', profileData.name);
    }

    updateProfile(formData);
  };

  const handlePasswordChange = (data) => {
    changePassword(data, {
      onSuccess: () => {
        resetPasswordForm();
      }
    });
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
    }
  };

  if (profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3D4040] mx-auto"></div>
          <p className="mt-4 text-[#3D4040]">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-[#3D4040] px-6 py-4">
            <h1 className="text-2xl font-bold text-white">Profile Settings</h1>
            <p className="text-gray-300">Manage your account information and security</p>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('profile')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'profile'
                    ? 'border-[#3D4040] text-[#3D4040]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Profile Information
              </button>
              <button
                onClick={() => setActiveTab('password')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'password'
                    ? 'border-[#3D4040] text-[#3D4040]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Change Password
              </button>
            </nav>
          </div>

          <div className="p-6">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                {/* Profile Photo */}
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                      {profile?.data?.profile_photo ? (
                        <img
                          src={profile.data.profile_photo}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <FaUser className="w-8 h-8 text-gray-400" />
                      )}
                    </div>
                    <label className="absolute bottom-0 right-0 bg-[#3D4040] text-white p-2 rounded-full cursor-pointer hover:bg-gray-700">
                      <FaCamera className="w-3 h-3" />
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => setProfilePhoto(e.target.files[0])}
                      />
                    </label>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Profile Photo</h3>
                    <p className="text-sm text-gray-500">Click the camera icon to upload a new photo</p>
                  </div>
                </div>

                {/* Profile Form */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3D4040] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        value={profileData.email}
                        disabled
                        className="w-full p-3 pl-10 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        value={profileData.phone}
                        disabled
                        className="w-full p-3 pl-10 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Phone cannot be changed</p>
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    onClick={handleProfileUpdate}
                    disabled={updatePending}
                    className={`px-6 py-2 bg-[#3D4040] text-white rounded-lg hover:bg-gray-800 transition ${
                      updatePending ? 'opacity-60 cursor-not-allowed' : ''
                    }`}
                  >
                    {updatePending ? 'Updating...' : 'Update Profile'}
                  </button>
                </div>
              </div>
            )}

            {/* Password Tab */}
            {activeTab === 'password' && (
              <form onSubmit={handlePasswordSubmit(handlePasswordChange)} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      type={showCurrentPassword ? 'text' : 'password'}
                      placeholder="Enter current password"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3D4040] focus:border-transparent pr-10"
                      {...registerPassword('current_password')}
                    />
                    <span
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                    >
                      {showCurrentPassword ? <FaEye /> : <FaEyeSlash />}
                    </span>
                  </div>
                  {passwordErrors.current_password && (
                    <p className="text-sm text-red-500 mt-1">
                      {passwordErrors.current_password.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      placeholder="Enter new password"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3D4040] focus:border-transparent pr-10"
                      {...registerPassword('new_password')}
                    />
                    <span
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                    >
                      {showNewPassword ? <FaEye /> : <FaEyeSlash />}
                    </span>
                  </div>
                  {passwordErrors.new_password && (
                    <p className="text-sm text-red-500 mt-1">
                      {passwordErrors.new_password.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Confirm new password"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3D4040] focus:border-transparent pr-10"
                      {...registerPassword('confirm_password')}
                    />
                    <span
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                    >
                      {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                    </span>
                  </div>
                  {passwordErrors.confirm_password && (
                    <p className="text-sm text-red-500 mt-1">
                      {passwordErrors.confirm_password.message}
                    </p>
                  )}
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => resetPasswordForm()}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={changePasswordPending}
                    className={`px-6 py-2 bg-[#3D4040] text-white rounded-lg hover:bg-gray-800 transition ${
                      changePasswordPending ? 'opacity-60 cursor-not-allowed' : ''
                    }`}
                  >
                    {changePasswordPending ? 'Changing...' : 'Change Password'}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Logout Button */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              disabled={logoutPending}
              className={`px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition ${
                logoutPending ? 'opacity-60 cursor-not-allowed' : ''
              }`}
            >
              {logoutPending ? 'Logging out...' : 'Logout'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;


