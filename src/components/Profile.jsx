import { useState, useEffect } from "react";
import { profile } from "../assets/icons";
import { firebase } from "../firebaseConfig";
import axios from "axios";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const Profile = ({ region, houseStreet, recipient, staffFullname, phoneNumber, email, username, contactPerson, updateAPI, getApi, titleHeader }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    // Fetch the user's profile picture from the database
    const fetchProfilePicture = async () => {
      try {
        // const response = await axios.get(`http://localhost:3000/api/get-profile-picture/${username}`);
        const response = await axios.get(`https://online-shop-server-1.onrender.com/${getApi}/${username}`);
        if (response.data.profilePicture) {
          setSelectedImage(response.data.profilePicture); // Set the fetched image
        }
      } catch (error) {
        console.error("Error fetching profile picture:", error);
      }
    };

    fetchProfilePicture();
  }, [username]);

  const pickImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file)); // Preview image
      setImageFile(file);
    }
  };

  const uploadImage = async () => {
    if (!imageFile) {
      MySwal.fire({
        icon: "warning",
        title: "No Image Selected",
        text: "Please select an image first.",
        confirmButtonColor: "#3B82F6",
      });
      return;
    }
    setUploading(true);

    try {
      // Upload image to Firebase Storage
      const storageRef = firebase.storage().ref();
      const fileRef = storageRef.child(`profile_pictures/${username}_${Date.now()}`);
      await fileRef.put(imageFile);
      const downloadURL = await fileRef.getDownloadURL();

      // Update profile picture URL in MongoDB
      // await axios.post("http://localhost:3000/api/update-profile-picture", {
      await axios.post(`https://online-shop-server-1.onrender.com/${updateAPI}`, {
        username,
        profilePicture: downloadURL,
      });

      setSelectedImage(downloadURL); // Update the displayed image
      MySwal.fire({
        icon: "success",
        title: "Profile Updated",
        text: "Profile picture updated successfully!",
        confirmButtonColor: "#3B82F6",
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      MySwal.fire({
        icon: "error",
        title: "Upload Failed",
        text: "Failed to update profile picture.",
        confirmButtonColor: "#3B82F6",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex space-x-10 max-md:flex-col max-md:space-y-3 w-full">
      <div className="bg-white xl:w-3/12 lg:w-5/12 max-md:w-full rounded-2xl px-3 pt-12 pb-7 flex items-center justify-center flex-col">
        <div className="w-24 h-24 flex items-center justify-center border-[2.5px] border-[#3B82F6] rounded-full">
          <img
            src={selectedImage || profile}
            alt="profile"
            className="w-20 h-20 object-cover my-4 rounded-full"
          />
        </div>
        <p className="text-base mt-5">{recipient || staffFullname}</p>
        <div className="flex w-full lg:space-x-2 max-lg:flex-col space-y-2 items-center ">
          <input type="file" accept="image/*" onChange={pickImage} className="hidden" id="profile-upload" />
          <label
            htmlFor="profile-upload"
            className="w-full bg-black mt-2 text-white py-2 rounded-xl hover:bg-[#454545] cursor-pointer active:opacity-65 text-center text-base"
          >
            Edit profile
          </label>

          <button
            onClick={uploadImage}
            className="w-full bg-[#656565] text-white py-2 rounded-xl hover:bg-[#767676] cursor-pointer active:opacity-65 text-base"
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Save"}
          </button>
        </div>

      </div>

      <div className="w-8/12 max-lg:w-7/12 max-md:w-full bg-white rounded-2xl py-5 px-7 space-y-1">
        <h2 className="text-2xl font-bold text-[#444B59] my-2">{titleHeader}</h2>
        {contactPerson ? <p className="text-gray-700 text-base">Contact Person: <span className="text-black font-semibold">{contactPerson}</span></p> : null}
        {email ? <p className="text-gray-700 text-base">Email: <span className="text-black font-semibold">{email}</span></p> : null}
        <p className="text-gray-700 text-base">Region: <span className="text-black font-semibold">{region}</span></p>
        <p className="text-gray-700 text-base">House Street: <span className="text-black font-semibold">{houseStreet}</span></p>
        <p className="text-gray-700 text-base">Phone Number: <span className="text-black font-semibold">{phoneNumber}</span></p>
      </div>
    </div>
  );
};

export default Profile;