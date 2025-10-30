let nurses = [];
let editId = null;

async function fetchNurses() {
  const res = await fetch('/api/nurses');
  nurses = await res.json();
  renderTable(nurses);
}
function formatDate(dob) {
  const date = new Date(dob);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

function renderTable(data) {
  const tbody = document.querySelector('#nurseTable tbody');
  tbody.innerHTML = '';

  data.forEach(nurse => {
    const row = `<tr>
      <td>${nurse.id}</td>
      <td>${nurse.name}</td>
      <td>${nurse.license_number}</td>
      <td>${formatDate(nurse.dob)}</td>
      <td>${nurse.age}</td>
      <td><button class="remove" onclick="deleteNurse(${nurse.id})">Remove</button></td>
    </tr>`;
    tbody.innerHTML += row;
  });
 

  // Add empty row for new entry
  const addRow = `<tr>
    <td>New</td>
    <td><input id="newName" ></td>
    <td><input id="newLicense" ></td>
    <td><input id="newDOB" type="date"></td>
    <td><input id="newAge" type="number"></td>
    <td><button onclick="addNewNurse()">Add Row</button></td>
  </tr>`;
  tbody.innerHTML += addRow;
}
function filterNurses() {
  const query = document.getElementById('search').value.toLowerCase();
  const filtered = nurses.filter(nurse =>
    nurse.name.toLowerCase().includes(query) ||
    nurse.license_number.toLowerCase().includes(query) ||
    formatDate(nurse.dob).includes(query) ||
    String(nurse.age).includes(query)
  );
  renderTable(filtered);
}
function showPopup(message) {
  const popup = document.getElementById('popup');
  popup.textContent = message;
  popup.style.display = 'block';
  setTimeout(() => {
    popup.style.display = 'none';
  }, 3000);
}

async function addNewNurse() {
  const name = document.getElementById('newName').value.trim();
  const license_number = document.getElementById('newLicense').value.trim();
  const dob = document.getElementById('newDOB').value;
  const age = parseInt(document.getElementById('newAge').value);

  if (!name || !license_number || !dob || isNaN(age)) {
    alert("Please fill all fields correctly.");
    return;
  }

  const res = await fetch('/api/nurses', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, license_number, dob, age })
  });

if (res.ok) {
  showPopup("✅ Nurse added successfully!");
  fetchNurses();
} else {
    alert("Failed to add nurse.");
  }
}

function editNurse(id) {
  const nurse = nurses.find(n => n.id === id);
  document.getElementById('name').value = nurse.name;
  document.getElementById('license').value = nurse.license_number;
  document.getElementById('dob').value = nurse.dob;
  document.getElementById('age').value = nurse.age;
  editId = id;
  document.getElementById('modal').style.display = 'block';
}

async function saveNurse() {
  const nurse = {
    name: document.getElementById('name').value,
    license_number: document.getElementById('license').value,
    dob: document.getElementById('dob').value,
    age: document.getElementById('age').value,
  };

  if (editId) {
    await fetch(`/api/nurses/${editId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nurse),
    });
  } else {
    await fetch('/api/nurses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nurse),
    });
  }

  document.getElementById('modal').style.display = 'none';
  editId = null;
  fetchNurses();
}

async function deleteNurse(id) {
  await fetch(`/api/nurses/${id}`, { method: 'DELETE' });
  fetchNurses();
}

function download(type) {
  window.location.href = `/api/nurses/download/${type}`;
}

function sortTable(colIndex) {
  nurses.sort((a, b) => {
    const valA = Object.values(a)[colIndex];
    const valB = Object.values(b)[colIndex];
    return valA > valB ? 1 : -1;
  });
  renderTable(nurses);
}

fetchNurses();