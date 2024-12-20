import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, Typography, Menu, MenuHandler, MenuList, MenuItem, IconButton } from '@material-tailwind/react';
import { CheckCircleIcon, EllipsisVerticalIcon } from "@heroicons/react/24/outline";

export function Afiliaciones({ tipo }) {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    async function fetchDatos() {
      try {
        const response = await fetch("/api/afiliaciones");
        const result = await response.json();
        setDatos(result);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    }

    fetchDatos();
  }, []);

  return (
    <Card className="overflow-hidden xl:col-span-2 border border-blue-gray-100 shadow-sm">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 flex items-center justify-between p-6"
      >
        <div>
          <Typography variant="h6" color="blue-gray" className="mb-1">
            {tipo === "residencia" ? "Residencia" : "Servicio"}
          </Typography>
          <Typography
            variant="small"
            className="flex items-center gap-1 font-normal text-blue-gray-600"
          >
            <CheckCircleIcon strokeWidth={3} className="h-4 w-4 text-blue-gray-200" />
            <strong>{datos.length}</strong> registros
          </Typography>
        </div>
        <Menu placement="left-start">
          <MenuHandler>
            <IconButton size="sm" variant="text" color="blue-gray">
              <EllipsisVerticalIcon
                strokeWidth={3}
                fill="currenColor"
                className="h-6 w-6"
              />
            </IconButton>
          </MenuHandler>
          <MenuList>
            <MenuItem>Action</MenuItem>
            <MenuItem>Another Action</MenuItem>
            <MenuItem>Something else here</MenuItem>
          </MenuList>
        </Menu>
      </CardHeader>
      <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
        <table className="w-full min-w-[640px] table-auto">
          <thead>
            <tr>
              {[
                "clave",
                "programa",
                "tipo_programa",
                "empresa_dependencia_organismo",
                "área",
                "responsable",
                "télefono",
                "dirección",
              ].map((el) => (
                <th
                  key={el}
                  className="border-b border-blue-gray-50 py-3 px-6 text-left"
                >
                  <Typography
                    variant="small"
                    className="text-[11px] font-medium uppercase text-blue-gray-400"
                  >
                    {el}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {datos.length > 0 ? (
              datos.map(
                (
                  {
                    clave,
                    programa,
                    tipo_programa,
                    empresa_dependencia_organismo,
                    area,
                    responsable,
                    telefono,
                    direccion,
                  },
                  key
                ) => {
                  const className = `py-3 px-5 ${
                    key === datos.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={clave}>
                      <td className={className}>{clave}</td>
                      <td className={className}>{programa}</td>
                      <td className={className}>{tipo_programa}</td>
                      <td className={className}>
                        {empresa_dependencia_organismo}
                      </td>
                      <td className={className}>{area}</td>
                      <td className={className}>{responsable}</td>
                      <td className={className}>{telefono}</td>
                      <td className={className}>{direccion}</td>
                    </tr>
                  );
                }
              )
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-3">
                  No hay registros disponibles
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
}

export default Afiliaciones;
