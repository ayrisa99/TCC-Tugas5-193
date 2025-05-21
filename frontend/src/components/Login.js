import React, { useState } from "react";
import { Button, TextField, Card, CardContent, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); 

 const handleLogin = async (e) => {
  e.preventDefault();

  if (!username || !password) {
    alert("Please enter username and password");
    return;
  }

  try {
    const response = await axios.post(
      "https://backend-193-174534490336.us-central1.run.app/login",
      { username, password },
      { withCredentials: true }
    );

    const { accessToken } = response.data;

    // ✅ Simpan token di localStorage dan ke state global kamu (misalnya useAuth)
    localStorage.setItem("token", accessToken);
    console.log("✅ Login berhasil:", accessToken);
    navigate("/notes_data"); // atau halaman lain

  } catch (error) {
    console.error("❌ Login gagal:", error.response?.data?.msg || error.message);
    alert(error.response?.data?.msg || "Login failed");
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
