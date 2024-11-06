import {Router} from 'express'

const endPoints = Router()
import { DeletePedidoComItens } from '../repository/pedidoRepository.js'
import ListaItensService from '../service/itens/listaItensService.js'
import inserirItemService from '../service/itens/inserirItenService.js'
import SomaPedidoService from '../service/pedido/somaPedidoService.js'
import DeleteItemService from '../service/itens/deletarItem.js'
import QuantidadeItensService from '../service/pedido/quantidadeItensService.js'
import buscaPedidoService from '../service/pedido/buscaPedidoService.js'
import alterarStatusService from '../service/pedido/alterarStatus.js'
import buscaFinalizadoService from '../service/pedido/buscaFinalizadoService.js'
import buscaEmPreparoService from '../service/pedido/buscaEmPreparoService.js'

endPoints.get('/pedido/itens',async (req, resp)=>{
    const itens = await ListaItensService();
    console.log(itens)
    resp.send({
        itens:itens
    })
})

endPoints.post('/pedido/item',async (req, resp)=>{
    const itens = req.body
    const id = await inserirItemService(itens);
    resp.send({
        id
    })
})

endPoints.get('/pedido',async (req, resp)=>{
   const pedido = await buscaPedidoService();
    resp.send({
        pedido
    })
})

endPoints.get('/pedido/finalizado',async (req, resp)=>{
    const pedido = await buscaFinalizadoService();
     resp.send({
         pedido
     })
 })

 endPoints.get('/pedido/emPreparo',async (req, resp)=>{
    const pedido = await buscaEmPreparoService();
     resp.send({
         pedido
     })
 })




endPoints.get('/pedido/valor',async (req, resp)=>{
    const valor = await SomaPedidoService();

    resp.send({
        valor
    })
})

endPoints.get('/pedido/quantidade',async (req, resp)=>{
    const total = await QuantidadeItensService();

    resp.send({
        total
    })
})

endPoints.delete('/item/:id',async (req, resp)=>{
    let id = req.params.id
    await DeleteItemService(id);

    resp.send({
        msg:"Item Deletado do carrinho"
    })
})

endPoints.put('/pedido/:id',async (req, resp) => {
    let id = req.params.id;
    const { estado } = req.body;

   let linhasAfetadas= await alterarStatusService(id, estado);

    resp.send({
        linhasAfetadas: linhasAfetadas
    })

})

endPoints.delete('/pedido/:id', async (req, res) => {
    const id_pedido = Number(req.params.id);
    try {
        await DeletePedidoComItens(id_pedido);
        res.status(200).send({ message: 'Pedido e itens associados foram deletados com sucesso.' });
    } catch (error) {
        console.error('Erro ao deletar pedido e itens:', error);
        res.status(500).send({ error: 'Erro ao deletar pedido e itens.' });
    }
}); 

export default endPoints;