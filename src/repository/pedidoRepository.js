import con from "./connection.js"

export async function SomaPedido() {
    const comando = `
   SELECT SUM(dp_preco) AS total FROM itens WHERE id_pedido = 1;
    `
    let [resposta] = await con.query(comando)

    return resposta[0]
}

export async function QuantidadeItens() {
    const comando = `
        SELECT COUNT(*) AS total
        FROM itens;
    `
    let [resposta] = await con.query(comando)

    return resposta[0]
}

export async function pedido() {
    const comando = `
            SELECT p.id_pedido, p.ds_estado, 
            i.id_item, i.ds_url, i.dp_preco, i.ds_nome, i.ds_tamanho, i.ds_acompanhamentos
            FROM pedido p
            JOIN itens i ON p.id_pedido = i.id_pedido
            WHERE p.id_pedido = 1;
    `
    let [resposta] = await con.query(comando)

    return resposta
}

export async function alterar(id, status) {
    const comando = `
        UPDATE pedido SET ds_estado = ? WHERE id_pedido = ?;
    `

    let [resposta] = await con.query(comando, [status,id]);
    return resposta.affectedRows;
}

export async function buscaFinalizado() {
    const comando = `
                SELECT p.id_pedido, p.ds_estado, 
                i.id_item, i.ds_url, i.dp_preco, i.ds_nome, i.ds_tamanho, i.ds_acompanhamentos
                FROM pedido p
                JOIN itens i ON p.id_pedido = i.id_pedido
                WHERE p.ds_estado = 'Saiu para entrega';
                    `

    let [resposta] = await con.query(comando);
    return resposta
}

export async function buscaEmPreparo() {
    const comando = `
                SELECT p.id_pedido, p.ds_estado, 
                i.id_item, i.ds_url, i.dp_preco, i.ds_nome, i.ds_tamanho, i.ds_acompanhamentos
                FROM pedido p
                JOIN itens i ON p.id_pedido = i.id_pedido
                WHERE p.ds_estado = 'Em Preparo';
                    `

    let [resposta] = await con.query(comando);
    return resposta
}

/*
export async function DeletePedidoComItens(id_pedido) {
    const connection = await con.getConnection();
    try {
        // Iniciar a transação
        await connection.beginTransaction();

        // Deletar itens associados ao pedido
        const deleteItensQuery = `DELETE FROM itens WHERE id_pedido = ?`;
        await connection.query(deleteItensQuery, [id_pedido]);

        // Deletar o próprio pedido
        const deletePedidoQuery = `DELETE FROM pedidos WHERE id_pedido = ?`;
        await connection.query(deletePedidoQuery, [id_pedido]);

        // Confirmar a transação
        await connection.commit();
    } catch (error) {
        // Reverter a transação em caso de erro
        await connection.rollback();
        throw error;
    } finally {
        // Liberar a conexão
        connection.release();
    } */

        export async function DeletePedidoComItens(id_pedido) {
            try {
                // Iniciar a transação
                await con.beginTransaction();
        
                // Deletar itens associados ao pedido
                const deleteItensQuery = `DELETE FROM itens WHERE id_pedido = ?`;
                await con.query(deleteItensQuery, [id_pedido]);
        
                // Deletar o próprio pedido
                const deletePedidoQuery = `DELETE FROM pedido WHERE id_pedido = ?`;
                await con.query(deletePedidoQuery, [id_pedido]);
                 // Redefinir o AUTO_INCREMENT para a tabela pedido
        await con.query(`ALTER TABLE pedido AUTO_INCREMENT = 1`);

        // Reinserir o pedido inicial
                await con.query(`INSERT INTO pedido (ds_estado) VALUES ('Em Preparo')`);

                // Confirmar a transação
                await con.commit();
            } catch (error) {
                // Reverter a transação em caso de erro
                await con.rollback();
                throw error;
            }
        }
        

