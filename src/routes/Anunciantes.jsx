import React from 'react';
import Select from 'react-select';
import { useNavigate } from "react-router-dom";
import { getCompleteAnunciantes, getSubRubros, getRelSubAnunciantes, postRelSubAnunciantes, deleteRelSubAnunciante } from '../utils';

function Anunciantes(){
    const [anunciantes, setAnunciantes] = React.useState([]);
    const [subRubros, setSubRubros] = React.useState([]);
    const [relSubAnunciantes, setRelSubAnunciantes] = React.useState([]);
    
    const [selectedAnuncianteId, setSelectedAnuncianteId] = React.useState(0);
    const [selectedSubRubroId, setSelectedSubRubroId] = React.useState(0)

    const [saved, setSaved] = React.useState(true);
    const handleSaveRel = () => {
        postRelSubAnunciantes(selectedSubRubroId, selectedAnuncianteId)
            .then(res => res.json())
            .then(data => {
                setSaved(v => !v)
            })
    }

    const handleDeleteRel = (subRubroId, anuncianteId) => {
        deleteRelSubAnunciante(subRubroId, anuncianteId)
            .then(res => res.json())
            .then(data => {
                setSaved(v => !v)
            })
    }

    React.useEffect(() => {
        getCompleteAnunciantes()
            .then(res => res.json())
            .then(data => setAnunciantes(data))
        getSubRubros()
            .then(res => res.json())
            .then(data => setSubRubros(data))
        getRelSubAnunciantes()
            .then(res => res.json())
            .then(data => setRelSubAnunciantes(data))
    }, [saved])

    const navigate = useNavigate();
    return(
        <div className="container py-5">
            <div className="row">
                <div className="col-12">
                    <h3>Agregar Anunciante a SubRubro:</h3>
                </div>
                <div className="col-12 col-sm-6">
                    <label>Seleccionar Anunciante:</label>
                    <Select options={anunciantes.map((anunciante) => {return {value: anunciante.ID, label: anunciante.NAME}})} onChange={(e) => {
                        setSelectedAnuncianteId(e.value);
                    }}/>
                    {selectedAnuncianteId != 0 ? <button className='btn btn-outline-guia my-2' onClick={() => navigate("/anunciante/"+selectedAnuncianteId)}>Ir a Editar</button> : ''}
                </div>
                <div className="col-12 col-sm-6">
                    <label>Seleccionar Sub Rubro:</label>
                    <Select options={subRubros.map((subRubro) => {return {value: subRubro.ID, label: subRubro.NAME}})} onChange={(e) => {
                        setSelectedSubRubroId(e.value);
                    }}/>
                    <button className='btn btn-outline-guia my-2' onClick={() => handleSaveRel()}>+ Agregar Sub Rubro</button>
                </div>
            </div>
            <div className="row">
                <div className="col-12 my-3">
                    <h3>Sub Rubros:</h3>
                    <div className="badges-container border border-dark-subtle rounded-3 d-flex flex-wrap">
                        {relSubAnunciantes.filter((rel) => rel.FK_ANUNCIANTE == selectedAnuncianteId).map((rel, index) => {
                            let found = subRubros.find((subRubro) => subRubro.ID == rel.FK_SUB_RUBRO);
                            if (found){
                                return (<div className='kw' key={index}>
                                    {found.NAME}
                                    <button onClick={() => handleDeleteRel(found.ID, selectedAnuncianteId)}>x</button>
                                </div>)
                            }
                        })}
                    </div>
                </div>
            </div>

            <div className="row mt-5">
                <h2>Crear Anunciante:</h2>
            </div>
        </div>
    )
}

export { Anunciantes };