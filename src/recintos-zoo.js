class RecintosZoo {

   static recintos = [
        {numero: 1, bioma: ['savana'], tamanhoTotal: 10, animais: ['MACACO'], quantidade: 3, espacoDisponivel: 0},                  
        {numero: 2, bioma: ['floresta'], tamanhoTotal: 5, animais: [''], quantidade: 0, espacoDisponivel: 0},  
        {numero: 3, bioma: ['savana', 'rio'], tamanhoTotal: 7, animais: ['GAZELA'], quantidade: 1, espacoDisponivel: 0},
        {numero: 4, bioma: ['rio'], tamanhoTotal: 8, animais: [''], quantidade: 0, espacoDisponivel: 0},
        {numero: 5, bioma: ['savana'], tamanhoTotal: 9, animais: ['LEAO'], quantidade: 1, espacoDisponivel: 0}   
    ];

    static animais = [
        {especie: 'LEAO', tamanho: 3, bioma: ['savana'], carnivoro: true},                  
        {especie: 'LEOPARDO', tamanho: 2, bioma: ['savana'], carnivoro: true},  
        {especie: 'CROCODILO', tamanho: 3, bioma: ['rio'], carnivoro: true},
        {especie: 'MACACO', tamanho: 1, bioma: ['savana', 'floresta'], carnivoro: false},
        {especie: 'GAZELA', tamanho: 2, bioma: ['savana'], carnivoro: false},
        {especie: 'HIPOPOTAMO', tamanho: 4, bioma: ['savana', 'rio'], carnivoro: false}  
    ];

    //Valida o espaço disponível inicialmente em cada recinto
    calculaEspacoInicial(){
        for  (let i=0;i<RecintosZoo.recintos.length;i++){
            let j;
            for  (j=0;j<RecintosZoo.animais.length;j++){
                if (RecintosZoo.recintos[i].animais[0] == RecintosZoo.animais[j].especie) {
                    break;
                } else if (j == (RecintosZoo.animais.length-1)){
                    break;
                }
            }
            RecintosZoo.recintos[i].espacoDisponivel = RecintosZoo.recintos[i].tamanhoTotal - (RecintosZoo.recintos[i].quantidade*RecintosZoo.animais[j].tamanho);
            console.log(RecintosZoo.recintos[i].espacoDisponivel);
        }
    }

    //TODO:
    //Verifica a presença de animais carnívoros no recinto
    verificaCarnivoro(animaisRecinto, animaisNovos){

    } 

    //TODO:
    //Verifica se há espécies no recinto e, caso haja, se o recinto é com savana e rio 
    veirificaRecintoHipopotamo(){

    }

    //TODO:
    //Verifica se há outros animais no recinto
    verificaRecintoMacaco(){

    }

    //TODO:
    //Verifica se há especies diferentes no recinto para considerar espaço extra
    contabilizaEspacoRecinto(){

    }

    analisaRecintos() {
        new RecintosZoo().calculaEspacoInicial();
    }

}

new RecintosZoo().analisaRecintos();

export { RecintosZoo as RecintosZoo };
