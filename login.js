document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorMessage = document.getElementById("error-message");

  const storedUser = localStorage.getItem("user_" + username);

  if (!storedUser) {
    errorMessage.textContent = "존재하지 않는 아이디입니다.";
    return;
  }

  const userData = JSON.parse(storedUser);

  if (userData.password === password) {
    errorMessage.textContent = "";
    alert("로그인 성공!");
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("username", username);
    localStorage.setItem("knitType", userData.knitType); // 저장된 뜨개유형 값 설정
    window.location.href = "home.html";
  } else {
    errorMessage.textContent = "비밀번호가 올바르지 않습니다.";
  }
});
