/* ============================================================
 * 魔法云盘 - 主脚本
 *  - 数据驱动文件列表
 *  - 多镜像下载弹窗 (1→2→3→4 备用)
 *  - 站内搜索
 *  - 分类筛选 / 公告弹窗 / 加载动画
 * ============================================================ */

/* ---------- 1. 镜像加速配置 ---------- */
const MIRRORS = [
  { name: "线路 1 · 主线推荐", prefix: "https://down.388751.xyz/" },
  { name: "线路 2 · 备用 GH-Proxy", prefix: "https://gh-proxy.com/" },
  { name: "线路 3 · 备用 GHProxy.net", prefix: "https://ghproxy.net/" },
  { name: "GitHub 官方直连（需要梯子）", prefix: "" },
];

/* ---------- 2. 文件数据 ---------- */
const FILES = [
  /* === Windows === */
  {
    name: "FlClash-0.8.93-windows-setup.exe",
    desc: "现代化的多平台代理客户端，功能强大且轻量。",
    category: "windows",
    icon: "fa-file-code",
    iconType: "exe",
    date: "2026-06-10",
    tag: { type: "new", text: "最新" },
    url: "https://github.com/chen08209/FlClash/releases/download/v0.8.93/FlClash-0.8.93-windows-amd64-setup.exe",
  },
  {
    name: "Hiddify-setup.exe",
    desc: "界面现代简洁，一键智能连接，非常适合新手用户。",
    category: "windows",
    icon: "fa-file-code",
    iconType: "exe",
    date: "2025-11-20",
    tag: { type: "default", text: "小白推荐" },
    url: "https://github.com/hiddify/hiddify-next/releases/latest/download/Hiddify-Windows-Setup-x64.exe",
  },
  {
    name: "Clash Verge_2.5.1.exe",
    desc: "优秀的 Clash 桌面客户端，UI 美观、功能强大且稳定。",
    category: "windows",
    icon: "fa-file-code",
    iconType: "exe",
    date: "2026-05-21",
    tag: { type: "new", text: "最新" },
    url: "https://github.com/clash-verge-rev/clash-verge-rev/releases/download/v2.5.1/Clash.Verge_2.5.1_x64-setup.exe",
  },
  {
    name: "v2rayN.zip",
    desc: "经典老牌工具，支持协议众多，适合喜欢折腾的进阶用户。",
    category: "windows",
    icon: "fa-file-zipper",
    iconType: "zip",
    date: "2025-11-20",
    url: "https://github.com/2dust/v2rayN/releases/download/7.15.7/v2rayN-windows-64-desktop.zip",
  },

  /* === Android === */
  {
    name: "FlClash-0.8.93.apk",
    desc: "安卓端 FlClash 客户端，界面优雅、支持最新协议配置。",
    category: "android",
    icon: "fa-android",
    iconBrand: true,
    iconType: "apk",
    date: "2026-06-10",
    tag: { type: "new", text: "最新" },
    url: "https://github.com/chen08209/FlClash/releases/download/v0.8.93/FlClash-0.8.93-android-arm64-v8a.apk",
  },
  {
    name: "Hiddify.apk",
    desc: "安卓端通用版本，操作逻辑简单，安装即用。",
    category: "android",
    icon: "fa-android",
    iconBrand: true,
    iconType: "apk",
    date: "2025-11-20",
    tag: { type: "default", text: "小白推荐" },
    url: "https://github.com/hiddify/hiddify-next/releases/latest/download/Hiddify-Android-universal.apk",
  },
  {
    name: "Clash Meta.apk",
    desc: "基于 Meta 内核，兼容性极佳，支持最新协议。",
    category: "android",
    icon: "fa-android",
    iconBrand: true,
    iconType: "apk",
    date: "2025-12-22",
    url: "https://github.com/MetaCubeX/ClashMetaForAndroid/releases/download/v2.11.21/cmfa-2.11.21-meta-universal-release.apk",
  },

  /* === macOS === */
  {
    name: "FlClash-0.8.93_M芯片.dmg",
    desc: "适用于 Apple Silicon (M1/M2/M3/M4) 芯片的 Mac 电脑。",
    category: "mac",
    icon: "fa-compact-disc",
    iconType: "dmg",
    date: "2026-06-10",
    tag: { type: "new", text: "最新" },
    url: "https://github.com/chen08209/FlClash/releases/download/v0.8.93/FlClash-0.8.93-macos-arm64.dmg",
  },
  {
    name: "FlClash-0.8.93_Intel.dmg",
    desc: "适用于旧款 Intel 处理器芯片的 Mac 电脑。",
    category: "mac",
    icon: "fa-compact-disc",
    iconType: "dmg",
    date: "2026-06-10",
    tag: { type: "new", text: "最新" },
    url: "https://github.com/chen08209/FlClash/releases/download/v0.8.93/FlClash-0.8.93-macos-amd64.dmg",
  },
  {
    name: "Clash Verge_2.5.1_M芯片.dmg",
    desc: "适用于 Apple Silicon (M1/M2/M3/M4) 芯片的 Mac 电脑。",
    category: "mac",
    icon: "fa-compact-disc",
    iconType: "dmg",
    date: "2026-05-21",
    tag: { type: "new", text: "最新" },
    url: "https://github.com/clash-verge-rev/clash-verge-rev/releases/download/v2.5.1/Clash.Verge_2.5.1_aarch64.dmg",
  },
  {
    name: "Clash Verge_2.5.1_Intel.dmg",
    desc: "适用于旧款 Intel 处理器芯片的 Mac 电脑。",
    category: "mac",
    icon: "fa-compact-disc",
    iconType: "dmg",
    date: "2026-05-21",
    tag: { type: "new", text: "最新" },
    url: "https://github.com/clash-verge-rev/clash-verge-rev/releases/download/v2.5.1/Clash.Verge_2.5.1_x64.dmg",
  },

  /* === 教程 === */
  {
    name: "FlClash 配置教程",
    desc: "FlClash 全平台客户端导入订阅与使用指南。",
    category: "tutorial",
    icon: "fa-book-journal-whills",
    iconType: "doc",
    date: "2026-06-10",
    tag: { type: "new", text: "最新" },
    isTutorial: true,
    url: "flclashhelp.html",
  },
  {
    name: "Clash Verge 配置教程",
    desc: "教你如何导入订阅、开启系统代理以及基础故障排查。",
    category: "tutorial",
    icon: "fa-book-journal-whills",
    iconType: "doc",
    date: "2026-05-21",
    isTutorial: true,
    url: "clashvergehelp.html",
  },
  {
    name: "Hiddify 使用指南",
    desc: "Hiddify 界面功能详解，如何快速连接节点。",
    category: "tutorial",
    icon: "fa-book-journal-whills",
    iconType: "doc",
    date: "2025-12-22",
    isTutorial: true,
    url: "hiddifyhelp.html",
  },
  {
    name: "常见问题 (FAQ)",
    desc: "下载、安装、连接等常见问题解答。",
    category: "tutorial",
    icon: "fa-circle-question",
    iconType: "doc",
    date: "2026-06-10",
    tag: { type: "new", text: "新" },
    isTutorial: true,
    url: "faq.html",
  },
];

