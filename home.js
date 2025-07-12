document.addEventListener('DOMContentLoaded', () => {
const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
const logoutButton = document.getElementById('logout-button');

if (isLoggedIn) {
  document.getElementById('auth-buttons').style.display = 'none';
  document.getElementById('user-profile').style.display = 'flex';
  logoutButton.style.display = 'block';


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
});