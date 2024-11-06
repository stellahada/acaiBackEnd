import { buscaEmPreparo } from "../../repository/pedidoRepository.js";

export default async function buscaEmPreparoService() {
    let resp = await buscaEmPreparo();
    return resp
}