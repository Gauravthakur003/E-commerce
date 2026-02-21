/* ================= NAVBAR SHADOW ================= */
const navbar = document.querySelector(".navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 20);
});

/* ================= USER PANEL ================= */
const hamburger = document.getElementById("hamburgerBtn");
const userPanel = document.getElementById("userPanel");
const closeBtn = document.getElementById("closeUserPanel");

hamburger.onclick = () => userPanel.classList.add("open");
closeBtn.onclick = () => userPanel.classList.remove("open");

/* ================= USER PANEL TABS ================= */
document.querySelectorAll(".user-menu button[data-tab]").forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll(".user-menu button").forEach(b => b.classList.remove("active"));
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));

    btn.classList.add("active");
    document.getElementById(btn.dataset.tab).classList.add("active");
  };
});

/* ================= AVATAR ================= */
const avatarInput = document.getElementById("avatarInput");
const avatarImg = document.getElementById("avatarImg");

avatarInput.onchange = () => {
  const file = avatarInput.files[0];
  if (!file) return;
  
  const reader = new FileReader();
  reader.onload = () => {
    avatarImg.src = reader.result;
    localStorage.setItem("avatar", reader.result);
  };
  reader.readAsDataURL(file);
};

if (localStorage.getItem("avatar")) {
  avatarImg.src = localStorage.getItem("avatar");
}

/* ================= USERNAME ================= */
const nameInput = document.getElementById("nameInput");
const displayName = document.getElementById("displayName");

nameInput.value = localStorage.getItem("username") || "";
displayName.textContent = nameInput.value || "Guest User";

nameInput.oninput = () => {
  localStorage.setItem("username", nameInput.value);
  displayName.textContent = nameInput.value || "Guest User";
};

/* ================= APPEARANCE ================= */
const themeSelect = document.getElementById("themeSelect");
const fontSize = document.getElementById("fontSize");

themeSelect.value = localStorage.getItem("theme") || "light";
fontSize.value = localStorage.getItem("fontSize") || "16px";

document.body.classList.toggle("dark", themeSelect.value === "dark");
document.documentElement.style.fontSize = fontSize.value;

themeSelect.onchange = () => {
  document.body.classList.toggle("dark", themeSelect.value === "dark");
  localStorage.setItem("theme", themeSelect.value);
};

fontSize.onchange = () => {
  document.documentElement.style.fontSize = fontSize.value;
  localStorage.setItem("fontSize", fontSize.value);
};

/* ================= LOGOUT ================= */
const logoutBtn = document.querySelector(".logout-btn");
if (logoutBtn) {
  logoutBtn.onclick = () => {
    localStorage.clear();
    location.reload();
  };
}

/* ================= TRENDING AUTO SCROLL ================= */
const trendingRow = document.getElementById("trendingRow");
if (trendingRow) {
  let scrollSpeed = 1;
  let scrollDirection = 1;

  function autoScroll() {
    trendingRow.scrollLeft += scrollSpeed * scrollDirection;

    if (trendingRow.scrollLeft + trendingRow.clientWidth >= trendingRow.scrollWidth) {
      scrollDirection = -1;
    } else if (trendingRow.scrollLeft <= 0) {
      scrollDirection = 1;
    }

    requestAnimationFrame(autoScroll);
  }

  autoScroll();

  // Pause on hover
  trendingRow.addEventListener("mouseenter", () => scrollSpeed = 0);
  trendingRow.addEventListener("mouseleave", () => scrollSpeed = 1);

  // Optional: Scroll buttons
  const btnLeft = document.querySelector(".scroll-btn.left");
  const btnRight = document.querySelector(".scroll-btn.right");

  if (btnLeft) btnLeft.onclick = () => trendingRow.scrollBy({ left: -300, behavior: "smooth" });
  if (btnRight) btnRight.onclick = () => trendingRow.scrollBy({ left: 300, behavior: "smooth" });
}


const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);
      window.location.href = "index.html";
    } else {
      alert(data.message);
    }
  });
}


const productList = document.getElementById("productList");

async function loadProducts(category) {
  if (!productList) return;

  const res = await fetch(
    `http://localhost:5000/api/products?category=${category}`
  );
  const products = await res.json();

  productList.innerHTML = products.map(p => `
    <div class="product-card">
      <img src="${p.image}">
      <h4>${p.title}</h4>
      <p>$${p.price}</p>
      <button onclick="addToCart('${p._id}')">Add</button>
    </div>
  `).join("");
}

if (window.location.pathname.includes("mens.html")) {
  loadProducts("men");
}
if (window.location.pathname.includes("womens.html")) {
  loadProducts("women");
}
if (window.location.pathname.includes("kids.html")) {
  loadProducts("kids");
}
if (window.location.pathname.includes("accesories.html")) {
  loadProducts("accessories");
}


async function addToCart(productId) {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Login first");
    return;
  }

  await fetch("http://localhost:5000/api/cart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ productId })
  });

  alert("Added to cart");
}

document.getElementById("checkoutBtn")?.addEventListener("click", async () => {
  const token = localStorage.getItem("token");

  const res = await fetch("http://localhost:5000/api/orders", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (res.ok) {
    window.location.href = "success.html";
  }
});
