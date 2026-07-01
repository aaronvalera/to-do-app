// NAVBAR DIV SELECTOR
const navbar = document.getElementById("navbar");

// NAVBAR COMPONENT
const createNavBarHome = () => {
    const path = window.location.pathname;
    let desktopBtns = ``;
    let mobileBtns = ``;
    if(path === "/" || path === "/index.html") {
        desktopBtns = `
        <a href="/login/" class="w-24 text-center py-2 px-4 rounded-3xl font-bold bg-blue-400 hover:bg-blue-500 transition ease-in-out duration-300">Log In</a>
        <a href="/signup/" class="w-24 text-center py-2 px-4 rounded-3xl font-bold bg-blue-500 hover:bg-blue-600 transition ease-in-out duration-300">Sign Up</a>
    `;
        mobileBtns = `
        <a href="/login/" class="w-24 text-center py-2 px-4 rounded-3xl font-bold bg-blue-400 hover:bg-blue-500 transition ease-in-out duration-300">Log In</a>
        <a href="/signup/" class="w-24 text-center py-2 px-4 rounded-3xl font-bold bg-blue-500 hover:bg-blue-600 transition ease-in-out duration-300">Sign Up</a>
    `;
    } else if(path.includes("signup")) {
        desktopBtns = `
        <a href="/" class="w-24 text-center py-2 px-4 rounded-3xl font-bold bg-blue-400 hover:bg-blue-500 transition ease-in-out duration-300">Home</a>
        <a href="/login/" class="w-24 text-center py-2 px-4 rounded-3xl font-bold bg-blue-500 hover:bg-blue-600 transition ease-in-out duration-300">Log In</a>
    `;
        mobileBtns = `
        <a href="/" class="w-24 text-center py-2 px-4 rounded-3xl font-bold bg-blue-400 hover:bg-blue-500 transition ease-in-out duration-300">Home</a>
        <a href="/login/" class="w-24 text-center py-2 px-4 rounded-3xl font-bold bg-blue-500 hover:bg-blue-600 transition ease-in-out duration-300">Log In</a>
    `;
    } else if(path.includes("login")) {
        desktopBtns = `
        <a href="/" class="w-24 text-center py-2 px-4 rounded-3xl font-bold bg-blue-400 hover:bg-blue-500 transition ease-in-out duration-300">Home</a>
        <a href="/signup/" class="w-24 py-2 px-4 rounded-3xl font-bold text-center bg-blue-500 hover:bg-blue-600 transition ease-in-out duration-300">Sign Up</a>
    `;
        mobileBtns = `
        <a href="/" class="w-24 text-center py-2 px-4 rounded-3xl font-bold bg-blue-400 hover:bg-blue-500 transition ease-in-out duration-300">Home</a>
        <a href="/signup/" class="w-24 py-2 px-4 rounded-3xl font-bold text-center bg-blue-500 hover:bg-blue-600 transition ease-in-out duration-300">Sign Up</a>
    `;
    } else if(path.includes("todos")) {
        desktopBtns = `
            <button id="logout-btn" class="w-24 text-center py-2 px-4 rounded-3xl font-bold bg-blue-400 hover:bg-blue-500 transition ease-in-out duration-300">Log Out</button>
    `;
        mobileBtns = `
            <button id="logout-btn" class="w-24 text-center py-2 px-4 rounded-3xl font-bold bg-blue-400 hover:bg-blue-500 transition ease-in-out duration-300">Log Out</button>
    `;    
    }
    navbar.innerHTML = `
    <div class="relative flex justify-between items-center h-16 px-4 mx-auto max-w-7xl">
        <a href="/" class="font-bold text-xl text-black">ToDoApp</a>
        <!-- Mobile -->
        <svg id="mobile-menu-btn" xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-list md:hidden p-1 rounded-xl text-black cursor-pointer hover:bg-gray-200 transition ease-in-out duration-300" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
        </svg>
        <div id="mobile-menu" class="hidden absolute flex-col justify-center items-center w-48 gap-4 top-16 right-4 py-5 rounded-xl text-white bg-gray-100 shadow-md md:hidden z-1">
            ${mobileBtns}
        </div>
        <!-- Desktop -->
        <div class="hidden md:flex flex-row px-2.5 gap-4 text-white">
            ${desktopBtns}
        </div>
    </div>
`;
};

createNavBarHome();

// SELECTORS
const navbarListBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const logoutBtn = document.querySelectorAll("#logout-btn");

// FUNCTIONS
const openMenu = () => {
    navbarListBtn.classList.add("active");
    mobileMenu.classList.remove("hidden");
    mobileMenu.classList.add("flex");
    navbarListBtn.innerHTML = '<path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>';
};

const closeMenu = () => {
    navbarListBtn.classList.remove("active");
    mobileMenu.classList.add("hidden");
    mobileMenu.classList.remove("flex");
    navbarListBtn.innerHTML = '<path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>';
}

// EVENTS
navbarListBtn.addEventListener("click", event => {
    if(navbarListBtn.classList.contains("active")) {
        closeMenu();
    } else {
        openMenu();
    }
});

// Click outside to close feature
document.addEventListener("click", event => {
    const clickOnBtn = navbarListBtn.contains(event.target);
    const clickOnMenu = mobileMenu.contains(event.target);
    if(mobileMenu.classList.contains("flex") && !clickOnBtn && !clickOnMenu) {
        closeMenu();
    }
});

// Log out function
logoutBtn.forEach(button => button.addEventListener("click", async event => {
    try {
        await axios.get("/api/logout");
        window.location.pathname = "/login";
    } catch (error) {
        console.log(error);
    }
}));