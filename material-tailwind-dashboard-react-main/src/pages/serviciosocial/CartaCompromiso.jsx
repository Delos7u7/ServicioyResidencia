import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Input,
  Button,
  Radio,
} from "@material-tailwind/react";
import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';
import { saveAs } from 'file-saver';
import { useNavigate } from 'react-router-dom';

export default function CartaCompromiso() {
  const [formData, setFormData] = useState({});
  const [programaCatalogo, setProgramaCatalogo] = useState("si");

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      try {
        const apiResponse = await fetch('http://192.168.0.18:8000/api/solicitudServicioSocial/alumno', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          }
        });

        if (apiResponse.ok) {
          const data = await apiResponse.json();
          setFormData({
            programaEducativo: data.datos_alumno.carrera,
            matricula: data.id,
            nombreEstudiante: data.nombre,
            correoElectronico: data.correo,
            telefono: data.datos_alumno.telefono,
            domicilio: data.datos_alumno.domicilio,
          });
        } else {
          console.error('Error al obtener los datos del alumno desde la API');
        }
      } catch (error) {
        console.error('Error al realizar la solicitud a la API:', error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRadioChange = (e) => {
    setProgramaCatalogo(e.target.value);
  };

  const generateDocument = async () => {
    const documentData = {
      ...formData,
      programaCatalogo: programaCatalogo === "si" ? "SI  (    X   )    NO  (         )" : "SI  (       )    NO  (     X    )",
      fechaActual: new Date().toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' }),
    };

    try {
        const response = await fetch('../../../public/docs/servicio_social/6) CARTA COMPROMISO DE SERVICIO SOCIAL.docx');
      const arrayBuffer = await response.arrayBuffer();
      const zip = new PizZip(arrayBuffer);
      
      const doc = new Docxtemplater().loadZip(zip);

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

      saveAs(out, `${documentData.matricula}_Carta_Compromiso.docx`);
  
    } catch (error) {
      console.error('Error al generar el documento:', error);
    }
  };

  return (
    <div>
      <Typography variant="h4" color="blue-gray" className="mb-4">
        Carta de Compromiso
      </Typography>
      <Button onClick={generateDocument}>Generar Documento</Button>
    </div>
  );
}
