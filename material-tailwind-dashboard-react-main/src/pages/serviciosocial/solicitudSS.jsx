import React, { useState } from "react";
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

  // Datos estáticos para los campos desactivados
  const staticData = {
    programaEducativo: "Ingeniería en Sistemas Computacionales",
    matricula: "20220001",
    nombreEstudiante: "Juan Pérez García",
    correoElectronico: "juan.perez@example.com",
    telefono: "5512345678",
    nombrePrograma: "Desarrollo de Software",
    domicilioEmpresa: "Calle Principal 123, Ciudad Example",
    telefonoE: "5587654321",
    responsableE: "Gerente de Proyectos"
  };

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
      ...staticData,
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
              value={staticData.programaEducativo}
              disabled={true}
            />
          </div>
          <div className="mb-4">
            <Typography>Matrícula:</Typography>
            <Input
              type="text"
              name="matricula"
              className="mt-1"
              value={staticData.matricula}
              disabled={true}
            />
          </div>
          <div className="mb-4">
            <Typography>Nombre completo:</Typography>
            <Input
              type="text"
              name="nombreEstudiante"
              className="mt-1"
              value={staticData.nombreEstudiante}
              disabled={true}
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
              value={staticData.correoElectronico}
              disabled={true}
            />
          </div>
          <div className="mb-4">
            <Typography>Teléfono celular:</Typography>
            <Input
              type="text"
              name="telefono"
              className="mt-1"
              value={staticData.telefono}
              disabled={true}
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
              value={staticData.nombrePrograma}
              disabled={true}
            />
          </div>
          <div className="mb-4">
            <Typography>Domicilio completo:</Typography>
            <Input
              type="text"
              name="domicilioEmpresa"
              className="mt-1"
              value={staticData.domicilioEmpresa}
              disabled={true}
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
              name="giro"
              className="mt-1"
              value={formData.giro || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <Typography>Teléfono fijo:</Typography>
            <Input
              type="text"
              name="telefonoE"
              className="mt-1"
              value={staticData.telefonoE}
              disabled={true}
            />
          </div>
          <div className="mb-4">
            <Typography>Redes Sociales:</Typography>
            <Input
              type="text"
              name="redesSociales"
              className="mt-1"
              value={formData.redesSociales || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <Typography>Correo electrónico de la empresa:</Typography>
            <Input
              type="text"
              name="emailEmpresa"
              className="mt-1"
              value={formData.emailEmpresa || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <Typography>Grado académico del Titular:</Typography>
            <Input
              type="text"
              name="gradoTitular"
              className="mt-1"
              value={formData.gradoTitular || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <Typography>Nombre completo del Titular:</Typography>
            <Input
              type="text"
              name="nombreTitular"
              className="mt-1"
              value={formData.nombreTitular || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <Typography>Cargo del Titular:</Typography>
            <Input
              type="text"
              name="responsableE"
              className="mt-1"
              value={staticData.responsableE}
              disabled={true}
            />
          </div>
          <div className="mb-4">
            <Typography>Nombre completo del contacto:</Typography>
            <Input
              type="text"
              name="nombreContacto"
              className="mt-1"
              value={formData.nombreContacto || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <Typography>Cargo del contacto:</Typography>
            <Input
              type="text"
              name="cargoContacto"
              className="mt-1"
              value={formData.cargoContacto || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <Typography>Teléfono celular del Titular o contacto:</Typography>
            <Input
              type="text"
              name="telefonoContacto"
              className="mt-1"
              value={formData.telefonoContacto || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <Typography>Correo del Titular o contacto:</Typography>
            <Input
              type="text"
              name="emailContacto"
              className="mt-1"
              value={formData.emailContacto || ""}
              onChange={handleInputChange}
            />
          </div>

          <Typography variant="h6" className="mt-8 mb-4">
            Datos del programa
          </Typography>
          <div className="mb-4">
            <Typography>Nombre del programa:</Typography>
            <Input
              type="text"
              name="nombrePrograma"
              className="mt-1"
              value={staticData.nombrePrograma}
              disabled={true}
            />
          </div>
        </CardBody>
      </Card>
      <Button onClick={generateDocument}>Generar Solicitud</Button>
    </div>
  );
}


export default SolicitudSS;