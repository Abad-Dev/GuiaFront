//const apiUrl = 'https://guiaback-1-e1298562.deta.app';
const apiUrl = 'http://127.0.0.1:8000';


function getPartialAnunciantes(){
    return fetch(apiUrl + '/anunciante-noimg')
}

function getCompleteAnunciantes(){
    return fetch(apiUrl + '/anunciante')
}


function getRubros(){
    return fetch(apiUrl + '/rubro-noimg')
}


function postRubro(rubro){
    return fetch(apiUrl + '/rubro', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(rubro)
    })
}


function getSubRubros(){
    return fetch(apiUrl + '/sub-rubro')
}


function postSubRubro(subRubro){
    return fetch(apiUrl + '/sub-rubro', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(subRubro)
    })
}

function getRelSubAnunciantes(){
    return fetch(apiUrl + '/rel-sub-anunciantes')
}

function postRelSubAnunciantes(subRubroId, anuncianteId){
    return fetch(apiUrl + '/rel-sub-anunciantes', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            fk1: subRubroId,
            fk2: anuncianteId
        })
    })
}

function deleteRelSubAnunciante(subRubroId, anuncianteId){
    return fetch(apiUrl + '/rel-sub-anunciantes', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            fk1: subRubroId,
            fk2: anuncianteId
        })
    })
}


function getDistritos(){
    return fetch(apiUrl + '/distrito')
}


function postDistrito(distrito){
    return fetch(apiUrl + '/distrito', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(distrito)
    })
}


function getRelatesDistritos(){
    return fetch(apiUrl + '/rel-distritos-anunciantes')
}


function relateDistrito(distritoId, anuncianteId){
    return fetch(apiUrl + '/rel-distritos-anunciantes', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            fk1: distritoId,
            fk2: anuncianteId
        })
    })
}


function deleteRelDistrito(distritoId, anuncianteId){
    return fetch(apiUrl + '/rel-distritos-anunciantes', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            fk1: distritoId,
            fk2: anuncianteId
        })
    })
}


function getKeywords(){
    return fetch(apiUrl + '/keyword')
}


function postKeyword(kw){
    return fetch(apiUrl + '/keyword', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            word: kw
        })
    })
}


function getInvalidWords(){
    return fetch(apiUrl + '/invalid-words')
}


function postInvalidWord(word){
    return fetch(apiUrl + '/invalid-word', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            word: word
        })
    })
}


function getRelsSubKw(){
    return fetch(apiUrl + '/rel-sub-kw')
}


function postRelSubKw(idSub, idKw){
    return fetch(apiUrl + '/rel-sub-kw', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            fk1: idSub,
            fk2: idKw
        })
    })
}


function deleteRelSubKw(idSub, idKw){
    return fetch(apiUrl + '/rel-sub-kw', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            fk1: idSub,
            fk2: idKw
        })
    })
}


// Single Functions

function getAnuncianteById(anuncianteId){
    return fetch(apiUrl + '/anunciante/'+anuncianteId)
}

export { 
    getPartialAnunciantes, 
    getCompleteAnunciantes,
    getRubros, 
    postRubro, 
    getSubRubros, 
    postSubRubro,
    getRelSubAnunciantes,
    postRelSubAnunciantes, 
    deleteRelSubAnunciante,
    getDistritos, 
    postDistrito, 
    getRelatesDistritos, 
    relateDistrito, 
    deleteRelDistrito,
    getKeywords,
    postKeyword,
    getInvalidWords,
    postInvalidWord,
    getRelsSubKw,
    postRelSubKw,
    deleteRelSubKw,

    getAnuncianteById
};