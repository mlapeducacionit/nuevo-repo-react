import Swal from "sweetalert2";
import convertirAPesos from "../utils/convertirAPesos"
import { Link, useNavigate } from "react-router";

const Fila = ({producto, borrarProducto, setProductoAEditar}) => { // props = { producto, borrarProducto }

  // El useNavigate, me devuelve una referencia de una función
  const navigate = useNavigate()

  const handleEliminar = (id) => {
    console.log(id)

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        borrarProducto(id)
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      } else {
        Swal.fire({
          title: "No lo borraste!",
          text: "El producto no se borro",
          icon: "info"
        });
      }
    });

  }

  const handleEditar = (producto) => {
    console.log(producto)
    setProductoAEditar(producto)
  }

  const handleVer = (id) => {
    console.log(id)
    navigate(`/productos/detalle/${id}`)
  }

  return (
    <tr className="bg-white border-b border-gray-200">
      <th className="px-6 py-4">{producto.nombre}</th>
      <td className="px-6 py-4">{producto.categoria}</td>
      <td className="px-6 py-4">{convertirAPesos(producto.precio)}</td>
      <td className="px-6 py-4">
        <button
          onClick={() => handleVer(producto.id)}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 cursor-pointer mr-2">
            Ver
        </button>
        {/* <Link
          to={`/productos/detalle/${producto.id}`}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 cursor-pointer mr-2"
        >
          Ver Link     
        </Link> */}
        <button
          onClick={() => handleEditar(producto)}
          className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 cursor-pointer mr-2">
            Editar
        </button>
        <button
          onClick={() => handleEliminar(producto.id)}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 cursor-pointer mr-2">
            Borrar
        </button>
      </td>
    </tr>
  )
}

export default Fila