document.getElementById("signupForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const knitType = document.getElementById("knit-type").value.trim();
  const errorMessage = document.getElementById("error-message");

  // 유효성 검사
  if (password !== confirmPassword) {
    errorMessage.textContent = "비밀번호가 일치하지 않습니다.";
    return;
  }

  if (password.length < 6) {
    errorMessage.textContent = "비밀번호는 6자 이상이어야 합니다.";
    return;
  }

  if (!knitType) {
    errorMessage.textContent = "뜨개 유형을 입력해주세요.";
    return;
  }

  // 아이디 중복 확인
  if (localStorage.getItem("user_" + username)) {
    errorMessage.textContent = "이미 존재하는 아이디입니다.";
    return;
  }

  // 사용자 정보 저장
  const userData = {
    username: username,
    email: email,
    password: password,   // ⚠️ 실제 서비스에서는 해시처리 필요
    knitType: knitType
  };

  localStorage.setItem("user_" + username, JSON.stringify(userData));

  errorMessage.textContent = "";
  alert("회원가입 성공!");
  window.location.href = "login.html";
});
