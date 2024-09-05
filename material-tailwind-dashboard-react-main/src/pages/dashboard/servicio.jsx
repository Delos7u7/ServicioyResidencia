import React from "react";
import {
  Card,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom"; // Importa Link desde react-router-dom

const fases = [
  { title: "¡Escoge el lugar para hacer tu servicio social!", path: "/dashboard/solicitud-servicio-social/afiliaciones" },
  { title: "Requisitos iniciales", path: "/dashboard/solicitud-servicio-social" },
  { title: "Carta presentación", path: "/dashboard/carta-presentacion" },
  //{ title: "Carta aceptación", path: "/carta-aceptacion" },
  { title: "Carta compromiso de servicio social", path: "/dashboard/carta-compromiso" },
];

export function Servicio() {
  return (
    <div className="container mx-auto p-4">
      <Typography variant="h4" className="text-center mb-8">
        Fases del Servicio Social
      </Typography>
      <div className="grid grid-cols-1 gap-4">
        {fases.map((fase, index) => (
          <Card key={index} className="rounded-lg shadow-lg mb-8">
            <CardBody className="flex justify-between items-center">
              <Typography variant="h6">
                {fase.title}
              </Typography>
              <Link to={fase.path} className="text-blue-500 hover:underline">
                Ir
              </Link>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Servicio;