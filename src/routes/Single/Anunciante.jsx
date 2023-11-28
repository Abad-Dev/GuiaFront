import React from 'react';
import { useParams } from 'react-router-dom';
import { getAnuncianteById } from '../../utils/index';

function Anunciante() {
    const { id } = useParams();
    const [anunciante, setAnunciante] = React.useState({});

    React.useEffect(() => {
        getAnuncianteById(id)
            .then(res => res.json())
            .then(data => setAnunciante(data))
    }, [])
    return (
        <div className="container py-5">
            <h2><u>{anunciante.NAME}</u></h2>
        </div>
    )
}

export { Anunciante };