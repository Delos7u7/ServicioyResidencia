import React, { useState } from 'react';
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

export function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { email, password };

    try {
      const response = await fetch('TU_ENDPOINT_AQUI', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // Manejar la respuesta exitosa
        console.log('Login successful');
      } else {
        // Manejar errores
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <section className="h-screen flex">
      <div className="w-full lg:w-3/5 flex flex-col justify-center">
        <div className="text-center mb-4">
          <Typography variant="h2" className="font-bold mb-2">Inicia Sesión</Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Introduce tu correo electrónico y tu contraseña para iniciar sesión.</Typography>
        </div>
        <form className="mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2" onSubmit={handleSubmit}>
          <div className="mb-11 flex flex-col gap-4">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Correo electrónico
            </Typography>
            <Input
              size="lg"
              placeholder="Ej. itsoeh@itsoeh.edu.com"
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
              type="password"
              size="lg"
              placeholder="***********"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button type="submit" className="mt-6" fullWidth>
            INICIAR SESIÓN
          </Button>

          <div className="flex items-center justify-end gap-2 mt-6">
            <Typography variant="small" className="font-medium text-gray-900">
              <a href="#">
                Olvidé mi contraseña
              </a>
            </Typography>
          </div>
          <div className="space-y-4 mt-8">
          </div>
          <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
            ¿No tienes cuenta?
            <Link to="/auth/sign-up" className="text-gray-900 ml-1">Crea una</Link>
          </Typography>
        </form>

      </div>
      <div className="w-2/5 hidden lg:flex lg:items-center lg:justify-center">
        <img
          src="/img/Esparco.webp"
          className="w-4/5 h-4/5 object-contain rounded-3xl"
        />
      </div>

    </section>
  );
}

export default SignIn;