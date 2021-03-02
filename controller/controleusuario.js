const controller = {};

controller.getUsuarios = () => {
    return [
        {
            nome: 'Aelcio',
        },
        {
            nome: 'Marta',
        },
        {
            nome: 'Davi',
        },
    ];
};

controller.postUsuarios = () =>{
    return 'Testando Incluindo Usuário';
}

controller.putUsuarios = () =>{
    return 'Testando Atualizando Usuário';
}

controller.deleteUsuarios = () =>{
    return 'Testando Deletando Usuário';
}

module.exports = controller;
