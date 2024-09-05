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

export function SolicitudSS() {
  const [formData, setFormData] = useState({});
  const [programaCatalogo, setProgramaCatalogo] = useState("si");
  const documentos = [
    "Kardex",
    "Copia de credencial INE o credencial del estudiante del ITSOEH (ambos vigentes)",
    "Copia de constancia de vigencia de derechos IMSS",
    "Cartilla de salud IMSS"
  ];
  const navigate = useNavigate();

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
            // Otras propiedades si es necesario
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
      const response = await fetch('../../../public/docs/servicio_social/SOLICITUD_DE_SERVICIO_SOCIAL.docx');
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

      saveAs(out, `${documentData.matricula}_solicitud_servicio_social.docx`);

      navigate('/dashboard/solicitud-servicio-social/enviar');
  
    } catch (error) {
      console.error('Error al generar el documento:', error);
    }
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Requisitos iniciales
          </Typography>
        </CardHeader>
        <CardBody className="px-6 pt-0 pb-2">
          <Typography variant="h6" className="mb-4">
            Documentos requeridos
          </Typography>
          <div className="grid grid-cols-2 gap-6">
            {documentos.map((doc, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <Typography className="mb-2 font-semibold">{doc}</Typography>
                <Input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="mt-1"
                />
              </div>
            ))}
          </div>
          <Typography variant="h6" className="mt-8 mb-4">
            Información personal
          </Typography>
          <div className="mb-4">
            <Typography>Programa Educativo:</Typography>
            <Input
              type="text"
              name="programaEducativo"
              className="mt-1"
              value={formData.programaEducativo || ""}
              onChange={handleInputChange}
              disabled={true}  // Mantenerlo desactivado si lo deseas
            />
          </div>
          <div className="mb-4">
            <Typography>Matrícula:</Typography>
            <Input
              type="text"
              name="matricula"
              className="mt-1"
              value={formData.matricula || ""}
              onChange={handleInputChange}
              disabled={true}  // Mantenerlo desactivado si lo deseas
            />
          </div>
          <div className="mb-4">
            <Typography>Nombre completo:</Typography>
            <Input
              type="text"
              name="nombreEstudiante"
              className="mt-1"
              value={formData.nombreEstudiante || ""}
              onChange={handleInputChange}
              disabled={true}  // Mantenerlo desactivado si lo deseas
            />
          </div>
          <div className="mb-4">
            <Typography>Domicilio completo:</Typography>
            <Input
              type="text"
              name="domicilio"
              className="mt-1"
              value={formData.domicilio || ""}
              onChange={handleInputChange}
              placeholder="(Calle, número ext. número int., Colonia, Municipio, Estado. C.P.)"
            />
          </div>
          <div className="mb-4">
            <Typography>Correo electrónico:</Typography>
            <Input
              type="text"
              name="correoElectronico"
              className="mt-1"
              value={formData.correoElectronico || ""}
              onChange={handleInputChange}
              disabled={true}  // Mantenerlo desactivado si lo deseas
            />
          </div>
          <div className="mb-4">
            <Typography>Teléfono celular:</Typography>
            <Input
              type="text"
              name="telefono"
              className="mt-1"
              value={formData.telefono || ""}
              onChange={handleInputChange}
              disabled={true}  // Mantenerlo desactivado si lo deseas
            />
          </div>
          <div className="mb-4">
            <Typography>Tel. fijo:</Typography>
            <Input
              type="text"
              name="telefonoFijo"
              className="mt-1"
              value={formData.telefonoFijo || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <Typography>No. de afiliación IMSS:</Typography>
            <Input
              type="text"
              name="noAfiliacionIMSS"
              className="mt-1"
              value={formData.noAfiliacionIMSS || ""}
              onChange={handleInputChange}
            />
          </div>

          <Typography variant="h6" className="mt-8 mb-4">
            Información de la empresa
          </Typography>
          <div className="mb-4">
            <Typography>Razón Social:</Typography>
            <Input
              type="text"
              name="nombrePrograma"
              className="mt-1"
              value={formData.nombrePrograma || ""}
              onChange={handleInputChange}
              disabled={true}  // Mantenerlo desactivado si lo deseas
            />
          </div>
          <div className="mb-4">
            <Typography>Domicilio completo:</Typography>
            <Input
              type="text"
              name="domicilioEmpresa"
              className="mt-1"
              value={formData.domicilioEmpresa || ""}
              onChange={handleInputChange}
              disabled={true}  // Mantenerlo desactivado si lo deseas
            />
          </div>
          <div className="mb-4">
            <Typography>Registro Federal de Contribuyentes:</Typography>
            <Input
              type="text"
              name="rfc"
              className="mt-1"
              value={formData.rfc || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <Typography>Giro o actividad principal de la empresa:</Typography>
            <Input
              type="text"
              name="giroEmpresa"
              className="mt-1"
              value={formData.giroEmpresa || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <Typography>Nombre del programa:</Typography>
            <Input
              type="text"
              name="nombrePrograma"
              className="mt-1"
              value={formData.nombrePrograma || ""}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-4">
            <Typography>¿El programa pertenece al catálogo de programas de servicio social del ITSOEH?</Typography>
            <div className="flex space-x-4 mt-2">
              <Radio
                id="programaCatalogoSi"
                name="programaCatalogo"
                label="Sí"
                value="si"
                onChange={handleRadioChange}
                checked={programaCatalogo === "si"}
              />
              <Radio
                id="programaCatalogoNo"
                name="programaCatalogo"
                label="No"
                value="no"
                onChange={handleRadioChange}
                checked={programaCatalogo === "no"}
              />
            </div>
          </div>

          <Button onClick={generateDocument} className="mt-8">
            Generar Solicitud
          </Button>
        </CardBody>
      </Card>
    </div>
  );
}

export default SolicitudSS;
