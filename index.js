
const {select, input, checkbox} = require('@inquirer/prompts')

let mensagem = "Bem-vindo(a) ao To Do List!"

let meta = {
    value: "Tomar 2L de água por dia",
    checked: false,
}

let metas = [ meta ]

const cadastrarMeta = async () => {
    const meta = await input({message: "Digite a meta: "})

    if(meta.length == 0){
        mensagem = "A meta não pode ser vazia."
        return
    }

    metas.push(
        { value: meta, checked: false}
    )

    mensagem = "Meta cadastrada com sucesso!"
} 

const listarMetas = async () => {
    const respostas = await checkbox({
        message: "Use as setas para mudar de meta, o espaço para marcar ou desmarcar e o Enter para finalizar essa etapa",
        choices: [...metas],
        instructions: false
    })

    metas.forEach((m) => {
        m.checked = false
    })

    if(respostas.length == 0){
        mensagem = "Nenhuma meta foi selecionada!"
        return
    }

    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })

        meta.checked = true
    })

    mensagem = "Meta(s) marcada(s) como concluída(s)!"
}

const metasRealizadas = async () => {
    const realizadas = metas.filter((meta) => {
        return meta.checked
    })

    if(realizadas.length == 0){
        mensagem = "Não existe metas realizadas... :("
        return
    }

    await select({
        message: "Metas realizadas " + realizadas.length,
        choices: [...realizadas]
    })
}

const metasAbertas = async () => {
    const abertas = metas.filter((meta) => {
        return meta.checked != true
    })

    if(abertas.length == 0){
        mensagem = "Não existem metas abertas :)"
        return
    }

    await select({
        message: "Metas Abertas: " + abertas.length,
        choices: [...abertas]
    })
}

const removerMetas = async () => {
    const metasDesmarcadas = metas.map((meta) => {
        return {value: meta.value, checked: false}
    })

    const itensADeletar = await checkbox({
        message: "Selecione o item que deseja ser removido",
        choices: [...metasDesmarcadas],
        instructions: false
    })

    if(itensADeletar == 0){
        mensagem = "Nenhum item para deletar."
        return
    }

    itensADeletar.forEach((item) => {
        metas = metas.filter((meta) => {
            return meta.value != item
        })
    })

    mensagem = "Meta(s) deletada(s) com sucesso!"

}

const mostrarMensagem = () => {
    console.clear()

    if(mensagem != ""){
        console.log(mensagem)
        console.log("")
        mensagem = ""
    }
}

const start = async () => {
    while(true){
        mostrarMensagem()

        const opcao = await select({ //aguardar a seleção do usuário
            message: "Menu > ",
            choices: [
                {
                    name: "Cadastrar meta",
                    value: "cadastrar"
                },
                {
                    nome: "Listar metas",
                    value: "listar"
                },
                {
                    nome: "Metas Realizadas",
                    value: "realizadas"
                },
                {
                    nome: "Metas Abertas",
                    value: "abertas"
                },
                {
                    nome: "Remover metas",
                    value: "remover"
                },
                {
                    name: "Sair",
                    value: "sair"
                }
            ]
        })

        switch(opcao){
            case "cadastrar":
                await cadastrarMeta()
                break
            case "listar":
                await listarMetas()
                break
            case "realizadas":
                await metasRealizadas()
                break
            case "abertas":
                await metasAbertas()
                break
            case "remover":
                await removerMetas()
                break
            case "sair":
                console.log("Até mais!")
                return
        }
    }
}

start()