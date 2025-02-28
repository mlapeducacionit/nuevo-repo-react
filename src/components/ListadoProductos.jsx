import Fila from "./Fila";
import Spinner from "./Spinner";

const ListadoProductos = ({
  productos,
  borrarProducto,
  setProductoAEditar,
}) => {
  return (
    <>
      {productos ? (
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-200">
            <tr>
              <th className="px-6 py-3">Nombre</th>
              <th className="px-6 py-3">Categoría</th>
              <th className="px-6 py-3">Precio</th>
              <th className="px-6 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {
              productos.map((producto) => (
                <Fila
                  producto={producto}
                  key={producto.id}
                  borrarProducto={borrarProducto}
                  setProductoAEditar={setProductoAEditar}
                />
              ))
            }
          </tbody>
        </table>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default ListadoProductos;

/*  {
  productos ? (
    <div>Tengo los productos</div>
  ) : (
    <div>No tengo aún los productos</div>
  )
} */

/* {
  productos ? (
    productos.map((producto) => (
      <Fila 
        producto={producto} 
        key={producto.id} 
        borrarProducto={borrarProducto}
        setProductoAEditar={setProductoAEditar} /> 
    ))
  ) : (
    <div>No tengo aún los productos</div>
  )
} */

/* v AND v = V */
/* v AND f = f*/
/* f AND v = f */
/* f AND f = f */

/*  {
  productos && productos.map((producto) => (
    <Fila 
      producto={producto} 
      key={producto.id} 
      borrarProducto={borrarProducto}
      setProductoAEditar={setProductoAEditar} /> 
  ))
  
}  */
