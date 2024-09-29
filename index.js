let records = [
  {
    chemicalName: "Ammonium Persulfate",
    vendor: "LG Chem",
    density: 352592,
    viscosity: 6063,
    packaging: "Bag",
    packSize: 10000,
    unit: "kg",
    quantity: 649518,
  },
  {
    chemicalName: "Caustic Potash",
    vendor: "Formosa",
    density: 317215,
    viscosity: 4822,
    packaging: "Bag",
    packSize: 10000,
    unit: "kg",
    quantity: 875190,
  },
  {
    chemicalName: "Dimethylaminopropylamino",
    vendor: "LG Chem",
    density: 843537,
    viscosity: 1262,
    packaging: "Bag",
    packSize: 7500,
    unit: "kg",
    quantity: 596461,
  },
];

let table = document.getElementById("tbody");
render();
function addRow() {
  let table = document.getElementById("tbody");
  let row = document.createElement("tr");
  let cells = [];

  for (let i = 0; i < 9; i++) {
    let cell = document.createElement("td");
    let input = document.createElement("input");
    if (i === 0) {
      input.type = "checkbox";
      input.classList.add("generalCheckbox");
    } else {
      input.type = "text";
    }
    cell.appendChild(input);
    cells[i] = cell;
  }

  cells.forEach((cell) => row.appendChild(cell));

  table.appendChild(row);
  return row;
}

function render() {
  for (let i = 0; i < records.length; i++) {
    const row = addRow();
    row.children[1].firstChild.value = records[i].chemicalName;
    row.children[2].firstChild.value = records[i].vendor;
    row.children[3].firstChild.value = (records[i].density / 100).toFixed(2);
    row.children[4].firstChild.value = (records[i].viscosity / 100).toFixed(2);
    row.children[5].firstChild.value = records[i].packaging;
    row.children[6].firstChild.value = (records[i].packSize / 100).toFixed(2);
    row.children[7].firstChild.value = records[i].unit;
    row.children[8].firstChild.value = (records[i].quantity / 100).toFixed(2);
    table = document.getElementById("tbody");
    table.appendChild(row);
  }
}

// Select/Deselect all columns
let masterCheckbox = document.getElementById("selectAll");
masterCheckbox.addEventListener("click", () => {
  let checkboxes = [...document.getElementsByClassName("generalCheckbox")];
  checkboxes.forEach((checkbox) => (checkbox.checked = masterCheckbox.checked));
});

function deleteRow() {
  const checkboxes = [...document.getElementsByClassName("generalCheckbox")];
  const checkedBoxes = checkboxes.filter((checkbox) => checkbox.checked);
  for (let i = 0; i < checkedBoxes.length; i++) {
    let row = checkedBoxes[i].closest("tr");
    row.remove();
  }
}

let lastSave;
function save() {
  const tableBody = document.querySelector("tbody");
  const rows = tbody.querySelectorAll("tr");
  let data = "<tbody>";

  rows.forEach((row) => {
    let rowData = "<tr>";
    const cells = row.querySelectorAll("td");
    cells.forEach((cell) => {
      const input = cell.querySelector("input");
      if (input) {
        rowData += `<td><input type="${input.type}" value="${input.value}" class="generalCheckbox"></td>`;
      } else {
        rowData += `<td>${cell.innerHTML}</td>`;
      }
    });
    rowData += "</tr>";
    data += rowData;
  });
  data += "</tbody>";
  lastSave = data;
  alert("Data Stored");
}

function refresh() {
  document.getElementById("tbody").innerHTML = lastSave;
}

function collectRowData(inputRow) {
  let row = inputRow;
  let rowData = "<tr>";
  const cells = row.querySelectorAll("td");
  cells.forEach((cell) => {
    const input = cell.querySelector("input");
    if (input) {
      rowData += `<td><input type="${input.type}" value="${input.value}" class="generalCheckbox"></td>`;
    } else {
      rowData += `<td>${cell.innerHTML}</td>`;
    }
  });
  rowData += "</tr>";
  return rowData;
}

function moveUp() {
  const checkboxes = [...document.getElementsByClassName("generalCheckbox")];
  const checkedBox = checkboxes.filter((checkbox) => checkbox.checked);
  let row = checkedBox[0].closest("tr");
  let rowData = collectRowData(row);
  let rowAbove = row.previousElementSibling;
  if (rowAbove) {
    const rowAboveData = collectRowData(rowAbove);
    row.innerHTML = rowAboveData;
    rowAbove.innerHTML = rowData;
    rowAbove.childNodes[0].firstChild.checked = true;
  }
}

function moveDown() {
  const checkboxes = [...document.getElementsByClassName("generalCheckbox")];
  const checkedBox = checkboxes.filter((checkbox) => checkbox.checked);
  let row = checkedBox[0].closest("tr");
  let rowData = collectRowData(row);
  let rowBelow = row.nextElementSibling;
  if (rowBelow) {
    const rowBelowData = collectRowData(rowBelow);
    row.innerHTML = rowBelowData;
    rowBelow.innerHTML = rowData;
    rowBelow.childNodes[0].firstChild.checked = true;
  }
}

function sort(colNum, isNumeric) {
  const getValue = (row) => {
    let string = row.children[colNum].firstChild.value;
    return isNumeric ? parseFloat(string, 2) : string;
  };
  const orderedRows = [...table.children].sort((rowA, rowB) => {
    const valueA = getValue(rowA);
    const valueB = getValue(rowB);
    return valueA > valueB ? 1 : valueA < valueB ? -1 : 0;
  });
  table.replaceChildren(...orderedRows);
}
