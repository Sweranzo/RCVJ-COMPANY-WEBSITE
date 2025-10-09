document.addEventListener("DOMContentLoaded", () => {
  // ===== Loader fade effect =====
  window.addEventListener("load", function () {
    const loader = document.getElementById("loader");
    const content = document.getElementById("content");

    loader.style.opacity = "100";
    setTimeout(() => {
      loader.style.display = "none";
      content.style.display = "block";
    }, 2800);
  });

  // ===== Text animation =====
  const setTextTransition = document.getElementById("changing-text");
  const messages = ["Start your career now with us", "Fast reliable process", "Good environments"];
  let index = 0;

  setInterval(() => {
    index = (index + 1) % messages.length;
    setTextTransition.textContent = messages[index];
  }, 3000);

  // ===== Burger menu =====
  const burger = document.querySelector(".burger");
  const navlinks = document.querySelector(".links");

  if (burger && navlinks) {
    burger.addEventListener("click", () => {
      navlinks.classList.toggle("active");
    });

    document.addEventListener("click", (e) => {
      if (navlinks.classList.contains("active") && !navlinks.contains(e.target) && !burger.contains(e.target)) {
        navlinks.classList.remove("active");
      }
    });
  }

  // ===== Lottie Animations =====
  if (typeof lottie !== "undefined") {
    lottie.loadAnimation({
      container: document.getElementById("working-man"),
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "JSON/Welcome.json",
    });

    lottie.loadAnimation({
      container: document.getElementById("location"),
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "JSON/Globe.json",
    });

    lottie.loadAnimation({
      container: document.getElementById("confused"),
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "JSON/confused.json",
    });

    lottie.loadAnimation({
      container: document.getElementById("cat"),
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "JSON/cat.json",
    });
  }

  // ===== Login Form (runs only on login page) =====
  const loginForm = document.querySelector("#loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const username = document.querySelector("#username").value;
      const password = document.querySelector("#password").value;

      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      alert(data.message);

      if (data.success) {
        window.location.href = "../admin/dashboard.html";
      }
    });
  }

  // ===== Load Public Jobs (runs only if jobContainer exists) =====
  async function loadPublicJobs() {
    try {
      const res = await fetch("http://localhost:3000/public-jobs");
      const jobs = await res.json();

      const container = document.querySelector("#jobContainer");
      if (!container) return;

      if (jobs.length === 0) {
        container.innerHTML = "<p>No job openings available at the moment.</p>";
        return;
      }

      container.innerHTML = jobs
        .map(
          (job) => `
          <div class="job-card">
            <h3>${job.title}</h3>
            <p>${job.description}</p>
            <p><strong>Location:</strong> ${job.location}</p>
            <small>Posted on: ${new Date(job.date_posted).toLocaleDateString()}</small>
          </div>
        `
        )
        .join("");
    } catch (err) {
      console.error("Error loading jobs:", err);
    }
  }

  const jobContainer = document.querySelector("#jobContainer");
  if (jobContainer) loadPublicJobs();
});

// animations // 

document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll("section, .job-card, .card, .container");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  }, { threshold: 0.2 });

  elements.forEach(el => {
    el.classList.add("scroll-animate");
    observer.observe(el);
  });
});