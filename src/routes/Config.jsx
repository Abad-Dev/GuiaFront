import React from 'react';
import Select from 'react-select';
import { getSubRubros, getKeywords, getInvalidWords, postKeyword, postInvalidWord, getRelsSubKw,postRelSubKw, deleteRelSubKw } from '../utils';

function Config(){
    const [keywords, setKeywords] = React.useState([]);
    const [invalidWords, setInvalidWords] = React.useState([]);
    const [subRubros, setSubRubros] = React.useState([]);
    const [relsSubKw, setRelsSubKw] = React.useState([]);

    const [selectedId, setSelectedId] = React.useState(0);
    const [selectedNewKw, setSelectedNewKw] = React.useState(0);
    const [selectedKw, setSelectedKw] = React.useState([]);

    const [newKw, setNewKw] = React.useState('')
    const [newIw, setNewIw] = React.useState('')

    const [disRel, setDisRel] = React.useState(true)


    const loadSubRubros = () => {
        getSubRubros()
            .then(res => res.json())
            .then(data => setSubRubros(data))
    }
    const loadRelSubKw = () => {
        getRelsSubKw()
            .then(res => res.json())
            .then(data => {
                setRelsSubKw(data)
                setDisRel(false)
            })

    }
    const loadKw = () => {
        getKeywords()
            .then(res => res.json())
            .then(data => setKeywords(data))
    }
    const loadInvalidWords = () => {
        getInvalidWords()
            .then(res => res.json())
            .then(data => setInvalidWords(data))
    }
    React.useEffect(() => {
        loadKw();
        loadInvalidWords();
        loadSubRubros();
        loadRelSubKw();
    }, [])

    const handleSelectSubRubro = (id) => {
        setSelectedId(id);
        let kws = [];
        for (let rel of relsSubKw){
            if (rel.FK_SUB_RUBRO === id){
                let kw = keywords.filter((keyword) => keyword.ID === rel.FK_KEYWORD);
                kws.push(kw[0])
            }
        }
        setSelectedKw(kws);
    }

    
    const handleSaveRel = () => {
        if (selectedId !== 0 || selectedNewKw !== 0){
            let kw = keywords.filter((keyword) => keyword.ID === selectedNewKw)[0];
            let selectedKwCopy = JSON.parse(JSON.stringify(selectedKw))

            let kwExists = selectedKw.filter((keyword) => keyword.ID === kw.ID).length !== 0
            if (kwExists){
                alert("La palabra clave ya está incluida")
            } else {
                selectedKwCopy.push(kw)
                setSelectedKw(selectedKwCopy)
                setDisRel(true)
                
                postRelSubKw(selectedId, selectedNewKw)
                    .then(res => res.json())
                    .then(data => {
                        loadRelSubKw();
                    })
            }
            
        }
    };


    const handleDeleteRel = (idKw) => {
        let selectedKwCopy = JSON.parse(JSON.stringify(selectedKw));
        selectedKwCopy = selectedKwCopy.filter((kw) => kw.ID != idKw);
        setSelectedKw(selectedKwCopy);
        setDisRel(true)
        deleteRelSubKw(selectedId, idKw)
            .then(res => res.json())
            .then(data => {
                loadRelSubKw();
            })
        
    }

    const handleSaveKw = () => {
        postKeyword(newKw)
            .then(res => res.json())
            .then(data => loadKw())
        
        setNewKw('')
    }

    const handleSaveIw = () => {
        postInvalidWord(newIw)
            .then(res => res.json())
            .then(data => loadInvalidWords())
        setNewIw('')
    }

    return (
    <div className='container py-5'>
        <div className="row mb-4">
            <div className="col-12">
                <h3>Agregar Palabras clave a Sub Rubro</h3>
            </div>
            <div className="col-6">
                <label>Seleccionar sub rubro:</label>
                <Select options={subRubros.map((subRubro) => {return {value: subRubro.ID, label: subRubro.NAME}})} onChange={(e) => handleSelectSubRubro(e.value)}/>
            </div>
            <div className="col-6">
                <label>Seleccionar Palabra clave:</label>
                <Select className='mb-2' options={keywords.map((keyword) => {return {value: keyword.ID, label: keyword.KEYWORD}})} onChange={(e) => setSelectedNewKw(e.value)}/>
                <button className='btn btn-outline-guia' onClick={() => handleSaveRel()} disabled={disRel}>+ Agregar</button>
            </div>
            <div className="col-6">
                <div className='border border-dark-subtle rounded-3 d-flex align-items-start p-2 flex-wrap'>
                {selectedKw.map((kw) => {return(
                    <div className="kw" key={kw.ID}>
                        {kw.KEYWORD}
                        <button onClick={() => handleDeleteRel(kw.ID)}>x</button>
                    </div>
                )})}
                </div>
            </div>
        </div>

        <div className="row">
            <div className="col-12 mb-2">
                <h3 className='m-0'>Palabras Clave Existentes:</h3>
            </div>
            <div className="col-12 mb-3">
                <input type="text" className='form-control' value={newKw} onChange={(e) => setNewKw(e.target.value)}/>
            </div>
            <div className="col-12 mb-2">
                <button className='btn btn-outline-guia' onClick={() => handleSaveKw()}>+ Agregar</button>
            </div>
        </div>

        
        <div className="row mb-4">
            <div className="col-12 d-flex">
                {keywords.map((kw) => {return(
                    <div className="kw" key={kw.ID}>
                        {kw.KEYWORD}
                        <button>x</button>
                    </div>
                )})}
            </div>
        </div>
        

        <div className="row">
            <div className="col-12 mb-2">
                <h3 className='m-0'>Agregar Palabra Inválida:</h3>
            </div>
            <div className="col-12 mb-3">
                <input type="text" className='form-control' value={newIw} onChange={(e) => setNewIw(e.target.value)}/>
            </div>
            <div className="col-12 mb-2">
                <button className='btn btn-outline-guia' onClick={() => handleSaveIw()}>+ Agregar</button>
            </div>
        </div>

        <div className="row">
            <div className="col-12 d-flex">
                {invalidWords.map((inavlidWord) => {return(
                    <div className="kw" key={inavlidWord.ID}>{inavlidWord.WORD}</div>
                )})}
            </div>
        </div>
        
    </div>
    )
}


export { Config };