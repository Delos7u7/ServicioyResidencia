import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import { SolicitudSS } from "@/pages/serviciosocial/solicitudSS";


function App() {
  
  return (
    <Routes>
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="/auth/*" element={<Auth />} />
      <Route path="/solicitud-sericio-social/*" element={<SolicitudSS/>}/>
      <Route path="*" element={<Navigate to="/dashboard/inicio" replace />} />
    </Routes>
  );
}

export default App;
