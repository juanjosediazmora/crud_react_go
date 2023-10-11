import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { API_URL } from "../config";
import Modificar from "./Modificar";

// Se importa la libreria Fonts Awesome 6.4.2 y cada icono a usar en las vistas
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { faLaptopCode } from '@fortawesome/free-solid-svg-icons';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

export default function List()
{
// Estado para almacenar la lista de usuarios
const [users, setUsers] = useState([]);

// Estado para almacenar la paginación
const [pages, setPages] = useState([0]);
  
// Obtener los parámetros de búsqueda de la URL
const [searchParams, setSearchParams] = useSearchParams();
  
// Función para navegar entre vistas
let navigate = useNavigate();

// Estado para almacenar la fecha y hora actual en formato ISO 8601
const [currentDate, setCurrentDate] = useState('');

// Función para obtener y cargar los datos de los usuarios desde la API
const fetchData = async () =>
{
    const page = searchParams.get("page") ? "&page=" + searchParams.get("page") : "";
    try { // Cantidad y paginación por vista
      const response = await fetch(`${API_URL}/users?sort=-id&size=5${page}`);
      const json = await response.json();
      setUsers(json.data.items);
      setPages(json.data.total_pages);
    } catch (error) {
      console.log("error", error);
    }
};

// Función para abrir el modal de creación de usuario
const openModal = () =>{document.getElementById("new-modal").classList.remove("hidden");};

// Función para cerrar el modal de creación de usuario
const closeModal = () => {document.getElementById("new-modal").classList.add("hidden");};

// Función para completar el formulario de creación de usuario
const completeForm = (form) =>
{
    closeModal();
    form.reset();
    fetchData();
    navigate("/");
};

// Función para almacenar un nuevo usuario
const storeUser = (e) =>
{
    e.preventDefault();
    var form = document.getElementById("newform");
    var formData = new FormData(form);
    axios
      .post(`${API_URL}/users`, formData)
      .then((res) => completeForm(form))
      .catch((error) => console.log(error.response));
};

// Efecto para cargar los datos iniciales y establecer la fecha actual
useEffect(() =>
{
    fetchData();
// Obtener la fecha y hora actual en GMT-6 (Zona Horaria Central México).
const today = new Date();
today.setHours(today.getHours() - 6); // Restamos 6 horas para ajustar a GMT-6.
    
// Formatear la fecha y hora en formato ISO 8601.
const isoDateTime = today.toISOString().slice(0, 16); // Cortamos para obtener el formato "YYYY-MM-DDTHH:mm".
  
// Establecer la fecha y hora en GMT-6 como valor predeterminado del campo.
setCurrentDate(isoDateTime);
}, [searchParams]);
  
let myPage = searchParams.get("page") ? searchParams.get("page") : 0;

  return (
    <div className="flex justify-center">
      <div className="lg:w-1/3 w-full">
        <div className="p-10">

<div className="mb-10 flex items-center justify-between">
  <h3 className="font-bold text-center"><FontAwesomeIcon icon={faLaptopCode} />  TALLER DE DISEÑO DE SOFTWARE</h3>
  <button className="rounded-md bg-indigo-700 px-3 py-2  text-white shadow-sm hover:bg-indigo-800 " onClick={openModal}><FontAwesomeIcon icon={faCirclePlus} /> AGREGAR</button>
</div>


          <div>
            {users.length > 0 ? users.map((user, key) => <Modificar key={key} user={user} fetchData={fetchData} />) : ""}
          </div>

          <div className="mt-4">
            {Array.from({ length: pages }, (_, index) => index + 1).map((pg, key) => (
              <Link className={`border px-3 py-1 mr-3 ${myPage == key ? "bg-blue-600 text-green-100" : ""}`} to={`?page=${key}`} key={key}>
                {key + 1}
              </Link>
            ))}
          </div>
          <br></br>
          <h5 className="font-bold"><center><FontAwesomeIcon icon={faGraduationCap} /> JUAN JOSÉ DIAZ MORA</center></h5>











          <div className="relative z-10 hidden" aria-labelledby="modal-title" role="dialog" aria-modal="true" id="new-modal">
            <div className="fixed inset-0 "></div>
            <div className="fixed z-10 inset-0 overflow-y-auto">
              <div className="flex items-end justify-center min-h-screen pt-4 text-center sm:block sm:p-0">
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                  &#8203;
                </span>
                <div className="bg-indigo-700  mb-1 p-2  relative inline-block text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg w-full">
                  
                  <form id="newform" onSubmit={storeUser} action="">
                    <div className="bg-white">
                      <div className="flex justify-between px-8 border-b">
                        <h1 className="font-medium">CREAR</h1>
                        <button className="-md bg-indigo-700 px-2 py-1 text-white" type="button" onClick={closeModal}><FontAwesomeIcon icon={faCircleXmark} /> CERRAR</button>
                      </div>

<div className="px-3 py-3">

<div className="mb-3">
  <label className="text-sm font-bold"><FontAwesomeIcon icon={faUser} /> NOMBRE</label>
  <input
    type="text"
    name="nombre"
    maxLength="25"
    autoComplete="off"
    className="border w-full py-2 px-3"
    required
  />
</div>

<div className="grid grid-cols-2 gap-2">
  <div className="mb-3">
    <label className="text-sm font-bold"><FontAwesomeIcon icon={faBars} /> APELLIDO PATERNO</label>
    <input
      type="text"
      name="paterno"
      maxLength="25"
      autoComplete="off"
      className="border w-full py-2 px-3"
      required
    />
  </div>

  <div className="mb-3">
    <label className="text-sm font-bold"><FontAwesomeIcon icon={faBars} /> APELLIDO MATERNO</label>
    <input
      type="text"
      name="materno"
      maxLength="25"
      autoComplete="off"
      className="border w-full py-2 px-3"
      required
    />
  </div>

  <div className="mb-3">
  <label className="text-sm font-bold"><FontAwesomeIcon icon={faEnvelope} /> CORREO</label>
  <input
  type="email"
  name="email"
  maxLength="99"
  autoComplete="off"
  className="border w-full py-2 px-3"
  required
  defaultValue="@"
/>
</div>

<div className="mb-3">
  <label className="text-sm font-bold"><FontAwesomeIcon icon={faPhone} /> TELÉFONO</label>
  <input
    type="text"
    name="telefono"
    maxLength="10"
    autoComplete="off"
    className="border w-full py-2 px-3"
    required
  />
</div>

</div>

<div className="mb-3">
  <label className="text-sm font-bold"><FontAwesomeIcon icon={faLocationDot} /> ENTIDAD</label>
  <select
  name="entidad"
  className="border w-full py-2 px-3"
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
  <label className="text-sm font-bold"><FontAwesomeIcon icon={faLock} /> CONTRASEÑA</label>
  <input
    type="text"
    name="city"
    maxLength="99"
    autoComplete="off"
    className="border w-full py-2 px-3"
    required
  />
</div>

<div className="mb-3">
  <label className="text-sm font-bold"><FontAwesomeIcon icon={faCalendarDays} /> REGISTRO</label>
  <input
                  type="datetime-local"
                  name="date"
                  autoComplete="off"
                  className="border w-full py-2 px-3"
                  required
                  defaultValue={currentDate}
                  onChange={(e) => setCurrentDate(e.target.value)}
                />
</div>


<div className="text-center">
  <button type="submit" className="bg-indigo-700 text-white py-1.5 px-4 mx-auto"><FontAwesomeIcon icon={faPaperPlane} /> ENVIAR</button>
</div>

</div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>
  );
}
