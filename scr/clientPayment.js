let productName = document.querySelector(".productName");
let productPrice = document.querySelector(".productPrice");

// Lấy các collection trong Firebase Firstore

const collections = ["category_tour", "category_hotel", "category_resort"];

// Hàm hiển thị các thông tin của sản phẩm

function renderInfo () {

    // Kiểm tra và in ra id của sản phẩm

    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");
    console.log("Id của sản phẩm: ", productId);

    if (!productId) {
        alert("Không thể lấy id của sản phẩm? 😱");
        return;
    }

    // Biến found để xác định xem có tìm thấy di hay chưa

    let found = false;

    // Hiển thị ra

    collections.forEach((coll) => {

        db.collection(coll)
            .doc(productId)
            .get()
            .then((doc) => {

                // Nếu không phát hiện id của sản phẩm

                if (!doc.exists) {
                    return;
                }

                // Set Lại found là true (đã tìm thấy)

                found = true;

                const p = doc.data();

                productName.innerHTML = p.name || "";
                productPrice.innerHTML = p.price.toLocaleString("vi-VN") + " ₫" || "";


            })
            .finally(() => {
                if (!found && coll === collections[collections.length - 1]) {
                    alert("Không tìm thấy sản phẩm? 😱");
                }
            })

    })

}

window.addEventListener("DOMContentLoaded", renderInfo);