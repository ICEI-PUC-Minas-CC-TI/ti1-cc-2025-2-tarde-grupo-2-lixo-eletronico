
const CHAVE_USUARIOS = 'db_usuarios';
const CHAVE_USUARIO_LOGADO = 'usuario_logado';

// --- 1. FUNÇÃO DE PROTEÇÃO ---
function verificarAcessoRestrito() {
    // Se estiver na própria página de login, ignora
    if (window.location.pathname.includes('modulos/login/login.html')) return;

    const path = window.location.pathname.toLowerCase();
    const usuarioLogado = getUsuarioCorrente();

    // Se tentar acessar as pastas de CRUD sem estar logado
    if ((path.includes('crud') || path.includes('modulos')) && !usuarioLogado) {
        alert("Acesso negado! Faça login primeiro.");
        window.location.href = '../../login/login.html'; 
    }
}

// --- 2. INICIALIZAÇÃO DO BANCO (Cria Admin) ---
function initUsers() {
    let usuarios = JSON.parse(localStorage.getItem(CHAVE_USUARIOS) || '[]');
    const adminExiste = usuarios.find(u => u.login === 'admin');

    if (!adminExiste) {
        let adminUser = {
            login: 'admin',
            senha: '123',
            nome: 'Administrador',
            email: 'admin@retechna.com',
            admin: true 
        };
        usuarios.push(adminUser);
        localStorage.setItem(CHAVE_USUARIOS, JSON.stringify(usuarios));
    }
}

// --- 3. FUNÇÕES DO SISTEMA ---
function addUser(nome, login, senha, email) {
    let usuarios = JSON.parse(localStorage.getItem(CHAVE_USUARIOS) || '[]');
    
    if (usuarios.find(u => u.login === login)) {
        alert("Erro: Este login já existe!");
        return false;
    }

    let novoUsuario = {
        login: login,
        senha: senha,
        nome: nome,
        email: email,
        admin: false 
    };

    usuarios.push(novoUsuario);
    localStorage.setItem(CHAVE_USUARIOS, JSON.stringify(usuarios));
    return true;
}

function loginUser(login, senha) {
    let usuarios = JSON.parse(localStorage.getItem(CHAVE_USUARIOS) || '[]');
    let user = usuarios.find(u => u.login === login && u.senha === senha);

    if (user) {
        localStorage.setItem(CHAVE_USUARIO_LOGADO, JSON.stringify(user));
        return true;
    }
    return false;
}

function logoutUser() {
    localStorage.removeItem(CHAVE_USUARIO_LOGADO);
    // Ajuste este caminho se necessário para onde está seu login.html
    window.location.href = 'modulos/login/login.html';
}

function getUsuarioCorrente() {
    let usuarioJSON = localStorage.getItem(CHAVE_USUARIO_LOGADO);
    return usuarioJSON ? JSON.parse(usuarioJSON) : null;
}

// Executa ao carregar
initUsers();
verificarAcessoRestrito();