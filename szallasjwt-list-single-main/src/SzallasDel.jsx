import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, NavLink } from 'react-router-dom';

export const SzallasDel = () => {
    const params = useParams();
    const id = params.szallasId;
    const navigate = useNavigate();
    const [szallas, setSzallas] = useState(null);
    const [isPending, setPending] = useState(false);

    useEffect(() => {
        setPending(true);
        (async () => {
            try {
                const valasz = await fetch(`https://szallasjwt.sulla.hu/data/${id}`);
                const szallasData = await valasz.json();
                setSzallas(szallasData);
            } catch (error) {
                console.log(error)
            } finally {
                setPending(false);
            }
        })();
    }, [id]);

    const handleDelete = async (event) => {
        event.preventDefault();
        try {
            await fetch(`https://szallasjwt.sulla.hu/data/${id}`, {
                method: 'DELETE',
            });
            navigate('/szallasok');
        } catch (error) {
           console.log(error)
        }
    };

    return (
        <div className="p-5 m-auto text-center content bg-lavender">
            {isPending || !szallas ? (
                <div className="spinner-border"></div>
            ) : (
                <div className="card p-3">
                    <div className="card-body">
                        <h5 className="card-title">Törlendő szállás: {szallas.name}</h5>
                        <div className="lead">Hírdetés: {szallas.ad}</div>
                        <div className="lead">Város: {szallas.city}</div>
                        <div className="lead">Ár: {szallas.price}</div>
                        <div className="lead">Éjszakák: {szallas.nightsnum}</div>
                    </div>
                    <form onSubmit={handleDelete}>
                        <div>
                            <NavLink to="/szallasok">
                                <button type="button" className="bi bi-backspace">
                                    &nbsp;Mégsem
                                </button>
                            </NavLink>
                            &nbsp;&nbsp;
                            <button type="submit" className="bi bi-trash3">
                                &nbsp;Törlés
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};
