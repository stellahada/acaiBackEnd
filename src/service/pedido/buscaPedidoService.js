import { pedido } from "../../repository/pedidoRepository.js";

export default async function buscaPedidoService() {
    let pedidoResp = await pedido();
    return pedidoResp
}