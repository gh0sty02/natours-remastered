/* eslint-disable*/
import React, { Fragment, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { login, tokenLogin } from "../reducers/authSlice";
import { showAlert, hideAlert } from "../utils/alert";

const validate = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 8) {
    errors.password = "Enter a Valid Password";
  }

  return errors;
};

let errorAlert;

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { error, loading, token } = useSelector((state) => state.auth);

  useEffect(() => {
    {
      !loading && error && showAlert("error", error.error);
    }
  }, [error]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: (values) => {
      const formData = { email: values.email, password: values.password };
      dispatch(login(formData));
    },
  });
  if (!loading && !error && token) {
    localStorage.setItem("token", token);
    dispatch(tokenLogin());
    history.push("/");
  }

  return (
    <Fragment>
      <main className="main">
        <div className="login-form">
          <h2 className="heading-secondary ma-bt-lg">Log into your account</h2>
          <form className="form" onSubmit={formik.handleSubmit}>
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
                  {formik.errors.password}{" "}
                </h2>
              )}
            </div>
            <div className="form__group">
              <button
                className="btn btn--green"
                type="submit"
                onClick={formik.handleSubmit}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </main>
    </Fragment>
  );
};

export default Login;
