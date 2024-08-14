import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Input,
} from "@material-tailwind/react";

export function SolicitudSSEnviar() {
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = () => {
    if (selectedFile) {
      console.log("Archivo seleccionado:", selectedFile);
    } else {
      console.log("No se ha seleccionado ningún archivo.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-lg p-6">
        <CardHeader className="text-center mb-4">
          <Typography variant="h4" color="blue-gray">
            Lobo, revisa cuidadosamente el documento antes de firmarlo y subirlo
          </Typography>
        </CardHeader>
        <CardBody className="text-center">
          <Typography variant="paragraph" className="mb-4 text-xl">
            Si cometiste algún error al llenar el formulario favor de editarlo
          </Typography>
          <Button
            className="mb-6 w-full text-xl m-4"
            color="blue"
            onClick={() => navigate("/dashboard/solicitud-servicio-social")}
          >
            Editar formulario
          </Button>
          <Typography variant="paragraph" className="mb-4 text-xl">
            Si cometiste algún error al momento de registrarte favor de editarlo
            desde "perfil"
          </Typography>
          <Button
            className="w-full text-xl m-4"
            color="blue"
            onClick={() => navigate("/dashboard/profile")}
          >
            Editar perfil
          </Button>
          <Typography variant="paragraph" className="mb-4 text-xl">
            Si ya revisaste bien y todo está correcto sube el documento{" "}
            <strong>CON LAS FIRMAS CORRESPONDIENTES</strong> y envíalo
          </Typography>
          <Input
            type="file"
            accept=".pdf,.docx"
            onChange={handleFileChange}
            className="mb-4"
          />
          <Button className="w-full text-xl m-4" color="blue" onClick={handleSubmit}>
            Enviar
          </Button>
        </CardBody>
      </Card>
    </div>
  );
}

export default SolicitudSSEnviar;
