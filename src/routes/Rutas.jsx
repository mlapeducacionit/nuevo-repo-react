import { useRoutes } from "react-router"
import Inicio from "../pages/Inicio"
import Productos from "../pages/Productos"
import Nosotros from "../pages/Nosotros"
import Contacto from "../pages/Contacto"
import NoEncontrado from "../pages/NoEncontrado"
import ProductosDetalle from "../pages/ProductosDetalle"

const Rutas = () => {
  
    const rutasApp = useRoutes(
        [
            {
                path: '/',
                element: <Inicio />
            },
            {
                path: '/productos',
                element: <Productos />
            },
            {
                path: '/productos/detalle/:id', /* :id (obligatorio) | :id? (opcional) */
                element: <ProductosDetalle />
            },
            {
                path: '/nosotros',
                element: <Nosotros />
            },
            {
                path: '/contacto',
                element: <Contacto />
            },
            {
                path: '*', /* default */
                element: <NoEncontrado />
            }
        ]
    )

    return rutasApp

}

export default Rutas