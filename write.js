document.addEventListener("DOMContentLoaded", () => {
  const setupDropdown = (buttonId, menuId) => {
    const btn = document.getElementById(buttonId);
    const menu = document.getElementById(menuId);

    // 버튼 클릭 시 드롭다운 열기/닫기
    btn.addEventListener("click", (e) => {
      e.stopPropagation(); // 이벤트 버블링 차단
      const isVisible = menu.style.display === "block";
      closeAllDropdowns();
      if (!isVisible) menu.style.display = "block";
    });

    // 드롭다운 내부 클릭 시 닫힘 방지
    menu.addEventListener("click", (e) => {
      e.stopPropagation();
    });

    // 항목 클릭 시 버튼에 반영하고 닫기
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

  // 외부 클릭 시 드롭다운 닫기
  document.addEventListener("click", () => {
    closeAllDropdowns();
  });

  // 드롭다운 초기화
  setupDropdown("boardBtn", "boardList");
  setupDropdown("prefixBtn", "prefixList");

  // 글쓰기 버튼 클릭 시
  document.querySelector(".submit-btn").addEventListener("click", () => {
    const title = document.querySelector(".title-input").value.trim();
    const content = document.querySelector(".content-input").value.trim();
    const boardText = document.getElementById("boardBtn").textContent.replace(" ▼", "");
    const prefixText = document.getElementById("prefixBtn").textContent.replace(" ▼", "");

    if (!title || !content || boardText === "게시판 선택" || prefixText === "말머리 선택") {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

     const username = localStorage.getItem('username') || '익명';

    const post = {
      id: Date.now(),
      title,
      content,
      board: boardText,
      prefix: prefixText,
      date: new Date().toLocaleString(),
      author: username
    };

    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts.push(post);
    localStorage.setItem("posts", JSON.stringify(posts));

    window.location.href = "home.html";
  });
});
