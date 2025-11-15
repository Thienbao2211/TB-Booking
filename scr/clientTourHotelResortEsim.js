// swiper element
const swiperElNewestTourTripList = document.querySelector(".newestTourTripList");
const swiperElNewestHotelList = document.querySelector(".newestHotelList");
const swiperElNewestResortList = document.querySelector(".newestResortList");

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

const swiperParamsNewestHotelList = {
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

const swiperParamsNewestResortList = {
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
Object.assign(swiperElNewestHotelList, swiperParamsNewestHotelList);
Object.assign(swiperElNewestResortList, swiperParamsNewestResortList);

// swiperEl.initialize();