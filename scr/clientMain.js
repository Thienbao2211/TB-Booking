// Swiper element

const swiperElInCountry = document.querySelector(".travelInCountryList");
const swiperElOverseas = document.querySelector(".travelOverseasList");
const swiperElAvailable = document.querySelector(".travelAvailableList");

// Get Elements

let swiperList = querySelector(".travelAvailableList");

// Display Product

function renderProduct() {

  // Các collection trong Firebase Firestore

  const collections = ["category_tour", "category_hotel", "category_resort"];

  // Hiển thị ra list cho từng sản phẩm

  collections.forEach((collectionName) => {

    db.collection(collectionName)
      .where("status", "==", 1)
      .get()
      .then((querySnapshot) => {

        console.log("Số documents trong", collectionName, querySnapshot.size);

        const product = doc.data();
        console.log("Dữ liệu sản phẩm: ", product);
      
      })

  })

}

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