// Swiper element

const swiperElInCountry = document.querySelector(".travelInCountryList");
const swiperElOverseas = document.querySelector(".travelOverseasList");
const swiperElAvailable = document.querySelector(".travelAvailableList");

let signOutBtn = document.querySelector(".signOutBtn");

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

// Khi người dùng bấm nút đăng xuất

signOutBtn.addEventListener("click", (e) => {

  if (confirm("Bạn có chắc muốn đăng xuất? 🤷‍♂️")) {
    firebase.auth().signOut().then(() => {

      // Xóa thông tin phiên của người dùng khỏi local storage

      localStorage.removeItem("user_session");

      // Chuyển trang đến trang đăng nhập

      window.location.href = "../view/signIn.html";

    })
    .catch((error) => {
      let errorMessage = error.message;
      alert("Lỗi: ", errorMessage);
      console.log("Lỗi: ", error);
    })
  }

})

// Hiển thị ra các sản phẩm

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
                  <a href="" class="productCard text-decoration-none text-black">
                      <img src="${product.image}" class="rounded" alt="${product.name || "Không có tên phụ"}" style="width: 420px; height: 250px;">
                      <p class="text-center fw-bold fs-5" style="margin-bottom: 0;">${product.name || "Không có tên"}</p>
                      <p class="text-center text-secondary">${product.description}</p>
                  </a>
              `;

          card.querySelector(".productCard").href = `../view/clientProductInfo.html?id=${doc.id}`;
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