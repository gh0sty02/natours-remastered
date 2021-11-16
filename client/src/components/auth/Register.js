import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../reducers/authSlice";
import { showAlert } from "../utils/alert";

const validate = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = "*Required";
  }
  if (!values.email) {
    errors.email = "*Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "*Required";
  } else if (values.password.length < 8) {
    errors.password = "Enter a Valid Password";
  }
  if (!values.passwordConfirm) {
    errors.passwordConfirm = "*Required";
  } else if (values.password !== values.passwordConfirm) {
    errors.passwordConfirm = "Passwords Dont Match";
  }

  return errors;
};

const Register = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [filename, setFileName] = useState("");
  const { token, loading, error } = useSelector((state) => state.auth);
  const filePickerRef = useRef();

  if (!loading && !error && token) {
    localStorage.setItem("token", token);
    history.push("/");
  }

  useEffect(() => {
    !loading && error && showAlert("error", error.error);
    // eslint-disable-next-line
  }, [error]);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
    validate,
    onSubmit: (values) => {
      let form = {};
      const formData = new FormData();

      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("passwordConfirm", values.passwordConfirm);
      formData.append("image", filename);

      form = {
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
        passwordConfirm: formData.get("passwordConfirm"),
        image: formData.get("image"),
      };

      dispatch(register(form));
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
    <main className="main">
      <div className="login-form">
        <h2 className="heading-secondary ma-bt-lg">Create a New Account</h2>
        <form
          className="form"
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
              id="name"
              type="text"
              name="name"
              placeholder="John Cena"
              required="required"
              value={formik.values.name}
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
          <div className="form__group">
            <label className="form__label" htmlFor="email">
              Email address
            </label>
            <input
              className="form__input"
              id="email"
              type="email"
              name="email"
              placeholder="you@example.com"
              required="required"
              value={formik.values.email}
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

          <div className="form__group ma-bt-md">
            <label className="form__label" htmlFor="password">
              Password
            </label>
            <input
              className="form__input"
              id="password"
              type="password"
              name="password"
              placeholder="••••••••"
              required="required"
              minLength="8"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            {formik.errors.password && (
              <h2
                className="error__msg"
                style={{
                  color: "rgb(224, 113, 16)",
                  fontSize: "1.25rem",
                  textTransform: "uppercase",
                }}
              >
                {formik.errors.password}
              </h2>
            )}
          </div>
          <div className="form__group ma-bt-md">
            <label className="form__label" htmlFor="passwordConfirm">
              Confirm Password
            </label>
            <input
              className="form__input"
              id="passwordConfirm"
              type="password"
              name="passwordConfirm"
              placeholder="••••••••"
              required="required"
              minLength="8"
              value={formik.values.passwordConfirm}
              onChange={formik.handleChange}
            />

            {formik.errors.passwordConfirm && (
              <h2
                className="error__msg"
                style={{
                  color: "rgb(224, 113, 16)",
                  fontSize: "1.25rem",
                  textTransform: "uppercase",
                }}
              >
                {formik.errors.passwordConfirm}
              </h2>
            )}
          </div>
          <div className="form__group ma-bt-md">
            <label className="form__label" htmlFor="image">
              Profile Image
            </label>
            <br />
            <div className="form__group form__photo-upload">
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

              <div className="form__group form__photo-upload">
                <button
                  className="btn-text"
                  type="button"
                  onClick={pickImageHandler}
                >
                  Choose new photo
                </button>
              </div>
            </div>
          </div>
          <div className="form__group">
            <button type="submit" className="btn btn--green">
              Sign up
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Register;
