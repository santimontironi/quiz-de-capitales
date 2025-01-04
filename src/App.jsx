import './assets/css/app.css'
import { useEffect, useState } from 'react'

export const App = () => {

  const [preguntas, setPreguntas] = useState([])
  const [preguntaActual, setPreguntaActual] = useState(0)
  const [puntaje, setPuntaje] = useState(0)
  const [finDelJuego, setFinDelJuego] = useState(false)

  useEffect(() => {
    fetch('preguntas.json')
      .then(response => response.json())
      .then(data => mezclarPreguntas(data))
      .catch(error => console.error("Error al cargar el JSON: ", error))
  }, [])

  const mezclarPreguntas = (data) => {
    const preguntasMezcladas = data.sort(() => Math.random() - 0.5)
    setPreguntas(preguntasMezcladas)
  }

  const manejarRespuesta = (respuesta) => {
    if (respuesta === preguntas[preguntaActual].capital) {
      setPuntaje(puntaje + 1)
      setPreguntaActual(preguntaActual + 1)
    }
    if (preguntaActual === preguntas.length - 1) {
      setFinDelJuego(true)
    }
    else {
      setPreguntaActual(preguntaActual + 1)
    }
  }

  const reiniciar = () => {
    mezclarPreguntas(preguntas)
    setPreguntaActual(0)
    setPuntaje(0)
    setFinDelJuego(false)
  }

  return (
    <>
      <h1 className='titulo'>Quiz de capitales</h1>
      <p className='puntaje'>Puntaje actual: {puntaje}</p>
      <div className="contenedor">
        {preguntas.length > 0 && ( //esta validacion es para que no se muestre nada hasta que se cargue el JSON previamente
          <>
            <div className="pregunta">
              <p>¿Cuál es la capital de {preguntas[preguntaActual].pais}?</p>
            </div>
            <div className="opciones">
              {preguntas[preguntaActual].opciones.map((opcion,index) => (
                <button key={index} onClick={() => manejarRespuesta(opcion)}>{opcion}</button>
              ))}
            </div>
          </>
        )}
      </div>

      {finDelJuego && (
        <div className="fin-del-juego">
          <h2>Fin del juego</h2>
          <p>Tu puntaje final es: {puntaje}</p>
          <button onClick={reiniciar}>Reiniciar</button>
        </div>
      )}
    </>
  )
}

export default App