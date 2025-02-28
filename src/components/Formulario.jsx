import { useEffect, useState } from "react"

const Formulario = ({ agregarProducto, productoAEditar, setProductoAEditar, editarProducto }) => {
  
  console.log(productoAEditar)

  const dataFormularioInicial = {
    id: null,
    nombre: '',
    categoria: '',
    precio: ''
  }

  const [dataFormulario, setDataFormulario] = useState(dataFormularioInicial)

  useEffect(() => {
    console.log('Cambió el productoAEditar')
    /* {} -> true -> Que si se esta editando */
    /* null -> false -> Que no se está editando */

    productoAEditar ? setDataFormulario(productoAEditar) : setDataFormulario(dataFormularioInicial)
  }, [productoAEditar])
  

  const handleChange = (e) => {
    console.log(e.target.value)
    console.log(e.target.name)

    /* debugger */

    const dataActualizada = {
      ...dataFormulario,
      [e.target.name]: e.target.value
    }

    setDataFormulario(dataActualizada)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    console.log(dataFormulario)

    if ( dataFormulario.id === null ) {
      agregarProducto(dataFormulario)
    } else {
      editarProducto(dataFormulario)
    }

    handleReset()
  }

  const handleReset = () => {
    console.log('Reseteando...')
    setDataFormulario(dataFormularioInicial)
    setProductoAEditar(null)
  }


  return (
    <>
      <h2 className="text-2xl font-semibold my-4">
        Formulario de { productoAEditar ? 'edición' : 'carga'} de productos
      </h2>

      <div className="max-w-lg mb-4">
        <form className="bg-white border rounded-lg p-6" onSubmit={handleSubmit}>
          {/* Campo Nombre */}
          <label htmlFor="lbl-nombre" className="block mb-2 text-sm font-medium text-gray-700">
            Nombre
          </label>
          <input 
            type="text" 
            id="lbl-nombre"
            placeholder="Ingresa el nombre"
            className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
            name="nombre"
            onChange={handleChange}
            value={dataFormulario.nombre}
          />
          {/* Campo Categoría */}
          <label htmlFor="lbl-categoria" className="block mb-2 text-sm font-medium text-gray-700">
            Categoría
          </label>
          <input 
            type="text" 
            id="lbl-categoria"
            placeholder="Ingresa el categoria"
            className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
            name="categoria"
            onChange={handleChange}
            value={dataFormulario.categoria}
          />
           {/* Campo Precio */}
          <label htmlFor="lbl-precio" className="block mb-2 text-sm font-medium text-gray-700">
            Precio
          </label>
          <input 
            type="text" 
            id="lbl-precio"
            placeholder="Ingresa el precio"
            className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
            name="precio"
            onChange={handleChange}
            value={dataFormulario.precio}
          />

          <div className="flex justify-between">
            <button
              type="submit"
              className={`px-4 py-2 ${productoAEditar ? 'bg-yellow-500' : 'bg-green-500'} text-white rounded-lg ${productoAEditar ? 'hover:bg-yellow-700' : 'hover:bg-green-700'}  cursor-pointer`}
            >
                { productoAEditar ? 'Editar' : 'Crear' }
            </button>
            <button
              type="reset"
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 cursor-pointer"
              onClick={handleReset}
            >
                Reset
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Formulario