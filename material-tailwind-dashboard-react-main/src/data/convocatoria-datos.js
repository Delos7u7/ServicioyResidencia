import { data } from "autoprefixer";

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

export const datosConvocatoria = {
    nombre: 'Enero-Junio',
    fechaEnInicial: '04-07-2024',
    fechaEnFinal: '04-08-2024',
}

export default datosConvocatoria;