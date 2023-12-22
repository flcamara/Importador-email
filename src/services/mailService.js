
import csv from 'csvtojson'
import { fileURLToPath } from 'url';
import { dirname }  from 'path'
import nodemailer from 'nodemailer'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



async function processCsvFile(file) {
    const baseDir = process.cwd() + '/tmp/uploads/';
    let mail = null;
    const params = {
        import_status: 0,
        flag_status: 0,
        filename: file.file
    };

    try {
        mail = await csv({ delimiter: "," }).fromFile(baseDir + file.file);
    } catch (error) {
        console.log(`Erro ao importar o arquivo ${params.filename}`);
        console.log(error);
    }

    try {

        mail.forEach(element => {
            
            if (! /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(element.email)) {
                console.log('E-mail inválido ' + element.email);
                return;
            }

            const transport = nodemailer.createTransport({
                host: process.env.MAIL_TRAP_HOST,
                port: process.env.MAIL_TRAP_PORT,
                auth: {
                  user: process.env.MAIL_TRAP_USER,
                  pass: process.env.MAIL_TRAP_PASS
                }
              });

              const info = transport.sendMail({
                from: 'noreplay@example.com', // sender address
                to: element.email, // list of receivers
                subject: element.assunto, // Subject line
                text: element.conteudo, // plain text body
                html: `<p>${element.conteudo}</p>`, // html body
              });

              console.log("Message sent: %s", info.messageId);
           
        });

    } catch (error) {
        console.error(`Erro ao salvar dados do csv ${params.filename} no banco`);
        console.log(error);
    }
}

export default processCsvFile;



