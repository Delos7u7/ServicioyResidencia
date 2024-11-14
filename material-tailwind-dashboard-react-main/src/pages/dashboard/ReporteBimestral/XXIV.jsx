import React, { useState } from "react";
import {
  Typography,
  Radio,
  RadioGroup,
  Button,
} from "@material-tailwind/react";
import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';
import { saveAs } from 'file-saver';
import { useNavigate } from 'react-router-dom';

export default function XXIV() {
  const [questionResponses, setQuestionResponses] = useState({
    q1: '',
    q2: '',
    q3: '',
    q4: '',
    q5: '',
    q6: '',
    q7: '',
  });

  const staticData = {
    nombrePrestador: "Ramón Pérez García",
    programaEducativo: "Ingeniería en Sistemas Computacionales",
    noMatricula: "123456789",
    programa: "Desarrollo de Software",
    empresaOrganismo: "Tech Solutions S.A. de C.V.",
    periodoEvaluacion: "Del 01 de Septiembre al 31 de Octubre de 2024",
  };

  const handleRadioChange = (questionId, value) => {
    setQuestionResponses({ ...questionResponses, [questionId]: value });
  };

  const generateDocument = async () => {
    const documentData = {
      ...staticData,
      ...questionResponses,
      fechaActual: new Date().toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' }),
    };

    try {
      const response = await fetch('/docs/servicio_social/ReporteBimestral/4) ANEXO XXIV FORMATO DE AUTOEVALUACIÓN CUALITATIVA DEL PRSTADOR DE SERVICIO SOCIAL.docx');
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

      saveAs(out, `${staticData.noMatricula}_Reporte_Bimestral.docx`);
    } catch (error) {
      console.error('Error al generar el documento:', error);
    }
  };

  const navigate = useNavigate();

  const handleEditData = () => {
    navigate('/profile');
  };

  const questions = [
    "¿Cumplí en tiempo y forma con las actividades encomendadas alcanzando los objetivos?",
    "¿Trabajé en equipo y me adapté a nuevas situaciones?",
    "¿Mostré liderazgo en las actividades encomendadas?",
    "¿Organicé mi tiempo y trabajé de manera proactiva?",
    "¿Interpreté la realidad y me sensibilicé aportando soluciones a la problemática con la actividad complementaria?",
    "¿Realicé sugerencias innovadoras para beneficio o mejora del programa en el que participo?",
    "¿Tuve iniciativa para ayudar en las actividades encomendadas y mostré espíritu de servicio?"
  ];

  const renderRadioOptions = (questionId) => (
    <div className="ml-4">
      <div className="flex items-center">
        <Radio id={`${questionId}-insuficiente`} name={questionId} value="insuficiente" onChange={() => handleRadioChange(questionId, 'insuficiente')} />
        <label htmlFor={`${questionId}-insuficiente`} className="ml-2">Insuficiente</label>
      </div>
      <div className="flex items-center">
        <Radio id={`${questionId}-suficiente`} name={questionId} value="suficiente" onChange={() => handleRadioChange(questionId, 'suficiente')} />
        <label htmlFor={`${questionId}-suficiente`} className="ml-2">Suficiente</label>
      </div>
      <div className="flex items-center">
        <Radio id={`${questionId}-bueno`} name={questionId} value="bueno" onChange={() => handleRadioChange(questionId, 'bueno')} />
        <label htmlFor={`${questionId}-bueno`} className="ml-2">Bueno</label>
      </div>
      <div className="flex items-center">
        <Radio id={`${questionId}-notable`} name={questionId} value="notable" onChange={() => handleRadioChange(questionId, 'notable')} />
        <label htmlFor={`${questionId}-notable`} className="ml-2">Notable</label>
      </div>
      <div className="flex items-center">
        <Radio id={`${questionId}-excelente`} name={questionId} value="excelente" onChange={() => handleRadioChange(questionId, 'excelente')} />
        <label htmlFor={`${questionId}-excelente`} className="ml-2">Excelente</label>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto p-4">
      <Typography variant="h4" className="text-center mb-4">
        Reporte Bimestral del Servicio Social
      </Typography>

      <div className="mb-4">
        <Typography variant="h6">Datos Previos al Reporte</Typography>
        <Typography>Nombre del prestador de servicio social: {staticData.nombrePrestador}</Typography>
        <Typography>Programa Educativo: {staticData.programaEducativo}</Typography>
        <Typography>No. Matrícula: {staticData.noMatricula}</Typography>
        <Typography>Programa: {staticData.programa}</Typography>
        <Typography>Empresa, Organismo o Dependencia: {staticData.empresaOrganismo}</Typography>
        <Typography>Periodo de evaluación: {staticData.periodoEvaluacion}</Typography>
        <Button onClick={handleEditData} className="bg-blue-500 hover:bg-blue-600 mt-2">
          Editar Datos
        </Button>
      </div>

      <div className="mb-4">
        <Typography variant="h6">Preguntas</Typography>
        {questions.map((question, index) => (
          <div key={index} className="mb-4">
            <Typography>{`PREGUNTA ${index + 1}: ${question}`}</Typography>
            <div className="flex flex-col ml-4">
              {["insuficiente", "suficiente", "bueno", "notable", "excelente"].map((option) => (
                <div className="flex items-center" key={option}>
                  <Radio
                    id={`${question}-${option}`}
                    name={`q${index + 1}`}
                    value={option}
                    onChange={() => handleRadioChange(`q${index + 1}`, option)}
                    checked={questionResponses[`q${index + 1}`] === option}
                  />
                  <label htmlFor={`${question}-${option}`} className="ml-2">{option.charAt(0).toUpperCase() + option.slice(1)}</label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <Button onClick={generateDocument} className="bg-blue-500 hover:bg-blue-600">
        Confirmar y Generar Reporte Bimestral
      </Button>
    </div>
  )
}
