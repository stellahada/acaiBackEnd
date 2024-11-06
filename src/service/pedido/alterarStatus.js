import { alterar } from "../../repository/pedidoRepository.js";

export default async function alterarStatusService(id, status) {

    let linhasAfetadas = await alterar(id, status);
    return linhasAfetadas;
}
