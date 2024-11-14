import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile, Tables, Notifications, Inicio, Servicio, SolicitudSSEnviar } from "@/pages/dashboard";
import { Afiliaciones } from "@/pages/componentes-inicio/tabla-servicio";
import { SignIn, SignUp } from "@/pages/auth";
import { SolicitudSS } from "@/pages/serviciosocial/solicitudSS"
import CartaPresentacion from "./pages/serviciosocial/CartaPresentacion";
import CartaCompromiso from "./pages/serviciosocial/CartaCompromiso";
import XXII from "./pages/dashboard/ReporteBimestral/XXII";
import XXIII from "./pages/dashboard/ReporteBimestral/XXIII";
import XXIV from "./pages/dashboard/ReporteBimestral/XXIV";
import XXV from "./pages/dashboard/ReporteBimestral/XXV";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "Inicio",
        path: "/inicio",
        element: <Inicio />,
      },
      {
        icon: <HomeIcon {...icon} />,
        name: "Servicio",
        path: "/servicio",
        element: <Servicio />,
      },
      {
        icon: <HomeIcon {...icon} />,
        name: "Reporte Bimestral",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "profile",
        path: "/profile",
        element: <Profile />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "tables",
        path: "/tables",
        element: <Tables />,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "notifications",
        path: "/notifications",
        element: <Notifications />,
      },
    ],
  },
  {
    layout: "servicioSS",
    pages: [
      {
        nombre: 'SolicitudSS',
        path: '/solicitud-servicio-social',
        element: <SolicitudSS />,
      },
      {
        nombre: 'SolicitudSSEnviar',
        path: '/solicitud-servicio-social/enviar',
        element: <SolicitudSSEnviar />,
      },
      {
        nombre: 'Afiliaciones',
        path: '/solicitud-servicio-social/afiliaciones',
        element: <Afiliaciones />,
      },
      {
        nombre: 'Carta Presentacion',
        path: '/carta-presentacion',
        element: <CartaPresentacion />,
      },
      {
        nombre: 'XXII',
        path: '/XXII',
        element: <XXII />,
      },
      {
        nombre: 'XXIII',
        path: '/XXIII',
        element: <XXIII />,
      },
      {
        nombre: 'XXIV',
        path: '/XXIV',
        element: <XXIV/>,
      },
      {
        nombre: 'XXV',
        path: '/XXV',
        element: <XXV />,
      },
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ServerStackIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        icon: <RectangleStackIcon {...icon} />,
        name: "sign up",
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
];

export default routes;
