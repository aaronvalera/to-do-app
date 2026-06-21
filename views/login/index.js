const emailInput = document.querySelector("#email"); // busca en el html el campo donde el usuario escribe su correo usando su id y lo guarda en una variable.
const passwordInput = document.querySelector("#password"); // busca en el html el campo donde el usuario escribe su contraseña usando su id y lo guarda en otra variable.
const form = document.querySelector("#form"); // selecciona el formulario completo desde el html para poder controlar cuándo se envía.
const errorText = document.querySelector("#error-text"); // busca el espacio o la etiqueta de texto en el html donde mostraremos los mensajes de error si algo sale mal.

form.addEventListener("submit", async (event) => {
  // activa un escuchador para que en el momento en que el usuario le dé al botón de enviar (submit), se ejecute esta función asíncrona.
  event.preventDefault(); // evita que la página se recargue
  try {
    // abre el bloque donde intentaremos hacer la petición al servidor si todo va bien.
    const user = {
      // crea un objeto limpio con los datos que el usuario escribió en la pantalla.
      email: emailInput.value, // toma el texto exacto que se escribió en el campo de correo.
      password: passwordInput.value, // toma el texto exacto que se escribió en el campo de la contraseña.
    };
    await axios.post("/api/login", user); // usa la librería axios para enviar los datos del objeto 'user' de forma asíncrona al servidor mediante un método post, y espera a que el servidor responda.
    window.location.pathname = `/todos/`; // si el servidor responde que todo está bien, esta línea redirecciona automáticamente al usuario a la pantalla de sus tareas o la página principal.
  } catch (error) {
    // si el servidor devuelve un error (por ejemplo, contraseña incorrecta), el código salta directamente a este bloque de seguridad.
    console.log(error); // muestra el error detallado en la consola del navegador para que el desarrollador pueda revisar qué falló.
    errorText.innerHTML = error.response.data.error; // usa la librería axios para buscar dentro de la carpeta del fallo (.response), abrir los datos que envió el servidor (.data) y sacar el texto del error (.error) para ponerlo en la pantalla.
  }
});
