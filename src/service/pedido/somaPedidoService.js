import { SomaPedido } from "../../repository/pedidoRepository.js";

export default async function SomaPedidoService() {
    let soma = await SomaPedido();
    return soma
}