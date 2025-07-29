const logoFloat = document.getElementById('navbar-logo');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
      logoFloat.classList.add('scrolled');
    } else {
      logoFloat.classList.remove('scrolled');
    }
  });

// 標誌變化
const logoScale = document.getElementById('logo');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
      logoScale.classList.add('scrolled');
    } else {
      logoScale.classList.remove('scrolled');
    }
  });

  // navbar變化
const navbar = document.getElementById('navbar');
const trigger = document.getElementById('text-box-right');

  window.addEventListener('scroll', () => {
    const triggerBottom = trigger.getBoundingClientRect().bottom;
    const offset = -20; // navbar高度，可微調觸發點

    if (triggerBottom <= offset) {
      navbar.classList.add('scrolled');
      stickyEl.dataset.wide = 'true';
    } else {
      navbar.classList.remove('scrolled');
      stickyEl.dataset.wide = 'false';
    }
  });

// 固定標題（關於）
const stickyEl = document.querySelector(".text-box-h2");

let isFixed = false;
let placeholder = null;

const stickyTop = 78; // 吸附高度

// 使用 offsetTop 取得「一開始」的位置（只抓一次）
const stickyInitialTop = stickyEl.offsetTop;

window.addEventListener("scroll", () => {
  const shouldFix = window.scrollY >= stickyInitialTop - stickyTop;
  
  if (shouldFix && !isFixed) {
    const offsetLeft = stickyEl.getBoundingClientRect().left + window.scrollX;
    const offsetWidth = stickyEl.offsetWidth;
    const offsetHeight = stickyEl.offsetHeight;
    
    // 建立佔位元素
    placeholder = document.createElement("div");
    placeholder.style.height = `${offsetHeight}px`;
    stickyEl.parentNode.insertBefore(placeholder, stickyEl);
    
    // 這一行：把 h2 的高度存成 CSS 變數（供 ::before 使用）
    stickyEl.style.setProperty('--h2-height', `${offsetHeight}px`);
    
    // 固定樣式
    stickyEl.style.position = "fixed";
    stickyEl.style.top = `${stickyTop}px`;
    stickyEl.style.left = `${offsetLeft}px`;
    stickyEl.classList.add("fixed");

    isFixed = true;
  }

  if (!shouldFix && isFixed) {
    // 還原樣式
    stickyEl.style.position = "";
    stickyEl.style.top = "";
    stickyEl.style.left = "";
    stickyEl.style.width = "";
    stickyEl.classList.remove("fixed");

    if (placeholder) {
      placeholder.remove();
      placeholder = null;
    }

    isFixed = false;
  }
});

// form
document.querySelectorAll('.form-box').forEach(input => {
  input.addEventListener('input', () => {
    const wrapper = input.closest('.input-wrapper');
    if (input.value.trim() !== '') {
      wrapper.classList.add('filled');
    } else {
      wrapper.classList.remove('filled');
    }
  });
});
