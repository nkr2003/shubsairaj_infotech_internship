// Login Form
function f1() {
    let temp = $("#email");
    let temp1 = $("#password");
    let messageBox = $("#messageBox");
    let regEx = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    let regEx1 = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()])(?=\S+$).{8,20}$/;

    // Clear previous messages
    messageBox.hide();

    if (temp.val().length == "") {
        messageBox.text("Email should not be empty").show();
        return false;
    }
    if (!regEx.test(temp.val())) {
        messageBox.text("Enter a valid email address").show();
        return false;
    }
    if (temp1.val() == "") {
        messageBox.text("Password must not be empty").show();
        return false;
    }
    if (!regEx1.test(temp1.val())) {
        messageBox.text("Password must contain an uppercase, lowercase, numeric, special character, and be 8-20 characters long").show();
        return false;
    } else {
        messageBox.hide();
        window.location.href = "index.html";
        return true;
    }
}

// $(document).ready(function () {
//     $("#qw5").click(function () {
//         if (f1()) {
//             window.location.href = "index.html";
//         }
//     });
// });


// Cart
        // Function to display cart items
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

// Add to Cart and Wishlist functionality
$(document).ready(function () {
    // Add to Cart
    $(document).on('click', '.add-to-cart', function () {
        const productName = $(this).closest('.card-body').find('.card-title').text();
        const productPrice = $(this).closest('.card-body').find('.card-text').text().replace('₹', '').trim();

        // Retrieve cart items or initialize as an empty array
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

        // Check if item already exists
        const existingItemIndex = cartItems.findIndex(item => item.name === productName);

        if (existingItemIndex > -1) {
            // Increment quantity if item exists
            cartItems[existingItemIndex].quantity += 1;
        } else {
            // Add new item to cart
            cartItems.push({ name: productName, price: parseInt(productPrice), quantity: 1 });
        }

        // Store updated cart in localStorage
        localStorage.setItem('cartItems', JSON.stringify(cartItems));

        alert(`${productName} added to cart!`);
    });

    // Add to Wishlist functionality
    $(document).on('click', '.add-to-wishlist', function () {
        const productName = $(this).closest('.card-body').find('.card-title').text();
        const productPrice = $(this).closest('.card-body').find('.card-text').text().replace('₹', '').trim();

        // Retrieve wishlist items from localStorage or initialize as empty array
        let wishlistItems = JSON.parse(localStorage.getItem('wishlistItems')) || [];

        // Check if item already exists in wishlist
        const existingItemIndex = wishlistItems.findIndex(item => item.name === productName);

        if (existingItemIndex > -1) {
            alert(`${productName} is already in your wishlist!`);
        } else {
            // Otherwise, add new item to wishlist
            wishlistItems.push({ name: productName, price: parseInt(productPrice) });
            localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
            alert(`${productName} added to wishlist!`);
        }
    });
});
