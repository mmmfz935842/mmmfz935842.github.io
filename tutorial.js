/* ============================================================
 * 魔法云盘 - 教程页面公共脚本
 *  - 侧边栏导航
 *  - 滚动 spy
 *  - 返回顶部按钮
 * ============================================================ */

(function () {
  try {
    const items = document.querySelectorAll(".sidebar .menu-item[data-target]");
    const sections = document.querySelectorAll("[data-spy]");
    const scrollContainer = document.getElementById("article-scroll-area") || document.getElementById("faq-scroll-area");
    const btn = document.getElementById("backToTop");

    // 点击：滚动定位
    items.forEach((item) => {
      item.addEventListener("click", () => {
        const id = item.dataset.target;
        const target = document.getElementById(id);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });

    // 滚动 spy：自动高亮当前章节
    if ("IntersectionObserver" in window && scrollContainer) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const id = entry.target.id;
              items.forEach((it) =>
                it.classList.toggle("active", it.dataset.target === id)
              );
            }
          });
        },
        {
          root: scrollContainer,
          rootMargin: "-20% 0px -70% 0px",
          threshold: 0,
        }
      );
      sections.forEach((s) => observer.observe(s));
    }

    // 返回顶部按钮
    if (btn && scrollContainer) {
      scrollContainer.addEventListener("scroll", () => {
        btn.classList.toggle("visible", scrollContainer.scrollTop > 300);
      });

      btn.addEventListener("click", () => {
        scrollContainer.scrollTo({ top: 0, behavior: "smooth" });
      });
    }
  } catch (error) {
    console.error("教程页面初始化失败:", error);
  }
})();
