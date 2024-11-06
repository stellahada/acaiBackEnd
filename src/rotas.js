import acaiController from './controller/acaiController.js'
import login from './controller/loginController.js'

export default function adicionarRotas(servidor){
    servidor.use(acaiController)
    servidor.use(login);
}