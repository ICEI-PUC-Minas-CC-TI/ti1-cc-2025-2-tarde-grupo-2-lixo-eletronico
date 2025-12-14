document.addEventListener("DOMContentLoaded", function () {
    atualizarMenu();
});

function atualizarMenu() {
    const usuarioLogado = JSON.parse(localStorage.getItem('usuario_logado'));
    
    const btnLogin = document.getElementById("btnLogin"); 
    const menuGerenciar = document.getElementById("menuGerenciar"); 
    const userInfo = document.getElementById("userInfo"); 

    if (usuarioLogado) {

        if (btnLogin) {
            btnLogin.innerHTML = '<i class="fas fa-sign-out-alt me-2"></i>Sair';
            btnLogin.classList.remove("btn-outline-success");
            btnLogin.classList.add("btn-outline-danger");
            btnLogin.href = "#";
            btnLogin.onclick = function (e) {
                e.preventDefault();
                logoutUser();
            };
        }

        if (userInfo) {
            userInfo.innerHTML = `Olá, ${usuarioLogado.nome}`;
        }

        if (usuarioLogado.login === 'admin' || usuarioLogado.admin === true) {
            if (menuGerenciar) {
                menuGerenciar.classList.remove("d-none"); 
            }
        } else {
            if (menuGerenciar) {
                menuGerenciar.classList.add("d-none");
            }
        }

    } else {
        if (menuGerenciar) menuGerenciar.classList.add("d-none");
        if (userInfo) userInfo.innerHTML = "";
        
        if (btnLogin) {
            btnLogin.innerHTML = 'Login';
            btnLogin.href = "modulos/login/login.html";
            btnLogin.onclick = null; 
        }
    }
}