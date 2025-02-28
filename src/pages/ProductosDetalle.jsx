import { useEffect, useState } from "react"
import { useParams } from "react-router"
import Spinner from "../components/Spinner"

const ProductosDetalle = () => {

  const { id } = useParams()
  
  console.log(id)

  const [productoDetalle, setProductoDetalle] = useState(null) // productoDetalle = {}

  useEffect(() => {
    
    getOne(id)
    
  }, [])

  const getOne = async (id) => {

    // Verbo Get
    // http://localhost:8080/productos/id

    const urlGetOne = import.meta.env.VITE_BACKEND + id

    try {
      const res = await fetch(urlGetOne)

      if (!res.ok) {
        throw new Error('No se pudo obtener el producto')
      }

      const data = await res.json()
      setProductoDetalle(data)
      
    } catch (error) {
      console.error(error)
    }

  }
  

  return (
    <>
      <h1>Producto detalle</h1>

      {
        productoDetalle ? 
          (
            <>
              <h2>El nombre del producto: {productoDetalle.nombre}</h2>
              <p>La categoría del producto es: {productoDetalle.categoria}</p>
              <p>El precio: {productoDetalle.precio}</p>
            </>
          ) :
          (
            <Spinner />
          )

      }
    </>
  )
}

export default ProductosDetalle