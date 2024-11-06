import { buscaFinalizado } from "../../repository/pedidoRepository.js";

export default async function buscaFinalizadoService() {
    let resp = await buscaFinalizado();
    return resp
}