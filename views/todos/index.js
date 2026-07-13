const input = document.querySelector('input');
const ul = document.querySelector('ul');
const addBtn = document.querySelector('.add-btn');
const invalidCheck = document.querySelector('.invalid-check');
const form = document.querySelector('#form');
const totalCountSpan = document.querySelector('.total-count');
const completedCountSpan = document.querySelector('.completed-count');
const incompletedCountSpan = document.querySelector('.incompleted-count');

//Funciones de conteo de tareas
const totalCount = () => {
    const howMany = document.querySelector('ul').children.length; 
    totalCountSpan.innerHTML = howMany;
};

const completeCount = () => {
    const howMany = document.querySelectorAll('.line-through').length;
    completedCountSpan.innerHTML = howMany;
};

const incompletedCount = () => {
    const howMany = document.querySelectorAll('ul li:not(.line-through)').length; 
    incompletedCountSpan.textContent = howMany;
};

const todoCount = () => {
    totalCount();
    completeCount();
    incompletedCount();
};

const todoDesing = (description) => `
    <div class="group grow flex flex-row justify-between">
        <button class="delete-icon w-12 md:w-14 hidden group-hover:flex group-hover:justify-center group-hover:items-center cursor-pointer bg-red-500 origin-left">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 md:h-7 md:w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
        <p class="p-4 wrap-break-word grow">${description}</p>
    </div>
    <button class="check-icon w-12 md:w-14 flex justify-center items-center cursor-pointer border-l border-slate-300 dark:border-slate-400 hover:bg-green-300 transition duration-300 easy-in-out">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 md:h-7 md:w-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
        </svg>
    </button>       
`;

//Agregar una nueva tarea (evento submit del form)
form.addEventListener('submit', async event => {
    event.preventDefault();
    // Validación del input
    if (input.value === '') {
        input.classList.remove('focus:ring-2', 'focus:ring-violet-600');
        input.classList.add('focus:ring-2', 'focus:ring-rose-600');
        invalidCheck.classList.remove('hidden');
        return;
    }
    // Reset visual del input
    input.classList.remove('focus:ring-2', 'focus:ring-rose-600', 'border-2', 'border-rose-600');
    input.classList.add('focus:ring-2', 'focus:ring-violet-600');
    invalidCheck.classList.add('hidden');
    // Crear tarea en el backend
    const { data:newTodo } = await axios.post('/api/todos', { description: input.value });
    //Crear el elemento <li> en el DOM
    const listItem = document.createElement('li');
    listItem.id = newTodo.id;
    listItem.classList.add('flex', 'flex-row');
    listItem.innerHTML = todoDesing(newTodo.description);
    ul.append(listItem);
    input.value = '';
    todoCount();
});

//Manejo de clicks en las tareas (ul.addEventListener)
ul.addEventListener('click', async event => {
    // Eliminar tarea
    if (event.target.closest('.delete-icon')) {
        const li = event.target.closest('.delete-icon').parentElement.parentElement;
        await axios.delete(`/api/todos/${li.id}`);
        li.remove();
        todoCount();
    }
    // Marcar tarea como completada o incompleta
    if (event.target.closest('.check-icon')) {
        const checkIcon = event.target.closest('.check-icon');
        const listItem = checkIcon.parentElement;
        if (!listItem.classList.contains('line-through')) {
            await axios.patch(`/api/todos/${listItem.id}`, {checked: true});
            checkIcon.classList.add('bg-green-400');
            checkIcon.classList.remove('hover:bg-green-300');
            listItem.classList.add('line-through', 'text-slate-400', 'dark:text-slate-600');
        } else {
            await axios.patch(`/api/todos/${listItem.id}`, {checked: false});
            checkIcon.classList.remove('bg-green-400');
            checkIcon.classList.add('hover:bg-green-300');
            listItem.classList.remove('line-through', 'text-slate-400', 'dark:text-slate-600');
        }
        todoCount();
    }
});

(async () => {
    try {
        const { data:todos } = await axios.get("/api/todos", { withCredentials: true });
        todos.forEach(todo => {
            const listItem = document.createElement('li');
            listItem.id = todo.id;
            listItem.classList.add('flex', 'flex-row');
            listItem.innerHTML = todoDesing(todo.description);
            if (todo.checked) {
                listItem.children[1].classList.add('bg-green-400');
                listItem.children[1].classList.remove('hover:bg-green-300');
                listItem.classList.add('line-through', 'text-slate-400', 'dark:text-slate-600');
            } else {
                listItem.children[1].classList.remove('bg-green-400');
                listItem.children[1].classList.add('hover:bg-green-300');
                listItem.classList.remove('line-through', 'text-slate-400', 'dark:text-slate-600');
            }
            ul.append(listItem);
        });
        todoCount();
        } catch (error) {
            window.location.pathname = "/login";
            console.log(error);
        }
    })();