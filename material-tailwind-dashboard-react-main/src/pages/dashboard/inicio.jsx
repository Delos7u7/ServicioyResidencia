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

import { datosConvocatoria } from "@/data" ;

export function Inicio() {
    return(
        <div className="mt-12">
            <div>
                <datosConvocatoria/>
            </div>
        </div>
    );
}

export default Inicio