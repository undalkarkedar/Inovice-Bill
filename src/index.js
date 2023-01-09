const invoiceBill = [
  {
    id: "1",
    clientName: "Thomas Lymil",
    clientType: "inState",
    date: "5/10/2022",
    dueDate: "5/11/2022",
    total: 5000,
    balance: 5000,
    status: "draft",
  },
  {
    id: "2",
    clientName: "Simone Walt",
    clientType: "outState",
    date: "26/6/2022",
    dueDate: "26/6/2022",
    total: 1800,
    balance: 1500,
    status: "paid",
  },
  {
    id: "3",
    clientName: "Sam Cena",
    clientType: "inState",
    date: "24/8/2021",
    dueDate: "25/9/2021",
    total: 1200,
    balance: 1000,
    status: "partial payment",
  },
  {
    id: "4",
    clientName: "Clent Marw",
    clientType: "outState",
    date: "12/12/2020",
    dueDate: "28/12/2020",
    total: 500,
    balance: 40,
    status: "draft",
  },
  {
    id: "5",
    clientName: "Satya Nag",
    clientType: "inState",
    date: "5/11/2019",
    dueDate: "12/11/2019",
    total: 800,
    balance: 800,
    status: "paid",
  },
];
const currentDate = new Date().toISOString().slice(0, 10);
const clientType = { inState: "In-State", outState: "Out-State" };
const uniqueFilterValue = {
  statusFilter: "",
  clientFilter: "",
  beginDate: "",
  endDate: "",
};
let sortDirection = false;
buildTable(invoiceBill);

function buildTable(data) {
  const beginDate = document.getElementById("begin-date");
  const endDate = document.getElementById("end-date");
  beginDate.value = currentDate;
  endDate.value = currentDate;
  beginDate.max = currentDate;
  endDate.max = currentDate;

  const table = document.getElementById("myTable");
  table.innerHTML = "";
  for (let i = 0; i < data.length; i++) {
    let row = `<tr>
                      <td>${data[i].id}</td>
                      <td>${data[i].clientName}</td>
                      <td>${clientType[data[i].clientType]}</td>
                      <td>${data[i].date}</td>
                      <td>${data[i].dueDate}</td>
                      <td>$ ${data[i].total}</td>
                      <td>$ ${data[i].balance}</td>
                      <td>${data[i].status}</td>
                    </tr>`;
    table.innerHTML += row;
  }
}
function sortColumn(colName) {
  sortDirection = !sortDirection;
  switch (colName) {
    case "id":
      sortColumns(sortDirection, colName);
      break;
    case "clientName":
      sortAlpha(sortDirection, colName);
      break;
    case "clientType":
      sortAlpha(sortDirection, colName);
      break;
    case "date":
      sortDate(sortDirection, colName);
      break;
    case "dueDate":
      sortDate(sortDirection, colName);
      break;
    case "total":
      sortColumns(sortDirection, colName);
      break;
    case "balance":
      sortColumns(sortDirection, colName);
      break;
    case "status":
      sortAlpha(sortDirection, colName);
      break;
  }
}
function sortDate(colName, sortDirection) {
  let sortedInvoice = invoiceBill.sort(function (a, b) {
    if (new Date(a[colName]) < new Date(b[colName]) && sortDirection) {
      return -1;
    }
    if (new Date(a[colName]) > new Date(b[colName]) && sortDirection) {
      return 1;
    }
    return 0;
  });
  buildTable(sortedInvoice);
}
function sortAlpha(colName, sortDirection) {
  let sortedInvoice = invoiceBill.sort(function (a, b) {
    if (a[colName] < b[colName]) {
      return -1;
    }
    if (a[colName] > b[colName]) {
      return 1;
    }
    return 0;
  });
  buildTable(sortedInvoice);
}

