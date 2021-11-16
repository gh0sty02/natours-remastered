import { useFormik } from "formik";
import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserByUserId } from "../../reducers/userSlice";
import { showAlert } from "../../utils/alert";

const validate = (values) => {
  const errors = {};

  if (values.name === 0) {
    errors.name = "*Required";
  }

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  return errors;
};
const AccountSettings = ({ userId }) => {
  const [filename, setFileName] = useState();
  const filePickerRef = useRef();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const formik = useFormik({
    initialValues: {
      userName: user.name,
      email: user.email,
    },
    validate,
    onSubmit: (values) => {
      let form = {};
      const formData = new FormData();

      formData.append("userName", values.userName);
      formData.append("email", values.email);
      formData.append("image", filename);

      form = {
        name: formData.get("userName"),
        email: formData.get("email"),
        image: formData.get("image"),
      };

      dispatch(updateUserByUserId({ userId, form }));

      ////////////////

      showAlert("success", "Account Updated Successfully");
    },
  });

  const onChangeImage = (e) => {
    e.preventDefault();

    setFileName(e.target.files[0]);
  };

  const pickImageHandler = (e) => {
    e.preventDefault();
    filePickerRef.current.click();
  };

  return (
    <div className="user-view__form-container">
      <h2 className="heading-secondary ma-bt-md">Your account settings</h2>
      <form
        className="form form-user-data"
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit(e);
        }}
        encType="multipart/form-data"
      >
        <div className="form__group">
          <label className="form__label" htmlFor="name">
            Name
          </label>
          <input
            className="form__input"
            id="userName"
            type="text"
            value={formik.values.userName}
            required="required"
            onChange={formik.handleChange}
          />
          {formik.errors.name && (
            <h2
              className="error__msg"
              style={{
                color: "rgb(224, 113, 16)",
                fontSize: "1.25rem",
                textTransform: "uppercase",
              }}
            >
              {formik.errors.name}
            </h2>
          )}
        </div>
        <div className="form__group ma-bt-md">
          <label className="form__label" htmlFor="email">
            Email address
          </label>
          <input
            className="form__input"
            id="email"
            type="email"
            value={formik.values.email}
            required="required"
            onChange={formik.handleChange}
          />
          {formik.errors.email && (
            <h2
              className="error__msg"
              style={{
                color: "rgb(224, 113, 16)",
                fontSize: "1.25rem",
                textTransform: "uppercase",
              }}
            >
              {formik.errors.email}
            </h2>
          )}
        </div>
        <div className="form__group form__photo-upload">
          {user && (
            <img
              className="form__user-photo"
              src={`${process.env.REACT_APP_ASSESTS_URL}${user.image}`}
              alt=""
            />
          )}{" "}
          <input
            type="file"
            id="photo"
            className="btn-text"
            filename="photo"
            onChange={onChangeImage}
            ref={filePickerRef}
            style={{ display: "none" }}
            accept=".jpg, .jpeg, .png"
          />
          {filename && filename.name}
          <button className="btn-text" onClick={pickImageHandler}>
            Choose new photo
          </button>
        </div>
        <div className="form__group right">
          <button className="btn btn--small btn--green" type="submit">
            Save settings
          </button>
        </div>
      </form>
    </div>
  );
};

export default AccountSettings;
