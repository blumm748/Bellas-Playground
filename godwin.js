
const openModal = (form) => form.showModal();
const closeModal = (form) => form.close();


(function () {
  
  const heads = [
  './img-gbam/1.png','./img-gbam/2.png', './img-gbam/3.png','./img-gbam/4.png','./img-gbam/5.png'
  ];
  const tails = [
    './img-gbam/1A.png','./img-gbam/2A.png', './img-gbam/3A.png', './img-gbam/4A.png','./img-gbam/5A.png'
  ]

  const godwinChoppingBlock = './img-gbam/gcp.svg';

  const doors = document.querySelectorAll('.door');
  document.querySelector('#spinner').addEventListener('click', spin);

  function init(firstInit = true, groups = 1, duration = 1) {
    for (const door of doors) {
      if (firstInit) {
        door.dataset.spinned = '10';
      } else if (door.dataset.spinned === '1') {
        return;
      }

      const boxes = door.querySelector('.boxes');
      const boxesClone = boxes.cloneNode(false);
      
      const pool = [];

      if (!firstInit) {

      let items;
      if (door.dataset.set === "1") {
      items = heads;
      } else {
      items = tails;
      }

      const arr = [];
      for (let n = 0; n < (groups > 0 ? groups : 1); n++) {
      arr.push(...items);
      }


        pool.push(...shuffle(arr));

        boxesClone.addEventListener(
          'transitionstart',
          function () {
            door.dataset.spinned = '1';
            this.querySelectorAll('.box').forEach((box) => {
              box.style.filter = 'blur(1px)';
            });
          },
          { once: true }
        );

        boxesClone.addEventListener(
          'transitionend',
          function () {
            this.querySelectorAll('.box').forEach((box, index) => {
              box.style.filter = 'blur(0)';
              if (index > 0) this.removeChild(box);
            });
          },
          { once: true }
        );
      }

      for (let i = pool.length - 1; i >= 0; i--) {
        const box = document.createElement('div');
        box.classList.add('box');
        box.style.width = door.clientWidth + 'px';
        box.style.height = door.clientHeight + 'px';

        const img = document.createElement('img');
        img.src = pool[i];     
        img.alt = '';
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'contain';
        img.style.display = 'block';
        box.appendChild(img);

      boxesClone.appendChild(box);
      }

      boxesClone.style.transitionDuration = `${duration > 0 ? duration : 1}s`;
      boxesClone.style.transform = `translateY(-${door.clientHeight * (pool.length - 1)}px)`;
      door.replaceChild(boxesClone, boxes);
    }
  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


  async function spin() {
    init();
    init(false, 0, 1);

    for (const door of doors) {
      const boxes = door.querySelector('.boxes');
      const duration = parseInt(boxes.style.transitionDuration);
      boxes.style.transform = 'translateX(0)';
      await new Promise((resolve) => setTimeout(resolve, duration * 10));
    }

    check();
  }

  function shuffle([...arr]) {
    let m = arr.length;
    while (m) {
      const i = Math.floor(Math.random() * m--);
      [arr[m], arr[i]] = [arr[i], arr[m]];
    }
    return arr;
  }

  init();
})();
