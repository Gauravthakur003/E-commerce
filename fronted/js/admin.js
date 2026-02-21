// SALES TREND
new Chart(document.getElementById("salesChart"), {
  type: "line",
  data: {
    labels: ["Jan","Feb","Mar","Apr","May","Jun"],
    datasets: [{
      label: "Revenue",
      data: [120000, 180000, 260000, 300000, 420000, 580000],
      borderWidth: 3,
      tension: 0.4
    }]
  }
});

// CATEGORY PERFORMANCE
new Chart(document.getElementById("categoryChart"), {
  type: "doughnut",
  data: {
    labels: ["Men", "Women", "Kids", "Accessories"],
    datasets: [{
      data: [40, 30, 15, 15]
    }]
  }
});


const token = localStorage.getItem("token");

fetch("http://localhost:5000/api/admin/products", {
  headers: {
    Authorization: `Bearer ${token}`
  }
})
  .then(res => res.json())
  .then(data => console.log(data));
