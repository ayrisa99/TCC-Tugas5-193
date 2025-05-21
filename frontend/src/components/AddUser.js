import React, { useState } from 'react';
import axios from "../api/axiosInstance"; // ✅ ini yang sudah terhubung ke interceptor + token
import { useNavigate } from 'react-router-dom';
import "bulma/css/bulma.min.css"; 
import { BASE_URL } from "../utils";

const AddUser = () => {
    const [judul, setJudul] = useState("");
    const [isi, setIsi] = useState("");
    const navigate = useNavigate();

    const saveUser = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`/notes_data/`, {
                judul,
                isi
            });
            navigate("/");
        } catch (error) {
            console.log("Error saving user data:", error);
        }
    };

    return (
        <div className="container">
            <div className="columns is-centered mt-5">
                <div className="column is-half">
                    <div className="box">
                        <h2 className="title is-4 has-text-centered">Tambah Catatan</h2>
                        <form onSubmit={saveUser}>
                            
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
                                        Simpan
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

export default AddUser;