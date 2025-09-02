const categoryTabs = document.querySelectorAll('.service-tabs li');
const subcategoryGroups = document.querySelectorAll('.subservice-tabs');

// 你的商品資料（可換成 fetch 資料）
const data = {
  LR460PC: {
    title: "描述",
    description: `L​T3000自動貼標機​ (​上​貼​)
                  ​自動​貼標機L​T3000​是​一​款​可用​在​各​領域​產業​的​袋子、​盒子、​瓶罐、​容器​等​產品，​提供​將貼紙標籤貼​在​平面、​上面​或是​瓶罐容器​等​頂部​或是​蓋子​上​的​設備，​此​設備​讓貼標​過程​自動化，​提高​包裝​過程​的​效率​和​準確性。​非常​適合許多​快速型​的​消費性​產品​的​要求，​例如​: 記​憶卡、​RF​ID、​紙盒、​塑膠盒、​鋁箔袋、​夾鏈袋、​塑膠袋、​化​妝品、​護理​和​家用​產品。​

                  ​適用​產品​形狀​:
                  ​主要​黏貼​在​產品​平面處，​瓶子​罐容器​黏貼​非環​繞式​單張​標籤，​貼​在​正面、​背面​或是​瓶罐​頂端。​管狀​單面​標籤、​平面​袋裝、​盒子。​


                  ​規格​:
                  馬達​規格：​步進​馬​達驅動
                  貼標​速度​:30-60 pcs/​分 ​(​依據​產品​與標籤尺寸)
                  標籤​尺寸：​(長​)​ 10-​250 mm, (寬)​ 10​-​100 mm
                  標籤​紙捲：​內徑​ 75 mm​, ​外徑​ ​300 mm
                  ​產品​尺寸: (L)​ ​1​400mm (W)​750mm (H​)1459m​m
                  精準度​: ​±​ 1 mm
                  供電​需求: 單​相 ​110V or ​220VAC,​ 50/60Hz , single phase
                  ※ ​尺寸​可能​依配置而​有​差異，​詳細​規格​以​實際​出貨​為準

                  ​✔ 租​賃彈性，​可​短期​或​長期​合作​
                  ✔​ 現場​安裝與​操作​教學​
                  ✔ ​提供​貼標​樣品​測試​與方案​建議​
                  ✔ 如​需整合​印刷與貼標​流程，​也​可​一​併​規劃`,
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
updateContent("LR460PC");