/* ---------- 3. 机场推荐位 (广告) ---------- */
const AIRPORT_CARD_HTML = `
  <a class="airport-card"
     href="https://k.kpyun.live/#/register?code=u26enQba"
     target="_blank" rel="noopener"
     title="Kepa 云 - 推荐机场">
    <span class="airport-ad">推广</span>
    <div class="airport-icon"><i class="fas fa-plane-up"></i></div>
    <div class="airport-info">
      <div class="airport-title">
        <span>Kepa 云 · 推荐机场</span>
        <span class="airport-pill">¥10 / 100G</span>
      </div>
      <div class="airport-desc">
        流媒体ChatGPT解锁，YouTube全天4K无压力！购买套餐送共享小火箭账号，无节点倍率套路！
      </div>
    </div>
    <div class="airport-cta">
      立即开通 <i class="fas fa-arrow-right"></i>
    </div>
  </a>
`;

/* ---------- 4. 状态 ---------- */
const state = {
  category: "all",
  search: "",
};

const CATEGORY_NAMES = {
  all: "全部文件",
  windows: "全部文件 / Windows",
  android: "全部文件 / Android",
  mac: "全部文件 / macOS",
  tutorial: "使用教程",
};

/* ---------- 5. 渲染 ---------- */
function escapeHtml(s) {
  try {
    return String(s).replace(/[&<>"']/g, (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
    );
  } catch (error) {
    console.error("escapeHtml error:", error);
    return String(s);
  }
}

function createFileRow(file) {
  const row = document.createElement("a");
  row.className = "file-row";
  row.dataset.category = file.category;

  if (file.isTutorial) {
    row.href = file.url;
    row.title = "阅读教程";
  } else {
    row.href = "#";
    row.addEventListener("click", (e) => {
      e.preventDefault();
      showDownloadModal(file);
    });
  }

  const tagHTML = file.tag
    ? `<span class="tag-recommend ${
        file.tag.type === "new" ? "new" : file.tag.type === "hot" ? "hot" : ""
      }">${escapeHtml(file.tag.text)}</span>`
    : "";

  const iconClass = file.iconBrand ? "fab" : "fas";
  const actionIcon = file.isTutorial ? "fa-eye" : "fa-download";

  row.innerHTML = `
    <div class="col-name">
      <i class="${iconClass} ${file.icon} file-icon ${file.iconType}"></i>
      <div class="file-info-group">
        <div class="file-name-wrapper">
          <span class="file-name-text">${escapeHtml(file.name)}</span>
          ${tagHTML}
        </div>
        <p class="file-desc">${escapeHtml(file.desc)}</p>
      </div>
    </div>
    <div class="col-date">${escapeHtml(file.date)}</div>
    <div class="col-action">
      <span class="download-btn"><i class="fas ${actionIcon}"></i></span>
    </div>
  `;
  return row;
}

function renderFiles() {
  const list = document.getElementById("fileList");
  const emptyState = document.getElementById("empty-state");
  if (!list || !emptyState) return;

  // 清空旧内容（保留 empty-state）
  [...list.querySelectorAll(".file-row, .airport-card")].forEach((el) =>
    el.remove()
  );

  // 机场推荐位：仅在「全部文件」且无搜索词时展示
  if (state.category === "all" && !state.search) {
    list.insertAdjacentHTML("afterbegin", AIRPORT_CARD_HTML);
  }

  // 过滤
  const term = state.search.trim().toLowerCase();
  const filtered = FILES.filter((f) => {
    const matchCat =
      state.category === "all" || f.category === state.category;
    const matchSearch =
      !term ||
      f.name.toLowerCase().includes(term) ||
      (f.desc && f.desc.toLowerCase().includes(term));
    return matchCat && matchSearch;
  });

  // 插入文件行
  const frag = document.createDocumentFragment();
  filtered.forEach((f) => frag.appendChild(createFileRow(f)));
  list.insertBefore(frag, emptyState);

  emptyState.style.display = filtered.length ? "none" : "block";

  // 面包屑
  const breadcrumb = document.getElementById("breadcrumb");
  if (breadcrumb) {
    breadcrumb.innerText = term
      ? `搜索结果："${state.search}"`
      : CATEGORY_NAMES[state.category] || "全部文件";
  }
}

/* ---------- 6. 分类点击 ---------- */
function bindSidebar() {
  document.querySelectorAll(".sidebar .menu-item[data-category]").forEach((item) => {
    item.addEventListener("click", () => {
      document
        .querySelectorAll(".sidebar .menu-item")
        .forEach((m) => m.classList.remove("active"));
      item.classList.add("active");
      state.category = item.dataset.category;
      renderFiles();
    });
  });
}

/* ---------- 7. 搜索 ---------- */
function bindSearch() {
  const input = document.getElementById("searchInput");
  const clearBtn = document.getElementById("searchClear");
  const box = document.getElementById("searchBox");
  if (!input) return;

  let timer = null;
  input.addEventListener("input", (e) => {
    const v = e.target.value;
    box.classList.toggle("has-value", !!v);
    clearTimeout(timer);
    timer = setTimeout(() => {
      state.search = v;
      renderFiles();
    }, 120);
  });

  clearBtn.addEventListener("click", () => {
    input.value = "";
    box.classList.remove("has-value");
    state.search = "";
    renderFiles();
    input.focus();
  });
}

/* ---------- 8. 下载弹窗 ---------- */
function showDownloadModal(file) {
  try {
    if (!file || !file.url) {
      console.error("无效的文件数据");
      return;
    }

    const modal = document.getElementById("downloadModal");
    const fnameEl = document.getElementById("dlFilename");
    const mirrorsEl = document.getElementById("dlMirrors");
    if (!modal || !fnameEl || !mirrorsEl) return;

    fnameEl.innerHTML = `<i class="fas fa-file-arrow-down"></i> ${escapeHtml(
      file.name
    )}`;

    mirrorsEl.innerHTML = MIRRORS.map((m, i) => {
      const isPrimary = i === 0;
      const isDirect = m.prefix === "";
      const finalUrl = isDirect ? file.url : m.prefix + file.url;
      const iconCls = isDirect ? "fa-globe" : isPrimary ? "fa-rocket" : "fa-route";
      return `
        <a class="dl-mirror-btn ${isPrimary ? "primary" : ""}"
           href="${finalUrl}" target="_blank" rel="noopener">
          <span class="dl-mirror-name">
            <i class="fas ${iconCls}"></i>
            ${escapeHtml(m.name)}
          </span>
          <span class="dl-mirror-arrow">下载 →</span>
        </a>
      `;
    }).join("");

    modal.style.display = "flex";
  } catch (error) {
    console.error("showDownloadModal error:", error);
  }
}

function closeDownloadModal() {
  const modal = document.getElementById("downloadModal");
  if (modal) modal.style.display = "none";
}
window.closeDownloadModal = closeDownloadModal;

/* ---------- 9. 公告 ---------- */
const announcementVersion = "2026.5.21";
function checkAnnouncement() {
  const lastSeenTime = localStorage.getItem("announceTime");
  const lastSeenVersion = localStorage.getItem("announceVersion");
  const now = Date.now();
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
  localStorage.setItem("announceTime", String(Date.now()));
  localStorage.setItem("announceVersion", announcementVersion);
}
window.closeModal = closeModal;

/* ---------- 10. 弹窗：点击遮罩关闭 ---------- */
function bindOverlayClose() {
  document.querySelectorAll(".modal-overlay").forEach((overlay) => {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) overlay.style.display = "none";
    });
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      document
        .querySelectorAll(".modal-overlay")
        .forEach((o) => (o.style.display = "none"));
    }
  });
}

