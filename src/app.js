import 'dotenv/config.js'

import express from 'express';
import cors from 'cors';

import adicionarRotas from './rotas.js';

const servidor = express();

servidor.use(cors())
servidor.use(express.json())

adicionarRotas(servidor);

const porta = process.env.PORT

servidor.listen(porta, ()=> console.log('Servidor Subiu, porta:'+porta))