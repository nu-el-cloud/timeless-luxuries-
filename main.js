document.addEventListener("DOMContentLoaded", () => {
    const productList = document.getElementById("product-list");
    if (!productList || typeof products === 'undefined') return;
    const subtotalSection = document.createElement("div");
    subtotalSection.innerHTML = `
    <div class="subtotal-bar">
      <strong>Subtotal: $<span id="live-subtotal">0.00</span></strong>
    </div>
  `;
    productList.parentNode.insertBefore(subtotalSection, productList.nextSibling);
    products.forEach(p => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
      <img src="${p.image}" alt="${p.name} ${p.variant || ''}" />
      <div class="product-info">
        <h3>${p.name}</h3>
        ${p.variant ? `<p class="variant">${p.variant}</p>` : ''}
        <p class="price">$${p.price.toFixed(2)}</p>
        <div class="quantity-control">
          <button type="button" class="qty-btn" onclick="changeQuantity(${p.id}, -1)">−</button>
          <input type="text" id="qty-${p.id}" value="0" readonly>
          <button type="button" class="qty-btn" onclick="changeQuantity(${p.id}, 1)">+</button>
        </div>
        <button type="button" class="add-to-cart-btn" onclick="updateCart(${p.id})">
          Add to Cart
        </button>
      </div>
    `;
        productList.appendChild(card);
    });
    loadCartQuantities();
    updateLiveSubtotal(); // Show initial subtotal
});