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
  Tooltip,
  Button,
} from "@material-tailwind/react";
import { Cog6ToothIcon, PencilIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { ProfileInfoCard } from "@/widgets/cards";

export function Profile() {
  const profile = {
    name: "Ramón Pérez García",
    matricula: "123456789",
    programaEducativo: "Ingeniería en Sistemas Computacionales",
    periodoReportado: "Del 01 de Septiembre al 31 de Octubre de 2024",
    empresa: "Tech Solutions S.A. de C.V.",
    programa: "Desarrollo de Software",
    horasReportadas: 80,
    horasAcumuladas: 160,
  };

  return (
    <>
      <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url('/img/background-image.png')] bg-cover	bg-center">
        <div className="absolute inset-0 h-full w-full bg-gray-900/75" />
      </div>
      <Card className="mx-3 -mt-16 mb-6 lg:mx-4 border border-blue-gray-100">
        <CardBody className="p-4">
          <div className="mb-10 flex items-center justify-between flex-wrap gap-6">
            <div className="flex items-center gap-6">
              <Avatar
                src="/img/profile.png"
                alt={profile.name}
                size="xl"
                variant="rounded"
                className="rounded-lg shadow-lg shadow-blue-gray-500/40"
              />
              <div>
                <Typography variant="h5" color="blue-gray" className="mb-1">
                  {profile.name}
                </Typography>
                <Typography variant="small" className="font-normal text-blue-gray-600">
                  {profile.programaEducativo}
                </Typography>
              </div>
            </div>
            <div className="w-96">
              <Tabs value="settings">
                <TabsHeader>
                  <Tab value="settings">
                    <Cog6ToothIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                    Settings
                  </Tab>
                </TabsHeader>
              </Tabs>
            </div>
          </div>
          <ProfileInfoCard
            title="Profile Information"
            description={`Matricula: ${profile.matricula}`}
            details={{
              "Programa Educativo": profile.programaEducativo,
              "Periodo Reportado": profile.periodoReportado,
              Empresa: profile.empresa,
              Programa: profile.programa,
              "Horas Reportadas": profile.horasReportadas,
              "Horas Acumuladas": profile.horasAcumuladas,
            }}
            action={
              <Tooltip content="Edit Profile">
                <PencilIcon className="h-4 w-4 cursor-pointer text-blue-gray-500" />
              </Tooltip>
            }
          />
        </CardBody>
      </Card>
    </>
  );
}

export default Profile;