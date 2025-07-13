document.addEventListener('DOMContentLoaded', () => {
const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
const logoutButton = document.getElementById('logout-button');

if (isLoggedIn) {
  document.getElementById('auth-buttons').style.display = 'none';
  document.getElementById('user-profile').style.display = 'flex';
  logoutButton.style.display = 'block';

  document.querySelector('.name').textContent = localStorage.getItem('username') || '이름';
  document.querySelector('.type').textContent = localStorage.getItem('knitType') || 'knit type';



  // 이벤트 중복 방지
  if (!logoutButton.dataset.listenerAdded) {
    logoutButton.addEventListener('click', () => {
      localStorage.removeItem('loggedIn');
      localStorage.removeItem('username');
      localStorage.removeItem('knitType');
      window.location.reload();
    });
    logoutButton.dataset.listenerAdded = 'true'; // 플래그 표시
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
    // 로그인 되어 있으면 글쓰기 페이지로 이동
    window.location.href = 'write.html'; // 글쓰기 페이지 주소로 수정하세요
  }
});


const tabs = document.querySelectorAll('.tab');
const contents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    // 모든 탭 비활성화
    tabs.forEach(t => t.classList.remove('active'));
    contents.forEach(c => c.classList.remove('active'));

    // 클릭한 탭 활성화
    tab.classList.add('active');
    const target = tab.getAttribute('data-tab');
    document.getElementById(target).classList.add('active');
  });
});

document.querySelectorAll('.menu-list li').forEach(menuItem => {
  menuItem.addEventListener('click', () => {
    const tabName = menuItem.dataset.tab;
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const container = document.getElementById(tabName);

    // 상단 탭 텍스트 바꾸기
    document.querySelector('.tab.active').textContent = tabName;

    // 글 필터링
    const filtered = posts.filter(post => post.board === tabName);

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
});