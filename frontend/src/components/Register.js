import React, { useState } from "react";
import { Button, TextField, Card, CardContent, Typography, Snackbar, Alert } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "../api/axiosInstance"; // pastikan path ini benar
import { useNavigate } from "react-router-dom"; // tambahkan di atas
import Snackbar from "@mui/material/Snackbar";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

    // Snackbar states
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [snackbarType, setSnackbarType] = useState("success"); // "succ

const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setSnackbarMsg("Password dan konfirmasi password tidak cocok!");
      setSnackbarType("error");
      setSnackbarOpen(true);
      return;
    }

    try {
      await axios.post("/register", {
        username,
        email,
        password,
        confirmPassword,
      });

      setSnackbarMsg("Registrasi berhasil! Silakan login.");
      setSnackbarType("success");
      setSnackbarOpen(true);

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      setSnackbarMsg(err.response?.data?.msg || "Gagal registrasi");
      setSnackbarType("error");
      setSnackbarOpen(true);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f3f4f6",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
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

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarType}
          sx={{ width: "100%" }}
        >
          {snackbarMsg}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Register;