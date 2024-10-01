import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";

const Home = () => {
  const { logOut, user } = useUserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
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
      <div className="text-center">
        <h2>Hello</h2>
        {user && <p>{user.email}</p>}
      </div>

      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <img src="/a.gif" alt="Welcome" style={{ width: '100%', borderRadius: '10px' }} />
      </div>

      <div className="d-grid gap-2">
        <Button variant="primary" onClick={handleLogout}>
          Log out
        </Button>
      </div>
    </div>
  );
};

export default Home;