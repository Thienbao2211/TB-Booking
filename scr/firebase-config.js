// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyC7FUFLyFSO_FfhkFsJ6fYHQj1Hyj8i7OE",
//   authDomain: "tb-booking-214f2.firebaseapp.com",
//   projectId: "tb-booking-214f2",
//   storageBucket: "tb-booking-214f2.firebasestorage.app",
//   messagingSenderId: "1028893460471",
//   appId: "1:1028893460471:web:36e42f287165e86f3d10f2",
//   measurementId: "G-CE8T4VFJS8"
// };

// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);

// // Initialize Firebase Authentication and get a reference to the service
// const auth = firebase.auth();

// // Initialize Cloud Firestore and get a reference to the service
// const db = firebase.firestore();

// // Initialize Cloud Storage and get a reference to the service
// const storage = firebase.storage();

// // Check
// console.log(firebase.app().name);

// ------------------ CẤU HÌNH FIREBASE ------------------
const firebaseConfig = {
  apiKey: "AIzaSyB9PgrnSHLfhV-JJ3bRLfTrTVbAaJNdjo8",
  authDomain: "cafe-34a68.firebaseapp.com",
  projectId: "cafe-34a68",
  storageBucket: "cafe-34a68.appspot.com",
  messagingSenderId: "525166847891",
  appId: "1:525166847891:web:3060f797755535d1a26a66",
  measurementId: "G-52YNHV400E",
};

// Khởi tạo Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
console.log("✅ Firebase đã khởi tạo:", firebase.app().name);

const nameInput = document.querySelector(".productName");
const categoryInput = document.querySelector(".productCategory");
const priceInput = document.querySelector(".productPrice");
const fileInput = document.querySelector(".imageInput");

// ------------------ HÀM THÊM SẢN PHẨM ------------------
async function addProduct() {
  console.log("⚙️ Bắt đầu chạy addProduct...");
  try {

    const name = nameInput.value.trim();
    const category = categoryInput.value.trim();
    const price = parseInt(priceInput.value);
    const file = fileInput.files[0];

    
    if (!name || !category || !price || !file) {
      alert("❌ Vui lòng nhập đầy đủ thông tin và chọn ảnh!");
      return;
    }

    // Preview ảnh
    // const preview = document.querySelector(".preview");
    // preview.src = URL.createObjectURL(file);
    // preview.style.display = "block";

    // Upload ảnh lên backend
    const formData = new FormData();
    formData.append("image", file);

    console.log("🚀 Đang upload ảnh...");

    const response = await fetch("http://localhost:3000/upload", {
      method: "POST",
      body: formData,
    });

    // Kiểm tra nếu server không trả về status 200
    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ Server trả về lỗi:", errorText);
      throw new Error("Upload ảnh thất bại! Server không phản hồi OK.");
    }

    // Đọc JSON trả về
    const result = await response.json();
    console.log("📦 JSON từ server:", result);

    // Kiểm tra dữ liệu hợp lệ
    if (!result.success || !result.data?.secure_url) {
      throw new Error("Upload ảnh thất bại! Không có URL ảnh trả về.");
    }

    const imageUrl = result.data.secure_url;
    console.log("✅ Ảnh upload thành công:", imageUrl);

    // Lưu vào Firestore
    const productData = {
      name,
      price,
      category,
      available: true,
      imageUrl,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    };

    const docRef = await db.collection("products").add(productData);
    alert("✅ Thêm sản phẩm thành công! ID: " + docRef.id);
    console.log("🎯 Thêm sản phẩm thành công:", docRef.id);

  } catch (err) {
    console.error("❌ Lỗi chi tiết:", err);
    alert("❌ Lỗi: " + err.message);
  }
}

// ------------------ GẮN SỰ KIỆN KHI LOAD TRANG ------------------
window.onload = () => {
  document.querySelector(".submitFormBtn").addEventListener("click", addProduct);
};
