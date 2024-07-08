import React from 'react';
import {
    Card,
    Button,
} from "@material-tailwind/react";

import { datosConvocatoria } from "@/data";

export function Convocatoria({ onKnowMore }) {
    return (
        <div className="">
            <div className="w-full max-h-full grid grid-cols-2 mt-14">
                {datosConvocatoria.map(({ tipo, nombre, fechaEnInicial, fechaEnFinal }) => (
                    <Card key={tipo} className="w-6/12 flex flex-col justify-evenly items-center mx-auto">
                        <h2 className="text-3xl my-4">{tipo}</h2>
                        {[nombre, `Inicia ${fechaEnInicial}`, `Termina ${fechaEnFinal}`].map((text, index) => (
                            <li key={index} className="list-none my-2">{text}</li>
                        ))}
                        <Button 
                            color="blue" 
                            variant="text" 
                            className="mt-4"
                            onClick={() => onKnowMore(tipo.toLowerCase())}
                        >
                            Conocer más
                        </Button>
                    </Card>
                ))}
            </div>
        </div>
    );
}