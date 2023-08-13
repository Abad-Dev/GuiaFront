import React from 'react';
import { getRubros, getSubRubros, postSubRubro } from '../utils';
import Select from 'react-select'
import TextareaAutosize from 'react-textarea-autosize';


function SubRubros(){
    const [rubros, setRubros] = React.useState([]);
    const [subRubros, setSubRubros] = React.useState([]);
    const [mapArray, setMapArray] = React.useState([]);

    const [rubroId, setRubroId] = React.useState('');
    const [newName, setNewName] = React.useState('');
    const [newSlug, setNewSlug] = React.useState('');
    const [newDesc, setNewDesc] = React.useState('');

    const [empty, setEmpty] = React.useState(false);
    const [saved, setSaved] = React.useState(false)

    const handleSave = () => {  
        const newSubRubro = {
            rubro_id: rubroId,
            name: newName,
            slug: newSlug,
            desc: newDesc
        }

        if (rubroId === '' || newName === '' || newSlug === ''){
            setEmpty(true)
            setTimeout(() => {setEmpty(false)}, 2000)
        } else {
            setNewName('');
            setNewSlug('');
            setNewDesc('');
            postSubRubro(newSubRubro)
                .then(res => res.json())
                .then(data => setSaved(!saved))
        }
    }

    function getRubroById(id){
        for (let rubro of rubros){
            if (rubro.ID === id){
                return rubro;
            }
        }
    }
    
    React.useEffect(() => {
        getRubros()
            .then(res => res.json())
            .then(data => setRubros(data))
        getSubRubros()
            .then(res => res.json())
            .then(data => setSubRubros(data))
    }, [saved])

    for (let rubro of rubros){
        rubro.subRubros = [];
        for (let subRubro of subRubros){
            if (subRubro.RUBRO_ID === rubro.ID){
                rubro.subRubros.push(subRubro)
            }
        }
    }
    console.log(rubros)

    return(
        <div className="container py-5">
            <div className="row">
                <div className="col-12">
                    <h3>Agregar Sub Rubro:</h3>
                </div>
            </div>
            <div className="row mb-5">
                <div className="col-12 col-md-3">
                    <label>Rubro padre:</label>
                    <Select options={rubros.map((rubro) => {return {value: rubro.ID, label: rubro.NAME}})} onChange={(e) => setRubroId(e.value)}/>
                </div>
                <div className="col-12 col-md-3">
                    <label>Nombre:</label>
                    <input type='text' className='form-control' value={newName} onChange={(e) => setNewName(e.target.value)}/>
                </div>
                <div className="col-12 col-md-2">
                    <label>Slug:</label>
                    <input type='text' className='form-control' value={newSlug} onChange={(e) => setNewSlug(e.target.value)}/>
                </div>
                <div className="col-12 col-md-4 d-flex flex-column">
                    <label>Descripción:</label>
                    <TextareaAutosize className='form-control' value={newDesc} onChange={(e) => setNewDesc(e.target.value)}/>
                </div>
                <i><small className='text-secondary'>* Las palabras clave se agregan en la sección "Más Opciones"</small></i>
                <div className="col-12">
                {empty && <div className="alert alert-danger text-center" role="alert">
                    Los campos no pueden estar vacíos!
                    </div>}
                    <button className='btn btn-outline-guia' onClick={() => handleSave()}>Agregar</button>
                </div>
            </div>
            
            <div className="row">
                <div className="col-12">
                    <h3 className='m-0'>Lista de Sub Rubros:</h3>
                </div>
            </div>
            <hr />
            {rubros.map((rubro, index) => {return(
            <div className="row mb-3" key={index}>
                <div className="col-12">
                    <p className='m-0'>{rubro.NAME}:</p>
                </div>

                {rubro.subRubros.map((subRubro, index) => {return(
                    <div className="col-12" key={index}>
                        <h5 className='m-0 ps-3'>- {subRubro.NAME}</h5>
                    </div>
                )})}
            </div>
            )})}
            
        </div>
    )
}


export { SubRubros };