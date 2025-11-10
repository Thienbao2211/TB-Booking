// Get Elements

// let overlay = document.querySelector("#overlay");
let productName = document.querySelector(".productName");
let productCategory = document.querySelector(".productCategory");
let productPrice = document.querySelector(".productPrice");
let imageInput = document.querySelector(".imageInput");
let productImage = document.querySelector(".productImage");
let submitBtn = document.querySelector(".submitFormBtn");
let productList = document.querySelector(".productList");
let editingId = null;
let editingCollection = null;

// Khi nhấn vào nút chọn hình ảnh

imageInput.addEventListener('change', function () {
    console.log("Hello");
    const file = this.files[0];
    if (file) {
        const imageURL = URL.createObjectURL(file);
        productImage.src = imageURL;
        productImage.style.display = 'block';
        console.log("Đường dẫn tạm thời:", imageURL); // link ảnh tạm
    } else {
        productImage.style.display = 'none';
    }
});

// When Click Submit Button

submitBtn.addEventListener('click', async (e) => {

    // Tránh trường hợp load lại trang (mất hết thông tin người dùng nhập vào)

    e.preventDefault();

    // Lấy value của các ô input

    let name = productName.value;
    let category = productCategory.value;
    let price = productPrice.value;
    let status = 1;

    // Nếu người dùng chọn một tệp ảnh thì tải tệp đó lên máy chủ và máy chủ sẽ chuyển tiếp đến Cloudinary

    let image = productImage.src;

    try {
        const file = imageInput.files && imageInput.files[0];
        if (file) {
            const fd = new FormData();
            fd.append('image', file);
            const resp = await fetch('http://localhost:3000/upload', {
                method: 'POST',
                body: fd,
            });
            const json = await resp.json();
            if (resp.ok && json.success && json.data) {
                image = json.data.secure_url || json.data.url || image;
            } else {
                console.error('Upload failed', json);
                alert('Upload hình ảnh thất bại, vui lòng thủ lại.');
                return;
            }
        }
    } catch (err) {
        console.error('Upload error', err);
        alert('Lỗi khi upload ảnh: ' + err.message);
        return;
    }

    // Validation các ô input

    if (!name || !price || !category) {
        alert("Vui lòng nhập đầy đủ thông tin để thêm sản phẩm !!! 😊");
        return;
    }

    // Nếu đang ở chế độ chỉnh sửa sản phẩm

    if (editingId && editingCollection) {

        try {
            await db.collection(editingCollection).doc(editingId).update({
                name,
                category,
                price,
                image,
                status,
            });

            // Hiện lên thông báo chỉnh sửa sản phẩm thành công và cho ẩn form
            alert("Cập nhật sản phẩm thành công! 😊");
            overlay.style.display = "none";

            // Gọi hàm renderProduct để render lại sản phẩm
            renderProducts();

            // Reset lại trạng thái của sản phẩm

            editingId = null;
            editingCollection = null;
            return;

        } catch (error) {
            console.error("Lỗi khi cập nhật sản phẩm: ", error);
            alert("Cập nhật sản phẩm thát bại! 🤷‍♂️");
        }

    }

    // Lưu thông tin của sản phẩm

        // Thông tin đăng ký sản phẩm

    let productData =  {
        name,
        category,
        price,
        image,
        status,
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
        .where("status", "==", 1)
        .get()
        .then((querySnapshot) => {
            
            console.log("Số document trong", collectionName, "=", querySnapshot.size);

            querySnapshot.forEach((doc) => {
            
                const product = doc.data();
                console.log("Dữ liệu sản phẩm: ", product);

                // Tạo 1 hàng table (hoặc 1 dòng div)
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${product.name || "Không có tên"}</td>
                    <td>${product.category || "Không có danh mục"}</td>
                    <td>${product.price ? product.price.toLocaleString("vi-VN") + " ₫" : "—"}</td>
                    <td><span class="badge bg-success">Đang hoạt động</span></td>
                    <td>
                    <button class="changeBtn btn btn-sm btn-warning" data-id="${doc.id}" data-collection="${collectionName}">Sửa</button>
                    <button class="deleteBtn btn btn-sm btn-danger" data-id="${doc.id}" data-collection="${collectionName}">Xóa</button>
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

productList.addEventListener('click', async (e) => {
    if (e.target.classList.contains("deleteBtn")) {

        // Lấy id và collection của sản phẩm đó

        const docId = e.target.dataset.id;
        const collectionName = e.target.dataset.collection;

        // Kiểm tra có thể tìm thấy id và collection của sản phẩm hay không

        if (!docId || !collectionName) {
            console.error("Không thể tìm thấy id hoặc collection của sản phẩm? 😱");
            return;
        }

        // Hỏi người dùng có chắc muốn thay đổi thông tin sản phẩm hay không

        const confirmDelete = confirm("Bạn có chắc chắn muốn xóa tạm thời sản phẩm này không? 🤷‍♂️");
        if (!confirmDelete) {
            return;
        }

        try {
            await db.collection(collectionName).doc(docId).update({
                status: 0
            });

            alert("Xóa tạm thời sản phẩm thành công! 👍");
            renderProducts();
        } catch (error) {
            console.error("Lỗi khi cập nhật trạng thái sản phẩm: ", error);
            alert("Ẩn sản phẩm thất bại? 😱");
        }
    } else if (e.target.classList.contains("changeBtn")) {

        // Lấy id và collection của sản phẩm đó

        const docId = e.target.dataset.id;
        const collectionName = e.target.dataset.collection;

        // Kiểm tra có thể tìm thấy id và collection của sản phẩm hay không

        if (!docId || !collectionName) {
            console.error("Không thể tìm thấy id hoặc collection của sản phẩm? 😱");
            return;
        }

        // Hỏi người dùng có chắc muốn thay đổi thông tin sản phẩm hay không

        const confirmChange = confirm("Bạn có chắc chắn muốn thay đổi nội dung của sản phẩm hay không? 🤷‍♂️");
        if (!confirmChange) {
            return;
        }

        // Hiện lên thông tin sản phẩm

        overlay.style.display = "block";

        // Lấy và hiện thị thông tin sản phẩm

        try {

            // Lấy dữ liệu của sản phẩm từ Firebase Firestore

            let docSnap = await db.collection(collectionName).doc(docId).get();

            // Nếu thông tin tồn tại

            if (docSnap.exists) {

                let data = docSnap.data();

                // Gán dữ liệu vào form

                productName.value = data.name || "";
                productCategory.value = data.category || "";
                productPrice.value = data.price || "";
                productImage.src = data.image || "";

                // Lưu lại Id và collection để biết là đang sửa

                editingId = docId;
                editingCollection = collectionName;

                console.log("Đang chỉnh sửa sản phẩm: ", data);
                
            } else {
                alert("Không tìm thấy sản phẩm trong firestore! 😱");
            }

        } catch (error) {
            console.error("Lỗi khi chỉnh sửa sản phẩm: ", error);
            alert("Chỉnh sửa sản phẩm thất bại! 😱");
        }

    };
});

// Gọi hàm khi tải trang
window.addEventListener("DOMContentLoaded", renderProducts);