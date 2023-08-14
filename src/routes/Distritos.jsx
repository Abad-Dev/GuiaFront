import React from 'react';
import Select from 'react-select';
import { getPartialAnunciantes, getDistritos, postDistrito, getRelatesDistritos, relateDistrito, deleteRelDistrito } from '../utils';

function Distritos() {
    const [distritos, setDistritos] = React.useState([]);
    const [relations, setRelations] = React.useState([]);
    const [anunciantes, setAnunciantes] = React.useState([]);

    const [selectedId, setSelectedId] = React.useState(0);
    const [selectedDistritos, setSelectedDistritos] = React.useState([]);
    
    const [newName, setNewName] = React.useState('');
    const [saved, setSaved] = React.useState(false)


    const handleRelate = async () => {
        const relatePromises = distritos.map(distrito =>{
            let distritoId = distrito.ID;
            let rel_exists = relations.some(val => JSON.stringify(val) === JSON.stringify({FK_DISTRITO: distritoId, FK_ANUNCIANTE: selectedId}));

            if (!rel_exists && selectedDistritos.includes(distritoId)) { // Si la relación no existe y el usuario la marcó
                return relateDistrito(distritoId, selectedId) // Entonces crea la relación
            } else if (rel_exists && !selectedDistritos.includes(distritoId)){ // Si la relación existe y el usuario no la marcó
                return deleteRelDistrito(distritoId, selectedId) // Entonces Borra la relación
            }
        });

        await Promise.all(relatePromises);
        setSaved(!saved)
    }

    const handleSave = () => {
        const newDistrito = {
            name: newName
        }
        postDistrito(newDistrito)
            .then(res => res.json())
            .then(data => setSaved(!saved))
        setNewName('')
    }

    React.useEffect(() => {
        getRelatesDistritos()
            .then(res => res.json())
            .then(data => setRelations(data))
        getPartialAnunciantes()
            .then(res => res.json())
            .then(data => setAnunciantes(data))
        getDistritos()
            .then(res => res.json())
            .then(data => setDistritos(data))
    }, [saved])

    return (
    <div className='container py-5'>
        <h3>Agregar Distrito a Anunciante:</h3>
        <div className="row">
            <div className="col-6">
                <Select options={anunciantes.map((anunciante) => {return {value: anunciante.ID, label: anunciante.NAME}})} onChange={(e) => {
                    let clientDistritos = [];
                    for (let relation of relations){
                        if (relation.FK_ANUNCIANTE === e.value){
                            clientDistritos.push(relation.FK_DISTRITO);
                        };
                    };
                    setSelectedId(e.value);
                    setSelectedDistritos(clientDistritos);
                }}/>
            </div>

            <div className="col-6 p-0">
                <div className="container-fluid border border-dark-subtle rounded-2 p-0 mb-3">
                        {distritos.map((distrito, index) => {return(   
                            <div className="row mx-0" key={index}>
                                {index === 0 ? '' : <hr className='m-0'/>}
                                <div className="col-12 px-2 py-1 d-flex" style={{cursor: 'pointer'}} onClick={() => {
                                    let arrCopy = JSON.parse(JSON.stringify(selectedDistritos))

                                    if (arrCopy.includes(distrito.ID)){
                                        arrCopy = arrCopy.filter(function(f) { return f !== distrito.ID })
                                    } else{
                                        arrCopy.push(distrito.ID)
                                    }
                                    setSelectedDistritos(arrCopy)
                                    }}>
                                    <input className="form-check-input my-auto" style={{cursor: 'pointer'}} type="checkbox" readOnly checked={selectedDistritos.includes(distrito.ID)} />
                                    <label className="form-check-label ms-2 fs-5" style={{cursor: 'pointer'}}>
                                        {distrito.NAME}
                                    </label>
                                </div>
                            </div>
                        )})}
                </div>
                <div className="col-12">
                    <button className='btn btn-outline-guia' onClick={() => handleRelate()}>Guardar</button>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-12 mb-3">
                <h3>Agregar Distrito:</h3>
                <input className='form-control' value={newName} onChange={(e) => setNewName(e.target.value)}/>
            </div>
            <div className="col-12">
                <button className='btn btn-outline-guia' onClick={() => handleSave()}>+ Agregar</button>
            </div>
        </div>
    </div>
    )
}

export { Distritos };