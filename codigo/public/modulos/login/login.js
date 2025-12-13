
const CHAVE_USUARIOS = 'db_usuarios';
const CHAVE_USUARIO_LOGADO = 'usuario_logado';

function initUsers() {
    let usuarios = localStorage.getItem(CHAVE_USUARIOS);
    if (!usuarios) {
        let adminUser = {
            login: 'admin',
            senha: '123',
            nome: 'Administrador do Sistema',
            email: 'admin@retechna.com',
            admin: true 
        };
        localStorage.setItem(CHAVE_USUARIOS, JSON.stringify([adminUser]));
    }
}

function addUser(nome, login, senha, email) {
    let usuarios = JSON.parse(localStorage.getItem(CHAVE_USUARIOS) || '[]');
    
    // Verifica se login já existe
    if (usuarios.find(u => u.login === login)) {
        alert("Usuário já existe!");
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
    
    // Procura o usuário
    let user = usuarios.find(u => u.login === login && u.senha === senha);

    if (user) {
        // Salva o usuário logado na sessão
        localStorage.setItem(CHAVE_USUARIO_LOGADO, JSON.stringify(user));
        return true;
    } else {
        return false;
    }
}

function logoutUser() {
    localStorage.removeItem(CHAVE_USUARIO_LOGADO);
    window.location.href = '/codigo/public/login.html'; 
}

function getUsuarioCorrente() {
    let usuarioJSON = localStorage.getItem(CHAVE_USUARIO_LOGADO);
    return usuarioJSON ? JSON.parse(usuarioJSON) : null;
}

// Inicializa o banco ao carregar o script
initUsers();