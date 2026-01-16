export const MOUSE_WHEEL_CONFIG = {
  enabled: true,
  forceToAxis: true,
  sensitivity: 1,
  eventsTarget: "container",
};

const CARDS_CONFIG = {
  options: {
    slidesPerView: 1,
    spaceBetween: 4,
    mousewheel: MOUSE_WHEEL_CONFIG,
  },
  breakpoints: {
    1024: {
      slidesPerView: 2,
      spaceBetween: 4,
    },
    600: {
      slidesPerView: 1.7,
    }
  },
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
      },
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
      },
    },
  },
  HISTORY: {
    selector: ".history .swiper--history",
    breakpoint: 122300000000,

    options: {
      slidesPerView: 1.08,
      spaceBetween: 4,
      mousewheel: MOUSE_WHEEL_CONFIG,
      breakpoints: {
        1500: {
          slidesPerView: 3,
          spaceBetween: 40,
        },
        1024: {
          slidesPerView: 2.2,
          spaceBetween: 20,
        },
        600: {
          slidesPerView: 1.7,
          spaceBetween: 10,
        }
      },
    },
  },
  TEAM: {
    selector: ".team .swiper--team",
    breakpoint: 122300000000,

    options: {
      ...CARDS_CONFIG.options,
      navigation: {
        nextEl: ".team .arrow-swiper.next",
        prevEl: ".team .arrow-swiper.prev",
      },
      breakpoints: {
        1279: {
          slidesPerView: 4,
        },
        
        1024: {
          slidesPerView: 3,
        },

        600 : {
          slidesPerView: 2,
        },


      },
    },
  },
};
