// Importación de módulos y bibliotecas necesarios
import React, { useState, useEffect } from "react"; // Importar React y hooks necesarios
import { API_URL } from "../config"; // Importar la URL de la API
import { useParams, Link } from "react-router-dom"; // Importar useParams y Link para manejar las rutas

// Se importa la libreria Fonts Awesome 6.4.2 y cada icono a usar en las vistas
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Libreria General
import { faUser } from '@fortawesome/free-solid-svg-icons'; // Importar icono faUser
import { faIdCardClip } from '@fortawesome/free-solid-svg-icons'; // Importar icono faIdCardClip
import { faLeftLong } from '@fortawesome/free-solid-svg-icons'; // Importar icono faLeftLong

export default function ViewUser() {
  let { id } = useParams(); // Obtener el parámetro "id" de la URL
  const [user, setUser] = useState({}); // Inicializar el estado del usuario
  const [loading, setLoading] = useState(false); // Inicializar el estado de carga

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Marcar que la carga está en progreso
      try {
        // Obtener datos del usuario desde la API
        const userResponse = await fetch(`${API_URL}/users/${id}`);
        const userJson = await userResponse.json();
        setUser(userJson.data); // Actualizar el estado del usuario con los datos recibidos

        setLoading(false); // Marcar que la carga ha finalizado
      } catch (error) {
        console.log("error", error); // Manejar errores en caso de fallo en la solicitud
        setLoading(false); // Marcar que la carga ha finalizado (incluso en caso de error)
      }
    };

    fetchData(); // Llamar a la función fetchData al montar el componente y cuando el valor de "id" cambie
  }, [id]);

  return (
    <div>
      {!loading ? ( // Si la carga no está en progreso
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="card border-primary">
                {/* Barra de navegación */}
                <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
                  <div className="container-fluid">
                    <a className="navbar-brand mx-auto"><FontAwesomeIcon icon={faIdCardClip} /> DATOS GENERALES</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
                      <span className="navbar-toggler-icon"></span>
                    </button>
                  </div>
                </nav>

                <div className="card-body">
                  <Link to="/" className="btn btn-outline-dark active btn"><FontAwesomeIcon icon={faLeftLong} /> REGRESAR</Link>

                  <br></br>
                  <br></br>

                  {/* Datos del usuario */}
                  <div className="mb-3">
                    <div className="list-group">
                      <a className="list-group-item list-group-item-action active">NOMBRE COMPLETO</a>
                      <a className="list-group-item list-group-item-action disabled">👨🏻‍💻 {user.nombre} {user.paterno} {user.materno}</a>
                    </div>
                  </div>

                  {/* Correo y teléfono */}
                  <div className="container">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <div className="list-group">
                            <a className="list-group-item list-group-item-action active">CORREO</a>
                            <a className="list-group-item list-group-item-action disabled">✉ {user.email}</a>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="mb-3">
                          <div className="list-group">
                            <a className="list-group-item list-group-item-action active">TELÉFONO</a>
                            <a className="list-group-item list-group-item-action disabled">📞 {user.telefono}</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Entidad, contraseña y registro */}
                  <div className="mb-3">
                    <div className="list-group">
                      <a className="list-group-item list-group-item-action active">ENTIDAD</a>
                      <a className="list-group-item list-group-item-action disabled">📍 {user.entidad}</a>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="list-group">
                      <a className="list-group-item list-group-item-action active">CONTRASEÑA</a>
                      <a className="list-group-item list-group-item-action disabled">🔑 {user.city}</a>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="list-group">
                      <a className="list-group-item list-group-item-action active">REGISTRO</a>
                      <a className="list-group-item list-group-item-action disabled">🗓 {user.date}</a>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        "" // Si la carga está en progreso, no se muestra nada
      )}
    </div>
  );
}
