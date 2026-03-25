# Prompt Engineering exercise - AI4Devs-intro-2603-sr-II - Claude Code

## Rol

Al igual que yo, eres ingeniero de software sénior y desempeñas funciones de arquitecto y desarrollador en el ámbito del desarrollo de aplicaciones web. En nuestro trabajo, aplicamos correctamente un modelo centrado en las reglas de negocio (Domain-Driven Design) en lugar de en las tecnologías, y lo incorporamos a nuestros diseños arquitectónicos. Seguimos las buenas prácticas de codificación (Clean Code) y empleamos técnicas de modelado, como C4 o las vistas 4+1, para definir la arquitectura del sistema con precisión, apoyándonos en diagramas UML. En resumen, trabajamos duro y estamos en constante coordinación para tener un plan detallado en las primeras etapas del ciclo de vida de un producto de software, de modo que, en la fase de implementación, se aporte el máximo valor posible y se evite el rework.

## Contexto

Están poniendo a prueba nuestra capacidad para resolver problemas de manera adecuada. Por ello, nos plantean el siguiente reto: desarrollar una página web estática basada en JavaScript que, en resumen, obtenga la cadena de texto que introduce el usuario y la muestre invertida en otro campo. Más adelante abordaremos todas las necesidades con mayor profundidad.  

### Estructura

El reto está publicado en un repositorio de GitHub que me he descargado. La estructura del directorio y su finalidad son las siguientes:

```sh
AI4Devs-intro-2603-sr-II          # Nombre del repositorio.
├── README.md                     # Fichero Markdown que describe el reto de manera resumida. Lo hace en inglés y español.
├── res                           # Directorio empleado para ejemplificar el resultado esperado.
│   └── reversestring-example.png # Imagen que ejemplifica la apariencia y funcionalidad del reto a resolver.
├── reversestring-ARC             # Directorio en la que aplicaremos nuestra solución.
│   ├── index.html                # Fichero HTML principal en el que implementar la solución de la web estática con los requisitos exigidos.
│   ├── prompts.md                # Fichero Markdown que debe contener toda la interacción con la IA para resolver el reto. 
│   └── script.js                 # Fichero JavaScript que contendrá toda la funcionalidad de nuestra solución para superar con éxito el reto.
└── template                      # Directorio read-only que ejemplifica el contenido que debe tener la solución.
    ├── index.html                # Fichero HTML de ejemplo de web estática que incorpora el script.js para dar solución al problema planteado.
    ├── prompts.md                # Fichero Markdown vacío para indicar que allí debemos incorporar el prompt completo de interacción con la IA.
    └── script.js                 # Fichero JavaScript vacío para indicar que allí debe estar el código fuente que implemente la solución del reto.

3 directories, 8 files

```

### Contenido

La imagen `res/reversestring-example.png` muestra un ejemplo de la apariencia y distribución de los distintos elementos de la web estática. De arriba hacia abajo, se puede observar lo siguiente:

- Un título (`title`) destacado con el texto "Reverse String", que resume en qué consiste la funcionalidad solicitada.
- Una caja de texto editable (`user_input`) alargada horizontalmente, en la que el usuario puede escribir el texto que se desea mostrar invertido.
- Un botón (`reverse_button`) con fondo azul celeste, el texto de "Reverse" en color blanco y un icono a la derecha del texto parecido al switch (2 flechas formando un círculo) de emojis.
- Una caja de texto deactivada, no editable (`reversed_text`) alargada horizontalmente, en la que el usuario puede visualizar el texto invertido. Es un elemento sin capacidad de edición, sólo de visualización.
- Un botón (`copy_button`) que contiene lo siguiente: fondo gris, el texto de "Copy" en color blanco y un icono a la derecha del texto parecido al clipboard de emojis.

Todos los elementos están alienados verticalmente entre sí en el margen izquierdo.

### Reglas de negocio

Ahora te definiré las reglas de negocio que deberá respetar nuestra solución:

- Un ejemplo de entrada y resultado esperado que permita conocer en qué consiste la operación de invertir un texto (`reverse_string`) es esta: dado el texto`I think AI4Devs is awesome!` como entrada, entonces se espera como resultado el texto `!emosewa si sveD4IA kniht I`.

- La longitud del texto en `user_input` (`user_input_length`) deberá estar monitorizándose constantemente para aplicar algunas reglas o requisitos.

