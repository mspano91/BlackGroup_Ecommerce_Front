
import  { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom"; 
import { updateUser } from "../../Redux/actions"


function validation(input) {
  const errors = {};
  if (!input.username || !/^(?:[A-Z][a-zA-Z]*)(?: [A-Z][a-zA-Z]*){0,2}$/.test(input.username)) {
    errors.username = "Debe tener un nombre válido con la primera letra mayúscula y permitir nombres compuestos de hasta 255 caracteres.";
  }
  if (!input.location || !/^(?:[A-Z][a-zA-Z]*)(?:-[A-Z][a-zA-Z]*){0,1}$/.test(input.location)) {
    errors.location = "Debe tener un nombre válido, con la primera letra mayúscula. Permite compuestos separados por un guión (-)";
  }
  if (!/^\(\d{3}\)\d{4}-\d{4}$/.test(input.phone)) {
    errors.phone = "Debe contener un número de teléfono válido. Ej (000)0000-0000 ";
  }
  if (!/^\S+@\S+\.\S+$/.test(input.email)) {
    errors.email = "Debe ser un email válido";
  }
  if (input.password.length < 8) {
    errors.password = "Debe contener mínimo 8 caracteres";
  }
  if (input.password !== input.confirmPassword) {
    errors.confirmPassword = "Las contraseñas no coinciden";
  }
  return errors;
}

function PerfilUser() {

  const dispatch = useDispatch();
  const { username } = useParams(); 
  const [errors, setErrors] = useState({})
  const [input, setInput] = useState({
    username: username, 
    phone: "",
    location: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  function handleChange(event) {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    setErrors(validation(input));
      setInput((prevInput) => ({ ...prevInput, formSubmitted: true }));
      if (
        Object.keys(errors).length === 0 &&
        input.username !== "" &&
        input.location !== "" &&
        input.email !== "" &&
        input.password !== "" &&
        input.confirmPassword !== ""
      )
    dispatch(updateUser(input));
    
  }

  return (
    <div>
      <h2>Modificar Perfil</h2>
      <form onSubmit={handleSubmit}>
          <div>
          <label>Nombre Completo:</label>
          <input
            type="text"
            name="username"
            value={input.username}
            onChange={(event) => handleChange(event)}
            required
          />
          {errors.username && <p className="error-message">{errors.username}</p>}
        </div>

        <div>
          <label>Localidad:</label>
          <input
            type="text"
            name="location"
            value={input.location}
             onChange={(event) => handleChange(event)}
            required
          />
          {errors.location && <p className="error-message">{errors.location}</p>}
        </div>

        <div>
          <label>Telefono:</label>
          <input
            type="text"
            name="phone"
            value={input.phone}
            onChange={(event) => handleChange(event)}
            required
          />
          {errors.phone && <p className="error-message">{errors.phone}</p>}
        </div>

        <div>
          <label>Correo Electrónico:</label>
          <input
            type="email"
            name="email"
            value={input.email}
            onChange={(event) => handleChange(event)}

            required
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>

        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            name="password"
            value={input.password}
            onChange={(event) => handleChange(event)}
            required
          />
          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>

        <div>
          <label>Confirmar Contraseña:</label>
          <input
            type="password"
            name="confirmPassword"
            value={input.confirmPassword}
            onChange={(event) => handleChange(event)}
            required
          />
          {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
        </div>


        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
}

export default PerfilUser;

