export const MOUSE_WHEEL_CONFIG = {
  enabled: true,
  forceToAxis: true,
  sensitivity: 1,
  eventsTarget: "container",
};

const CARDS_CONFIG = {
  options: {
    slidesPerView: 2,
    spaceBetween: 4,
    mousewheel: MOUSE_WHEEL_CONFIG
  },
  breakpoints: {

  }
};

export const SWIPERS = {
  CARS: {
    selector: ".cars .swiper--cars",
    breakpoint: 122300000000,

    options: {
      ...CARDS_CONFIG.options,
      navigation: {
        nextEl: ".cars .arrow-swiper.next",
        prevEl: ".cars .arrow-swiper.prev",
      },
      breakpoints: {
        ...CARDS_CONFIG.breakpoints,
      }
    },
  },
  HOUSES: {
    selector: ".houses .swiper--houses",
    breakpoint: 122300000000,

    options: {
      ...CARDS_CONFIG.options,
     
      navigation: {
        nextEl: ".houses .arrow-swiper.next",
        prevEl: ".houses .arrow-swiper.prev",
      },
      breakpoints: {
        ...CARDS_CONFIG.breakpoints,
      }
    },
  },
  HISTORY: {
    selector: ".history .swiper--history",
    breakpoint: 122300000000,

    options: {
      slidesPerView: 3,
      spaceBetween: 40,
      breakpoints: {
        ...CARDS_CONFIG.breakpoints,
      }
    },
  },
  TEAM: {
    selector: ".team .swiper--team",
    breakpoint: 122300000000,

    options: {
      ...CARDS_CONFIG.options,
      slidesPerView: 4,
      navigation: {
        nextEl: ".team .arrow-swiper.next",
        prevEl: ".team .arrow-swiper.prev",
      },
      breakpoints: {
        ...CARDS_CONFIG.breakpoints,
      }
    },
  },
};
