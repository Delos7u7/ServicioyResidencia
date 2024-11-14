import React, { useState } from "react";
import {
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';
import { saveAs } from 'file-saver';
import { useNavigate } from 'react-router-dom';

export default function XXII() {
  // Estado para el resumen de actividades
  const [resumenActividades, setResumenActividades] = useState("");

  // Datos estáticos
  const datosEstaticos = {
    nombreEstudiante: "Ramón Pérez García",
    matricula: "123456789",
    programaEducativo: "Ingeniería en Sistemas Computacionales",
    periodoReportado: "Del 01 de Septiembre al 31 de Octubre de 2024",
    empresa: "Tech Solutions S.A. de C.V.",
    programa: "Desarrollo de Software",
    horasReportadas: 80,
    horasAcumuladas: 160,
  };

  // Función para manejar el cambio en el input del resumen
  const handleInputChange = (e) => {
    setResumenActividades(e.target.value);
  };

  // Función para generar el documento
  const generateDocument = async () => {
    const documentData = {
      ...datosEstaticos,
      resumenActividades: resumenActividades || "No hay actividades reportadas.",
      fechaActual: new Date().toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' }),
    };

    try {
      // Cambia la ruta a tu plantilla de Word adecuada
      const response = await fetch('/docs/servicio_social/ReporteBimestral/2) ANEXO XXII REPORTE BIMESTRAL DE SERVICIO SOCIAL (1).docx');
      const arrayBuffer = await response.arrayBuffer();
      const zip = new PizZip(arrayBuffer);

      const doc = new Docxtemplater().loadZip(zip);

      // Rellenar la plantilla con los datos
      doc.setData(documentData);

      try {
        doc.render();
      } catch (error) {
        console.error('Error al renderizar el documento:', error);
        throw error;
      }

      const out = doc.getZip().generate({
        type: "blob",
        mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });

      saveAs(out, `${documentData.matricula}_Reporte_Bimestral.docx`);

    } catch (error) {
      console.error('Error al generar el documento:', error);
    }
  };

  const navigate = useNavigate();

  const handleEditData = () => {
    navigate('/dashboard/profile');
  };

  return (
    <div className="container mx-auto p-4">
      <Typography variant="h4" className="text-center mb-4">
        Reporte Bimestral del Servicio Social
      </Typography>

      <div className="mb-4">
        <Typography variant="h6">Datos Previos al Reporte</Typography>
        <Typography>Nombre: {datosEstaticos.nombreEstudiante}</Typography>
        <Typography>Matrícula: {datosEstaticos.matricula}</Typography>
        <Typography>Programa Educativo: {datosEstaticos.programaEducativo}</Typography>
        <Typography>Periodo Reportado: {datosEstaticos.periodoReportado}</Typography>
        <Typography>Empresa: {datosEstaticos.empresa}</Typography>
        <Typography>Programa: {datosEstaticos.programa}</Typography>
        <Button onClick={handleEditData} className="bg-blue-500 hover:bg-blue-600 mt-2">
          Editar Datos
        </Button>
      </div>

      <div className="mb-4">
        <Typography variant="h6">Resumen de Actividades</Typography>
        <Typography className="mb-1">
          En este recuadro, por favor escriba un resumen de las actividades que ha realizado durante su servicio social.
        </Typography>
        <Input
          type="text"
          value={resumenActividades}
          onChange={handleInputChange}
          label="Resumen de Actividades"
          className="w-full"
        />
      </div>

      <div className="mb-4">
        <Typography>Total de horas reportadas: {datosEstaticos.horasReportadas}</Typography>
        <Typography>Total de horas acumuladas: {datosEstaticos.horasAcumuladas}</Typography>
      </div>

      <Button onClick={generateDocument} className="bg-blue-500 hover:bg-blue-600">
        Confirmar Datos y Generar Reporte Bimestral
      </Button>
      
    </div>
  )
}