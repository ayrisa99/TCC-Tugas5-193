import React, { useState, useEffect } from "react";
import axios from "../api/axiosInstance"; // axios instance dengan interceptor
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../auth/useAuth";  // import hook auth
import { Button, Card, CardContent, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const { logout } = useAuth();   // dapatkan fungsi logout dari context
  const navigate = useNavigate(); // untuk redirect

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await axios.get("/notes_data");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`/notes_data/${id}`); // perbaikan template literal backtick
      getUsers();
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();   // panggil logout dari context
      navigate("/");    // redirect ke halaman login
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f3f4f6" }}>
      <div style={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>
        <Card>
          <CardContent>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h2 style={{ fontSize: "20px", fontWeight: "bold" }}>Daftar Catatan</h2>
              <div>
                <Link to="add">
                  <Button variant="contained" color="primary" style={{ marginRight: 10 }}>
                    Tambah Baru
                  </Button>
                </Link>
                <Button variant="outlined" color="secondary" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            </div>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontWeight: "bold" }}>No</TableCell>
                  <TableCell style={{ fontWeight: "bold" }}>Judul</TableCell>
                  <TableCell style={{ fontWeight: "bold" }}>Isi</TableCell>
                  <TableCell style={{ fontWeight: "bold" }}>Aksi</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user, index) => (
                  <TableRow key={user.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{user.judul}</TableCell>
                    <TableCell>{user.isi}</TableCell>
                    <TableCell>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <Link to={`edit/${user.id}`}>
                          <Button variant="contained" color="info" size="small">Edit</Button>
                        </Link>
                        <Button variant="contained" color="error" size="small" onClick={() => deleteUser(user.id)}>
                          Hapus
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserList;
