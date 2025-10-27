// 選單開關
document.addEventListener('DOMContentLoaded', () => {

  const toggleSwitches = document.querySelectorAll('.menu-toggle');
  const navMenu = document.getElementById('navbar-menu');
  const navbar = document.getElementById('navbar');

  if (toggleSwitches.length > 0 && navMenu && navbar) {
    toggleSwitches.forEach(switchBtn => {
      switchBtn.addEventListener('click', () => {
        
        navMenu.classList.toggle('on');

        if (navMenu.classList.contains('on')) {
          navbar.classList.add('active');
        } else {
          navbar.classList.remove('active');
        }
      });
    });
  }

  let lastScrollTop = 0;
  if (navbar) {
    window.addEventListener("scroll", () => {
      const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (currentScrollTop > lastScrollTop && currentScrollTop > 0) {
        // 向下滾動
        navbar.classList.add("transparent");
      } else {
        // 向上滾動
        navbar.classList.remove("transparent");
      }
      lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
    });
  }

});

// image offset
window.addEventListener('scroll', function() {
  const scrolled = window.scrollY;
  const image = document.querySelector('.hero-img img');
  
  const moveRate = 0.1;
  image.style.transform = `translateY(-${scrolled * moveRate}px)`;
});

// 手動開關按鈕（頁尾）
const footerblock = document.getElementById('footer-info-content');
const btnOn = document.getElementById('toggle-btn-on');
const btnOff = document.getElementById('toggle-btn-off');

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

// 判斷是否在頁面底部
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

// mailer
document.getElementById('contactForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const statusMessage = document.getElementById('statusMessage');

        statusMessage.style.display = 'none';

        fetch(form.action, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                statusMessage.textContent = '郵件已成功發送！';
                statusMessage.className = 'message-box message-success';
                form.reset();
            } else {
                statusMessage.textContent = '郵件發送失敗：' + (data.message || '請稍後再試。');
                statusMessage.className = 'message-box message-error';
            }
            statusMessage.style.display = 'block';
        })
        .catch(error => {
            console.error('發送錯誤:', error);
            statusMessage.textContent = '發生網路錯誤，請檢查您的連線。';
            statusMessage.className = 'message-box message-error';
            statusMessage.style.display = 'block';
        });
    });