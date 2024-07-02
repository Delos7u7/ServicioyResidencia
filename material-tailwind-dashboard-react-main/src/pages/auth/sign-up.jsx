import React, { useState } from "react";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

export function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      name,
      email,
      password,
    };

    try {
      const response = await fetch('https://tu-backend.com/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // Maneja la respuesta exitosa
        console.log('Registro exitoso');
      } else {
        // Maneja el error
        console.error('Error en el registro');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
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
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Correo Electrónico
            </Typography>
            <Input
              size="lg"
              placeholder="Ej. itsoeh@itsoeh.edu.mx"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Contraseña
            </Typography>
            <Input
              size="lg"
              placeholder="********"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
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
