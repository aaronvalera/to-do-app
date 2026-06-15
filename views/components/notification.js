const div = document.getElementById("notification");
export const displayNotification = (isError, message) => {
    let notificationIcon = ``;
    if(isError) {
        notificationIcon = `
        <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="red" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
        </svg>
    `;
    } else {
        notificationIcon = `
        <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="blue" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
        </svg>
    `;
    }
              
    if(isError) {
        div.innerHTML = `
        <div class="flex justify-center flex-col items-center gap-4 bg-slate-200 max-w-xs w-60 py-12 px-4 mx-8 font-extrabold rounded-lg text-white border border-gray-400 shadow-lg">
            ${notificationIcon}
            <h1 class="font-extrabold text-red-400">Error!</h1>
            <p class="font-bold text-red-400">${message}</p>
        </div>
    `;
    } else {
        div.innerHTML = `
        <div class="flex justify-center flex-col items-center gap-4 bg-slate-200 max-w-xs w-60 py-12 px-4 mx-8 font-extrabold rounded-lg text-white border border-gray-400 shadow-lg text-center">
            ${notificationIcon}
            <h1 class="font-extrabold text-blue-400">Success!</h1>
            <p class="">${message}</p>
        </div>
    `;
    }
    setTimeout(() => {
        div.classList.remove("opacity-0", "translate-x-5", "pointer-events-none");
        div.classList.add("opacity-100", "translate-x-0");
    }, 10);
};