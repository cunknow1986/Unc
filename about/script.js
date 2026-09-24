document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.getElementById("primary-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    document.addEventListener("click", (event) => {
      const clickedInside = nav.contains(event.target) || toggle.contains(event.target);

      if (!clickedInside) {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  const yearElement = document.getElementById("year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  const filterButtons = document.querySelectorAll(".filter-btn");
  const modelCards = document.querySelectorAll(".model-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;

      filterButtons.forEach((btn) => {
        btn.classList.toggle("active", btn === button);
      });

      modelCards.forEach((card) => {
        const categories = card.dataset.category || "";
        const matches = filter === "all" || categories.includes(filter);
        card.style.display = matches ? "" : "none";
      });
    });
  });

  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");

  if (form && status) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const data = new FormData(form);

      try {
        const response = await fetch("/", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: new URLSearchParams(data)
        });

        if (response.ok) {
          form.reset();
          status.hidden = false;
          status.textContent = "Сообщение отправлено. Спасибо!";
        } else {
          status.hidden = false;
          status.textContent = "Не удалось отправить сообщение. Попробуй позже или напиши напрямую.";
        }
      } catch (error) {
        status.hidden = false;
        status.textContent = "Ошибка отправки. Проверь подключение и попробуй ещё раз.";
      }
    });
  }
});
