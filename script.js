const productNameInput = document.getElementById("product-name");
const productPriceInput = document.getElementById("product-price");
const addProductButton = document.getElementById("add-product");
const cart = document.getElementById("cart");
const totalPriceSpan = document.getElementById("total-price");

let totalPrice = 0;

// Function to update the total price
function updateTotalPrice(amount) {
	totalPrice += amount;
	totalPriceSpan.textContent = totalPrice.toFixed(2);
}

// Function to remove an item
function removeItem(event) {
	const item = event.target.closest("li");
	const price = parseFloat(item.dataset.price);
	updateTotalPrice(-price);
	item.remove();
}

// Recalculate Total from all cart Items
function recalcTotalFromCart() {
	let sum = 0;
	const items = cart.querySelectorAll(".cart-item");
	items.forEach((item) => {
		const price = parseFloat(item.dataset.price) || 0;
		const qty = parseInt(item.dataset.quantity, 10) || 1;
		sum += price * qty;
	});
	totalPrice = sum;
    totalPriceSpan.textContent = totalPrice.toFixed(2);
}

// Create a cart item
function createCartItem(name, price, quantity = 1) {
	const li = document.createElement("li");
	li.className = "cart-item";
	// store data for price and quantity
	li.dataset.price = price.toFixed(2);
	// keep consistent
	li.dataset.quantity = quantity;

	// Product name
	const nameSpan = document.createElement("span");
	nameSpan.textContent = name;

	const qtyWrap = document.createElement("div");
	qtyWrap.className = "quantity-controls";

	const decreaseBtn = document.createElement("button");
	decreaseBtn.textContent = "−";
	decreaseBtn.setAttribute("aria-label", "Decrease quantity");

	const qtyDisplay = document.createElement("span");
	qtyDisplay.textContent = quantity;
	qtyDisplay.style.minWidth = "30px";
	qtyDisplay.style.textAlign = "center";

	const increaseBtn = document.createElement("button");
	increaseBtn.textContent = "+";
	increaseBtn.setAttribute("aria-label", "Increase quantity");

	qtyWrap.appendChild(decreaseBtn);
	qtyWrap.appendChild(qtyDisplay);
	qtyWrap.appendChild(increaseBtn);

	// Item total price  (price * qty)
	const itemPriceSpan = document.createElement("span");
	itemPriceSpan.className = "item-price";
	const updateItemPriceDisplay = () => {
		const q = parseInt(li.dataset.quantity, 10);
		const p = parseFloat(li.dataset.price);
		itemPriceSpan.textContent = `$${(p * q).toFixed(2)}`;
	};
	updateItemPriceDisplay();

	// Remove button
	const removeBtn = document.createElement("button");
	removeBtn.textContent = "Remove";
	removeBtn.className = "remove-btn";
	removeBtn.setAttribute("aria-label", "Remove item");

	// Assemble item
	li.appendChild(nameSpan);
	li.appendChild(qtyWrap);
	li.appendChild(itemPriceSpan);
	li.appendChild(removeBtn);

	// Increase quantity
	increaseBtn.addEventListener("click", (e) => {
		e.stopPropagation();
		let qty = parseInt(li.dataset.quantity, 10);
		qty += 1;
		li.dataset.quantity = qty;
		qtyDisplay.textContent = qty;
		updateItemPriceDisplay();
		recalcTotalFromCart();
	});

	// Decrease quantity (min 1)
	decreaseBtn.addEventListener("click", (e) => {
		e.stopPropagation();
		let qty = parseInt(li.dataset.quantity, 10);
		if (qty > 1) {
			qty -= 1;
			li.dataset.quantity = qty;
			qtyDisplay.textContent = qty;
			updateItemPriceDisplay();
			recalcTotalFromCart();
		}
		// if qty === 1, we do nothing (user can remove if they want)
	});

	// Remove item
	removeBtn.addEventListener("click", (e) => {
		e.stopPropagation();
		li.remove();
		recalcTotalFromCart(); // total recalculated from remaining items
	});

	return li;
}

function handleAddProduct() {
	const name = productNameInput.value.trim();
	const priceRaw = productPriceInput.value.trim();

	if (name === "") {
		alert("Please enter a product name.");
		productNameInput.focus();
		return;
	}
	if (priceRaw === "") {
		alert("Please enter a product price.");
		productPriceInput.focus();
		return;
	}
	const price = parseFloat(priceRaw);
	if (isNaN(price) || price <= 0) {
		alert("Please enter a valid price greater than 0.");
		productPriceInput.value = "";
		productPriceInput.focus();
		return;
	}

const newItem = createCartItem(name, price, 1);
cart.appendChild(newItem);

recalcTotalFromCart();

productNameInput.value = "";
productPriceInput.value = "";
productNameInput.focus();
}

addProductButton.addEventListener("click", handleAddProduct);

productPriceInput.addEventListener("keypress", (e) => {
	if (e.key === "Enter") {
		e.preventDefault();
		handleAddProduct();
	}
});
productNameInput.addEventListener("keypress", (e) => {
	if (e.key === "Enter") {
		e.preventDefault();
		// Move focus to price field if name is filled
		if (productNameInput.value.trim() !== "") {
			productPriceInput.focus();
		} else {
			handleAddProduct();
		}
	}
});

recalcTotalFromCart();