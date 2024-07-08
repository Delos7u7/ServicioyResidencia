import React, { useState, useEffect } from "react";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

export function SignUp() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [error, setError] = useState("");
  const [correoError, setCorreoError] = useState("");
  const [contraseniaError, setContraseniaError] = useState("");

  const validarCorreo = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@itsoeh\.edu\.mx$/;
    return regex.test(email);
  };

  const validarContrasenia = (password) => {
    return password.length >= 8;
  };

  useEffect(() => {
    if (correo && !validarCorreo(correo)) {
      setCorreoError("El correo debe tener el dominio @itsoeh.edu.mx");
    } else {
      setCorreoError("");
    }
  }, [correo]);

  useEffect(() => {
    if (contrasenia && !validarContrasenia(contrasenia)) {
      setContraseniaError("La contraseña debe tener al menos 8 caracteres");
    } else {
      setContraseniaError("");
    }
  }, [contrasenia]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(""); // Limpiar errores anteriores

    if (!validarCorreo(correo)) {
      setError("El correo electrónico debe tener el dominio @itsoeh.edu.mx");
      return;
    }

    if (!validarContrasenia(contrasenia)) {
      setError("La contraseña debe tener al menos 8 caracteres");
      return;
    }

    const data = {
      nombre,
      correo,
      contrasenia,
    };

    try {
      const response = await fetch('http://178.6.4.241:8000/api/registro/alumno', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log('Registro exitoso');
        // Aquí puedes redirigir al usuario o mostrar un mensaje de éxito
      } else if (response.status === 401) {
        setError("El correo electrónico ya está registrado.");
      } else {
        setError("Error en el registro. Por favor, intente nuevamente.");
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      setError("Error de conexión. Por favor, intente más tarde.");
    }
  };

  return (
    <section className="h-screen flex">
      <div className="w-2/5 hidden lg:flex lg:items-center lg:justify-center">
        <img
          src="/img/Esparco.webp"
          className="w-4/5 h-4/5 object-contain rounded-3xl"
        />
      </div>
      <div className="w-full lg:w-3/5 flex flex-col items-center justify-center">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">Regístrate ahora</Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Introduce tus datos para registrarte.</Typography>
        </div>
        <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2" onSubmit={handleSubmit}>
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Nombre
            </Typography>
            <Input
              size="lg"
              placeholder="Ej. Francisco Trejo Barrera"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Correo Electrónico
            </Typography>
            <Input
              size="lg"
              placeholder="Ej. usuario@itsoeh.edu.mx"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
            {correoError && (
              <Typography variant="small" color="red" className="mt-1">
                {correoError}
              </Typography>
            )}
           <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
            Contraseña
          </Typography>
          <Input
            type="password"
            size="lg"
            placeholder="********"
            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            value={contrasenia}
            onChange={(e) => setContrasenia(e.target.value)}
          />
          {contraseniaError && (
            <Typography variant="small" color="red" className="mt-1">
              {contraseniaError}
            </Typography>
          )}
          </div>
          {error && (
            <Typography variant="small" color="red" className="mt-2">
              {error}
            </Typography>
          )}
          <Button className="mt-6" fullWidth type="submit">
            Registrarse
          </Button>
          <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
            ¿Ya tiene una cuenta?
            <Link to="/auth/sign-in" className="text-gray-900 ml-1">Inicie sesión</Link>
          </Typography>
        </form>
      </div>
    </section>
  );
}

export default SignUp;
