// function toggleSidebar() {
//     const footerblock = document.getElementById('footer-info-content');
//     const content = document.getElementById('content');
//     footerblock.classList.toggle('active');
//     content.classList.toggle('shifted');
//   }

document.addEventListener('DOMContentLoaded', () => {
  // 選擇所有具有 'toggle-switch' class 的元素
  const toggleSwitches = document.querySelectorAll('.menu-toggle, .menu-btn');
  const navMenu = document.getElementById('navbar-menu');
  const navbar = document.querySelector('.navbar.transparent');

  // 為每一個開關添加點擊事件監聽器
  toggleSwitches.forEach(switchBtn => {
    switchBtn.addEventListener('click', () => {
      // 點擊後，切換燈泡的 class
      navMenu.classList.toggle('on');

      if (navMenu.classList.contains('on')) {
        navbar.classList.add('active-on-click');
      } else {
        navbar.classList.remove('active-on-click');
      }
    });
  });
});




const footerblock = document.getElementById('footer-info-content');
const btnOn = document.getElementById('toggle-btn-on');
const btnOff = document.getElementById('toggle-btn-off');

// 手動開關按鈕
function toggleFooterContent() {
  const isActive = footerblock.classList.toggle('active');

  if (isActive) {
    document.documentElement.classList.add('dark');
    btnOn.style.display = 'none';
    btnOff.style.display = 'inline-block';
  } else {
    document.documentElement.classList.remove('dark');
    btnOn.style.display = 'inline-block';
    btnOff.style.display = 'none';
  }
}

// 自動判斷是否在頁面底部
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const windowHeight = window.innerHeight;
  const fullHeight = document.body.scrollHeight;
  const isAtBottom = scrollTop + windowHeight >= fullHeight - 10;

  if (isAtBottom) {
    // 如果還沒開啟，就自動開啟並切換為暗色主題
    if (!footerblock.classList.contains('active')) {
      footerblock.classList.add('active');
      document.documentElement.classList.add('dark');
      btnOn.style.display = 'none';
      btnOff.style.display = 'inline-block';
    }
  } else {
    // 如果已經開啟，但離開底部，就自動收起並恢復亮色
    if (footerblock.classList.contains('active')) {
      footerblock.classList.remove('active');
      document.documentElement.classList.remove('dark');
      btnOn.style.display = 'inline-block';
      btnOff.style.display = 'none';
    }
  }
});


let lastScrollTop = 0;
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (currentScrollTop > lastScrollTop) {
    // 向下滾動
    navbar.classList.add("transparent");
  } else {
    // 向上滾動
    navbar.classList.remove("transparent");
  }

  lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop; // 避免負值
});


window.addEventListener('scroll', function() {
  // 獲取滾動位置
  const scrolled = window.scrollY;
  const image = document.querySelector('.hero-img img');
  
  // 根據滾動位置調整圖片的 translateY 屬性
  // 數值越小，移動越慢，視差效果越明顯
  const moveRate = 0.1;
  image.style.transform = `translateY(-${scrolled * moveRate}px)`;
});