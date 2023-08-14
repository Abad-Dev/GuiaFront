import React from 'react';
import { getRubros, postRubro } from '../utils';


function Rubros(){
    const [rubros, setRubros] = React.useState([]);

    const [newName, setNewName] = React.useState('');
    const [newSlug, setNewSlug] = React.useState('');
    const [newImg, setNewImg] = React.useState('');

    const [empty, setEmpty] = React.useState(false)
    const [saved, setSaved] = React.useState(false)

    const handleSave = () => {
        const newRubro = {
            name: newName,
            slug: newSlug,
            image: newImg
        }

        if (newName === '' || newSlug === ''){
            setEmpty(true)
            setTimeout(() => {setEmpty(false)}, 2000)
        } else {
            setNewName('')
            setNewSlug('')
            setNewImg('')
            postRubro(newRubro)
                .then(res => res.json())
                .then(data => setSaved(!saved))
        }
    }
    React.useEffect(() => {
        getRubros()
            .then(res => res.json())
            .then(data => {setRubros(data)})
    }, [saved])
    return(
        <div className="container py-5" style={{overflow: 'auto'}}>
            <div className="row">
                <div className="col-12">
                    <h3>Agregar Rubro:</h3>
                </div>
            </div>
            <div className="row mb-3">
                <div className="col-12 col-lg-4">
                    <label>Nombre:</label>
                    <input type="text" className='form-control' value={newName} onChange={(e) => setNewName(e.target.value)} required={true}/>
                </div>
                <div className="col-12 col-lg-4">
                    <label>Slug:</label>
                    <input type="text" className='form-control' value={newSlug} onChange={(e) => setNewSlug(e.target.value)} required={true}/>
                </div>
                <div className="col-12 col-lg-4 d-flex flex-column">
                    <label>Imagen:</label>
                    {newImg && <div className="d-block my-2">
                        <img src={newImg} alt="Vista previa" style={{ maxWidth: "100%", maxHeight: "200px" }} />
                    </div>}
                    <input type="file" className='form-control' onChange={(e) => {
                        const img = e.target.files[0];
                        if (img) {
                                const lector = new FileReader();
                        
                                lector.onload = (e) => {
                                    setNewImg(e.target.result);
                                }

                                lector.readAsDataURL(img);
                            }
                        }
                    }/>
                </div>
            </div>
            {empty && <div className="alert alert-danger text-center" role="alert">
            Los campos de texto no pueden estar vacíos!
            </div>}
            <div className="row mb-5">
                <div className="col-12">
                    <button className='btn btn-outline-guia' onClick={() => handleSave()}>+ Agregar</button>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <h3>Todos los Rubros:</h3>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <table className="table">
                        <thead>
                            <tr>
                            <th scope="col">Nombre</th>
                            <th scope="col">Slug</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rubros.map((rubro) => {
                                return(
                                <tr key={rubro.ID}>
                                    <td className="text-break">{rubro.NAME}</td>
                                    <td className="text-break">{rubro.SLUG}</td>
                                </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}


export { Rubros };