/* ---------- 11. 加载动画 ---------- */
(function initLoader() {
  const progressBar = document.getElementById("progress-bar");
  const loader = document.getElementById("loading-screen");
  if (!progressBar || !loader) return;

  let width = 0;
  const interval = setInterval(() => {
    if (width < 90) {
      width += Math.random() * 5;
      if (width > 90) width = 90;
      progressBar.style.width = width + "%";
    }
  }, 50);

  window.addEventListener("load", () => {
    clearInterval(interval);
    progressBar.style.width = "100%";

    setTimeout(() => {
      loader.classList.add("fade-out");
      document.body.style.overflow = "auto";
      document.body.style.height = "auto";
      setTimeout(() => {
        loader.style.display = "none";
        checkAnnouncement();
      }, 600);
    }, 300);
  });
})();

/* ---------- 12. 返回顶部 ---------- */
function initBackToTop() {
  const btn = document.getElementById("backToTop");
  if (!btn) return;

  const scrollTarget = document.querySelector(".file-list");
  if (!scrollTarget) return;

  scrollTarget.addEventListener("scroll", () => {
    btn.classList.toggle("visible", scrollTarget.scrollTop > 300);
  });

  btn.addEventListener("click", () => {
    scrollTarget.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ---------- 13. 启动 ---------- */
document.addEventListener("DOMContentLoaded", () => {
  try {
    renderFiles();
    bindSidebar();
    bindSearch();
    bindOverlayClose();
    initBackToTop();
  } catch (error) {
    console.error("初始化失败:", error);
  }
});
