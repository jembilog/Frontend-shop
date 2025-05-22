// Products data
const products = [
  { id: 1, name: "Leather Bag", category: "bags", price: 89.99, image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=400&q=80" },
  { id: 2, name: "Running Shoes", category: "shoes", price: 59.99, image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80" },
  { id: 3, name: "Classic Watch", category: "watches", price: 120.00, image: "https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?auto=format&fit=crop&w=400&q=80" },
  { id: 4, name: "Sunglasses", category: "accessories", price: 30.50, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80" },
  { id: 5, name: "Backpack", category: "bags", price: 45.00, image: "https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=400&q=80" },
  { id: 6, name: "Hiking Boots", category: "shoes", price: 89.00, image: "https://images.unsplash.com/photo-1504215680853-026ed2a45def?auto=format&fit=crop&w=400&q=80" },
  { id: 7, name: "Fitness Watch", category: "watches", price: 150.00, image: "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=400&q=80" },
  { id: 8, name: "Wallet", category: "accessories", price: 25.75, image: "https://images.unsplash.com/photo-1514826786317-59744a2132b9?auto=format&fit=crop&w=400&q=80" },
];

// DOM Elements
const productList = document.getElementById("product-list");
const categories = document.querySelectorAll(".category");
const searchInput = document.getElementById("search");
const darkToggle = document.getElementById("darkToggle");

const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");
const loginModal = document.getElementById("loginModal");
const signupModal = document.getElementById("signupModal");
const loginClose = document.getElementById("loginClose");
const signupClose = document.getElementById("signupClose");

const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

// Current state
let currentCategory = "all";

// Render products function
function renderProducts() {
  const searchTerm = searchInput.value.toLowerCase();
  productList.innerHTML = "";

  const filteredProducts = products.filter(p => {
    return (currentCategory === "all" || p.category === currentCategory) &&
           (p.name.toLowerCase().includes(searchTerm));
  });

  if(filteredProducts.length === 0) {
    productList.innerHTML = `<p style="text-align:center; grid-column: 1/-1;">No products found.</p>`;
    return;
  }

  filteredProducts.forEach(p => {
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}" />
      <div class="product-info">
        <h3>${p.name}</h3>
        <p>$${p.price.toFixed(2)}</p>
        <button class="buy-btn" data-id="${p.id}">Buy</button>
      </div>
    `;
    productList.appendChild(card);
  });

  // Add buy button listeners
  document.querySelectorAll(".buy-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const id = +e.target.dataset.id;
      const product = products.find(p => p.id === id);
      alert(`You bought: ${product.name} for $${product.price.toFixed(2)}!`);
    });
  });
}

// Category click handler
categories.forEach(cat => {
  cat.addEventListener("click", () => {
    categories.forEach(c => c.classList.remove("active"));
    cat.classList.add("active");
    currentCategory = cat.dataset.category;
    renderProducts();
  });
});

// Search input handler
searchInput.addEventListener("input", () => {
  renderProducts();
});

// Dark mode toggle
darkToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  // Toggle icon 🌙 / ☀️
  if(document.body.classList.contains("dark")) {
    darkToggle.textContent = "☀️";
  } else {
    darkToggle.textContent = "🌙";
  }
});

// Modal open/close handlers
loginBtn.addEventListener("click", () => {
  loginModal.style.display = "block";
});
signupBtn.addEventListener("click", () => {
  signupModal.style.display = "block";
});
loginClose.addEventListener("click", () => {
  loginModal.style.display = "none";
});
signupClose.addEventListener("click", () => {
  signupModal.style.display = "none";
});

// Close modals if clicking outside modal-content
window.addEventListener("click", (e) => {
  if(e.target === loginModal) loginModal.style.display = "none";
  if(e.target === signupModal) signupModal.style.display = "none";
});

// Simple localStorage user DB
function getUsers() {
  return JSON.parse(localStorage.getItem("users") || "[]");
}
function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

// Signup form submit
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = signupForm.signupEmail.value.trim();
  const password = signupForm.signupPassword.value;

  const users = getUsers();
  if(users.some(u => u.email === email)) {
    alert("Email already registered. Please login.");
    return;
  }
  users.push({ email, password });
  saveUsers(users);
  alert("Signup successful! You can now login.");
  signupModal.style.display = "none";
  signupForm.reset();
});

// Login form submit
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = loginForm.loginEmail.value.trim();
  const password = loginForm.loginPassword.value;

  const users = getUsers();
  const user = users.find(u => u.email === email && u.password === password);
  if(user) {
    alert(`Welcome back, ${email}!`);
    loginModal.style.display = "none";
    loginForm.reset();
  } else {
    alert("Invalid email or password.");
  }
});

// Initial render
renderProducts();
