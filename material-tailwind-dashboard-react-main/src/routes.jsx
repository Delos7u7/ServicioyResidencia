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
        element: <Inicio/>
      },
      {
        icon: <HomeIcon {...icon} />,
        name: "Servicio",
        path: "/servicio",
        element: <Servicio/>
      },
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
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
            element: <SolicitudSS/>,
        },
        {
            nombre : 'SolicitudSSEnviar',
            path: '/solicitud-servicio-social/enviar',
            element: <SolicitudSSEnviar />,
        },
        {
            nombre : 'Afiliaciones',
            path: '/solicitud-servicio-social/afiliaciones',
            element: <Afiliaciones />,
        },
        {
            nombre : 'Carta Presentacion',
            path: '/carta-presentacion',
            element: <CartaPresentacion/>
        },
        {
            nombre : 'Carta Compromiso',
            path: '/carta-compromiso',
            element: <CartaCompromiso/>
        },
      ]
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
      {
        icon: <RectangleStackIcon {...icon} />,
        name: "log out",
        path: "/sign-up",
        element: <SignUp />,
      }
    ],
  },
];

export default routes;
