// 1. 加载动画与进度条逻辑
window.addEventListener("load", () => {
  const progressBar = document.getElementById("progress-bar");
  const loader = document.getElementById("loading-screen");

  // 稍微延迟一点点开始跑进度条，更真实
  setTimeout(() => {
    if (progressBar) progressBar.style.width = "100%";
  }, 100);

  // 进度条动画时间是1.5s，我们在1.6s时隐藏加载页
  setTimeout(() => {
    if (loader) {
      loader.style.opacity = "0";
      // 彻底移除，防止遮挡
      setTimeout(() => {
        loader.style.display = "none";
        checkAnnouncement(); // 加载完后检查弹窗
      }, 500);
    }
  }, 1600);
});

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
    tutorial: "使用教程", // 新增教程面包屑
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
// 只要你修改这个版本号，所有用户都会重新看到弹窗
const announcementVersion = "2025.12.22";

function checkAnnouncement() {
  const lastSeenTime = localStorage.getItem("announceTime");
  const lastSeenVersion = localStorage.getItem("announceVersion");
  const now = new Date().getTime();
  const hours24 = 24 * 60 * 60 * 1000;

  // 逻辑：
  // 1. 如果从未看过 (lastSeenTime 为空)
  // 2. 或者看过的版本不是最新版本 (lastSeenVersion != announcementVersion)
  // 3. 或者距离上次看超过了 24 小时
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

  // 记录当前时间和当前版本号
  localStorage.setItem("announceTime", new Date().getTime());
  localStorage.setItem("announceVersion", announcementVersion);
}
