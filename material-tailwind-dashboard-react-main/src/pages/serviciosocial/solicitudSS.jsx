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
import { Convocatoria } from "@/pages/componentes-inicio/convocatoria";
import { Afiliaciones } from "@/pages/componentes-inicio/tabla-servicio"; 

export function SolicitudSS() {
  const [formData, setFormData] = useState({});
  const [programaCatalogo, setProgramaCatalogo] = useState("si");

  const documentos = [
    "Kardex",
    "Copia de credencial INE o credencial del estudiante del ITSOEH (ambos vigentes)",
    "Copia de constancia de vigencia de derechos IMSS",
    "Cartilla de salud IMSS"
  ];

  const camposPersonales = [
    { id: "domicilio", label: "Domicilio completo:", placeholder: "(Calle, número ext. número int., Colonia, Municipio, Estado. C.P.)" },
    { id: "telefonoFijo", label: "Tel. fijo:" },
    { id: "noAfiliacionIMSS", label: "No. de afiliación IMSS:" },
  ];

  const camposEmpresa = [
    { id: "rfc", label: "Registro Federal de Contribuyentes:" },
    { id: "giro", label: "Giro o actividad principal de la empresa:" },
    { id: "redesSociales", label: "Redes Sociales:" },
    { id: "emailEmpresa", label: "Correo electrónico:" },
    { id: "gradoTitular", label: "Grado académico del Titular:" },
    { id: "nombreTitular", label: "Nombre completo del Titular:" },
    { id: "nombreContacto", label: "Nombre completo del contacto:" },
    { id: "cargoContacto", label: "Cargo del contacto:" },
    { id: "telefonoContacto", label: "Teléfono celular del Titular o contacto:" },
    { id: "emailContacto", label: "Correo del Titular o contacto:" },
    { id: "nombrePrograma", label: "Nombre del programa:" },
  ];

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
    const backendData = {
      nombreEstudiante: "Juan Pérez",
      matricula: "2020-1234",
      programaEducativo: "Ingeniería en Sistemas Computacionales",
      fechaActual: new Date().toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' }),
      programaCatalogo: programaCatalogo === "si" ? "SI  (    X   )    NO  (         )" : "SI  (       )    NO  (     X    )",
    };

    const documentData = {
      ...backendData,
      ...formData,
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
          {camposPersonales.map((campo) => (
            <div key={campo.id} className="mb-4">
              <Typography>{campo.label}</Typography>
              <Input 
                type="text" 
                className="mt-1" 
                name={campo.id}
                placeholder={campo.placeholder || ""}
                onChange={handleInputChange}
              />
            </div>
          ))}
          <Typography variant="h6" className="mt-8 mb-4">
            Información de la empresa
          </Typography>
          {camposEmpresa.map((campo) => (
            <div key={campo.id} className="mb-4">
              <Typography>{campo.label}</Typography>
              <Input 
                type="text" 
                className="mt-1" 
                name={campo.id}
                placeholder={campo.placeholder || ""}
                onChange={handleInputChange}
              />
            </div>
          ))}
          <div className="mb-4">
            <Typography>Programa del catálogo publicado en la página oficial del ITSOEH:</Typography>
            <div className="flex items-center mt-2">
              <Radio
                id="programaCatalogoSi"
                name="programaCatalogo"
                label="SI"
                value="si"
                checked={programaCatalogo === "si"}
                onChange={handleRadioChange}
                className=""
              />
              <Radio
                id="programaCatalogoNo"
                name="programaCatalogo"
                label="NO"
                value="no"
                checked={programaCatalogo === "no"}
                onChange={handleRadioChange}
              />
            </div>
          </div>
          <div className="w-full flex justify-center">
          <Button
            color="blue"
            className="my-6 text-1xl"
            onClick={generateDocument}
          >
            Generar Solicitud de Servicio Social
          </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default SolicitudSS;
