import con from "./connection.js";

export async function ListaItens() {
        const comando = `
        select * from itens where id_pedido = 1
        `
        let [resposta] = await con.query(comando)

        return resposta;
}

export async function InserirItem(item) {
    const comando = `
        INSERT INTO itens(id_pedido, ds_url, dp_preco, ds_nome, ds_tamanho, ds_acompanhamentos)
        VALUES (?, ?, ?, ?, ?, ?);
    `;

    // Garantir que dp_preco é um número válido com ponto decimal
    const precoFormatado = parseFloat(item.preco.toString().replace(',', '.'));

    let [resposta] = await con.query(comando, [
        item.pedido,
        item.url,
        precoFormatado,
        item.nome,
        item.tamanho,
        JSON.stringify(item.acompanhamentos)
    ]);

    return resposta.insertId;
}


export async function DeleteItem(id) {
    const comando = `
    delete from itens where id_item=?
    `
    let [resposta] = await con.query(comando,[id])
}


