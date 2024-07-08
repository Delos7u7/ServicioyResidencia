import { data } from "autoprefixer";
const url = 'https://ejemplo.com/api/datos';
fetch(url, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  }
})
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Hubo un problema con la petición Fetch:', error);
  });

export const datosConvocatoria = [{
  tipo: 'Servicio',
  nombre: 'Enero-Julio',
  fechaEnInicial: '05-07-2024',
  fechaEnFinal: '05-08-2024',
}, 
{tipo: 'Residencia',
nombre: 'Enero-Junio',
fechaEnInicial: '04-07-2024',
fechaEnFinal: '04-08-2024',
}]

export default datosConvocatoria;