import React from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Tooltip,
  Progress,
} from "@material-tailwind/react";
import {
  EllipsisVerticalIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";
import { StatisticsCard } from "@/widgets/cards";
import { StatisticsChart } from "@/widgets/charts";
import {
  statisticsCardsData,
  statisticsChartsData,
  projectsTableData,
  ordersOverviewData,
} from "@/data";
import { CheckCircleIcon, ClockIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

const reportes = [
  { title: "2) ANEXO XXII REPORTE BIMESTRAL DE SERVICIO SOCIAL", path: "/dashboard/XXII" },
  { title: "3) ANEXO XXIII FORMATO DE EVALUACIÓN CUALITATIVA DEL PRESTADOR DE SERVICIO", path: "/dashboard/XXIII" },
  { title: "4) ANEXO XXIV FORMATO DE AUTOEVALUACIÓN CUALITATIVA DEL PRSTADOR DE SERVICIO SOCIAL", path: "/dashboard/XXIV" },
  { title: "5) ANEXO XXV FORMATO DE EVALUACIÓN CUALITATIVA DEL PRESTADOR DE SERVICIO SOCIAL", path: "/dashboard/XXV" },
];

export function Home() {
  return (
    <div className="container mx-auto p-4">
      <Typography variant="h4" className="text-center mb-8">
        Reportes de Servicio Social
      </Typography>
      <Typography variant="h4" className="text-center mb-8">
       Periodo: Agosto-Octubre
      </Typography>
      <div className="grid grid-cols-1 gap-4">
        {reportes.map((reporte, index) => (
          <Card key={index} className="rounded-lg shadow-lg mb-8">
            <CardBody className="flex justify-between items-center">
              <Typography variant="h6">
                {reporte.title}
              </Typography>
              <Link to={reporte.path} className="text-blue-500 hover:underline">
                Ver Reporte
              </Link>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Home;
