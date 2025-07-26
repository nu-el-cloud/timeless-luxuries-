<!-- 2916121 -->
document.addEventListener("DOMContentLoaded", () => {
        document.body.classList.add("loading");
    window.addEventListener("load", () => {
        const loader = document.getElementById("loader");
        if (loader) {
             loader.classList.add("hidden");
            setTimeout(() => {
                loader.style.display = "none";
            }, 500);
        }
        document.body.classList.remove("loading");
        document.body.classList.add("loaded");
    });
});