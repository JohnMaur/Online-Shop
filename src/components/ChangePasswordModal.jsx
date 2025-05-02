import React, { useState } from "react";
import { Modal, Input } from "antd"; // Keep Modal or replace it with a custom one
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ChangePasswordModal = ({ isVisible, onClose, username, getApi }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePasswordChange = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error("All fields are required.");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(`https://online-shop-server-1.onrender.com/${getApi}`, {
        username,
        oldPassword,
        newPassword,
      });

      if (response.status === 200) {
        toast.success("Password changed successfully!");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
        onClose();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to change password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Modal title="Change Password" open={isVisible} onCancel={onClose} footer={null} centered>
        <div className="space-y-4">
          <Input.Password
            placeholder="Old Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <Input.Password
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <Input.Password
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-700 disabled:opacity-50 cursor-pointer"
            onClick={handlePasswordChange}
            disabled={loading}
          >
            {loading ? "Changing..." : "Change Password"}
          </button>
        </div>
      </Modal>
    </>
  );
};

export default ChangePasswordModal;
