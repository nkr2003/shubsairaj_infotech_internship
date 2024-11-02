// Cart
function displayCartItems() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartTableBody = document.getElementById('cartItems');
    const totalPriceElement = document.getElementById('totalPrice');
    cartTableBody.innerHTML = ''; // Clear any previous items

    let totalPrice = 0;

    if (cartItems.length > 0) {
        cartItems.forEach((item, index) => {
            const itemRow = `
                <tr>
                    <td>${item.name}</td>
                    <td>₹${item.price}</td>
                    <td>
                        <div class="input-group">
                            <button class="btn btn-outline-secondary decrease-quantity" data-index="${index}">-</button>
                            <span class="form-control text-center" style="max-width: 50px;">${item.quantity}</span>
                            <button class="btn btn-outline-secondary increase-quantity" data-index="${index}">+</button>
                        </div>
                    </td>
                    <td class="total">₹${item.price * item.quantity}</td>
                    <td>
                        <button class="btn btn-danger remove-from-cart" data-index="${index}">Remove</button>
                    </td>
                </tr>
            `;
            cartTableBody.innerHTML += itemRow;
            totalPrice += item.price * item.quantity;
        });
    } else {
        cartTableBody.innerHTML = '<tr><td colspan="5">Your cart is empty.</td></tr>';
    }

    totalPriceElement.textContent = `Total: ₹${totalPrice}`;

    // Attach event listeners to quantity buttons and remove buttons
    attachCartListeners();
}

// Function to handle quantity change and removal
function attachCartListeners() {
    document.querySelectorAll('.increase-quantity').forEach(button => {
        button.addEventListener('click', function () {
            const index = this.dataset.index;
            let cartItems = JSON.parse(localStorage.getItem('cartItems'));
            cartItems[index].quantity += 1;
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            displayCartItems(); // Refresh cart display
        });
    });

    document.querySelectorAll('.decrease-quantity').forEach(button => {
        button.addEventListener('click', function () {
            const index = this.dataset.index;
            let cartItems = JSON.parse(localStorage.getItem('cartItems'));
            if (cartItems[index].quantity > 1) {
                cartItems[index].quantity -= 1;
                localStorage.setItem('cartItems', JSON.stringify(cartItems));
                displayCartItems(); // Refresh cart display
            }
        });
    });

    document.querySelectorAll('.remove-from-cart').forEach(button => {
        button.addEventListener('click', function () {
            const index = this.dataset.index;
            let cartItems = JSON.parse(localStorage.getItem('cartItems'));
            cartItems.splice(index, 1); // Remove the item from cart
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            displayCartItems(); // Refresh cart display
        });
    });
}

// Load cart items on page load
document.addEventListener('DOMContentLoaded', function () {
    displayCartItems();
});

// Checkout
function formatExpiryDate(input) {
    const value = input.value.replace(/\D/g, '');
    if (value.length >= 2) {
        input.value = value.slice(0, 2) + '/' + value.slice(2, 4);
    } else {
        input.value = value;
    }
}

function alphanum(input) {
    const value = input.value;
    const regex = /^[0-9]*$/;

    if (regex.test(value) || value === "") {
        input.value = value;
    } else {
        alert("Enter valid details (only numbers are allowed).");
        input.value = value.replace(/[^0-9]/g, '');
    }
}

function showPaymentSection() {
    document.getElementById('address-section').classList.remove('active');
    document.getElementById('payment-section').classList.add('active');
}

$(document).ready(function () {
    let selectedSize = null; // Store selected size
    let selectedColor = null; // Store selected color

    // Event listener for size buttons
    $(document).on("click", ".size-btn", function () {
        $(".size-btn").removeClass("selected-size"); // Remove highlight from previous size
        $(this).addClass("selected-size"); // Highlight the selected size
        selectedSize = $(this).data("size"); // Store the selected size
        alert("Size " + selectedSize + " selected.");
    });

    // Event listener for color buttons
    $(document).on("click", ".color-btn", function () {
        $(".color-btn").removeClass("selected-color"); // Remove highlight from previous color
        $(this).addClass("selected-color"); // Highlight the selected color
        selectedColor = $(this).data("color"); // Store the selected color
        alert("Color " + selectedColor + " selected.");
    });

    // Add to Cart functionality
    $(document).on('click', '.add-to-cart', function () {
        if (!selectedSize) {
            alert("Please select a size before adding to cart.");
            return;
        }
        // if (!selectedColor) {
        //     alert("Please select a color before adding to cart.");
        //     return;
        // }

        const productName = $(this).closest('.card-body').find('.card-title').text();
        const productPrice = $(this).closest('.card-body').find('.card-text').text().replace('₹', '').trim();

        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const existingItemIndex = cartItems.findIndex(item => item.name === productName && item.size === selectedSize && item.color === selectedColor);

        if (existingItemIndex > -1) {
            cartItems[existingItemIndex].quantity += 1;
        } else {
            cartItems.push({ name: productName, price: parseInt(productPrice), quantity: 1, size: selectedSize, color: selectedColor });
        }

        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        alert(`${productName} (Size: ${selectedSize}) added to cart!`);
    });

    // Add to Wishlist functionality
    $(document).on('click', '.add-to-wishlist', function () {
        if (!selectedSize) {
            alert("Please select a size before adding to wishlist.");
            return;
        }
        // if (!selectedColor) {
        //     alert("Please select a color before adding to wishlist.");
        //     return;
        // }

        const productName = $(this).closest('.card-body').find('.card-title').text();
        const productPrice = $(this).closest('.card-body').find('.card-text').text().replace('₹', '').trim();

        let wishlistItems = JSON.parse(localStorage.getItem('wishlistItems')) || [];
        const existingItemIndex = wishlistItems.findIndex(item => item.name === productName && item.size === selectedSize && item.color === selectedColor);

        if (existingItemIndex > -1) {
            alert(`${productName} (Size: ${selectedSize}) is already in your wishlist!`);
        } else {
            wishlistItems.push({ name: productName, price: parseInt(productPrice), size: selectedSize, color: selectedColor });
            localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
            alert(`${productName} (Size: ${selectedSize}) added to wishlist!`);
        }
    });
});
