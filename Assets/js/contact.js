document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".contact-form").forEach(f => {
        f.addEventListener("submit", e => {
            e.preventDefault();
            const name = f.querySelector('input[type="text"]')?.value.trim(),
                email = f.querySelector('input[type="email"]')?.value.trim(),
                msg = f.querySelector("textarea")?.value.trim();
            if (!name || !email || !msg) return alert("Please fill out all fields before submitting.");

            const data = {
                name, email, message: msg,
                page: location.pathname.split("/").pop() || "index.html",
                time: new Date().toLocaleString()
            };

            const saved = JSON.parse(localStorage.getItem("contactMessages") || "[]");
            saved.push(data);
            localStorage.setItem("contactMessages", JSON.stringify(saved));

            alert("Your message has been saved locally!");
            f.reset();
            console.log("Saved messages:", saved);
        });
    });
});
