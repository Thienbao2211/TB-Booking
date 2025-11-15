let newestTourList = document.querySelector(".newestHotelList");

// Hiển thị ra các sản phẩm

function renderProducts() {

  // Các collection trong Firebase Firestore

  const collections = ["category_hotel"];

  // Hiển thị ra list cho từng sản phẩm

  collections.forEach((collectionName) => {

    db.collection(collectionName)
      .where("status", "==", 1)
      .get()
      .then((querySnapshot) => {

        console.log("Số documents trong", collectionName, querySnapshot.size);

        querySnapshot.forEach((doc) => {

          const product = doc.data();
          console.log("Dữ liệu sản phẩm: ", product);

          // Tạo một thẻ swiper slide

          const card = document.createElement("swiper-slide");
          card.innerHTML = `
                  <a href="" class="productCard text-decoration-none text-black">
                      <img src="${product.image}" class="rounded" alt="${product.name || "Không có tên phụ"}" style="width: 420px; height: 250px;">
                      <p class="text-center fw-bold fs-5" style="margin-bottom: 0;">${product.name || "Không có tên"}</p>
                      <p class="text-center text-secondary">${product.description}</p>
                  </a>
              `;

          card.querySelector(".productCard").href = `../view/clientProductInfo.html?id=${doc.id}`;
          newestTourList.appendChild(card);

        });
      
      })
      .catch((error) => {
        console.error("Lỗi khi hiển thị sản phẩm: ", error);
      })

  })

};

// Gọi hàm để hiển thị sản phẩm

window.addEventListener("DOMContentLoaded", renderProducts);