document.querySelector("#jobForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const job = {
    title: document.querySelector("#title").value.trim(),
    description: document.querySelector("#description").value.trim(),
    location: document.querySelector("#location").value.trim(),
  };

  if (!job.title || !job.description || !job.location) {
    alert("All fields are required!");
    return;
  }

  try {
    const res = await fetch("http://localhost:3000/add-job", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(job),
    });

    const data = await res.json();

    if (data.success) {
      alert("✅ Job added successfully!");
      window.location.href = "../admin/dashboard.html";
    } else {
      alert("❌ Failed to add job: " + data.message);
    }
  } catch (err) {
    console.error(err);
    alert("Server error. Please try again.");
  }
});
