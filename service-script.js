// 讀取 URL 參數
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

document.addEventListener('DOMContentLoaded', () => {
    const serviceTabsContainer = document.querySelector('.service-tabs');

    // Fetch JSON data
    fetch('service.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // 生成服務和子服務
            data.forEach((service, index) => {
                const isActive = index === 0 ? 'active' : ''; // 第一項預設 active

                // 建立服務項目 <li>
                const listItem = document.createElement('li');
                listItem.className = `service-group ${isActive}`;
                listItem.setAttribute('data-service', service.id);
                listItem.textContent = service.name;

                // 建立子服務清單 <ul>
                const subItemsList = document.createElement('ul');
                subItemsList.id = `${service.id}-sub-items`;
                subItemsList.className = `subservice-tabs ${isActive}`;

                // 建立子服務項目 <li>
                if (service.subItems && service.subItems.length > 0) {
                    service.subItems.forEach(subItem => {
                        const subListItem = document.createElement('li');
                        subListItem.className = 'subservice-item';
                        subListItem.textContent = subItem.name;
                        subListItem.setAttribute('data-subitem-id', subItem.id);
                        subItemsList.appendChild(subListItem);
                    });
                }

                // 將子清單加入服務項目中
                listItem.appendChild(subItemsList);
                serviceTabsContainer.insertBefore(listItem, serviceTabsContainer.lastElementChild);
            });

            // 監聽點擊事件
            serviceTabsContainer.addEventListener('click', (e) => {
                // 點擊服務
                if (e.target.tagName === 'LI' && e.target.hasAttribute('data-service')) {
                    const serviceId = e.target.getAttribute('data-service');
                    handleServiceClick(serviceId, data);
                }

                // 點擊子服務
                if (e.target.tagName === 'LI' && e.target.hasAttribute('data-subitem-id')) {
                    const subItemId = e.target.getAttribute('data-subitem-id');
                    handleSubItemClick(subItemId, data);
                }
            });

            // ✅ 初始化第一個服務與第一個子服務
            handleServiceClick(data[0].id, data);

            // ✅ 根據 URL 參數選取服務
            const urlServiceId = getQueryParam('serviceId');
            const urlSubItemId = getQueryParam('subItemId');

            const defaultServiceId = urlServiceId || data[0].id;
            handleServiceClick(defaultServiceId, data);

            if (urlSubItemId) {
                // 等待 DOM 完成後再執行
                setTimeout(() => {
                    handleSubItemClick(urlSubItemId, data);
                }, 0);
            }
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });

    // ✅ 點擊服務時，顯示對應的子服務列表 & 預設選第一個子項
    function handleServiceClick(serviceId, data) {
        const serviceTabs = document.querySelectorAll('.service-tabs .service-group');
        const subserviceTabs = document.querySelectorAll('.subservice-tabs');

        // 移除所有 active
        serviceTabs.forEach(item => item.classList.remove('active'));
        subserviceTabs.forEach(list => list.classList.remove('active'));

        // 加上選中的 active
        const selectedService = Array.from(serviceTabs).find(item => item.getAttribute('data-service') === serviceId);
        if (selectedService) {
            selectedService.classList.add('active');
        }

        const selectedSubItems = document.getElementById(`${serviceId}-sub-items`);
        if (selectedSubItems) {
            selectedSubItems.classList.add('active');

            // ✅ 自動選取第一個子服務
            const firstSubItem = selectedSubItems.querySelector('li');
            if (firstSubItem) {
                firstSubItem.classList.add('active');
                const subItemId = firstSubItem.getAttribute('data-subitem-id');
                handleSubItemClick(subItemId, data);
            }
        }
    }

    // ✅ 顯示子服務內容
    function handleSubItemClick(subItemId, data) {
        // 清除所有 active 子項
        document.querySelectorAll('.subservice-item.active').forEach(item => {
            item.classList.remove('active');
        });

        // 加上目前點擊的 active
        const clickedSubItem = document.querySelector(`.subservice-item[data-subitem-id="${subItemId}"]`);
        if (clickedSubItem) {
            clickedSubItem.classList.add('active');
        }

        // 找到對應的資料
        const service = data.find(s => s.subItems.some(sub => sub.id === subItemId));
        if (!service) return console.warn('Service not found for subItemId:', subItemId);

        const subItem = service.subItems.find(sub => sub.id === subItemId);
        if (!subItem) return console.warn('SubItem not found:', subItemId);

        // 更新內容區
        const imageEl = document.getElementById('item-image');
        if (imageEl) imageEl.src = subItem.image || '';

        document.getElementById('content-item-id').textContent = subItem.id || '';
        document.getElementById('item-name').textContent = subItem.name || '';

        const combinedDescription = Array.isArray(subItem.description)
            ? subItem.description.join('\n').replace(/\n/g, '<br>')
            : '';
        document.getElementById('item-description').innerHTML = combinedDescription;

        // 額外圖片
        const imgListContainer = document.querySelector('.item-img-list');
        imgListContainer.innerHTML = '';

        if (subItem.images && Array.isArray(subItem.images)) {
            subItem.images.forEach(imgSrc => {
                const imgBox = document.createElement('div');
                imgBox.className = 'item-img-box';

                const img = document.createElement('img');
                img.src = imgSrc;
                img.alt = '';

                imgBox.appendChild(img);
                imgListContainer.appendChild(imgBox);
            });
        }

        // 顯示內容區塊
        document.querySelector('.content-panel').classList.add('visible');
    }
});


// gobacktotop
// 1. 取得按鈕元素
const scrollToTopBtn = document.getElementById("top");

// 2. 監聽滾動事件
window.onscroll = function() {
    // 當頁面滾動超過 200px 時，顯示按鈕
    if (document.body.scrollTop > 600 || document.documentElement.scrollTop > 200) {
        scrollToTopBtn.style.display = "block";
    } else {
        scrollToTopBtn.style.display = "none";
    }
};

// 3. 監聽點擊事件
scrollToTopBtn.addEventListener("click", function() {
    // 讓頁面平滑地滾動回頂部
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});





function switchVideo(videoKey, btn) {
    const videoMap = {
        video1: "gU-Ok5AnB-U?si=p8j4BBK-ylwpm0rs",
        video2: "影片ID2",
        video3: "影片ID3",
        video4: "影片ID3",
        video5: "影片ID3"
    };

    document.getElementById("videoFrame").src = `https://www.youtube.com/embed/${videoMap[videoKey]}`;
  
    // 移除所有按鈕的 active 類別
    document.querySelectorAll(".video-selector button").forEach(b => b.classList.remove("active"));
    // 加上目前按下的按鈕 active 類別
    btn.classList.add("active");

}
// 預設啟用第一個按鈕
document.querySelector(".video-selector button").classList.add("active");
document.getElementById("videoFrame").src = `images/IMG_5775.mov`;

// faq
function toggleAnswer(el) {
    const contentAns = el.querySelector('.a:nth-of-type(2)');
    const currentHeight = window.getComputedStyle(contentAns).height;
    const arrowIcon = el.querySelector('.arrow-icon');

    if (currentHeight === '0px') {
      contentAns.style.height = contentAns.scrollHeight + 'px';
      contentAns.style.opacity = '1';
      arrowIcon.classList.add("open");
    } else {
        contentAns.style.height = '0px';
        contentAns.style.opacity = '0';
        arrowIcon.classList.remove("open");
    }
  }


// 初始化收起
window.onload = () => {
    const contentAns = querySelector('.faq-content .a:nth-of-type(2)');
    contentAns.style.height = '0px';
    contentAns.style.opacity = '0';
    arrowIcon.classList.remove("open");
};
