// rafce
import { useEffect, useState } from "react"

import Formulario from "./components/Formulario"
import ListadoProductos from "./components/ListadoProductos"

// https://es.react.dev/learn/thinking-in-react

const App = () => {

  const [productos, setProductos] = useState(null)
  const [productoAEditar, setProductoAEditar] = useState(null)

  useEffect(() => { /* el callback del useEffect no puede ser asincronico (no puede retonar una Promise) */
    getAllProductos()
  }, []) /* Solo se ejecuta una vez (Cuando el componente se monta) */
    
  const getAllProductos = async () => {
    

    try {
      const res = await fetch(import.meta.env.VITE_BACKEND)

      if (!res.ok) {
        throw new Error('No se pudo hacer la petición')
      }

      const data = await res.json()

      console.log(data)
      setProductos(data)

    } catch (error) {
      //console.error(error)
      console.error(error.message)
    }

  }

  const agregarProducto = async (nuevoProducto) => {
    // ! 1. Agrego el producto en el backend (El backend me va a devolver el id)
    //console.log(nuevoProducto)
    nuevoProducto.precio = Number(nuevoProducto.precio)
    delete nuevoProducto.id // borrar la propiedad 'id' del objeto nuevoProducto 
    //console.log(nuevoProducto) // 
    try {
      const res = await fetch(import.meta.env.VITE_BACKEND, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(nuevoProducto)
      })

      if (!res.ok) {
        throw new Error('No se pudo hacer la petición')
      }

      const productoAgregadoEnBackend = await res.json()
      console.log(productoAgregadoEnBackend)

      // ! 2. Es modificar el estado basado en el producto agregado en el backend

      const nuevoEstadoProductos = [...productos, productoAgregadoEnBackend]
      console.log(nuevoEstadoProductos) // array nuevo = arrayViejo + nuevoProducto
      setProductos(nuevoEstadoProductos)

    } catch (error) {
      //console.error(error)
      console.error(error.message)
    }

    
  }

  const editarProducto = async (productoEditado) => {

    // ! 1. Hacer la petición para guardar el producto editado
    // https://localhost:8080/productos/id | Verbo PUT
    const urlEditar = import.meta.env.VITE_BACKEND + productoEditado.id // https://localhost:8080/productos/id 
    
    try {
      productoEditado.precio = Number(productoEditado.precio)

      const res = await fetch(urlEditar, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(productoEditado)
      })

      if (!res.ok) {
        throw new Error('No se pudo hacer la petición')
      }

      const productoEditadoBackend = await res.json()
      console.log(productoEditadoBackend)
      
      // ! 2. Avistarle a React que cambió algo dentro del array de productos
      
      const nuevoEstadoProductos = productos.map(prod => prod.id === productoEditado.id ? productoEditado : prod)
      console.log(nuevoEstadoProductos) // nuevo estado con todos los productos y el productoEditado
      
      setProductos(nuevoEstadoProductos)
    } catch (error) {
      console.error(error)
    }

  }

  const borrarProducto = async (id) => {
    console.log(id)
    console.log(productos)
    // ! 1. Eliminar el producto por id del banckend
    // http://localhost:8080/productos/id | método DELETE

    const urlBorrado = import.meta.env.VITE_BACKEND + id // http://localhost:8080/productos/id 
    try {
      const res = await fetch(urlBorrado, {
        method: 'DELETE'
      })
  
      if (!res.ok) {
        throw new Error('No se pudo hacer la petición')
      }

      const productoEliminadoDelBackend = await res.json()
      console.log(productoEliminadoDelBackend)

    } catch (error) {
      console.error(error)
    }

    // ! 2. Actualizar el estado de la aplicación react para que el producto eliminado deje de estar en la lista
    const nuevoEstadoProductos = productos.filter( prod => prod.id !== id)
    console.log(nuevoEstadoProductos)
    setProductos(nuevoEstadoProductos)

  }

  return (
    <>
      <h1 className="text-4xl my-5">CRUD Productos</h1>
      <hr />
      <Formulario 
        agregarProducto={agregarProducto} 
        productoAEditar={productoAEditar}
        setProductoAEditar={setProductoAEditar}
        editarProducto={editarProducto}
      /> {/* hijo1  */}
      <ListadoProductos 
        productos={productos} 
        borrarProducto={borrarProducto} 
        setProductoAEditar={setProductoAEditar}
      /> {/* hijo2 */}
    </>
  )
}

export default App