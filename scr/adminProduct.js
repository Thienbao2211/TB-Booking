// Get Elements

let productName = document.querySelector(".productName");
let productCategory = document.querySelector(".productCategory");
let productPrice = document.querySelector(".productPrice");
let imageInput = document.querySelector(".imageInput");
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

    if (!name || !price) {
        alert("Vui lòng nhập đầy đủ thông tin để thêm sản phẩm !!! 😊");
        return;
    }

    // Khi nhấn vào nút chọn hình ảnh

    // imageInput.addEventListener('change', () => {
    //     const file = this.files[0];
    //     if (file) {
    //         const imageURL = URL.createObjectURL(file);
    //         productImage.src = imageURL;
    //         productImage.style.display = 'block';
    //         console.log("Đường dẫn tạm thời:", imageURL); // link ảnh tạm
    //     } else {
    //         productImage.style.display = 'none';
    //     }
    // });

    // Lưu thông tin của sản phẩm

    

})