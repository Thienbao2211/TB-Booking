// Swiper element

const swiperElInCountry = document.querySelector(".travelInCountryList");
const swiperElOverseas = document.querySelector(".travelOverseasList");
const swiperElAvailable = document.querySelector(".travelAvailableList");

// Swiper parameters
const swiperParamsInCountry = {
  slidesPerView: 5,
  breakpoints: {
    300: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    950: {
      slidesPerView: 2,
      spaceBetween: 15,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
  },
};

const swiperParamsOverseas = {
  slidesPerView: 5,
  breakpoints: {
    300: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    950: {
      slidesPerView: 2,
      spaceBetween: 15,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
  },
};

const swiperParamsAvailable = {
  slidesPerView: 5,
  breakpoints: {
    300: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    950: {
      slidesPerView: 2,
      spaceBetween: 15,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
  },
};

Object.assign(swiperElInCountry, swiperParamsInCountry);
Object.assign(swiperElOverseas, swiperParamsOverseas);
Object.assign(swiperElAvailable, swiperParamsAvailable);

// Display Product

function renderProducts() {

  // Các collection trong Firebase Firestore

  const collections = ["category_tour", "category_hotel", "category_resort"];

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
                  <a href="../view/clientProductInfo.html" class="text-decoration-none text-black">
                      <img src="${product.image}" class="rounded" alt="${product.name || "Không có tên phụ"}" style="width: 420px; height: 250px;">
                      <p class="text-center mt-2 fw-bold fs-5" style="margin-bottom: 0;">${product.name || "Không có tên"}</p>
                      <p class="text-center text-secondary">${product.category}</p>
                  </a>
              `;
          swiperElAvailable.appendChild(card);

        });
      
      })
      .catch((error) => {
        console.error("Lỗi khi hiển thị sản phẩm: ", error);
      })

  })

};

// Gọi hàm khi tải trang

window.addEventListener("DOMContentLoaded", renderProducts);