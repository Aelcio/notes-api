const controller = {};

controller.getNotas = () => {
    return [
        {
           Teste: 'Test Get Notas',
        }        
    ];
};

controller.postNotas = () => {
    return 'Teste Incluindo Notas';
};

controller.putNotas = () => {
    return 'Teste Atualizando Notas';
};

controller.deleteNotas = () => {
    return 'Teste Deletando Notas';
};


module.exports = controller;
