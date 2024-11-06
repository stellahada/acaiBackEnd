import { Router } from "express";
const endpoinst = Router();

import { gerarToken } from "../utils/jwt.js";
import logarService from "../service/login/loginService.js";


endpoinst.post('/login',async(req,resp)=>{
    try{
        const informacoes =req.body;
        let resposta = await logarService(informacoes);
        let token = gerarToken(resposta);
        resp.send({
            token
        })
    }catch (err) {
        resp.status(401).send({ erro: err.message });
    }


})



export default endpoinst