"use strict";

///////////////////////////////////////

const modal = document.querySelector(".modal");
const nav = document.querySelector(".nav");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const btnScroll = document.querySelector(".btn--scroll-to");
const sectionScroll = document.querySelector("#section--1");
const tabContainer = document.querySelector(".operations__tab-container");
const tabs = document.querySelectorAll(".operations__tab");
const tabContent = document.querySelectorAll(".operations__content");
const allSection = document.querySelectorAll(".section");
console.log(allSection);
const betn = document.getElementsByTagName("div");
console.log(betn);
const html = document.getElementsByClassName("nev__item");
console.log(html);
const header = document.querySelector(".header");
const slide = document.querySelectorAll(".slide");
const slider = document.querySelector(".slider");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
const dotsContainer = document.querySelector(".dots");
const navHeight = nav.getBoundingClientRect().height;

// Modal window
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
  5;
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));
btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

///// a smooth scrolling behaviour

btnScroll.addEventListener("click", function (e) {
  /// Getting the coordinate of the element that we want to scroll to
  const s1coods = sectionScroll.getBoundingClientRect();

  sectionScroll.scrollIntoView({ behavior: "smooth" });
});

btnScroll.addEventListener("click", function (e) {
  /// Getting the coordinate of the element that we want to scroll to

  const s1coods = sectionScroll.getBoundingClientRect();
  console.log(s1coods);

  console.log(e.target.getBoundingClientRect());

  /// geting the current  scroll position
  console.log("current scroll position(X/Y)", window.scrollX, scrollY);
});
//// smooth scroll to the nav elements
document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();
  /// matching
  if (
    e.target.classList.contains("nav__link") ||
    e.target.classList.contains("nav__logo")
  ) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

/// The Taped component

tabContainer.addEventListener("click", function (e) {
  e.preventDefault();
  const checked = e.target.closest(".operations__tab");
  console.log(checked);
  ///guard clause
  if (!checked) return;
  tabs.forEach((tb) => tb.classList.remove("operations__tab--active"));
  tabContent.forEach((c) => c.classList.remove("operations__content--active"));
  checked.classList.add("operations__tab--active");
  console.log(checked.dataset.tab);
  document
    .querySelector(`.operations__content--${checked.dataset.tab}`)
    .classList.add("operations__content--active");
});
///// The blur
const handHover = function (e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector(".nav__logo");
    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};
nav.addEventListener("mouseover", handHover.bind(0.5));
nav.addEventListener("mouseout", handHover.bind(1));

////  The sticky navigation
const obInt = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};
const navObserver = new IntersectionObserver(obInt, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
navObserver.observe(header);
//// The section revealing

const obSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(obSection, {
  root: null,
  threshold: 0.15,
});
allSection.forEach(function (el) {
  sectionObserver.observe(el);
  el.classList.add("section--hidden");
});

//// The lazy loading image
const image = document.querySelectorAll("img[data-src]");
const imgOb = function (entries, observer) {
  const [entry] = entries;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });
  observer.unobserve(entry.target);
};
const imgObserver = new IntersectionObserver(imgOb, {
  root: null,
  threshold: 0,
  rootMargin: "200px",
});

image.forEach((img) => imgObserver.observe(img));
////  Testimonial section slider

const testiSlider = function () {
  let currentSlide = 0;
  const maxSlide = slide.length;
  const createDot = function () {
    slide.forEach((_, i) =>
      dotsContainer.insertAdjacentHTML(
        "beforeend",
        `<button class='dots__dot' data-slide="${i}"</button>`
      )
    );
  };

  const activeDots = function (slide) {
    document
      .querySelectorAll(`.dots__dot`)
      .forEach((dot) => dot.classList.remove("dots__dot--active"));
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  const goSlide = function (slider) {
    slide.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slider)}%)`)
    );
  };
  const nextSlide = function () {
    if (currentSlide == maxSlide - 1) {
      currentSlide = 0;
    } else currentSlide++;
    activeDots(currentSlide);

    goSlide(currentSlide);
  };

  const int = function () {
    createDot(0);
    goSlide(0);
    activeDots(0);
  };
  int();

  const previousSlide = function () {
    if (currentSlide == 0) {
      currentSlide = maxSlide - 1;
    } else currentSlide--;
    goSlide(currentSlide);
    activeDots(currentSlide);
  };
  /// we want the current( the active slide to be zero)
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", previousSlide);
  ///Creating A key board event
  document.addEventListener("keydown", function (e) {
    if (e.key == "ArrowRight") {
      nextSlide();
    }
    e.key == "ArrowLeft" && previousSlide();
  });
  dotsContainer.addEventListener("click", function (e) {
    if ((e.target.classList.contains = "dots__dot")) {
      const slide = e.target.dataset.slide;
      goSlide(slide);
      activeDots(slide);
    }
  });
};
testiSlider();
