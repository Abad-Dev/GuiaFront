import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';
import { Root } from './routes/Root';
import { Rubros } from './routes/Rubros';
import { SubRubros } from './routes/SubRubros';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    children: [
      {
        path: "/rubros",
        element: <Rubros/>,
      },
      {
        path: "/sub-rubros",
        element: <SubRubros />
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  //<React.StrictMode>
    <RouterProvider router={router} />
  //</React.StrictMode>,
)