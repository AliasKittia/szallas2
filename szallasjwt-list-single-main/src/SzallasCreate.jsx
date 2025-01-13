import React from "react";
import { useNavigate } from "react-router-dom";


export const SzallasCreate=()=>{
    const navigate = useNavigate();
    return (
        <div className="p-5 content bg-whitesmoke text-center">
            <h2>Új szállás</h2>
            <form onSubmit={(event) =>{
                event.persist();
                event.preventDefault();
                fetch(`https://szallasjwt.sulla.hu/data/`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: event.target.elements.name.value,
                        ad: event.target.elements.ad.value,
                        city: event.target.elements.city.value,
                        price: event.target.elements.price.value,
                        nightsnum: event.target.elements.nightsnum.value,
                    }),
                })

                .then(() => 
                    {
                        navigate("/SzallasList");
                    })
                .catch(console.log);
            }}>
                <div className="form-group row pb-3">
                <label className="col-sm-3 col-form-label">Szállás neve:</label>
                <div className="col-sm-9">
                <input type="text" name="name" className="form-control" />
                </div>
            </div>
            <div className="form-group row pb-3">
                <label className="col-sm-3 col-form-label">Hírdetés helye:</label>
                <div className="col-sm-9">
                <input type="text" name="ad" className="form-control" />
                </div>
            </div>
            <div className="form-group row pb-3">
                <label className="col-sm-3 col-form-label">Város neve:</label>
                <div className="col-sm-9">
                <input type="text" name="city" className="form-control" />
                </div>
            </div>
            <div className="form-group row pb-3">
                <label className="col-sm-3 col-form-label">Ára:</label>
                <div className="col-sm-9">
                <input type="number" name="price" className="form-control" />
                </div>
            </div>
            <div className="form-group row pb-3">
                <label className="col-sm-3 col-form-label">Éjszakák száma:</label>
                <div className="col-sm-9">
                <input type="number" name="nightsnum" className="form-control" />
                </div>
            </div>
            <button type="submit" className="btn btn-success">
                Küldés
            </button>
            </form>
        </div>
    );
};