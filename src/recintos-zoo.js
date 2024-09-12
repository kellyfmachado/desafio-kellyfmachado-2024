class RecintosZoo {

   //Espeficicações dos recintos
   static recintos = [
        {numero: 1, bioma: ['savana'], tamanhoTotal: 10, animais: ['MACACO'], quantidade: [3], espacoDisponivel: 0},                  
        {numero: 2, bioma: ['floresta'], tamanhoTotal: 5, animais: [''], quantidade: [0], espacoDisponivel: 0},  
        {numero: 3, bioma: ['savana', 'rio'], tamanhoTotal: 7, animais: ['GAZELA'], quantidade: [1], espacoDisponivel: 0},
        {numero: 4, bioma: ['rio'], tamanhoTotal: 8, animais: [''], quantidade: [0], espacoDisponivel: 0},
        {numero: 5, bioma: ['savana'], tamanhoTotal: 9, animais: ['LEAO'], quantidade: [1], espacoDisponivel: 0}   
    ];

    //Espeficicações dos animais
    static animais = [
        {especie: 'LEAO', tamanho: 3, bioma: ['savana'], carnivoro: true},                  
        {especie: 'LEOPARDO', tamanho: 2, bioma: ['savana'], carnivoro: true},  
        {especie: 'CROCODILO', tamanho: 3, bioma: ['rio'], carnivoro: true},
        {especie: 'MACACO', tamanho: 1, bioma: ['savana', 'floresta'], carnivoro: false},
        {especie: 'GAZELA', tamanho: 2, bioma: ['savana'], carnivoro: false},
        {especie: 'HIPOPOTAMO', tamanho: 4, bioma: ['savana', 'rio'], carnivoro: false}  
    ];

    //Caclcula o espaço disponível inicialmente em cada recinto
    calculaEspacoInicial(){
        for  (let i=0;i<RecintosZoo.recintos.length;i++){
            let j;
            for  (j=0;j<RecintosZoo.animais.length;j++){
                if (RecintosZoo.recintos[i].animais == RecintosZoo.animais[j].especie) {
                    break;
                } else if (j == (RecintosZoo.animais.length-1)){
                    break;
                }
            }
            RecintosZoo.recintos[i].espacoDisponivel = RecintosZoo.recintos[i].tamanhoTotal - (RecintosZoo.recintos[i].quantidade*RecintosZoo.animais[j].tamanho);
        }
    }

    //Verifica a presença de animais carnívoros no recinto e retorna aquelas que possuem
    verificaCarnivoro(){
        let recintosComCarnivoros = [];
        for(let i=0; i<RecintosZoo.recintos.length; i++){
            for(let j=0; j<RecintosZoo.animais.length; j++){
                if (RecintosZoo.recintos[i].animais == RecintosZoo.animais[j].especie){
                    if(RecintosZoo.animais[j].carnivoro){
                        recintosComCarnivoros.push(RecintosZoo.recintos[i])
                    }
                }
            }
        }

        return recintosComCarnivoros;
    } 

    //Verifica se há espécies no recinto e, caso haja, se o recinto é com savana e rio 
    verificaRecintoHipopotamo(){
        let recintosPossiveis = [];
        for (let i=0; i < RecintosZoo.recintos.length; i++){ 

            if(RecintosZoo.recintos[i].animais != 'HIPOPOTAMO' && RecintosZoo.recintos[i].numero == 3){
                recintosPossiveis.push(RecintosZoo.recintos[i]);
            }
            
            if(RecintosZoo.recintos[i].animais == 'HIPOPOTAMO' || RecintosZoo.recintos[i].animais == ''){
                recintosPossiveis.push(RecintosZoo.recintos[i]);
            }
            
        }

        return recintosPossiveis;
    }

    //Descarta recintos sem animais,caso a quantidade de
    //macacos seja menor que 2 (Já que não podem ficar sozinhos)
    //e retorna os recintos com animais (ou recintos sem animais,
    //(caso a quantidade de macacos seja maior ou igual a 2)
    verificaRecintoMacaco(quantidadeAnimais){
        let recintosPossiveis = [];
        for (let i=0; i<RecintosZoo.recintos.length;i++){

            if(RecintosZoo.recintos[i].quantidade != 0 || quantidadeAnimais > 1){
                recintosPossiveis.push(RecintosZoo.recintos[i]);
            }
        }

        return recintosPossiveis;
    }

    //Contabiliza novo espaço disponível e verifica se há especies diferentes no recinto para considerar espaço extra
    contabilizaEspacoRecinto(animalNovo,quantidadeAnimais){

        let recintosPossiveis = [];
        for(let i=0; i<RecintosZoo.animais.length;i++){

            //Verifica de qual espécie é o animal
            if(animalNovo==RecintosZoo.animais[i].especie){

                for(let j=0; j<RecintosZoo.recintos.length;j++){

                    //Faz uma varredura pelos biomas dos recintos e os biomas dos animais a serem inseridos
                    for (let k=0; k<RecintosZoo.animais[i].bioma.length;k++){
                        for (let l=0;l<RecintosZoo.recintos[j].bioma.length;l++){
                            
                            //Verifica os biomas que o animal se sente confortável
                            if(RecintosZoo.animais[i].bioma[k]==RecintosZoo.recintos[j].bioma[l]){

                                //Contabiliza o novo espaço disponível com a inserção dos animais em recintos vazios ou com animais da mesma espécie
                                if(RecintosZoo.recintos[j].animais==animalNovo || RecintosZoo.recintos[j].animais==''){

                                    if(quantidadeAnimais*RecintosZoo.animais[i].tamanho<=RecintosZoo.recintos[j].espacoDisponivel){
                                        RecintosZoo.recintos[j].espacoDisponivel-= (quantidadeAnimais*RecintosZoo.animais[i].tamanho);
                                        recintosPossiveis.push(RecintosZoo.recintos[j]);
                                    }
                                //Contabiliza o novo espaço disponível com a inserção de animais com espécies diferentes dos que já estão no recinto   
                                } else if (RecintosZoo.recintos[j].animais!=animalNovo) {
                                    
                                    if(quantidadeAnimais*RecintosZoo.animais[i].tamanho<=(RecintosZoo.recintos[j].espacoDisponivel-1)){
                                        RecintosZoo.recintos[j].espacoDisponivel--;
                                        RecintosZoo.recintos[j].espacoDisponivel-= (quantidadeAnimais*RecintosZoo.animais[i].tamanho);
                                        recintosPossiveis.push(RecintosZoo.recintos[j]); 
                                    }
                                }
                            }
                        }
                    }
                }
            }  
        }

        return(recintosPossiveis);

    }

    analisaRecintos(animal, quantidade) {

        new RecintosZoo().calculaEspacoInicial();

        let resultado = {
            erro: null,
            recintosViaveis: []
        };

        //Auxilia a verificar se o animal é válido
        let aux=false;

        for (let i=0; i<RecintosZoo.animais.length;i++){

            //Verifica se o animal está entre as possibilidades de animais do Zoológico    
            if(animal == RecintosZoo.animais[i].especie){

                aux=true;

                //Verifica se a quantidade é válida
                if (quantidade>0){
 
                    let recintosComEspaco = new RecintosZoo().contabilizaEspacoRecinto(animal,quantidade);
                    let recintosComCarnivoros = new RecintosZoo().verificaCarnivoro();

                    let haRecintosViaveis = false;

                    if (animal=='MACACO'){
                        
                        const recintosPossiveis = [];

                        let recintosParaMacacos = new RecintosZoo().verificaRecintoMacaco(quantidade);

                        //Verifica quais recintos com espaço para os macacos não possuem animais carnívoros
                        for(let j=0;j<recintosComCarnivoros.length;j++){
                            for(let k=0;k<recintosComEspaco.length;k++){
                                if(recintosComCarnivoros[j].numero != recintosComEspaco[k].numero){
                                    recintosPossiveis.push(recintosComEspaco[k]);
                                }
                            }
                        }

                        //Dos recintos anteriores, verifica quais estão de acordo com as regras 
                        //de conforto particulares dos macacos
                        for(let j=0;j<recintosPossiveis.length;j++){
                            for(let k=0;k<recintosParaMacacos.length;k++){
                                
                                if(recintosPossiveis[j].numero == recintosParaMacacos[k].numero){
                                    haRecintosViaveis = true;
                                    resultado.recintosViaveis.push("Recinto "+ recintosPossiveis[j].numero +" (espaço livre: " + recintosPossiveis[j].espacoDisponivel + " total: " + recintosPossiveis[j].tamanhoTotal + ")");
                                    console.log("Recinto "+ recintosPossiveis[j].numero +" (espaço livre: " + recintosPossiveis[j].espacoDisponivel + " total: " + recintosPossiveis[j].tamanhoTotal + ")");
                                }
                            }
                        }
    
                    } else if(animal=='HIPOPOTAMO'){
                        
                        const recintosPossiveis = [];

                        let recintosParaHipopotamos = new RecintosZoo().verificaRecintoHipopotamo();

                        //Verifica quais recintos com espaço para os hipopótamos não possuem animais carnívoros
                        for(let j=0;j<recintosComCarnivoros.length;j++){
                            for(let k=0;k<recintosComEspaco.length;k++){
                                if(recintosComCarnivoros[j].numero != recintosComEspaco[k].numero){
                                    recintosPossiveis.push(recintosComEspaco[k]);
                                }
                            }
                        }

                        //Dos recintos anteriores, verifica quais estão de acordo com as regras 
                        //de conforto particulares dos hipopótamos
                        for(let j=0;j<recintosPossiveis.length;j++){
                            for(let k=0;k<recintosParaHipopotamos.length;k++){
                                if(recintosPossiveis[j].numero == recintosParaHipopotamos[k].numero){
                                    haRecintosViaveis = true;
                                    resultado.recintosViaveis.push("Recinto " + recintosPossiveis[j].numero  + " (espaço livre: " + recintosPossiveis[j].espacoDisponivel + " total: " + recintosPossiveis[j].tamanhoTotal + ")");
                                    console.log("Recinto " + recintosPossiveis[j].numero  + " (espaço livre: " + recintosPossiveis[j].espacoDisponivel + " total: " + recintosPossiveis[j].tamanhoTotal + ")");
                                }
                            }
                        }

                    } else if (animal=='GAZELA'){

                        //Verifica quais recintos com espaço para as gazelas não possuem animais carnívoros
                        for(let j=0;j<recintosComCarnivoros.length;j++){
                            for(let k=0;k<recintosComEspaco.length;k++){
                                if(recintosComCarnivoros[j].numero != recintosComEspaco[k].numero){
                                    haRecintosViaveis = true;
                                    resultado.recintosViaveis.push("Recinto " + recintosComEspaco[k].numero + " (espaço livre: " + recintosComEspaco[k].espacoDisponivel + " total: " + recintosComEspaco[k].tamanhoTotal + ")");
                                    console.log("Recinto " + recintosComEspaco[k].numero + " (espaço livre: " + recintosComEspaco[k].espacoDisponivel + " total: " + recintosComEspaco[k].tamanhoTotal + ")");
                                }
                            }
                        }

                    } else {

                        //Verifica se os recintos com espaço para os carnívoros estão vazios
                        //ou se possuem animais da mesma espécie
                        for(let j=0;j<recintosComEspaco.length;j++){
                            if(recintosComEspaco[j].animais == animal || recintosComEspaco[j].animais == ''){
                                haRecintosViaveis = true;
                                resultado.recintosViaveis.push("Recinto " + recintosComEspaco[j].numero + " (espaço livre: " + recintosComEspaco[j].espacoDisponivel + " total: " + recintosComEspaco[j].tamanhoTotal + ")");
                                console.log("Recinto " + recintosComEspaco[j].numero + " (espaço livre: " + recintosComEspaco[j].espacoDisponivel + " total: " + recintosComEspaco[j].tamanhoTotal + ")");
                            }
                         }
                        
                    }

                    if(!haRecintosViaveis){
                        resultado.recintosViaveis = null;
                        resultado.erro = "Não há recinto viável";
                        console.error("Não há recinto viável");
                    }

                } else {
                    resultado.recintosViaveis = null;
                    resultado.erro = "Quantidade inválida";
                    console.error("Quantidade inválida");
                }

            } 
  
        }

        if (!aux){        
            resultado.recintosViaveis = null;
            resultado.erro = "Animal inválido";
            console.error("Animal inválido");
        }

        return resultado;
    }

}

//Passagem dos argumentos e chamada do método
const argumentos = process.argv.slice(2);
new RecintosZoo().analisaRecintos(argumentos[0],argumentos[1]);

export { RecintosZoo as RecintosZoo };
