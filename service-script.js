// 讀取 URL 參數
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

const langFileMap = {
    'en': 'service_en.json',
    'zh-TW': 'service.json' // 您也可以把 'zh-TW' 對應到同一個檔案
    // 'ja': 'service_jp.json' // japanese or something else..
};
const defaultLang = 'en';

document.addEventListener('DOMContentLoaded', () => {
    const serviceTabsContainer = document.querySelector('.service-tabs');

    /** 
    * 根據傳入的語言代碼載入對應的 JSON 檔案並更新頁面
    * @param {string} lang
    */
    function loadLanguage(lang) {

        const filename = langFileMap[lang] || langFileMap[defaultLang];
        const effectiveLang = langFileMap[lang] ? lang : defaultLang;

    // Fetch JSON data
    fetch(filename)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok for ${filename}`);
            }
            return response.json();
        })
        .then(data => {
            // 更新 <html> 標籤的 lang 屬性，我用靜態宣告，可不用再動態宣告
            // document.documentElement.lang = effectiveLang;

            // 生成服務和子服務
            data.forEach((service, index) => {
                const isActive = index === 0 ? 'active' : ''; // 第一項預設 active

                // 建立服務項目 <li>
                const listItem = document.createElement('li');
                listItem.className = `service-group ${isActive}`;
                listItem.setAttribute('data-service', service.id);
                // listItem.textContent = service.name;

                const titleSpan = document.createElement('span');
                titleSpan.className = 'service-tab-text';
                titleSpan.textContent = service.name;
                listItem.appendChild(titleSpan);


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
                // if (e.target.tagName === 'LI' && e.target.hasAttribute('data-service')) {
                //     const serviceId = e.target.getAttribute('data-service');
                //     handleServiceClick(serviceId, data);
                // }
                // 點擊服務標題
                if (e.target.classList.contains('service-tab-text')) {
                    const parentLi = e.target.closest('.service-group');
                    if (parentLi && parentLi.hasAttribute('data-service')) {
                        const serviceId = parentLi.getAttribute('data-service');
                        handleServiceClick(serviceId, data);
                    }
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
    }
    
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
    
    const currentLang = document.documentElement.lang;

    // 2. 根據讀取到的語言，呼叫 loadLanguage 函數
    loadLanguage(currentLang);
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


// 影片切換
function switchVideo(videoKey, btn) {
    const videoMap = {
        video1: "gRAffEwoKfU?si=r4UGtLt2qh0TQsvW",
        video2: "xL2MU-OGyS0?si=_uKUrmGS0kq0c-nF",
        video3: "u9hr383x1hs?si=ijIVQKA2leZPjtF8",
        video4: "mx1Ad_zskis?si=J4XQ1bG8Y4XUG-73",
        video5: "E6ooFsoI7Ys?si=WMCfQcdFjT3SMXEr"
    };

    // 顯示影片區域，隱藏自訂內容
    document.getElementById("videoFrame").style.display = "block";
    document.getElementById("stickerFrame").style.display = "none";

    document.getElementById("videoFrame").src = `https://www.youtube.com/embed/${videoMap[videoKey]}`;
  
    // 移除所有按鈕的 active 類別
    document.querySelectorAll(".video-selector button").forEach(b => b.classList.remove("active"));
    // 加上目前按下的按鈕 active 類別
    btn.classList.add("active");
}
function switchToSticker(btn) {
    // 隱藏影片區域，顯示自訂內容
    document.getElementById("videoFrame").style.display = "none";
    document.getElementById("stickerFrame").style.display = "grid";

    // 移除所有按鈕的 active 類別
    document.querySelectorAll(".video-selector button").forEach(b => b.classList.remove("active"));
    // 加上目前按下的按鈕 active 類別
    btn.classList.add("active");
}

// 預設啟用第一個按鈕
// document.querySelector(".video-selector button").classList.add("active");
// document.getElementById("videoFrame").src = `https://www.youtube.com/embed/gRAffEwoKfU?si=r4UGtLt2qh0TQsvW`;
// const stickerBtn = document.querySelector('.video-selector button.sticker-btn');
const stickerBtn = document.getElementById("section3-sticker");
if (stickerBtn) {
    switchToSticker(stickerBtn);
}



// faq
function toggleAnswer(el) {
    const answerText = el.querySelector('.a:nth-of-type(2)');
    const videoContainer = el.querySelector('.faq-video-container');
    const arrowIcon = el.querySelector('.arrow-icon');

    const isClosed = window.getComputedStyle(answerText).height === '0px';

    if (isClosed) {
        // 展開文字與影片
        if (answerText) {
            answerText.style.height = answerText.scrollHeight + 'px';
            answerText.style.opacity = '1';
        }

        if (videoContainer) {
            videoContainer.style.height = videoContainer.scrollHeight + 'px';
            videoContainer.style.opacity = '1';
            videoContainer.style.margin = '1rem 0';
        }

        if (arrowIcon) {
            arrowIcon.classList.add("open");
        }
    } else {
        // 收起文字與影片
        if (answerText) {
            answerText.style.height = '0px';
            answerText.style.opacity = '0';
        }

        if (videoContainer) {
            videoContainer.style.height = '0px';
            videoContainer.style.opacity = '0';
            videoContainer.style.margin = '0';
        }

        if (arrowIcon) {
            arrowIcon.classList.remove("open");
        }
    }
}

window.onload = () => {
    document.querySelectorAll('.qa').forEach(el => {
        const answerText = el.querySelector('.a:nth-of-type(2)');
        const videoContainer = el.querySelector('.faq-video-container');
        const arrowIcon = el.querySelector('.arrow-icon');

        if (answerText) {
            answerText.style.height = '0px';
            answerText.style.opacity = '0';
        }

        if (videoContainer) {
            videoContainer.style.height = '0px';
            videoContainer.style.opacity = '0';
            videoContainer.style.margin = '0';
        }

        if (arrowIcon) {
            arrowIcon.classList.remove("open");
        }
    });
};
