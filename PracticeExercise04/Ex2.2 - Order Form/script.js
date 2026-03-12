document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById('order-form');
    const formSection = document.getElementById('form-section');
    const confirmDiv = document.getElementById('confirm-div');
    const successMsg = document.getElementById('success-msg');

    const prices = { "laptop": 150000000, "phone": 100000000, "tablet": 36000000 };

    function showError(id, message) {
        document.getElementById(id).textContent = message;
    }

    function clearError(id) {
        document.getElementById(id).textContent = "";
    }
    function validateProduct() {
        const val = document.getElementById('product').value;
        if (!val) {
            showError('err-product', "Please select a product.");
            return false;
        }
        clearError('err-product');
        return true;
    }

    function validateQuantity() {
        const val = document.getElementById('quantity').value;
        const num = parseInt(val);
        if (isNaN(num) || num < 1 || num > 99) {
            showError('err-quantity', "Quantity must be an integer between 1 and 99.");
            return false;
        }
        clearError('err-quantity');
        return true;
    }
    function validateDate() {
        const val = document.getElementById('deliveryDate').value;
        if (!val) {
            showError('err-date', "Delivery date is required.");
            return false;
        }
        const selected = new Date(val).setHours(0, 0, 0, 0);
        const today = new Date().setHours(0, 0, 0, 0);
        const maxDate = today+(30*24*60*60*1000);

        if (selected < today) {
            showError('err-date', "Date cannot be in the past.");
            return false;
        }
        if (selected > maxDate) {
            showError('err-date', "Date cannot be more than 30 days from today.");
            return false;
        }
        clearError('err-date');
        return true;
    }



    function validateAddress() {
        const val = document.getElementById('address').value.trim();
        if (val.length < 10) {
            showError('err-address', "Address must be at least 10 characters.");
            return false;
        }
        clearError('err-address');
        return true;
    }
    function validateNote() {
        const val = document.getElementById('note').value;
        if (val.length > 200) {
            showError('err-note', "Note cannot exceed 200 characters.");
            return false;
        }
        clearError('err-note');
        return true;
    }

    function validatePayment() {
        const checked = document.querySelector('input[name="paymentMethod"]:checked');
        if (!checked) {
            showError('err-payment', "Please select a payment method.");
            return false;
        }
        clearError('err-payment');
        return true;
    }


    function updateTotal() {
        const product = document.getElementById('product').value;
        const qty = parseInt(document.getElementById('quantity').value) || 0;
        const total = (prices[product] || 0) * qty;

        let display = document.getElementById('total-area');
        if (!display) {
            display = document.createElement('div');
            display.id = 'total-area';
            display.className = 'form-group';
            document.getElementById('quantity').parentElement.after(display);
        }
        display.innerHTML = `<strong>Total: <span>${total.toLocaleString("vi-VN")} VNĐ</span></strong>`;
        return total;
    }

    document.getElementById('product').addEventListener('change', () => { validateProduct(); updateTotal(); });
    document.getElementById('quantity').addEventListener('input', () => { validateQuantity(); updateTotal(); });
    document.getElementById('deliveryDate').addEventListener('blur', validateDate);
    document.getElementById('address').addEventListener('blur', validateAddress);

    ['product', 'quantity', 'deliveryDate', 'address'].forEach(id => {
        const errId = id === 'deliveryDate' ? 'err-date' : `err-${id}`;
        document.getElementById(id).addEventListener('input', () => clearError(errId));
    });

    document.getElementById('note').addEventListener('input', function () {
        const len = this.value.length;
        const counter = document.getElementById('char-count');
        counter.textContent = `(${len}/200)`;
        if (len > 200) {
            counter.classList.add('text-red');
            validateNote();
        } else {
            counter.classList.remove('text-red');
            clearError('err-note');
        }
    });

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const isValid = validateProduct() &
            validateQuantity() &
            validateDate() &
            validateAddress() &
            validateNote() &
            validatePayment();

        if (isValid) {
            const product = document.getElementById('product');
            const summary = `
                <p><b>Product:</b> ${product.options[product.selectedIndex].text}</p>
                <p><b>Quantity:</b> ${document.getElementById('quantity').value}</p>
                <p><b>Total Price:</b> <span>${updateTotal().toLocaleString("vi-VN")} VNĐ</span></p>
                <p><b>Delivery Date:</b> ${document.getElementById('deliveryDate').value}</p>
                <p><b>Address:</b> ${document.getElementById('address').value}</p>
                <p><b>Payment Method:</b> ${document.querySelector('input[name="paymentMethod"]:checked').value}</p>
                <p><b>Note:</b> ${document.getElementById('note').value || "N/A"}</p>
            `;
            document.getElementById('summary-info').innerHTML = summary;
            confirmDiv.style.display = "block";
            formSection.style.display = "none";
        }
    });

    document.getElementById('btn-cancel').addEventListener('click', () => {
        confirmDiv.style.display = "none";
        formSection.style.display = "block";
    });

    document.getElementById('btn-confirm').addEventListener('click', () => {
        confirmDiv.style.display = "none";
        successMsg.style.display = "block";
    });
});