

const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');
const form = document.querySelector('#form');

form.addEventListener('submit', async e => {
    e.preventDefault();
    try {
        const user = {
            email: emailInput.value,
            password: passwordInput.value
        }

        await axios.post('/api/login', user);
        console.log(user);
    } catch (error) {
        console.log(error);
    }
});