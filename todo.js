document.getElementById('addTaskBtn').addEventListener('click', addTask);

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const dateInput = document.getElementById('dateInput');
    const taskText = taskInput.value.trim();
    const taskDate = dateInput.value;

    if (taskText === '') {
        alert('할 일을 입력해주세요!');
        return;
    }

    if (taskDate === '') {
        alert('일정을 입력해주세요!');
        return;
    }

    const taskList = document.getElementById('taskList');
    const li = document.createElement('li');
    
    // D-Day 계산
    const today = new Date();
    const targetDate = new Date(taskDate);
    const timeDiff = targetDate - today;
    const daysLeft = Math.floor(timeDiff / (1000 * 3600 * 24));  // 밀리초 -> 일 단위로 변환

    let dDayText = `D-${daysLeft}`;
    if (daysLeft === 0) {
        dDayText = 'D-Day!';
    } else if (daysLeft < 0) {
        dDayText = `D+${Math.abs(daysLeft)}`;
    }

    li.innerHTML = `
        <div>
            <span class="task-text">${taskText}</span>
            <span class="task-date">${taskDate}</span>
            <span class="d-day">${dDayText}</span>
        </div>
        <button class="delete-btn">삭제</button>
    `;

    // 체크박스를 클릭하면 해당 항목이 완료로 표시
    // 체크박스 클릭 시, 'completed' 클래스를 토글하여 완료 표시
    li.querySelector('.task-checkbox').addEventListener('click', () => {
        li.classList.toggle('completed');
    });

    taskList.appendChild(li);
    
    // 입력값 초기화
    taskInput.value = '';
    dateInput.value = '';
}
