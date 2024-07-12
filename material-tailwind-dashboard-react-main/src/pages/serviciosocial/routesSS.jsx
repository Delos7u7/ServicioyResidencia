import { SolicitudSS } from "@/pages/serviciosocial/solicitudSS"



export const routesSS = {
    layout: "servioSS",
    pages: [
        {
            nombre: 'SolicitudSS',
            path: '/solicitud-sericio-social',
            element: <SolicitudSS/>,
        },
    ]
};

export default routesSS;