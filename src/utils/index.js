//const apiUrl = 'https://guiaback-1-e1298562.deta.app';
const apiUrl = 'http://127.0.0.1:8000';


function getPartialAnunciantes(){
    return fetch(apiUrl + '/anunciante-noimg')
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


export { getPartialAnunciantes, getRubros, postRubro, getSubRubros, postSubRubro, getDistritos, postDistrito, getRelatesDistritos, relateDistrito, deleteRelDistrito };