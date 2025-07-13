document.addEventListener('DOMContentLoaded', () => {
  const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
  const logoutButton = document.getElementById('logout-button');
  const searchInput = document.querySelector('.search input');
  const searchButton = document.querySelector('.search-btn');
  const menuItems = document.querySelectorAll('.menu-list li');
  
  // 로그인 상태에 따른 UI 처리
  if (isLoggedIn) {
    document.getElementById('auth-buttons').style.display = 'none';
    document.getElementById('user-profile').style.display = 'flex';
    logoutButton.style.display = 'block';
    document.querySelector('.name').textContent = localStorage.getItem('username') || '이름';
    document.querySelector('.type').textContent = localStorage.getItem('knitType') || 'knit type';
    
    
    if (!logoutButton.dataset.listenerAdded) {
      logoutButton.addEventListener('click', () => {
        localStorage.removeItem('loggedIn');
        localStorage.removeItem('username');
        localStorage.removeItem('knitType');
        window.location.reload();
      });
      logoutButton.dataset.listenerAdded = 'true'; // 이벤트 리스너 추가 확인
    }
  } else {
    document.getElementById('auth-buttons').style.display = 'block';
    document.getElementById('user-profile').style.display = 'none';
    logoutButton.style.display = 'none';
  }

  document.querySelector('.write-btn').addEventListener('click', (e) => {
    const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
    if (!isLoggedIn) {
      alert('로그인 후에 글쓰기가 가능합니다.');
    } else {
      window.location.href = 'write.html';
    }
  });

  // 메뉴 리스트 클릭 시
  menuItems.forEach(menuItem => {
    menuItem.addEventListener('click', () => {
      const tabName = menuItem.dataset.tab; // 클릭한 탭의 이름
      const posts = JSON.parse(localStorage.getItem('posts')) || [];
      const container = document.getElementById(tabName); // 해당 탭 콘텐츠 div 선택

      // 모든 탭 비활성화
      document.querySelectorAll('.menu-list li').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

      // 클릭한 탭 활성화
      menuItem.classList.add('active');
      container.classList.add('active');

      // 상단 탭 텍스트 변경
      const tabHeader = document.querySelector('.tab.active');
      tabHeader.textContent = menuItem.textContent;  // 클릭한 탭 텍스트로 변경

      // 게시판별 필터링
      let filtered = posts.filter(post => post.board === tabName);

      // 글이 없을 경우 메시지 표시
      if (filtered.length === 0) {
        container.innerHTML = '<p>작성된 글이 없습니다.</p>';
        return;
      }

      let html = '';
      filtered.slice().reverse().forEach(post => {
        html += `
          <div class="post">
            <h3><a href="post.html?id=${post.id}">${post.title}</a></h3>
            <small>${post.date}</small>
          </div>
          <hr/>
        `;
      });

      container.innerHTML = html;
    });
  });

  // 페이지가 새로고침되거나 로드될 때 공지 탭 활성화 및 내용 표시
  const initialTab = '공지';
  const initialPosts = JSON.parse(localStorage.getItem('posts')) || [];
  const initialTabContent = document.getElementById(initialTab);

  // 기본적으로 공지 탭을 클릭한 상태로 처리
  menuItems.forEach(item => {
    if (item.dataset.tab === initialTab) {
      item.classList.add('active');
      const container = document.getElementById(initialTab);
      container.classList.add('active');

      // 공지 탭에 해당하는 글 렌더링
      let html = '';
      const filteredPosts = initialPosts.filter(post => post.board === initialTab);

      if (filteredPosts.length === 0) {
        container.innerHTML = '<p>작성된 글이 없습니다.</p>';
      } else {
        filteredPosts.slice().reverse().forEach(post => {
          html += `
            <div class="post">
              <h3><a href="post.html?id=${post.id}">${post.title}</a></h3>
              <small>${post.date}</small>
            </div>
            <hr/>
          `;
        });
        container.innerHTML = html;
      }
    }
  });

  // 검색 버튼 클릭 시
  searchButton.addEventListener('click', () => {
    const searchTerm = searchInput.value.trim().toLowerCase(); // 검색어
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const activeTab = document.querySelector('.tab.active').dataset.tab; // 현재 활성화된 탭

    if (searchTerm === '') {
      alert('검색어를 입력해 주세요.');
      return;
    }

    // 검색어로 필터링 (제목과 내용에 대해 검색)
    const filteredPosts = posts.filter(post => {
      return (post.title.toLowerCase().includes(searchTerm) || post.content.toLowerCase().includes(searchTerm))
          && post.board === activeTab;
    });

    const container = document.getElementById(activeTab);
    if (filteredPosts.length === 0) {
      container.innerHTML = '<p>검색된 결과가 없습니다.</p>';
      return;
    }

    let html = '';
    filteredPosts.slice().reverse().forEach(post => {
      html += `
        <div class="post">
          <h3><a href="post.html?id=${post.id}">${post.title}</a></h3>
          <small>${post.date}</small>
        </div>
        <hr/>
      `;
    });

    container.innerHTML = html;
  });

  // Enter 키 입력 시 검색
  searchInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();  // 기본 동작인 폼 제출 방지
      searchButton.click();    // 검색 버튼 클릭과 같은 동작
      alert('원하시는 결과가 나오지 않는다면, 페이지 확인 후 검색어를 다시 입력해 주세요.');
    }
  });
});
