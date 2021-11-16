import React, { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { changePassword } from "../../reducers/userSlice";
import { showAlert } from "../../utils/alert";

const validate = (values) => {
  const errors = {};

  if (!values.currentPassword) {
    errors.currentPassword = "*Required";
  } else if (values.currentPassword.length < 8) {
    errors.currentPassword = "Enter a Valid Password";
  }
  if (!values.newPassword) {
    errors.newPassword = "*Required";
  } else if (values.newPassword.length < 8) {
    errors.newPassword = "Enter a Valid Password";
  }
  if (!values.newPasswordConfirm) {
    errors.newPasswordConfirm = "*Required";
  } else if (values.newPassword !== values.newPasswordConfirm) {
    errors.newPasswordConfirm = "Passwords Dont Match";
  }

  return errors;
};
const PasswordChange = ({ userId }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    if (!user.loading && user.error) {
      showAlert("error", user.error.error);
    }
    if (!user.loading && !user.error) {
      showAlert("success", "Password Changed Successfully");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.error]);

  // if (!user.loading && user.error) {
  //   showAlert("error", user.error.error);
  // }
  // if (!user.loading && !user.error) {
  //   showAlert("success", "Password Changed Successfully");
  // }

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      newPasswordConfirm: "",
    },
    validate,
    onSubmit: (values) => {
      const formData = {
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      };
      dispatch(changePassword({ userId, formData }));

      // if (user.error) {
      //   setError(user.error);
      // }
      // !error
      //   ? showAlert("success", "Password Changed Successfully")
      //   : showAlert("error", error);
    },
  });
  return (
    <Fragment>
      <div className="user-view__form-container">
        <h2 className="heading-secondary ma-bt-md">Password change</h2>
        <form
          className="form form-user-settings"
          onSubmit={formik.handleSubmit}
        >
          <div className="form__group">
            <label className="form__label" htmlFor="password-current">
              Current password
            </label>
            <input
              className="form__input"
              id="currentPassword"
              name="currentPassword"
              value={formik.values.currentPassword}
              onChange={formik.handleChange}
              type="password"
              placeholder="••••••••"
              required="required"
              onBlur={formik.handleBlur}
              minLength="8"
            />
            {formik.errors.currentPassword && formik.touched.currentPassword && (
              <h2
                className="error__msg"
                style={{
                  color: "rgb(224, 113, 16)",
                  fontSize: "1.25rem",
                  textTransform: "uppercase",
                }}
              >
                {formik.errors.currentPassword}
              </h2>
            )}
          </div>
          <div className="form__group">
            <label className="form__label" htmlFor="password">
              New password
            </label>
            <input
              className="form__input"
              id="newPassword"
              name="newPassword"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              type="password"
              placeholder="••••••••"
              required="required"
              minLength="8"
              onBlur={formik.handleBlur}
            />
            {formik.errors.newPassword && formik.touched.newPassword && (
              <h2
                className="error__msg"
                style={{
                  color: "rgb(224, 113, 16)",
                  fontSize: "1.25rem",
                  textTransform: "uppercase",
                }}
              >
                {formik.errors.newPassword}
              </h2>
            )}
          </div>
          <div className="form__group ma-bt-lg">
            <label className="form__label" htmlFor="password-confirm">
              Confirm password
            </label>
            <input
              className="form__input"
              id="newPasswordConfirm"
              name="newPasswordConfirm"
              value={formik.values.newPasswordConfirm}
              onChange={formik.handleChange}
              type="password"
              placeholder="••••••••"
              required="required"
              onBlur={formik.handleBlur}
              minLength="8"
            />

            {formik.errors.newPasswordConfirm &&
              formik.touched.newPasswordConfirm && (
                <h2
                  className="error__msg"
                  style={{
                    color: "rgb(224, 113, 16)",
                    fontSize: "1.25rem",
                    textTransform: "uppercase",
                  }}
                >
                  {formik.errors.newPasswordConfirm}
                </h2>
              )}
          </div>
          <div className="form__group right">
            <button className="btn btn--small btn--green" type="submit">
              Save password
            </button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default PasswordChange;
