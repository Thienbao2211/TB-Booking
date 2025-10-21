// swiper element
const swiperElNewestTourTripList = document.querySelector(".newestTourTripList");
const swiperElPopularTourTripList = document.querySelector(".popularTourTripList");

// swiper parameters
const swiperParamsNewestTourTripList = {
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

const swiperParamsPopularTourTripList = {
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

Object.assign(swiperElNewestTourTripList, swiperParamsNewestTourTripList);
Object.assign(swiperElPopularTourTripList, swiperParamsPopularTourTripList);

// swiperEl.initialize();