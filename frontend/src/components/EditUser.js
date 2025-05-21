import React, { useState, useEffect, useCallback } from 'react';
import axios from "../api/axiosInstance"; // ✅ ini yang sudah terhubung ke interceptor + token
import { useNavigate, useParams } from 'react-router-dom';
import "bulma/css/bulma.min.css"; 
import { BASE_URL } from "../utils";

const EditUser = () => {
    const [judul, setJudul] = useState("");
    const [isi, setIsi] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    const getUsersByID = useCallback(async () => {
        try {
            const response = await axios.get("/notes_data");
            setJudul(response.data.judul);
            setIsi(response.data.isi);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    }, [id]);

    useEffect(() => {
        getUsersByID();
    }, [getUsersByID]);

    const updateUser = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`/notes_data/${id}`, {
                judul,
                isi
            });
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container">
            <div className="columns is-centered mt-5">
                <div className="column is-half">
                    <div className="box">
                        <h2 className="title is-4 has-text-centered">Edit Catatan</h2>
                        <form onSubmit={updateUser}>
                            
                            <div className="field">
                                <label className="label">Judul</label>
                                <div className="control">
                                    <input 
                                        type="text" 
                                        className="input" 
                                        value={judul} 
                                        onChange={(e) => setJudul(e.target.value)} 
                                        placeholder="Masukkan Judul"
                                        required
                                    />
                                </div>
                            </div>

                            
                            <div className="field">
                                <label className="label">Isi Notes</label>
                                <div className="control">
                                    <textarea 
                                        className="textarea" 
                                        value={isi} 
                                        onChange={(e) => setIsi(e.target.value)} 
                                        placeholder="Masukkan Isi Catatan"
                                        required
                                    ></textarea>
                                </div>
                            </div>

                            
                            <div className="field">
                                <div className="control">
                                    <button type="submit" className="button is-success is-fullwidth">
                                        Update
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditUser;