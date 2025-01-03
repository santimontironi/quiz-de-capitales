import './assets/css/app.css'
import { useEffect, useState } from 'react'

export const App = () => {

  const[preguntas,setPreguntas] = useState([])
  const[preguntaActual,setPreguntaActual] = useState(0)

  useEffect(() => {
    fetch('preguntas.json')
    .then(response => response.json())
    .then(data => mezclarPreguntas(data))
    .catch(error => console.error("Error al cargar el JSON: ", error))
  },[])

  const mezclarPreguntas = (data) => {
    const preguntasMezcladas = data.sort(() => Math.random() - 0.5)
    setPreguntas(preguntasMezcladas)
  }
  
  return (
    <div className="contenedor">
      <h1>Quiz de capitales</h1>
      {preguntas.length > 0 && ( //esta validacion es para que no se muestre nada hasta que se cargue el JSON previamente
        <div className="pregunta">
          <p>¿Cuál es la capital de {preguntas[preguntaActual].pais}?</p>
        </div>
      )}
    </div>
  )
}

export default App