const ingredients = [
  { name: "Alpha-Isomethyl Ionone", cas: "127-51-5" },
  { name: "Amyl Cinnamal", cas: "122-40-7" },
  { name: "Amylcinnamyl Alcohol", cas: "101-85-9" },
  { name: "Anise Alcohol", cas: "105-13-5" },
  { name: "Benzyl Alcohol", cas: "100-51-6" },
  { name: "Benzyl Benzoate", cas: "120-51-4" },
  { name: "Benzyl Cinnamate", cas: "103-41-3" },
  { name: "Benzyl Salicylate", cas: "118-58-1" }
];

let fragranceCount = 1;

function setFragranceCount(count) {
  fragranceCount = count;
  document.querySelectorAll(".f2, .f3").forEach(el => el.style.display = "none");
  if (count >= 2) document.querySelectorAll(".f2").forEach(el => el.style.display = "");
  if (count === 3) document.querySelectorAll(".f3").forEach(el => el.style.display = "");
  renderTable();
}

function renderTable() {
  const tbody = document.getElementById("tableBody");
  tbody.innerHTML = "";

  ingredients.forEach((item, idx) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.cas}</td>
      <td class="f1"><input type="number" data-row="${idx}" data-frag="1" step="0.01"></td>
      <td class="f2" style="display:none;"><input type="number" data-row="${idx}" data-frag="2" step="0.01"></td>
      <td class="f3" style="display:none;"><input type="number" data-row="${idx}" data-frag="3" step="0.01"></td>
      <td id="final-${idx}">--</td>
      <td id="label-${idx}">--</td>
    `;
    tbody.appendChild(row);
  });

  document.querySelectorAll("input[type='number']").forEach(input => {
    input.addEventListener("input", calculate);
  });
}

function calculate() {
  const productType = document.getElementById("productType").value;
  const fragrancePercent = parseFloat(document.getElementById("fragrancePercent").value) || 0;
  const threshold = productType === "rinse" ? 0.01 : 0.001;

  ingredients.forEach((item, idx) => {
    let total = 0;
    for (let i = 1; i <= fragranceCount; i++) {
      const input = document.querySelector(`input[data-row="${idx}"][data-frag="${i}"]`);
      const value = parseFloat(input?.value) || 0;
      total += (fragrancePercent / fragranceCount) * (value / 100);
    }

    const cell = document.getElementById(`final-${idx}`);
    const label = document.getElementById(`label-${idx}`);
    cell.textContent = total.toFixed(4);
    label.textContent = total >= threshold ? "需標示 ⚠️" : "可免標示 ✅";
    label.style.color = total >= threshold ? "red" : "green";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setFragranceCount(1);
});
