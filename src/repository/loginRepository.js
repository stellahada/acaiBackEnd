import con from "./connection.js";


export async function logar(informacoes){
const comando = `
        select id_login     as id,
             ds_email     as email
        from login
         where ds_email = ? 
         and ds_senha = ?
`

const [resposta] = await con.query(comando,[informacoes.email,informacoes.senha]);

return resposta[0];

} 