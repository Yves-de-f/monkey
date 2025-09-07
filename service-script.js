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
                const isActive = index === 0 ? 'active' : ''; // The first item is active by default
                
                // 創建服務項目
                const listItem = document.createElement('li');
                listItem.className = `service-group ${isActive}`;
                listItem.setAttribute('data-service', service.id);
                listItem.textContent = service.name;

                // 創建子服務項目列表
                const subItemsList = document.createElement('ul');
                subItemsList.id = `${service.id}-sub-items`;
                subItemsList.className = `subservice-tabs ${isActive}`;

                // 檢查是否有子服務
                if (service.subItems && service.subItems.length > 0) {
                    service.subItems.forEach(subItem => {
                        const subListItem = document.createElement('li');
                        subListItem.className = `subservice-item`;
                        subListItem.textContent = subItem.name;

                        // 設置 data-subitem-id 屬性
                        subListItem.setAttribute('data-subitem-id', subItem.id);
                        subItemsList.appendChild(subListItem);
                    });
                }

                listItem.appendChild(subItemsList);
                // serviceTabsContainer.insertBefore(listItem, serviceTabsContainer.lastElementChild);
                serviceTabsContainer.insertBefore(listItem, serviceTabsContainer.lastElementChild);
            });

            // 監聽服務項目的點擊
            serviceTabsContainer.addEventListener('click', (e) => {
                // 點擊服務項目
                if (e.target.tagName === 'LI' && e.target.hasAttribute('data-service')) {
                    const serviceId = e.target.getAttribute('data-service');
                    handleServiceClick(serviceId);
                }

                // 點擊子服務項目
                if (e.target.tagName === 'LI' && e.target.hasAttribute('data-subitem-id')) {
                    const subItemId = e.target.getAttribute('data-subitem-id');
                    handleSubItemClick(subItemId, data);
                }
            });
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });

    // 點擊服務項目
    function handleServiceClick(serviceId) {
        const serviceTabs = document.querySelectorAll('.service-tabs .service-group');
        const subserviceTabs = document.querySelectorAll('.subservice-tabs');

        // 移除所有服務項目的 active 類
        serviceTabs.forEach(item => item.classList.remove('active'));
        subserviceTabs.forEach(list => list.classList.remove('active'));

        // 設置選中的服務為 active
        const selectedService = Array.from(serviceTabs).find(item => item.getAttribute('data-service') === serviceId);
        selectedService.classList.add('active');

        // 顯示對應服務的子服務
        const selectedSubItems = document.getElementById(`${serviceId}-sub-items`);
        selectedSubItems.classList.add('active');

        const firstSubItem = selectedSubItems.querySelector('li');
        if (firstSubItem) {
            firstSubItem.classList.add('active');
            handleSubItemClick(firstSubItem.getAttribute('data-subitem-id'), data);
        }
    }

    // 點擊子服務項目顯示詳細內容
    function handleSubItemClick(subItemId, data) {
        // 移除所有 subservice-item 的 active 類
        document.querySelectorAll('.subservice-item.active').forEach(item => {
            item.classList.remove('active');
        });

        // 將目前被點擊的 subservice-item 加上 active 類
        const clickedSubItem = document.querySelector(`.subservice-item[data-subitem-id="${subItemId}"]`);
        if (clickedSubItem) {
            clickedSubItem.classList.add('active');
        }
        // 查找對應的子服務項目
        const service = data.find(s => s.subItems.some(sub => sub.id === subItemId));
        const subItem = service.subItems.find(sub => sub.id === subItemId);

        // 更新內容區域
        document.getElementById('item-image').src = subItem.image;
        document.getElementById('content-item-id').textContent = subItem.id;
        document.getElementById('item-name').textContent = subItem.name;
        // document.getElementById('item-description').textContent = subItem.description;
        
        const combinedDescription = subItem.description.join('\n');
        const formattedDescription = combinedDescription.replace(/\n/g, '<br>');
        document.getElementById('item-description').innerHTML = formattedDescription;


        // 清空 item-img-list 內容
        const imgListContainer = document.querySelector('.item-img-list');
        imgListContainer.innerHTML = '';

        // 如果有額外圖片（images 是陣列）
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


        // 顯示內容區
        document.querySelector('.content-panel').classList.add('visible');
    }
});

