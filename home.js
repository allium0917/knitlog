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

