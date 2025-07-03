const toggle = document.getElementById("menu-toggle");
const sidebar = document.getElementById("sidebar");
const closeBtn = document.getElementById("close-sidebar");
const overlay = document.getElementById("overlay");


toggle.addEventListener("click", () => {
    sidebar.classList.toggle("show");
    overlay.classList.toggle("show");
    toggle.classList.toggle("non")
});

// 關閉側邊欄
closeBtn.addEventListener("click", () => {
    sidebar.classList.remove("show");
    overlay.classList.remove("show");
    toggle.classList.remove("non")
});

// 點擊遮罩也關閉側邊欄
overlay.addEventListener("click", () => {
    sidebar.classList.remove("show");
    overlay.classList.remove("show");
    toggle.classList.remove("non")
});

// 获取按钮
var backToTopBtn = document.getElementById("backToTopBtn");

// 滚动事件监听器
window.onscroll = function() {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        backToTopBtn.style.display = "block";  // 显示按钮
    } else {
        backToTopBtn.style.display = "none";   // 隐藏按钮
    }
};

// 点击按钮返回顶部
backToTopBtn.onclick = function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};
