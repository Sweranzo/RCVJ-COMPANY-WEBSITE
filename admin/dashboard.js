// Add job
document.querySelector("#jobForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.querySelector("#title").value;
  const description = document.querySelector("#description").value;
  const location = document.querySelector("#location").value;

  const res = await fetch("http://localhost:3000/add-job", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, description, location })
  });

  const data = await res.json();
  alert(data.message);
  loadJobs();
});

// Load jobs
async function loadJobs() {
  const res = await fetch("http://localhost:3000/jobs");
  const jobs = await res.json();

  const jobList = document.querySelector("#jobList");
  jobList.innerHTML = jobs
    .map(job => `
      <div class="job">
        <h3>${job.title}</h3>
        <p>${job.description}</p>
        <p><strong>Location:</strong> ${job.location}</p>
        <p><small>${new Date(job.date_posted).toLocaleString()}</small></p>
        <button onclick="editJob(${job.id}, '${job.title}', '${job.description}', '${job.location}')">Edit</button>
        <button onclick="deleteJob(${job.id})">Delete</button>
      </div>
    `)
    .join("");
}
// Delete a job
async function deleteJob(id) {
  if (!confirm("Are you sure you want to delete this job?")) return;

  const res = await fetch(`http://localhost:3000/delete-job/${id}`, {
    method: "DELETE",
  });

  const data = await res.json();
  alert(data.message);
  loadJobs();
}

// Edit a job
function editJob(id, title, description, location) {
  const newTitle = prompt("Edit Job Title:", title);
  const newDesc = prompt("Edit Description:", description);
  const newLoc = prompt("Edit Location:", location);

  if (!newTitle || !newDesc || !newLoc) return alert("All fields are required!");

  fetch(`http://localhost:3000/edit-job/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: newTitle, description: newDesc, location: newLoc })
  })
    .then(res => res.json())
    .then(data => {
      alert(data.message);
      loadJobs();
    });
}

// Auto-load jobs when page opens
loadJobs();
