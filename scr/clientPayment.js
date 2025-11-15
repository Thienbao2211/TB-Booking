let productName = document.querySelector(".productName");
let productPrice = document.querySelector(".productPrice");

// Lấy các collection trong Firebase Firstore

const collections = ["category_tour", "category_hotel", "category_resort"];

// Hàm hiển thị các thông tin của sản phẩm

function renderInfo () {

    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");
    console.log("Id của sản phẩm: ", productId);

}

window.addEventListener("DOMContentLoaded", renderInfo);