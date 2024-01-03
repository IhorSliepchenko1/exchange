function onButton() {
  let dataInput = document.getElementById('inpDate').value
  let valueDateInput = dataInput.split('-');
  let dataInputNew = valueDateInput[0] + valueDateInput[1] + valueDateInput[2];
  let url = `https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date=${dataInputNew}&json`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      productsData = data;
      renderData(productsData);
      renderoptionSelecFtrom(productsData)
    })
    .catch(error => {
      console.error('Произошла ошибка:', error);
    });
}


const tableBody = document.getElementById('table-body');
let productsData = {};
let sortDirection = {};

function renderData(data) {
  tableBody.innerHTML = '';
  data.map(item => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.r030}</td>
      <td>${item.txt}</td>
      <td>${item.rate.toFixed(2)}</td>
      <td>${item.cc}</td>
      <td>${item.exchangedate}</td>
    `;
    tableBody.appendChild(row);
  });
}

function sortData(column) {
  const direction = sortDirection[column] === 'asc' ? 'desc' : 'asc';
  sortDirection = { [column]: direction };

  productsData.sort((a, b) => {

    const valueA = (column === 'rate' || column === 'count') ? a[column] : a[column];
    const valueB = (column === 'rate' || column === 'count') ? b[column] : b[column];

    if (typeof valueA === 'string' && typeof valueB === 'string') {
      const compareResult = valueA.localeCompare(valueB, undefined, { sensitivity: 'base' });
      return (direction === 'asc' ? compareResult : -compareResult);
    }


    else {
      return (direction === 'asc' ? valueA - valueB : valueB - valueA);
    }
  });

  renderData(productsData);
}



document.getElementById('r030').addEventListener('click', () => sortData('r030'));
document.getElementById('txt').addEventListener('click', () => sortData('txt'));
document.getElementById('rate').addEventListener('click', () => sortData('rate'));
document.getElementById('cc').addEventListener('click', () => sortData('cc'));



const from = document.getElementById('from');
const to = document.getElementById('to')
const total = document.getElementById('total')

function renderoptionSelecFtrom(data) {
  data.map(item => {
    const optionSelectFrom = document.createElement('option');
    const optionSelectTo = document.createElement('option');

    optionSelectFrom.innerHTML = `
    <option value="${item.rate}" name="${item.txt}">${item.txt} ≈ ${item.rate.toFixed(1)} UAH</option>
    `;

    optionSelectTo.innerHTML = `
    <option value="${item.rate}" name="${item.txt}">${item.txt} ≈ ${item.rate.toFixed(1)}</option>
    `;
    from.appendChild(optionSelectFrom);
    to.appendChild(optionSelectTo);
  });
}


function convert() {
  let fromValue = from.value.split("≈");
  let fromValue1 = parseFloat(fromValue[1].trim())

  let toValue = to.value.split("≈");
  let toValue1 = parseFloat(toValue[1].trim())

  console.log(fromValue1, toValue1, typeof fromValue1, typeof toValue1)

  const totalInput = total.value = (fromValue1 / toValue1).toFixed(2)

  return totalInput
}