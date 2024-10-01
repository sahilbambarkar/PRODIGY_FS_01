import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import GoogleButton from "react-google-button";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useUserAuth } from "../context/UserAuthContext";  // Assuming you have a UserAuthContext for Firebase

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const { logIn, googleSignIn, resetPassword } = useUserAuth();  // You need a resetPassword function
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logIn(email, password);
      navigate("/home");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();
      navigate("/home");
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
    setTimeout(() => {
      setShowPassword(false);
    }, 3000);
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError("Please enter your email to reset password.");
      return;
    }

    try {
      await resetPassword(email);
      setMessage("Password reset link sent to your email.");
      setError("");  // Clear error message if successful
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div
      className="p-4 box"
      style={{
        maxWidth: "400px",
        margin: "auto",
        overflow: "hidden",
        transition: "transform 0.3s ease",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <h2 className="mb-3 text-center font-bold">Login</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {message && <Alert variant="success">{message}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Control
            type="email"
            placeholder="Email address"
            onChange={(e) => setEmail(e.target.value)}
            style={{ marginBottom: "10px" }}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword" className="position-relative">
          <Form.Control
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            style={{ marginBottom: "10px" }}
          />
          <span
            className="position-absolute"
            style={{
              top: "50%",
              right: "10px",
              transform: "translateY(-50%)",
              cursor: "pointer",
              fontSize: "1.25rem",
              zIndex: 2,
            }}
            onClick={handleTogglePassword}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </Form.Group>

        <div className="d-grid gap-2">
          <Button variant="primary" type="submit">
            Log In
          </Button>
        </div>
      </Form>

      <div className="text-center mt-2  ">
        <button
          className="btn btn-link"
          type="button"
          onClick={handleForgotPassword}
          style={{ textDecoration: "underline", cursor: "pointer", color:"red"  }}
        >
          Forgot Password?
        </button>
      </div>

      <hr style={{ margin: "10px 0" }} />

      <div style={{ textAlign: "center", marginBottom: "10px" }}>
        <GoogleButton className="g-btn" type="dark" onClick={handleGoogleSignIn} />
      </div>

      <div className="text-center mt-3">
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
};

export default Login;
