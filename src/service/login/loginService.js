import { logar } from "../../repository/loginRepository.js";


export default async function logarService(informacoes) {
    let informacao = await logar(informacoes);
    if (informacao == undefined) {
        throw new Error('Usuario nao Encontrado ou Parametros invalidos');
    }

    return informacao;
}
