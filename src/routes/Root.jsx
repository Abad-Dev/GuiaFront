import React from 'react';
import { Outlet, Link, useLocation } from "react-router-dom";



function Root(){
    const location = useLocation();
    const links = [
        {
            title: 'Rubros',
            slug: '/rubros'
        },
        {
            title: 'Sub Rubros',
            slug: '/sub-rubros'
        },
        {
            title: 'Distritos',
            slug: '/distritos'
        },
        {
            title: 'Anunciantes',
            slug: '/anunciantes'
        },
        {
            title: 'Más Opciones',
            slug: '/config'
        },
    ] // Luego de agregar una ruta hay que especificar el elemento en el main.jsx
    return(
        <>
            <nav className="navbar navbar-expand-lg p-0">
                <div className="container">
                    <Link className='navbar-brand fs-3 m-0 p-0' to="/">GUIACALIDAD Admin</Link>
                    <button className="navbar-toggler my-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" style={{flexGrow: 1}} id="navbarNav">
                    <ul className="navbar-nav">
                        {links.map((item, index) => {return(
                            <li key={index} className="nav-item">
                                <Link className={`nav-link py-2 py-lg-3 ${(location.pathname).startsWith(item.slug) ? 'active' : ''}`} to={item.slug}>{item.title}</Link>
                            </li>
                        )})}
                    </ul>
                    </div>
                </div>
            </nav>
            <Outlet />
        </>
    )
}


export { Root };