// Get Elements

let productName = document.querySelector(".productName");
let productCategory = document.querySelector(".productCategory");
let productPrice = document.querySelector(".productPrice");
let productImage = document.querySelector(".productImage");
let submitBtn = document.querySelector(".submitFormBtn");

// When Click Submit Button

submitBtn.addEventListener('click', (e) => {

    // Tránh trường hợp load lại trang (mất hết thông tin người dùng nhập vào)

    e.preventDefault();

    // Lấy value của các ô input

    let name = productName.value;
    let category = productCategory.value;
    let price = productPrice.value;
    let image = productImage.src;

    // Validation các ô input

    if (!name || !category || !price || !image) {
        alert("Vui lòng nhập đầy đủ thông tin để thêm sản phẩm !!! 😊");
        return;
    }

    // Khi nhấn vào nút chọn hình ảnh

    imageInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageURL = URL.createObjectURL(file);
            preview.src = imageURL;
            preview.style.display = 'block';
            console.log("Đường dẫn tạm thời:", imageURL); // link ảnh tạm
        }
    });

    // 

})