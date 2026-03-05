// 1. 加载动画与进度条逻辑 (立即执行，不等页面加载完)
(function initLoader() {
  const progressBar = document.getElementById("progress-bar");
  const loader = document.getElementById("loading-screen");

  if (!progressBar || !loader) return;

  let width = 0;
  // 模拟进度条，前期快后期慢，卡在 90% 等待加载完成
  const interval = setInterval(() => {
    // 还没加载完时，最多跑到 90%
    if (width < 90) {
      width += Math.random() * 5; // 随机增加
      if (width > 90) width = 90;
      progressBar.style.width = width + "%";
    }
  }, 50);

  // 监听页面真正加载完毕 (图片、CSS等全部就绪)
  window.addEventListener("load", () => {
    clearInterval(interval);
    // 直接拉满
    progressBar.style.width = "100%";

    // 稍微停顿一下展示 100% 状态，然后隐藏
    setTimeout(() => {
      loader.classList.add("fade-out"); // 使用 CSS class 隐藏

      // 允许页面滚动
      document.body.style.overflow = "auto";
      document.body.style.height = "auto";

      // 动画结束后彻底移除，并检查弹窗
      setTimeout(() => {
        loader.style.display = "none";
        checkAnnouncement();
      }, 600); // 对应 CSS transition 时间
    }, 300);
  });
})();

// 2. 筛选逻辑
function filterFiles(category, element) {
  document
    .querySelectorAll(".menu-item")
    .forEach((item) => item.classList.remove("active"));
  element.classList.add("active");

  const categoryNames = {
    all: "全部文件",
    windows: "全部文件 > Windows",
    android: "全部文件 > Android",
    mac: "全部文件 > macOS",
    tutorial: "使用教程",
  };
  const breadcrumb = document.getElementById("breadcrumb");
  if (breadcrumb) breadcrumb.innerText = categoryNames[category];

  const rows = document.querySelectorAll(".file-row");
  let hasVisible = false;

  rows.forEach((row) => {
    if (category === "all" || row.getAttribute("data-category") === category) {
      row.style.display = "flex";
      hasVisible = true;
    } else {
      row.style.display = "none";
    }
  });

  const emptyState = document.getElementById("empty-state");
  if (emptyState) emptyState.style.display = hasVisible ? "none" : "block";
}

// 3. 公告逻辑 (版本控制 + 24小时)
const announcementVersion = "2026.02.02"; // 更新公告版本触发弹窗

function checkAnnouncement() {
  const lastSeenTime = localStorage.getItem("announceTime");
  const lastSeenVersion = localStorage.getItem("announceVersion");
  const now = new Date().getTime();
  const hours24 = 24 * 60 * 60 * 1000;

  if (
    !lastSeenTime ||
    lastSeenVersion !== announcementVersion ||
    now - lastSeenTime > hours24
  ) {
    const modal = document.getElementById("announceModal");
    if (modal) modal.style.display = "flex";
  }
}

function closeModal() {
  const modal = document.getElementById("announceModal");
  if (modal) modal.style.display = "none";

  localStorage.setItem("announceTime", new Date().getTime());
  localStorage.setItem("announceVersion", announcementVersion);
}
