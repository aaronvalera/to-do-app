const footerContainer = document.createElement("footer");
footerContainer.className =
  "w-full text-center py-4 mt-auto text-xs text-slate-500 tracking-wide font-sans flex flex-wrap justify-center items-center gap-1";

footerContainer.innerHTML = `
  <span>&copy; 2026 — Desarrollado por</span>
  <a href="https://github.com/Eileenax" target="_blank" rel="noopener noreferrer" class="hover:text-sky-400 font-medium transition-colors duration-200 px-1 py-0.5 rounded-sm hover:bg-slate-800/30">Eileen Valera</a>
  <span>y</span>
  <a href="https://github.com/aaronvalera" target="_blank" rel="noopener noreferrer" class="hover:text-sky-400 font-medium transition-colors duration-200 px-1 py-0.5 rounded-sm hover:bg-slate-800/30">Aarón Valera</a>
`;

document.body.appendChild(footerContainer);
