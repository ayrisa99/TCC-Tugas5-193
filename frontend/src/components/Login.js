import React, { useState } from "react";
import { Button, TextField, Card, CardContent, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); 

 const handleLogin = (e) => {
    e.preventDefault();

    // Contoh validasi sederhana, bisa kamu ganti sesuai backend kamu
    if (username && password) {
      // Simulasi login sukses, arahkan ke /users
      navigate("/users");
    } else {
      alert("Please enter username and password");
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f3f4f6", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Card sx={{ padding: 4, maxWidth: 400, width: "100%" }}>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            Login
          </Typography>
          <form onSubmit={handleLogin}>
            <TextField
              fullWidth
              label="Username"
              variant="outlined"
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Sign in
            </Button>
          </form>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Don’t have an account? <Link to="/register">Register</Link>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
