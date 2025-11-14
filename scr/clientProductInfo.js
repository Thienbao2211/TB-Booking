// Get Elements

let productName = document.querySelector(".productName");
let productDescription = document.querySelector(".productDescription");
let productLongDescription = document.querySelector(".productLongDescription");
let productCategory = document.querySelector(".productCategory");
let productPrice = document.querySelector(".productPrice");
let productImage = document.querySelector(".productImage");

// Lấy các collection trong Firebase Firestore

const collections = ["category_tour", "category_hotel", "category_resort"];

// Hàm hiển thị các thông tin của sản phẩm ra

function renderInfo () {

    // Lấy value của thông tin sản phẩm

    // let name = productName.value;
    // let description = productDescription.value;
    // let longDescription = productLongDescription.value;
    // let category = productCategory.value;
    // let price = productPrice.value;
    // let image = productImage.src;

    // Kiểm tra và in ra id của sản phẩm

    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");
    console.log("ID của sản phẩm: ", productId);

    if (!productId) {
        alert("Không thể lấy id của sản phẩm? 😱");
        return;
    }

    // Biến found để xác định xem có tìm thấy id hay chưa

    let found = false;

    // Hiển thị ra

    collections.forEach(coll => {

        db.collection(coll)
            .doc(productId)
            .get()
            .then(doc => {

                // Nếu không phát hiện id của sản phẩm

                if (!doc.exists) {
                    return;
                }

                // Set lại found là true (đã tìm thấy)

                found = true;

                const p = doc.data();

                productName.value = p.name || "";
                productDescription.value = p.description || "";
                productLongDescription.value = p.longDescription || "";
                productCategory.value = p.category || "";
                productPrice.value = p.price || "";
                productImage.src = p.image || "";

            })
            .finally(() => {
                if (!found && coll === collections[collections.length - 1]) {
                    alert("Không tìm thấy sản phẩm? 😱");
                }
            })

    })

}

// Gọi hàm renderInfo để hiển thị sản phẩm ra

window.addEventListener("DOMContentLoaded", renderInfo);