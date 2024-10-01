import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useUserAuth } from "../context/UserAuthContext";
import { FaEye, FaEyeSlash } from 'react-icons/fa';  // Importing eye icons

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { signUp } = useUserAuth();
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validate password strength
    if (!validatePassword(password)) {
      setError("Password must be at least 8 characters long and include uppercase letters, lowercase letters, numbers, and special characters.");
      return;
    }

    try {
      await signUp(email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  // Function to validate password strength
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  // Function to toggle the password visibility
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
    setTimeout(() => {
      setShowPassword(false); // Automatically hide the password after 3 seconds
    }, 3000);
  };

  return (
    <div
      className="p-4 box"
      style={{
        maxWidth: '400px',
        margin: 'auto',
        overflow: 'hidden',
        transition: 'transform 0.3s ease',
      }}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >
      <h2 className="mb-3 font-extrabold text-center">Sign Up</h2>
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Control
            type="email"
            placeholder="Email address"
            onChange={(e) => setEmail(e.target.value)}
            style={{ marginBottom: '10px' }}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword" className="position-relative">
          <Form.Control
            type={showPassword ? "text" : "password"}  // Toggle input type
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            style={{ marginBottom: '10px' }}
          />
          {/* Eye Icon to toggle password visibility */}
          <div
            className="position-absolute"
            style={{
              top: '50%',
              right: '10px',
              transform: 'translateY(-50%)',
              cursor: 'pointer'
            }}
            onClick={handleTogglePassword}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </div>
        </Form.Group>

        <div className="d-grid gap-2">
          <Button variant="primary" type="submit">
            Sign Up
          </Button>
        </div>
      </Form>

      <div className="text-center mt-3">
        Already have an account? <Link to="/">Log In</Link>
      </div>
    </div>
  );
};

export default Signup;