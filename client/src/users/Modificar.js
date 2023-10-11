// Importación de módulos y bibliotecas necesarios
import Swal from 'sweetalert2'; // SweetAlert2 para mostrar alertas
import axios from "axios"; // Axios para realizar solicitudes HTTP
import moment from "moment"; // Moment.js para el manejo de fechas
import React, { useState } from "react"; // React y useState para componentes de React y estado local
import { Link } from "react-router-dom"; // React Router para navegación
import { API_URL } from "../config"; // Importación de una URL de la API

// Se importa la libreria Fonts Awesome 6.4.2 y cada icono a usar en las vistas
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Libreria General
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

// Definición del componente principal Modificar
export default function Modificar({ user, fetchData }) {

// Definición de estados locales para varios campos del usuario
const [xnombre, setnombre] = useState(user.nombre || ""); 
const [xpaterno, setpaterno] = useState(user.paterno || ""); 
const [xmaterno, setmaterno] = useState(user.materno || "");
const [emailValue, setEmailValue] = useState(user.email);
const [xtelefono, settelefono] = useState(user.telefono || "");
const [dateValue, setDateValue] = useState(moment(user.date).format("YYYY-MM-DD"));
const [cityValue, setCityValue] = useState(user.city || "");
const [countryValue, setCountryValue] = useState(user.entidad || "");

// Función para abrir un modal de edición
const openModal = () => {document.getElementById("new-modal-" + user.id).classList.remove("hidden");};

// Función para cerrar el modal de edición
const closeModal = () => {document.getElementById("new-modal-" + user.id).classList.add("hidden");};

// Función para completar el formulario de edición y recargar los datos
const completeForm = (form) =>
{
  closeModal();
  fetchData();
};

// Función para actualizar un usuario mediante una solicitud PATCH
const updateUser = (e) =>
{
  e.preventDefault();
  var form = document.getElementById(`editform-${user.id}`);
  var formData = new FormData(form);
  axios
  .patch(`${API_URL}/users/${user.id}`, formData)
  .then((res) => completeForm(form))
  .catch((error) => console.log(error.response));
};

// Función para eliminar un usuario con confirmación usando SweetAlert2
const deleteUser = () =>
{
    Swal.fire(
    {
      title: '¿Estás seguro de eliminar?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, borrarlo',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed)
      {
        axios
          .delete(`${API_URL}/users/${user.id}`)
          .then((res) => {fetchData();Swal.fire('Eliminado', 'El usuario ha sido eliminado.', 'success');})
          .catch((error) => {console.log(error.response);Swal.fire('Error', 'Hubo un error al eliminar el usuario.', 'error');});
      }
      else {console.log('Cancelado');}
    });
  };

  // Renderización del componente Modificar
  return (
    <div className="bg-slate-100 rounded-lg mb-4 p-4 hover:border hover:border-blue-400">

      <div>

        <div>
          <div className="font-medium">{user.nombre}</div>
          <div className="text-slate-400">{user.email}</div>
        </div>

  <div className="text-sm flex space-x-4 mt-1">
  <Link to={`/usuario/${user.id}`}><strong>LEER</strong></Link>
  <button onClick={openModal}><strong><FontAwesomeIcon icon={faPenToSquare} /> ACTUALIZAR</strong></button>
  <button onClick={deleteUser} className="text-red-500"><strong><FontAwesomeIcon icon={faTrash} /> ELIMINAR</strong></button>
</div>


      </div>


      <div className="relative z-10 hidden" aria-labelledby="modal-title" role="dialog" aria-modal="true" id={`new-modal-${user.id}`}>
        <div className="fixed inset-0  transition-opacity"></div>
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 pb-20 text-center sm:block sm:p-0">
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>
            
            <div className="bg-gray-700  mb-1 p-2  relative inline-block text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg w-full">
              <form id={`editform-${user.id}`} onSubmit={updateUser} action="">
                <div className="bg-white">

                  <div className="flex justify-between px-8 border-b">
                    <h3 className="font-medium "><strong>ACTUALIZAR</strong></h3>
                    <button className="-md bg-gray-700 px-2 py-1 text-white" type="button" onClick={closeModal}><strong><FontAwesomeIcon icon={faCircleXmark} /> CERRAR</strong></button>
                  </div>
                  
<div className="px-3 py-3">

<div className="mb-3">
  <label className="text-sm font-bold"><FontAwesomeIcon icon={faUser} /> NOMBRE</label>
  <input
    type="text"
    name="nombre"
    value={xnombre}
    onChange={(e) => setnombre(e.target.value)}
    className="border w-full py-2 px-3"
    required
  />
</div>

<div className="mb-3 flex">
  <div className="w-1/2 mr-2">
    <label className="text-sm font-bold"><FontAwesomeIcon icon={faBars} /> APELLIDO PATERNO</label>
    <input
      type="text"
      name="paterno"
      value={xpaterno}
      onChange={(e) => setpaterno(e.target.value)}
      className="border w-full py-2 px-3"
      required
    />
  </div>
  <div className="w-1/2 ml-2">
    <label className="text-sm font-bold"><FontAwesomeIcon icon={faBars} /> APELLIDO MATERNO</label>
    <input
      type="text"
      name="materno"
      value={xmaterno}
      onChange={(e) => setmaterno(e.target.value)}
      className="border w-full py-2 px-3"
      required
    />
  </div>
</div>

<div className="mb-3 flex">
  <div className="w-1/2 mr-2">
    <label className="block text-gray-700 text-sm font-bold mb-2"><FontAwesomeIcon icon={faEnvelope} /> CORREO</label>
    <input
      type="email"
      name="email"
      value={emailValue}
      onChange={(e) => setEmailValue(e.target.value)}
      className="border w-full py-2 px-3"
      required
    />
  </div>
  <div className="w-1/2 ml-2">
    <label className="block text-gray-700 text-sm font-bold mb-2"><FontAwesomeIcon icon={faPhone} /> TELÉFONO</label>
    <input
      type="text"
      name="telefono"
      value={xtelefono}
      onChange={(e) => settelefono(e.target.value)}
      className="border w-full py-2 px-3"
      required
    />
  </div>
</div>


<div className="mb-3">
  <label className="block text-gray-700 text-sm font-bold mb-2"><FontAwesomeIcon icon={faLocationDot} /> ENTIDAD</label>
  <select
  name="entidad"
  className="border w-full py-2 px-3"
  value={countryValue}
  onChange={(e) => setCountryValue(e.target.value)}
  required
  >
<option value="AGUASCALIENTES">AGUASCALIENTES</option>
<option value="BAJA CALIFORNIA">BAJA CALIFORNIA</option>
<option value="BAJA CALIFORNIA SUR">BAJA CALIFORNIA SUR</option>
<option value="CAMPECHE">CAMPECHE</option>
<option value="CHIAPAS">CHIAPAS</option>
<option value="CHIHUAHUA">CHIHUAHUA</option>
<option value="CIUDAD DE MÉXICO">CIUDAD DE MÉXICO</option>
<option value="COAHUILA">COAHUILA</option>
<option value="COLIMA">COLIMA</option>
<option value="DURANGO">DURANGO</option>
<option value="GUANAJUATO">GUANAJUATO</option>
<option value="GUERRERO">GUERRERO</option>
<option value="HIDALGO">HIDALGO</option>
<option value="JALISCO">JALISCO</option>
<option value="MÉXICO">MÉXICO</option>
<option value="MICHOACÁN">MICHOACÁN</option>
<option value="MORELOS">MORELOS</option>
<option value="NAYARIT">NAYARIT</option>
<option value="NUEVO LEÓN">NUEVO LEÓN</option>
<option value="OAXACA">OAXACA</option>
<option value="PUEBLA">PUEBLA</option>
<option value="QUERÉTARO">QUERÉTARO</option>
<option value="QUINTANA ROO">QUINTANA ROO</option>
<option value="SAN LUIS POTOSÍ">SAN LUIS POTOSÍ</option>
<option value="SINALOA">SINALOA</option>
<option value="SONORA">SONORA</option>
<option value="TABASCO">TABASCO</option>
<option value="TAMAULIPAS">TAMAULIPAS</option>
<option value="TLAXCALA">TLAXCALA</option>
<option value="VERACRUZ">VERACRUZ</option>
<option value="YUCATÁN">YUCATÁN</option>
<option value="ZACATECAS">ZACATECAS</option>
</select>
</div>

<div className="mb-3">
  <label className="block text-gray-700 text-sm font-bold mb-2"><FontAwesomeIcon icon={faLock} /> CONTRASEÑA</label>
  <input
    type="text"
    name="city"
    value={cityValue}
    onChange={(e) => setCityValue(e.target.value)}
    className="border w-full py-2 px-3"
    required
  />
</div>

<div className="mb-3">
  <label className="block text-gray-700 text-sm font-bold mb-2"><FontAwesomeIcon icon={faCalendarDays} /> REGISTRO</label>
  <input
    type="date"
    name="date"
    value={dateValue}
    onChange={(e) => setDateValue(e.target.value)}
    className="border w-full py-2 px-3"
    required
  />
</div>

<div className="flex justify-end">
  <button type="submit" className="bg-gray-700 text-white py-1.5 px-4 mx-auto"><FontAwesomeIcon icon={faFloppyDisk} /> GUARDAR</button>
</div>

                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
}
