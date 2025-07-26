<!-- 2916121 -->
function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}
function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}
function changeQuantity(productId, delta) {
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) return;
    const input = document.getElementById(`qty-${productId}`);
    let qty = parseInt(input.value) || 0;
    const newQty = qty + delta;
    if (newQty < 0) return;
    if (newQty > 10) {
        alert("Max 10 items allowed.");
        return;
    }
    input.value = newQty;
    updateLiveSubtotal(); // ✅ Update subtotal instantly
}
function updateLiveSubtotal() {
    let total = 0;
    products.forEach(p => {
        const input = document.getElementById(`qty-${p.id}`);
        const qty = parseInt(input.value) || 0;
        total += qty * p.price;
    });
    const subtotalEl = document.getElementById("live-subtotal");
    if (subtotalEl) {
        subtotalEl.textContent = total.toFixed(2);
    }
    updateCartCount();
}
function updateCart(productId) {
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
        alert("Please log in to add items to your cart.");
        window.location.href = "loginpage.html";
        return;
    }
    const product = products.find(p => p.id === productId);
    const input = document.getElementById(`qty-${productId}`);
    const quantity = parseInt(input.value) || 0;
    if (quantity === 0) {
        alert("Please select a quantity first.");
        return;
    }
    const cart = getCart();
    const existingItem = cart.find(i => i.id === productId && i.addedBy === currentUser);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            ...product,
            quantity: quantity,
            addedBy: currentUser,
            cartId: Date.now() + Math.random()
        });
    }
    saveCart(cart);
    updateCartCount();
    input.value = 0;
    updateLiveSubtotal();
    showCartPopup(product, quantity, cart);
}
function loadCartQuantities() {
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) return;
    const cart = getCart();
    products.forEach(p => {
        const input = document.getElementById(`qty-${p.id}`);
        if (input) {
            const item = cart.find(i => i.id === p.id && i.addedBy === currentUser);
            input.value = item ? item.quantity : 0;
        }
    });
}
function updateCartCount() {
    const currentUser = localStorage.getItem("currentUser");
    const cart = getCart();
    const userCart = currentUser ? cart.filter(i => i.addedBy === currentUser) : [];
    const totalCount = userCart.reduce((sum, item) => sum + item.quantity, 0);
    const countEl = document.getElementById("cart-count");
    if (countEl) {
        countEl.textContent = totalCount > 0 ? `(${totalCount}) 🛒` : "🛒";
    }
}