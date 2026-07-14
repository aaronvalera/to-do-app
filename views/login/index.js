const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const form = document.querySelector("#form"); 
const errorText = document.querySelector("#error-text"); 

form.addEventListener("submit", async (event) => {
  event.preventDefault(); 
  try {
    const user = {
      // crea un objeto limpio con los datos que el usuario escribió en la pantalla.
      email: emailInput.value, 
      password: passwordInput.value
    };
    const response = await axios.post("/api/login", user); // usa la librería axios para enviar los datos del objeto 'user' de forma asíncrona al servidor mediante un método post, y espera a que el servidor responda.
    window.location.pathname = `/todos/`; // si el servidor responde que todo está bien, esta línea redirecciona automáticamente al usuario a la pantalla de sus tareas o la página principal.
  } catch (error) {
    // si el servidor devuelve un error (por ejemplo, contraseña incorrecta), el código salta directamente a este bloque de seguridad.
    console.log(error); 
    errorText.innerHTML = error.response.data.error; // usa la librería axios para buscar dentro de la carpeta del fallo (.response), abrir los datos que envió el servidor (.data) y sacar el texto del error (.error) para ponerlo en la pantalla.
  }
});
