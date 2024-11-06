import { InserirItem } from "../../repository/itensRepository.js"

export default async function inserirItemService(item) {
    console.log(item)
    const id = await InserirItem(item)
    return id
}