document.addEventListener("DOMContentLoaded", () => {
    const currentUser = localStorage.getItem("currentUser");
    const cartItemsEl = document.getElementById("cart-items");
    const subtotalEl = document.getElementById("subtotal");
    const itemCountEl = document.getElementById("item-count");
    const checkoutBtn = document.getElementById("checkout-btn");
    if (!currentUser) {
        cartItemsEl.innerHTML = "<p>Please <a href='loginpage.html'>log in</a> to view your cart.</p>";
        return;
    }
    const cart = getCart();
    const userCart = cart.filter(item => item.addedBy === currentUser);
    if (userCart.length === 0) {
        cartItemsEl.innerHTML = "<p>Your cart is empty.</p>";
        return;
    }
    userCart.forEach(item => {
        const itemEl = document.createElement("div");
        itemEl.className = "cart-item";
        itemEl.dataset.cartId = item.cartId; // Store cartId for updates
        itemEl.innerHTML = `
      <img src="${item.image}" alt="${item.name}" width="100">
      <div class="item-details">
        <h3>${item.name}</h3>
        ${item.variant ? `<p>${item.variant}</p>` : ''}
        <p>Price: $${item.price.toFixed(2)}</p>
      </div>
      <div class="quantity-control">
        <button type="button" class="qty-btn" onclick="changeCartQuantity('${item.cartId}', -1)">−</button>
        <input type="text" value="${item.quantity}" min="0" max="10" readonly class="cart-qty-input">
        <button type="button" class="qty-btn" onclick="changeCartQuantity('${item.cartId}', 1)">+</button>
      </div>
      <div class="item-total">
        <strong>$${(item.price * item.quantity).toFixed(2)}</strong>
      </div>
    `;
        cartItemsEl.appendChild(itemEl);
    });
    updateCartTotals();
    checkoutBtn.style.display = "block";
});
function changeCartQuantity(cartId, delta) {
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) return;
    const cart = getCart();
    const item = cart.find(i => i.cartId == cartId && i.addedBy === currentUser);
    if (!item) return;
    const newQty = item.quantity + delta;
    if (newQty < 0) return;
    if (newQty > 10) {
        alert("You can only have up to 10 of this item.");
        return;
    }
    if (newQty === 0) {
        const idx = cart.indexOf(item);
        cart.splice(idx, 1);
    } else {
        // Update quantity
        item.quantity = newQty;
    }
    saveCart(cart);
    location.reload(); // Simple way to reflect changes
}
function updateCartTotals() {
    const currentUser = localStorage.getItem("currentUser");
    const cart = getCart();
    const userCart = cart.filter(i => i.addedBy === currentUser);
    const subtotal = userCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalCount = userCart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById("subtotal").textContent = subtotal.toFixed(2);
    document.getElementById("item-count").textContent = totalCount;
}
document.getElementById("checkout-btn")?.addEventListener("click", function () {
    if (confirm("Are you sure you want to complete your purchase?")) {
        const currentUser = localStorage.getItem("currentUser");
        const cart = getCart();
        const updatedCart = cart.filter(item => item.addedBy !== currentUser);
        saveCart(updatedCart);
        alert("Thank you for your order! Your items will be shipped soon.");
        updateCartCount(); // Update header
        location.href = "index.html";
    }
});