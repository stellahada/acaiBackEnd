import { DeleteItem } from "../../repository/itensRepository.js";

export default async function DeleteItemService(id) {
        await DeleteItem(id)
}