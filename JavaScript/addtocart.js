document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.Img_card');
            const productName = productCard.querySelector('.Product_Name').textContent.trim();
            const productPrice = parseFloat(productCard.querySelector('.Product_Price').textContent.trim()); // Ensure this is the right selector and converting to number
            const productImage = productCard.querySelector('.Product_Image').src;

            addToCart({ productName, productPrice, productImage });
        });
    });

    displayCartItems();
});

function addToCart(newProduct) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProductIndex = cart.findIndex(item => item.productName === newProduct.productName);
    
    if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity++;
    } else {
        newProduct.quantity = 1; // Initialize quantity
        cart.push(newProduct);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${newProduct.productName} added to cart!`);
    displayCartItems(); // Refresh the cart display
}

function changeQuantity(productName, increment = true) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const productIndex = cart.findIndex(item => item.productName === productName);

    if (productIndex !== -1) {
        if (increment) {
            cart[productIndex].quantity++;
        } else {
            cart[productIndex].quantity--;
            if (cart[productIndex].quantity < 1) {
                cart.splice(productIndex, 1); // Remove item if quantity is 0
            }
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCartItems(); // Refresh the cart display
    }
}

function displayCartItems() {
    const cartItemsContainer = document.getElementById('cart_items');
    cartItemsContainer.innerHTML = ''; // Clear the container before displaying updated cart
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let grandTotal = 0;
    
    cart.forEach(item => {
        const totalItemPrice = (item.productPrice * item.quantity).toFixed(2);
        grandTotal += parseFloat(totalItemPrice);
        const itemHTML = `
        <div class="cart-item" data-product-name="${item.productName}" style="border: 1px solid #ddd; border-radius: 8px; padding: 20px; display: flex; flex-wrap: wrap; align-items: center; gap: 20px; background-color: #f9f9f9; margin-bottom: 20px; color: #333;">
        <img src="${item.productImage}" alt="${item.productName}" style="flex: 1 1 150px; max-width: 150px; height: auto; object-fit: cover; border-radius: 8px;">
        <div style="flex: 3 1 200px; display: flex; flex-direction: column; justify-content: space-between; padding: 0 15px;">
            <h2 style="margin: 0 0 10px 0; font-size: 1.5em; font-weight: bold; color: #0056b3;">${item.productName}</h2>
            <p style="margin: 0; font-size: 1em; color: #4CAF50;">Price: <strong>$${item.productPrice}</strong></p>
            <p style="margin: 10px 0; font-size: 1em;">Quantity: <strong>${item.quantity}</strong></p>
            <p style="margin: 0; font-size: 1em; color: #f44336;"><strong>Total: $${totalItemPrice}</strong></p>
        </div>
        <div style="flex: 1 1 100px; display: flex; justify-content: space-between; align-items: center;">
            <button class="increase-qty-btn" style="width: 35px; height: 35px; background-color: #4CAF50; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 1.2em;">+</button>
            <button class="decrease-qty-btn" style="width: 35px; height: 35px; background-color: #f44336; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 1.2em;">-</button>
            <button class="delete-item-btn" style="background-color: #555; color: white; border: none; padding: 6px 10px; border-radius: 5px; cursor: pointer; font-size: 0.9em;">Delete</button>
        </div>
    </div>
        `;
        cartItemsContainer.innerHTML += itemHTML;
    });

    // Display grand total
    const grandTotalHTML = `<p style="margin: 20px 0; font-size: 1.2em; color: #d32f2f; font-weight: bold; text-align: right;">Grand Total: $${grandTotal.toFixed(2)}</p>    `;
    cartItemsContainer.innerHTML += grandTotalHTML;

    attachEventListeners();
}

function attachEventListeners() {
    document.querySelectorAll('.delete-item-btn').forEach(button => {
        button.addEventListener('click', function() {
            const productName = this.closest('.cart-item').getAttribute('data-product-name');
            changeQuantity(productName, false); // Assuming delete decreases quantity
        });
    });

    document.querySelectorAll('.increase-qty-btn').forEach(button => {
        button.addEventListener('click', function() {
            const productName = this.closest('.cart-item').getAttribute('data-product-name');
            changeQuantity(productName, true);
        });
    });

    document.querySelectorAll('.decrease-qty-btn').forEach(button => {
        button.addEventListener('click', function() {
            const productName = this.closest('.cart-item').getAttribute('data-product-name');
            changeQuantity(productName, false);
        });
    });
    
    RemoveItemsLocal = () =>{
        localStorage.removeItem('cart')
        alert(` Your are items are places `);
        location.reload()
        console.log('Don');
    }

    
    
}


