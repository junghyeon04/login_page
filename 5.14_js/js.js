// function singup(){
//     const id = document.getElementById("id_v").value;
//     const pw = document.getElementById("pw_v").value;

//     localStorage.setItem(id, pw);
//     alert("회원가입 완료");
// }
// document.getElementById("bt1").addEventListener("click", singup);
// // document.getElementById("bt_1").addEventListener("click", singup);
// // let a = document.getElementById("bt1");
// // a.addEventListener("click", singup);

// function login(){
//     const id = document.getElementById("id_l").value;
//     const pw = document.getElementById("pw_l").value;

//     const userData = localStorage.getItem(id);

// if(!userData){
//     alert("존재하지 않는 아이디 입니다");
//     return;
// }

// if(userData === pw){
//     const welcome = document.createElement('div');
//     const welcome2 = document.createElement('h2');

//     welcome2.textContent =`${id}님 환영합니다`

//     welcome.appendChild(welcome2);
//     document.body.appendChild(welcome);
// }else{
//     alert("비밀번호가 틀렸습니다");
// }
// }

// document.getElementById("bt_2").addEventListener("click", login);

// //값이 입력되면 값이 사라지도록
// //h2에 연결해서 화면에 뜰수 있게

// // 로그아웃 함수
// function logout() {
//     localStorage.removeItem("loginUser");
//     location.href = "index.html";
// }


// 개선된 회원가입 함수
function signup() {
    const idInput = document.getElementById("id_v");
    const pwInput = document.getElementById("pw_v");

    const id = idInput.value.trim();
    const pw = pwInput.value.trim();

    // 빈칸 검사
    if (id === "" || pw === "") {
        alert("아이디와 비밀번호를 모두 입력해주세요");
        return;
    }

    // 이미 가입된 아이디 검사
    if (localStorage.getItem(id) !== null) {
        alert("이미 존재하는 아이디입니다");
        return;
    }

    // localStorage에 아이디와 비밀번호 저장
    localStorage.setItem(id, pw);

    alert("회원가입 완료");

    // 회원가입 후 입력값 지우기
    idInput.value = "";
    pwInput.value = "";
}

// 로그인 함수
function login() {
    const idInput = document.getElementById("id_l");
    const pwInput = document.getElementById("pw_l");

    const id = idInput.value.trim();
    const pw = pwInput.value.trim();

    // 빈칸 검사
    if (id === "" || pw === "") {
        alert("아이디와 비밀번호를 모두 입력해주세요");
        return;
    }

    const userData = localStorage.getItem(id);

    // 존재하지 않는 아이디
    if (userData === null) {
        alert("존재하지 않는 아이디입니다");
        return;
    }

    // 비밀번호 일치
    if (userData === pw) {
        localStorage.setItem("loginUser", id);
        location.href = "welcome.html";
    } else {
        alert("비밀번호가 틀렸습니다");
        pwInput.value = "";
    }
}

// 로그아웃 함수
function logout() {
    localStorage.removeItem("loginUser");
    location.href = "index.html";
}

// index.html에서 버튼 연결
const signupBtn = document.getElementById("bt1");
if (signupBtn !== null) {
    signupBtn.addEventListener("click", signup);
}

const loginBtn = document.getElementById("bt_2");
if (loginBtn !== null) {
    loginBtn.addEventListener("click", login);
}

// welcome.html에서 환영 문구 출력
const page = document.body.dataset.page;
if (page === "welcome") {
    const loginUser = localStorage.getItem("loginUser");

    if (loginUser === null) {
        alert("로그인이 필요합니다");
        location.href = "index.html";
    } else {
        document.getElementById("welcome").textContent = `${loginUser}님 환영합니다!`;
    }
}

// welcome.html에서 로그아웃 버튼 연결
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn !== null) {
    logoutBtn.addEventListener("click", logout);
}
