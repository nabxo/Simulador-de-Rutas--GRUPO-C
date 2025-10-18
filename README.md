Las Rutas de Santo Domingo:
Simulador de Rutas y Costos del
Transporte Público
Este es un simulador de rutas del transporte público de Santo Domingo, diseñado como una
Aplicación Web Progresiva (PWA) que permite a los usuarios calcular el tiempo y el costo
estimado de trayectos entre barrios, tomando en cuenta factores externos como la lluvia o la
hora pico.
🚀 Ejecución Rápida del Proyecto
Dado que la aplicación incluye un Service Worker (service-worker.js) para la funcionalidad
offline (PWA), es fundamental ejecutarla a través de un servidor local, y no simplemente
abriendo el archivo index.html en el navegador.
Opción 1: Uso de Live Server (Recomendado para Desarrollo)
Si utilizas Visual Studio Code (VS Code), la forma más sencilla es usar la extensión Live
Server:
1. Abre la carpeta del proyecto en VS Code.
2. Haz clic derecho sobre el archivo index.html.
3. Selecciona la opción "Open with Live Server".
○ Esto abrirá la aplicación en tu navegador en una URL como
http://127.0.0.1:5500/index.html.
Opción 2: Uso de un Servidor Simple de Python
Si no usas VS Code, puedes iniciar un servidor HTTP simple desde la línea de comandos
(asegúrate de tener Python instalado):
1. Navega a la carpeta donde se encuentran los archivos (index.html, script.js, etc.).
2. Ejecuta el siguiente comando, dependiendo de tu versión de Python:
# Para Python 3.x python -
m http.server 8080
# Para Python 2.x
python -m SimpleHTTPServer 8080
3. Abre tu navegador y ve a la dirección: http://localhost:8080
Instalación como PWA
Una vez que la aplicación se esté ejecutando en el servidor local:
1. Abre el navegador (Chrome, Edge, Firefox, etc.)
2. Busca el icono de "Instalar" (usualmente un signo + o una flecha hacia abajo) en la barra
de direcciones o en el menú de opciones.
3. Instala la aplicación. Ahora podrás ejecutarla directamente desde el escritorio o el
lanzador de aplicaciones, incluso si tu dispositivo está offline.
⚙ Criterios de Cálculo y Simulación
El simulador utiliza datos fijos de tiempo base (time) y costo base (cost) para las conexiones
directas entre los barrios de Santo Domingo (definidas en script.js). Estos valores se ajustan
dinámicamente según las Alertas Activas seleccionadas por el usuario.
1. Búsqueda de Rutas
La lógica de búsqueda (función findRoutes en script.js) está diseñada para encontrar los
siguientes tipos de trayectos:
● Ruta Directa (0 Transbordos): Si hay una conexión directa definida entre el Origen y el
Destino.
● Ruta con Un Transbordo (1 Transbordo): Busca un punto intermedio
(intermediateStop) que conecte el Origen con ese punto y, a su vez, ese punto con el
Destino.
○ Nota: La aplicación no busca rutas con dos o más transbordos.
2. Factores de Impacto (Alertas Activas)
Los siguientes factores se aplican como multiplicadores al tiempo y costo base de cada
segmento de la ruta. Los factores se combinan multiplicativamente si hay más de una alerta
activa.
Alerta Activa Icono Impacto en el
Tiempo
Impacto en el
Costo
Descripción
Lluvia (lluvia) 🌧 +20% (Factor 1.2) +10% (Factor 1.1) Aumenta el tráfico
y ligeramente las
tarifas por la
demanda.
Hora Pico
(hora_pico)
⏰ +30% (Factor 1.3) Sin cambio
(Factor 1.0)
Aumenta
significativamente
el tiempo de viaje
por la congestión
vial.
Paro/Protesta
(paro)
📢 +50% (Factor 1.5) +40% (Factor 1.4) El factor de mayor
impacto; afecta
tanto el tiempo
(desvíos) como el
costo (escasez y
riesgo).
Fórmula de Cálculo Total
El tiempo y el costo finales para cada segmento se calculan con la siguiente lógica
(implementada en script.js):
1. Cálculo del Factor de Tiempo: \text{Factor}_{\text{Tiempo}} = (1 +
\text{Lluvia}_{\text{Tiempo}}) \times (1 + \text{Pico}_{\text{Tiempo}}) \times (1 +
\text{Paro}_{\text{Tiempo}})
2. Cálculo del Factor de Costo: \text{Factor}_{\text{Costo}} = (1 +
\text{Lluvia}_{\text{Costo}}) \times (1 + \text{Paro}_{\text{Costo}}) (La Hora Pico no tiene
impacto en el costo).
3. Resultado Final: \text{Tiempo Total} = \text{Tiempo Base} \times
\text{Factor}_{\text{Tiempo}} \text{Costo Total} = \text{Costo Base} \times
\text{Factor}_{\text{Costo}}
3. Modo Ahorro (Dark Mode)
La aplicación soporta un Modo Ahorro que activa el modo oscuro (dark-mode en body) para
reducir el consumo de energía en pantallas OLED/AMOLED y desactiva todas las
animaciones y transiciones (prefers-reduced-motion) para reducir la carga de procesamiento,
mejorando la eficiencia y accesibilidad
