import React, { useState } from "react";
import { Button, TextField, Card, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "../api/axiosInstance"; // pastikan path ini benar
import { useNavigate } from "react-router-dom"; // tambahkan di atas

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

 const handleRegister = async (e) => {
  e.preventDefault();
  if (password !== confirmPassword) {
    alert("Password dan konfirmasi password tidak cocok!");
    return;
  }

  try {
    await axios.post("/register", {
      username,
      email,
      password,
      confirmPassword,
    });

    alert("Registrasi berhasil! Silakan login.");
    navigate("/"); // Redirect ke halaman login
  } catch (err) {
    console.error(err);
    alert(err.response?.data?.msg || "Gagal registrasi");
  }
};

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f3f4f6", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Card sx={{ padding: 4, maxWidth: 400, width: "100%" }}>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            Register
          </Typography>
          <form onSubmit={handleRegister}>
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
              label="Email"
              type="email"
              variant="outlined"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              variant="outlined"
              margin="normal"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Register
            </Button>
          </form>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Already have an account? <Link to="/">Login</Link>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;