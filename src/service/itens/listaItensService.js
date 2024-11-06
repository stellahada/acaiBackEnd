import { ListaItens } from "../../repository/itensRepository.js";

export default async function ListaItensService() {
    const itens = await ListaItens();

    return itens
} 