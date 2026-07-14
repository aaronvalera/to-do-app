const togglePasswordsBtns = document.querySelectorAll(".toggle-password");

const togglePasswords = () => {
    togglePasswordsBtns.forEach(button => {
        button.addEventListener("click", () => {
            const targetID = button.getAttribute("data-target");
            const targetInput = document.getElementById(targetID);
            const wrapper = button.closest(".password-wrapper");
            if (targetInput.type === "password") {
                targetInput.type = "text";
                wrapper.classList.add("is-visible"); 
                button.title = "Hide password";
            } else {
                targetInput.type = "password";
                wrapper.classList.remove("is-visible"); 
                button.title = "Show password";
            }
        });
    });
};

togglePasswords();