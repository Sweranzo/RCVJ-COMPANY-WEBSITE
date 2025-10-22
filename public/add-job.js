document.querySelector("#jobForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const job = {
    title: document.querySelector("#title").value,
    description: document.querySelector("#description").value,
    location: document.querySelector("#location").value,
  };
  
  const res = await fetch("http://localhost:3000/add-job", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(job),
  });

  const data = await res.json();
  alert(data.message);
});
