import React from 'react';
import { getRubros, getSubRubros } from '../utils';


function SubRubros(){
    const [rubros, setRubros] = React.useState([]);
    const [subRubros, setSubRubros] = React.useState([]);

    const getRubroById = (id) => {
        for (let rubro of rubros){
            if (rubro.ID === id) {
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
    }, [])
    return(
        <div className="container py-5">
            <div className="row">
                <div className="col-12">
                    <h3>Agregar Sub Rubro:</h3>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <h3 className='m-0'>Lista de Sub Rubros:</h3>
                </div>
            </div>
            <hr />
            
            {subRubros.map((subRubro) => {
            return(<div className="row">
                <div className="col-12">
                    <h5>{getRubroById(subRubro.RUBRO_ID)?.NAME}</h5>
                </div>
                <div className="col-12 ps-5">
                    - {subRubro.NAME}
                </div>
            </div>)
            })}
        </div>
    )
}


export { SubRubros };