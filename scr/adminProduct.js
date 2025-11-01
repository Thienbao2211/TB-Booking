// Get Elements

// let overlay = document.querySelector("#overlay");
let productName = document.querySelector(".productName");
let productCategory = document.querySelector(".productCategory");
let productPrice = document.querySelector(".productPrice");
let imageInput = document.querySelector(".imageInput");
let productImage = document.querySelector(".productImage");
let submitBtn = document.querySelector(".submitFormBtn");
let productList = document.querySelector(".productList");

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

    if (!name || !price || !category) {
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

        // Thông tin đăng ký sản phẩm

    let productData =  {
        name,
        category,
        price,
        image,
    }

    console.log("[" + category + "]");

        // Thêm thông tin sản phẩm vào Firebase Firestore

            // Nếu category đó là tour

    if (category.trim().toLowerCase() == "tour du lịch") {
        db.collection("category_tour").add(productData)
            .then((docRef) => {
                alert("Thêm thông tin tour du lịch thành công! 👍");
                overlay.style.display = 'none';
                console.log("Đang ghi vào Firestore với dữ liệu:", productData);
                console.log("Tên collection:", "category_hotel");
            })
            .catch((error) => {
                alert("Đăng ký sản phẩm thất bại! 🤷‍♂️");
                console.error("Lỗi khi thêm sản phẩm: ", error);
            })
    } else if (category.trim().toLowerCase() == "khách sạn") {
        db.collection("category_hotel").add(productData)
            .then((docRef) => {
                alert("Thêm thông tin khách sạn thành công! 👍");
                overlay.style.display = 'none';
                console.log("Đang ghi vào Firestore với dữ liệu:", productData);
                console.log("Tên collection:", "category_hotel");
            })
            .catch((error) => {
                alert("Đăng ký khách sạn thất bại! 🤷‍♂️");
                console.error("Lỗi khi thêm sản phẩm: ", error);
            })
    } else if (category.trim().toLowerCase() == "nghỉ dưỡng") {
        db.collection("category_resort").add(productData)
            .then((docRef) => {
                alert("Thêm thông tin nghỉ dưỡng thành công! 👍");
                overlay.style.display = 'none';
                console.log("Đang ghi vào Firestore với dữ liệu:", productData);
                console.log("Tên collection:", "category_hotel");
            })
            .catch((error) => {
                alert("Đăng ký thông tin resort thất bại! 🤷‍♂️");
                console.error("Lỗi khi thêm sản phẩm: ", error);
            })
    } else {
        console.log("Không thể nhận diện được! 😱");
    }

    let productCard = document.createElement("div");


})

// Kết nối Firestore
// const db = firebase.firestore();

// Lấy tbody ra
const tbody = document.querySelector(".productList");

// Hàm hiển thị dữ liệu từ Firestore
function renderProducts() {
  // Xóa nội dung cũ
  productList.innerHTML = "";

  // Các collection bạn dùng
  const collections = ["category_tour", "category_hotel", "category_resort"];

  collections.forEach((collectionName) => {
    db.collection(collectionName)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const product = doc.data();

          // Tạo 1 hàng table (hoặc 1 dòng div)
          const row = document.createElement("tr");
          row.innerHTML = `
            <td>${product.name || "Không có tên"}</td>
            <td>${product.category || "Không có danh mục"}</td>
            <td>${product.price ? product.price.toLocaleString("vi-VN") + " ₫" : "—"}</td>
            <td><span class="badge bg-success">Đang hoạt động</span></td>
            <td>
              <button class="btn btn-sm btn-warning">Sửa</button>
              <button class="btn btn-sm btn-danger">Xóa</button>
            </td>
          `;
            productList.appendChild(row);
        });
      })
      .catch((error) => {
        console.error("Lỗi khi lấy sản phẩm:", error);
      });
  });
}

// Gọi hàm khi tải trang
window.addEventListener("DOMContentLoaded", renderProducts);