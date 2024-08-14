import React, { useRef } from 'react';
import {
    Card,
    CardBody,
    CardHeader,
    CardFooter,
    Avatar,
    Typography,
    Tabs,
    TabsHeader,
    Tab,
    Switch,
    Tooltip,
    Button,
} from "@material-tailwind/react";

import {
    HomeIcon,
    ChatBubbleLeftEllipsisIcon,
    Cog6ToothIcon,
    PencilIcon,
} from "@heroicons/react/24/solid";

import { Link } from "react-router-dom";
import { Convocatoria } from "@/pages/componentes-inicio/convocatoria";
import { Afiliaciones } from "@/pages/componentes-inicio/tabla-servicio";

import { datosConvocatoria } from "@/data";

export function Inicio() {
    const token = localStorage.getItem('token');
    console.log('Token almacenado en localStorage:', token);
    const servicioRef = useRef(null);
    const residenciaRef = useRef(null);

    const scrollToSection = (tipo) => {
        const ref = tipo === 'servicio' ? servicioRef : residenciaRef;
        ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    return (
        <div>
            <div className="w-svw h-svw flex my-14 mr-10 justify-center items-center">
                <div className="w-full h-full fade-bottom flex justify-center items-center">
                    <img
                        src="/img/lobo.png"
                        alt="bruce-mars"
                        className="w-7/12 h-7/12 object-contain"
                    />
                </div>
                <div className="w-full h-full">
                    <Card className="flex flex-col gap-12 p-7">
                        <h1 className="text-6xl text-center">¡Bienvenido, Lobo!</h1>
                        <h2 className="text-3xl text-center">¿Qué acción desear realizar?</h2>
                        <Convocatoria onKnowMore={scrollToSection} />
                    </Card>
                </div>
            </div>
            <div className="flex my-14 mr-10 flex-col">
                <div className="w-full h-full">
                    <Card ref={servicioRef} className="flex flex-col gap-12 p-7 text-center mb-20">
                        <h2 className="text-6xl">Pre-resquisitos para Servicio Social</h2>
                        <li>Kardex</li>
                        <li>Copia de INE o credencial de la escuela (vigente)</li>
                        <li>Copia de constancia de vigencia de derechos IMSS</li>
                        <li>Solicitud de Servicio social</li>
                        <h2 className="text-6xl">¿Cómo puedo iniciar el trámite de servico social?</h2>
                        <li>Cartilla de salud IMSS</li>
                        <li>Carta de Presentación de Servicio Social</li>
                        <li>Carta de Aceptación de Servicio Social</li>
                        <li>Registro de Servicio Social</li>
                        <li>Carta Compromiso de Servicio Social</li>
                        <li>Solicitud de Servicio social</li>
                    </Card>
                </div>
                <div className="w-full h-full">
                    <Card ref={residenciaRef} className="flex flex-col gap-12 p-7 text-center mt-20 mb-20">
                        <h2 className="text-6xl">Pre-resquisitos para Residencia</h2>
                        <li>Carta de Presentación de Servicio Social</li>
                        <li>Carta de Aceptación de Servicio Social</li>
                        <li>Registro de Servicio Social</li>
                        <li>Carta Compromiso de Servicio Social</li>
                        <li>Solicitud de Servicio social</li>
                        <h2 className="text-6xl">¿Cómo puedo iniciar el trámite de Residencia?</h2>
                        <li>Carta de Presentación de Servicio Social</li>
                        <li>Carta de Aceptación de Servicio Social</li>
                        <li>Registro de Servicio Social</li>
                        <li>Carta Compromiso de Servicio Social</li>
                        <li>Solicitud de Servicio social</li>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default Inicio;