// see SignupForm.js for comments
import React, { useState } from "react";
import { Link } from "react-router-dom";
// import { Form, Button, Alert } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutation";
import Auth from "../utils/auth";

const LoginForm = () => {
  const [userFormData, setUserFormData] = useState({ email: "", password: "" });
  const [login, { error, data }] = useMutation(LOGIN_USER);
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(userFormData);
    try {
      const { data } = await login({
        variables: { ...userFormData },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setUserFormData({
      email: "",
      password: "",
    });
  };

  // check if form has everything (as per react-bootstrap docs)
  // const form = event.currentTarget;
  // if (form.checkValidity() === false) {
  //   event.preventDefault();
  //   event.stopPropagation();
  // }

  // try {
  //   const response = await login(userFormData);

  //   if (!response.ok) {
  //     throw new Error("something went wrong!");
  //   }

  //   const { token, user } = await response.json();
  //   console.log(user);
  //   Auth.login(token);
  // } catch (err) {
  //   console.error(err);
  //   setShowAlert(true);
  // }

  // setUserFormData({
  //   username: "",
  //   email: "",
  //   password: "",
  // });
  // };

  return (
    <div className="card-body">
      {data ? (
        <p>
          Success! You may now head <Link to="/">back to the homepage.</Link>
        </p>
      ) : (
        <form onSubmit={handleFormSubmit}>
          <input
            className="form-input"
            placeholder="Your email"
            name="email"
            type="email"
            value={userFormData.email}
            onChange={handleInputChange}
          />
          <input
            className="form-input"
            placeholder="******"
            name="password"
            type="password"
            value={userFormData.password}
            onChange={handleInputChange}
          />
          <button
            className="btn btn-block btn-info"
            style={{ cursor: "pointer" }}
            type="submit"
          >
            Submit
          </button>
        </form>
      )}

      {error && (
        <div className="my-3 p-3 bg-danger text-white">{error.message}</div>
      )}
    </div>
  );
};

export default LoginForm;