- El botón `reverse_button` estará asociado a una máquina de estados finita de 2 estados:

  1. `reverse_button_hidden`.
     En este estado botón `reverse_button` estará oculto al usuario.
     Es el estado inicial.
     Se transita a `reverse_button_visible` cuando `user_input_length` >= 3.

  2. `reverse_button_visible`.
     En este estado botón `reverse_button` estará visible al usuario.
     Se transita `reverse_button_hidden` cuando `user_input_length` < 3.

- El campo `reversed_text` estará asociada a una máquina de estados finita de 3 estados:

  1. `reversed_text_empty`.
     En este estado el contenido de `reversed_text` será vacío.
     Es el estado inicial.
     Se transita hacia `reversed_text_ready` cuando:
     - `user_input_length` >= 3 &&
     - se captura el clic de `reverse_button` &&
     - el estado de `reverse_button` es `reverse_button_visible`.

  2. `reversed_text_ready`.
     En este estado el contenido de `reversed_text` será el resultado de aplicar la función `reverse_string` sobre el contenido que tenía `user_input` en
     el momento del clic de `reverse_button`.
     Se transita al estado `reversed_text_empty` cuando:
     - `user_input_length` < 3 o
     - el estado de `reverse_button` es `reverse_button_hidden`.
     Se transita al estado `reversed_text_update` cuando:
     - `user_input_length` > 3 &&
     - el estado de `reverse_button` es `reverse_button_visible`.

  3. `reversed_text_update`.
     En este estado el contenido de `reversed_text` será el resultado de aplicar la función `reverse_string` sobre el contenido actualizado del campo `user_input`.
     Sólo se transita al estado `reversed_text_empty` cuando:
     - `user_input_length` < 3 o
     - el estado de `reverse_button` es `reverse_button_hidden`.
- La funcionalidad de `copy_button` es activar, bajo demanda del usuario con el clic, copiar al portapapeles el texto contenido en `reversed_text`.

## Instrucciones y formato

A continuación, enumero una lista de MUST (no negociables) que debe contemplar el plan y la implementación:

- Introducir el problema planteado con un alto nivel de detalle.
- Respetar todas las reglas de negocio definidas.
- Seguir nuestra forma de trabajar introducidas al inicio (BDD, Clean code, etc.).
- Generar documentación Markdown con mermaid que guíe el desarrollo de la funcionalidad: modelo C4 o vistas 4 +1.
- Definir etapas incrementales en la implementación de nuestra solución, incluyendo validaciones. Es crucial que las definiciones de estas etapas apliquen la que cada una de ellas se desarrolle de manera independiente y aislada. A modo de ejemplo, te sugiero estas etapas:
   1. Añadir los elementos del DOM en el JavaScript.
   2. Alinear verticalmente los elementos a la izquierda.
   3. Aplicar estilos CCS para que su apariencia sea similar a los elementos de la imagen `res/reversestring-example.png`.
   4. Codificar las función `reverse_string`, con un parámetro de texto de entrada, y ofreciendo una salida de texto acorde a la definición descrita con anterioridad.
   5. Codificar las función para copiar al portapapeles.
   6. Codificar el evento al hacer clic en `copy_button`.
   7. etc.
- Emplear el idioma inglés en la codificación, documentación, tareas, plan y manuales de usuario que se puedan generar.
- Las tareas a parte de estar incluidas en el plan deben listarse en un fichero Markdown, llamado `task.md`, ubicado dentro del directorio `reversestring-ARC`. El formato esperado es el siguiente:

  ```
  ## 1. <Purpose of the task #1>

  - [x] 1.1 <Task action #1>
  - [ ] 1.2 <Task action #2>

  ## 2. <Purpose of the task #2>

  - [ ] 2.1 <Task action #1>
  - [ ] 2.2 <Task action #2>

  ```
- Genera manual básico de usuario sobre nuestra solución en formato Markdown.
- El plan debe generarse en un fichero Markdown, llamado `plan.md`, ubicado dentro del directorio `reversestring-ARC`.

El plan se suministrará a una inteligencia artificial para ejecutarlo; tenlo presente.

## Refinamiento dirigido por humano

Finalmente, no dudes en consultarme si necesitas información adicional o si necesitas que se tome una decisión sobre la dirección o línea de trabajo del plan.
