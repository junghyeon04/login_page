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


//회원가입 함수
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

// 현재 로그인한 사용자만의 todo 저장 이름 만들기
function getTodoKey() {
    const loginUser = localStorage.getItem("loginUser");
    return `todoList_${loginUser}`;
}

// localStorage에서 todo 목록 가져오기
function loadTodos() {
    const savedTodos = localStorage.getItem(getTodoKey());

    if (savedTodos === null) {
        return [];
    }

    return JSON.parse(savedTodos);
}

// todo 목록을 localStorage에 저장하기
function saveTodos(todos) {
    localStorage.setItem(getTodoKey(), JSON.stringify(todos));
}

// todo 목록 화면에 출력하기
function renderTodos() {
    const todoList = document.getElementById("todoList");

    if (todoList === null) {
        return;
    }

    const todos = loadTodos();

    todoList.innerHTML = "";

    todos.forEach(function(todo, index) {
        const li = document.createElement("li");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = todo.checked;

        const span = document.createElement("span");
        span.textContent = todo.text;

        if (todo.checked === true) {
            span.style.textDecoration = "line-through";
        }

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "삭제";

        checkbox.addEventListener("change", function() {
            todos[index].checked = checkbox.checked;
            saveTodos(todos);
            renderTodos();
        });

        deleteBtn.addEventListener("click", function() {
            todos.splice(index, 1);
            saveTodos(todos);
            renderTodos();
        });

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);

        todoList.appendChild(li);
    });
}

// todo 추가하기
function addTodo() {
    const todoInput = document.getElementById("todoInput");

    if (todoInput === null) {
        return;
    }

    const text = todoInput.value.trim();

    if (text === "") {
        alert("할 일을 입력해주세요");
        return;
    }

    const todos = loadTodos();

    const newTodo = {
        text: text,
        checked: false
    };

    todos.push(newTodo);
    saveTodos(todos);

    todoInput.value = "";

    renderTodos();
}

// todo 추가 버튼 연결
const todoBtn = document.getElementById("todoBtn");

if (todoBtn !== null) {
    todoBtn.addEventListener("click", addTodo);
    renderTodos();
}

// 엔터 키로 todo 추가
const todoInput = document.getElementById("todoInput");

if (todoInput !== null) {
    todoInput.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            addTodo();
        }
    });
}