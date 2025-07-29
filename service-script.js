const categoryTabs = document.querySelectorAll('.service-tabs li');
const subcategoryGroups = document.querySelectorAll('.subservice-tabs');

// 你的商品資料（可換成 fetch 資料）
const data = {
  LR460PC: {
    title: "描述",
    description: "LR460PC 天氣晴朗",
    image: "images/items/Image01.jpeg",
    num: "LR460PC"
  },
  NLR230: {
    title: "描述",
    description: "NL-230 陰晴不定",
    image: "images/items/Image02.jpeg",
    num: "NL-230"
  },
  LD3053: {
    title: "描述",
    description: "LD3053 狂風暴雨",
    image: "images/items/Image03.jpeg",
    num: "LD3053"
  },
  A04040404: {
    title: "描述",
    description: "qqifo00 晴天霹靂",
    image: "images/items/Image04.jpeg",
    num: "A04040404"
  },
  A05050505: {
    title: "描述",
    description: "0jfn210 綿綿細雨",
    image: "images/items/Image04.jpeg",
    num: "A05050505"
  },
  B0101: {
    title: "描述",
    description: "0jfn210 中杯冰美式",
    image: "images/items/Image04.jpeg",
    num: "B0101"
  }
};

function updateContent(subKey) {
  const info = data[subKey];
  if (!info) return;

  // 預設內容區域隱藏
  const contentPanel = document.querySelector('.content-panel');
  contentPanel.classList.remove('visible'); // 隱藏內容

  setTimeout(() => {
  document.querySelector('.item-title').textContent = info.title;
  document.querySelector('.item-description').textContent = info.description;
  document.querySelector('.item-image').src = info.image;
  document.querySelector('.content-item-num').textContent = info.num;
    
  // 顯示內容區域，觸發動畫
  contentPanel.classList.add('visible');
  }, 600); // 設置延遲
}

// 類別切換
categoryTabs.forEach(cat => {
  cat.addEventListener('click', () => {
    const category = cat.dataset.service;
    categoryTabs.forEach(c => c.classList.remove('active'));
    cat.classList.add('active');

    subcategoryGroups.forEach(group => {
      // group.hidden = group.dataset.service !== category;
      group.classList.remove('active'); // 隱藏所有子選單
      if (group.dataset.service === category) {
        group.classList.add('active'); // 顯示對應的子選單
      }
    });

    // 點擊第一個子分類
    const firstSub = document.querySelector(`.subservice-tabs[data-service="${category}"] li`);
    firstSub?.click();
  });
});

// 子選單切換
subcategoryGroups.forEach(group => {
  group.querySelectorAll('li').forEach(item => {
    item.addEventListener('click', () => {
      const subKey = item.dataset.sub;

      group.querySelectorAll('li').forEach(i => i.classList.remove('active'));
      item.classList.add('active');

      updateContent(subKey);
    });
  });
});

// 預設載入內容
updateContent("LR460PC");0