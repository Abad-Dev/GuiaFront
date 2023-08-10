//const apiUrl = 'https://guiaback-1-e1298562.deta.app';
const apiUrl = 'http://127.0.0.1:8000';


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

export { getRubros, postRubro, getSubRubros };