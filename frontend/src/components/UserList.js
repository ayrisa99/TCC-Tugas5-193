import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Card, CardContent, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { BASE_URL } from "../utils";

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/notes_data`);
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const deleteUser = async (id) => {
        try {
            await axios.delete(`${BASE_URL}/notes_data/${id}`);
            getUsers();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div style={{ minHeight: "100vh", backgroundColor: "#f3f4f6" }}>
            
            <div style={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>
                <Card>
                    <CardContent>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                            <h2 style={{ fontSize: "20px", fontWeight: "bold" }}>Daftar Catatan</h2>
                            <Link to="add">
                                <Button variant="contained" color="primary">Tambah Baru</Button>
                            </Link>
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