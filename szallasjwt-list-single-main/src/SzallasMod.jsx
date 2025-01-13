import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export const SzallasMod = () => {
    const { id } = useParams(); // Extracting the id from the URL
    const navigate = useNavigate();
    const [szallas, setSzallas] = useState({
        name: '',
        ad: '',
        city: '',
        price: 0,
        nightsnum: 0,
    });

    useEffect(() => {
        const fetchSzallasData = async () => {
            try {
                const response = await axios.get(`https://szallasjwt.sulla.hu/data/${id}`);
                setSzallas(response.data);
            } catch (error) {
                console.log('Error fetching szallas data:', error);
            }
        };

        fetchSzallasData();
    }, [id]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setSzallas((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put(`https://szallasjwt.sulla.hu/data/${id}`, szallas)
            .then(() => {
                navigate('/SzallasList');
            })
            .catch((error) => {
                console.log('Error updating szallas data:', error);
            });
    };

    return (
        <div className="p-5 content bg-whitesmoke text-center">
            <h2>Szállás módosítása</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label">Szállás neve:</label>
                    <div className="col-sm-9">
                        <input 
                            type="text" 
                            name="name" 
                            className="form-control" 
                            value={szallas.name} 
                            onChange={handleInputChange} 
                        />
                    </div>
                </div>
                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label">Hírdetés helye:</label>
                    <div className="col-sm-9">
                        <input 
                            type="text" 
                            name="ad" 
                            className="form-control" 
                            value={szallas.ad} 
                            onChange={handleInputChange} 
                        />
                    </div>
                </div>
                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label">Város neve:</label>
                    <div className="col-sm-9">
                        <input 
                            type="text" 
                            name="city" 
                            className="form-control" 
                            value={szallas.city} 
                            onChange={handleInputChange} 
                        />
                    </div>
                </div>
                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label">Ára:</label>
                    <div className="col-sm-9">
                        <input 
                            type="number" 
                            name="price" 
                            className="form-control" 
                            value={szallas.price} 
                            onChange={handleInputChange} 
                        />
                    </div>
                </div>
                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label">Éjszakák száma:</label>
                    <div className="col-sm-9">
                        <input 
                            type="number" 
                            name="nightsnum" 
                            className="form-control" 
                            value={szallas.nightsnum} 
                            onChange={handleInputChange} 
                        />
                    </div>
                </div>
                <button type="submit" className="btn btn-success">
                    Módosítás
                </button>
            </form>
        </div>
    );
};
