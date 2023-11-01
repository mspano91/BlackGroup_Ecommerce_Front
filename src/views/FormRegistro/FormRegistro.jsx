import styles from "../FormRegistro/FormRegistro.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUser, filterRestart, googleUser } from "../../Redux/actions";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";

const URL = import.meta.env.VITE_BACK_URL || "http://localhost:3001";

function validation(input) {
  const errors = {};
  //(!input.username || !/^(?:[A-Za-z][a-zA-Z]*)(?: [A-Za-z][a-zA-Z]*){0,2}$/.test(input.username)

  if (
    !input.username ||
    !/^(?:[A-Z][a-zA-Z]*)(?: [A-Z][a-zA-Z]*){0,2}$/.test(input.username)
  ) {
    errors.username = "Debe contener un Nombre. Ej: Maria Luna";
  }
  if (
    !input.location ||
    !/^(?:[A-Z][a-zA-Z]*)(?:-[A-Z][a-zA-Z]*){0,1}$/.test(input.location)
  ) {
    errors.location = "Debe contener una localidad válida";
  }
  if (!/^\(\d{3}\)\d{4}-\d{4}$/.test(input.phone)) {
    errors.phone = "Debe contener un número válido. Ej (000)0000-0000 ";
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

export default function FormRegistro() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    username: "",
    phone: "",
    location: "",
    email: "",
    password: "",
    confirmPassword: "",
    formSubmitted: false,
  });

  function handleChange(event) {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
    setErrors(
      validation({
        ...input,
        [event.target.name]: event.target.value,
      })
    );
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
    ) {
      dispatch(registerUser(input, navigate));
      dispatch(filterRestart());
      setInput({
        username: "",
        phone: "",
        location: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    }
  }

  const handleOnGoogle = () => {
    const width = 500;
    const height = 600;
    const top = Math.max(
      (window.screen.availHeight - height) / 2,
      0
    ).toString();
    const left = Math.max((window.screen.availWidth - width) / 2, 0).toString();

    window.open(
      `${URL}/users/google`,
      "Google Login",
      `width=${width}, height=${height}, left=${left}, top=${top}`
    );

    window.addEventListener("message", async function (event) {
      if (event.data.type === "AUTH_SUCCESS") {
        dispatch(googleUser(event.data.payload));
        navigate("/");
      } else if (event.data.type === "AUTH_ERROR") {
        await Swal.fire({
          title: event.data.payload.error,
          icon: "error",
          background: "#1A1A1A",
          color: "#ffffff",
        });
      }
    });
  };

  return (
    <div className={styles.loginContainer}>
      <form onSubmit={handleSubmit}>
        <div className={styles.login}>
          <section className={styles.formimput}>
            <div className={styles.columna}>
              <div className={styles.labelimput}>
                <label>Nombre Completo:</label>
                <input
                  type="text"
                  name="username"
                  value={input.username}
                  onChange={(event) => handleChange(event)}
                  required
                />
                {errors.username && (
                  <p className={styles.error}> {errors.username} </p>
                )}
              </div>

              <div className={styles.labelimput}>
                <label>Localidad:</label>
                <input
                  type="text"
                  name="location"
                  value={input.location}
                  onChange={(event) => handleChange(event)}
                  required
                />
                {errors.location && (
                  <p className={styles.error}>{errors.location}</p>
                )}
              </div>
              <div className={styles.labelimput}>
                <label>Contraseña:</label>
                <input
                  type="password"
                  name="password"
                  value={input.password}
                  onChange={(event) => handleChange(event)}
                  required
                />
                {errors.password && (
                  <p className={styles.error}>{errors.password}</p>
                )}
              </div>

              <div className={styles.buttonContainer}>
                <button type="submit">REGISTRARSE</button>
              </div>
            </div>

            <div className={styles.columna}>
              <div className={styles.labelimput}>
                <label>Correo Electrónico:</label>
                <input
                  type="email"
                  name="email"
                  value={input.email}
                  onChange={(event) => handleChange(event)}
                  required
                />
                {errors.email && <p className={styles.error}>{errors.email}</p>}
              </div>
              <div className={styles.labelimput}>
                <label>Teléfono:</label>
                <input
                  type="text"
                  name="phone"
                  value={input.phone}
                  onChange={(event) => handleChange(event)}
                  required
                />
                {errors.phone && <p className={styles.error}>{errors.phone}</p>}
              </div>

              <div className={styles.labelimput}>
                <label>Confirmar Contraseña:</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={input.confirmPassword}
                  onChange={(event) => handleChange(event)}
                  required
                />
                {errors.confirmPassword && (
                  <p className={styles.error}>{errors.confirmPassword}</p>
                )}
              </div>
              <div className={styles.iniciarsesion}>
                <Link to="/form/login">
                  <button>INICIAR SESIÓN</button>
                </Link>
              </div>
            </div>
          </section>
        </div>
      </form>
      <div className={styles.divGoogle}>
        <button onClick={() => handleOnGoogle()}>
          <FcGoogle /> CONTINUAR CON GOOGLE
        </button>
      </div>
    </div>
  );
}
