import React, { useState } from "react";
import { db, Storage } from "../../Auth/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { Button, TextField } from "@mui/material";
import UserNavbar from "./../Navbar/UserNavbar";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

const UserProfileContainer = styled.div`
  max-width: 400px;
  margin: 70px auto;
  padding: 20px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 14px;
`;

const SubmitButton = styled(Button)`
  && {
    background-color: #4caf50;
    color: #fff;
    font-weight: 600;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #45a049;
    }
  }
`;

function UserProfile({ user }) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      imgURL: null,
      phoneNo: user && user.phoneNo ? user.phoneNo : "",
      name: user && user.name ? user.name : "",
      email: user && user.email ? user.email : "",
    },
    validationSchema: Yup.object({
      imgURL: Yup.mixed().required("Profile image is required"),
      phoneNo: Yup.string().required("Phone number is required"),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);

        const { imgURL, phoneNo } = values;

        // Upload the image file to Firebase Storage
        const storageRef = ref(Storage, `profileImages/${user.id}`);
        await uploadBytes(storageRef, imgURL);

        // Get the download URL of the uploaded image
        const downloadURL = await getDownloadURL(storageRef);

        // Update the Firestore document with the new values
        const userRef = doc(db, "users", user.id);
        await updateDoc(userRef, {
          imgURL: downloadURL,
          phoneNo: phoneNo,
        });

        setLoading(false);
        toast.success("Profile updated successfully");
        navigate("/userDashboard");
      } catch (error) {
        console.error(error);
        setLoading(false);
        toast.error("An error occurred while updating the profile");
      }
    },
  });

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const blob = new Blob([file], { type: file.type });
      formik.setFieldValue("imgURL", blob);
    }
  };

  return (
    <>
      <UserNavbar user={user} />
      <UserProfileContainer>
        <h1>User Profile</h1>
        <Form onSubmit={formik.handleSubmit}>
          <div className="form-group">
            <label htmlFor="imgURL">Profile Image</label>
            <input
              id="imgURL"
              name="imgURL"
              type="file"
              onChange={handleImageChange}
            />
            {formik.touched.imgURL && formik.errors.imgURL && (
              <ErrorMessage>{formik.errors.imgURL}</ErrorMessage>
            )}
          </div>
          <div className="form-group">
            <TextField
              id="name"
              name="name"
              label="Name"
              variant="outlined"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              disabled
            />
          </div>
          <div className="form-group">
            <TextField
              id="email"
              name="email"
              label="Email"
              variant="outlined"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              disabled
            />
          </div>
          <div className="form-group">
            <TextField
              id="phoneNo"
              name="phoneNo"
              label="Phone Number"
              variant="outlined"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phoneNo}
              error={formik.touched.phoneNo && Boolean(formik.errors.phoneNo)}
              helperText={formik.touched.phoneNo && formik.errors.phoneNo}
            />
          </div>
          <SubmitButton
            variant="contained"
            color="primary"
            type="submit"
            disabled={loading}
          >
            Update
          </SubmitButton>
        </Form>
      </UserProfileContainer>
    </>
  );
}

export default UserProfile;
