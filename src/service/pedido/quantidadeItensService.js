import { QuantidadeItens } from "../../repository/pedidoRepository.js";

export default async function QuantidadeItensService() {
    let total = await QuantidadeItens();
    return total
}