const elems = document.querySelector(".carousel");

fetch("./data.json")
  .then((blob) => blob.json())
  .then((quotationsArr) => {
    const animations = [
      { name: "karaoke", duration: 12000 },
      { name: "fading", duration: 13000 },
      { name: "fade", duration: 1000 },
    ];

    const quotations = quotationsArr.map((quote) => {
      let isHash = false,
        hashNumber = 0;
      return quote
        .split("")
        .map((el, index) => {
          let i = index % animations.length;
          if (el === "#") {
            isHash = true;
            hashNumber++;
          } else isHash = false;
          return hashNumber === 1 && isHash
            ? `<b class="text--blocks text_hash">`
            : hashNumber === 2 && isHash
            ? `</b>`
            : el;
        })
        .join("");
    });

    elems.innerHTML = quotations
      .map((el, index) => {
        let i = index % animations.length;
        return `<div class="carousel-item flex white-text slide${index}"><p data-splitting="" class="text--${animations[i].name} mytext">${el}</p></div>`;
      })
      .join("");

    Splitting();

    M.Carousel.init(elems, {
      fullWidth: true,
      indicators: true,
      duration: 0,
      dist: 0
    });

    const instance = M.Carousel.getInstance(elems);
    const intervalSet = () => {
      console.log()
      const elems = document.querySelectorAll(`.carousel-item.active .mytext .char`);
      const s = (0.2 + (+getComputedStyle(elems[elems.length - 1]).getPropertyValue("--char-index") * 0.1) )*1000;
      const els = document.querySelectorAll(`.carousel-item.active .mytext b`)
      setTimeout(()=>{
        els.forEach(el=> el.classList.add("text_back"));
        setTimeout(() => {
          instance.next()
        }, 6000+3000);
        intervalSet();
      },s - 3000 )
    };
    intervalSet();
  });
