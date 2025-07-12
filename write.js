document.addEventListener("DOMContentLoaded", () => {
  const setupDropdown = (buttonId, menuId) => {
    const btn = document.getElementById(buttonId);
    const menu = document.getElementById(menuId);

    // 버튼 클릭 시 토글
    btn.addEventListener("click", (e) => {
      e.stopPropagation(); // 이벤트 버블링 차단
      const isVisible = menu.style.display === "block";
      closeAllDropdowns();
      if (!isVisible) menu.style.display = "block";
    });

    // 메뉴 클릭 시 이벤트 버블링 차단
    menu.addEventListener("click", (e) => {
      e.stopPropagation(); // 이게 중요합니다!
    });

    // 메뉴 항목 클릭 시 적용 및 닫기
    menu.querySelectorAll("li").forEach((item) => {
      item.addEventListener("click", () => {
        btn.textContent = item.textContent + " ▼";
        menu.style.display = "none";
      });
    });
  };

  const closeAllDropdowns = () => {
    document.querySelectorAll(".dropdown-menu").forEach((menu) => {
      menu.style.display = "none";
    });
  };

  // 바깥 클릭 시 드롭다운 닫기
  document.addEventListener("click", () => {
    closeAllDropdowns();
  });

  // 드롭다운 세팅
  setupDropdown("boardBtn", "boardList");
  setupDropdown("prefixBtn", "prefixList");
});