function sortDatesortColumns(sort, colName) {
  let sortedInvoice = invoiceBill.sort((r1, r2) => {
    return sort ? r1[colName] - r2[colName] : r2[colName] - r1[colName];
  });
  console.log(sortedInvoice);
  buildTable(sortedInvoice);
}
function beginDate() {
  const beginDate = document.getElementById("begin-date");
  if (beginDate.value == "" || undefined) {
    uniqueFilterValue["beginDate"] = "";
    searchData(uniqueFilterValue);
    return;
  }
  if (uniqueFilterValue["beginDate"] !== beginDate.value) {
    uniqueFilterValue["beginDate"] = new Date(beginDate.value);
    searchData(uniqueFilterValue);
    return;
  }
}

function endDate() {
  const endDate = document.getElementById("end-date");
  const beginDate = document.getElementById("begin-date");
  if (endDate.value == "" || undefined) {
    uniqueFilterValue["endDate"] = "";
    searchData(uniqueFilterValue);
    return;
  }
  if (uniqueFilterValue["endDate"] !== endDate.value) {
    uniqueFilterValue["endDate"] = new Date(endDate.value);
    searchData(uniqueFilterValue);
    return;
  }
}

function onStatusFilter() {
  const selecetedVal = document.getElementById("status-filter").value;
  if (selecetedVal == "any") {
    uniqueFilterValue["statusFilter"] = "";
    searchData(uniqueFilterValue);
    return;
  }
  if (uniqueFilterValue["statusFilter"] !== selecetedVal) {
    uniqueFilterValue["statusFilter"] = selecetedVal;
    searchData(uniqueFilterValue);
    console.log("uniqueFilter", uniqueFilterValue);
  }
}

function onClientFilter() {
  const selecetedVal = document.getElementById("client-filter").value;
  if (selecetedVal == "any") {
    uniqueFilterValue["clientFilter"] = "";
    searchData(uniqueFilterValue);
    return;
  }
  if (uniqueFilterValue["clientFilter"] !== selecetedVal) {
    uniqueFilterValue["clientFilter"] = selecetedVal;
    searchData(uniqueFilterValue);
  }
}

function sameDay(d1, d2) {
  return (
    d1.getFullYear() == d2.getFullYear() &&
    d1.getMonth() == d2.getMonth() &&
    d1.getDay() == d2.getDay()
  );
}
const table = document.getElementById("myTable");
const tr = table.getElementsByTagName("tr");

function searchData(uniqueFilterValue) {
  console.log("searchData", uniqueFilterValue);
  for (i = 0; i < tr.length; i++) {
    const rowStatus = tr[i]
      .getElementsByTagName("td")[7]
      .textContent.toUpperCase();
    const rowClient = tr[i]
      .getElementsByTagName("td")[2]
      .textContent.toUpperCase();
    const rowBeginDate = new Date(
      tr[i]
        .getElementsByTagName("td")[3]
        .textContent.split("/")
        .reverse()
        .join("-")
    );
    const rowEndDate = new Date(
      tr[i]
        .getElementsByTagName("td")[3]
        .textContent.split("/")
        .reverse()
        .join("-")
    );
    let isDisplay = true;

    if (
      uniqueFilterValue?.statusFilter?.toUpperCase() != "" &&
      rowStatus != uniqueFilterValue?.statusFilter?.toUpperCase()
    ) {
      isDisplay = false;
    }

    if (
      uniqueFilterValue?.clientFilter?.toUpperCase() != "" &&
      rowClient != uniqueFilterValue?.clientFilter?.toUpperCase()
    ) {
      isDisplay = false;
    }

    if (
      uniqueFilterValue?.beginDate != "" &&
      !sameDay(rowBeginDate, uniqueFilterValue?.beginDate)
    ) {
      isDisplay = false;
    }

    if (
      uniqueFilterValue?.endDate != "" &&
      !sameDay(rowEndDate, uniqueFilterValue?.endDate)
    ) {
      isDisplay = false;
    }

    if (isDisplay) {
      tr[i].style.display = "table-row";
    } else {
      tr[i].style.display = "none";
    }
  }
}
