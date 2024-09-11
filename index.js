
const {select} = require('@inquirer/prompts')


const start = async () => {
    while(true){
        const opcao = await select({ //aguardar a seleção do usuário
            message: "Menu >",
            choices: [
                {
                    name: "Cadastrar meta",
                    value: "sadastrar"
                },
                {
                    nome: "Listar metas",
                    value: "listar"
                },
                {
                    name: "Sair",
                    value: "sair"
                }
            ]
        })

        switch(opcao){
            case "cadastrar":
                console.log("Vamos cadastrar")
                break
            case "listar":
                console.log("Vamos listar")
            case "sair":
                console.log("Até mais!")
                return
        }
    }
}

start()