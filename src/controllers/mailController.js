import csv from 'csvtojson';
import processCsvFile from "../services/mailService.js";
import multerConfig from '../config/multer.js';
import multer from 'multer';
const multerUploader = multer(multerConfig).single('file');


async function upload(req, res) {
     multerUploader(req, res, async (err) => {
        if (err){
            return res.status(415).send({
                err: 'Erro ao importar arquivo',
                file: req.file
            })
        }else{
            try {
     
                const mail = { ...req.body };
                if (req.file === undefined) {
                return res.status(400).send({ error: 'Nenhum arquivo selecionado!' });
            }
            delete mail.filename;
            mail.file = req.file.filename


            const baseDir = process.cwd()
            const filePath = baseDir + '/tmp/uploads/' + mail.file;

            const file = await csv({ delimiter: "," }).fromFile(filePath);
           
            mail.quantity = file.length;
            if (mail.quantity === 0) { return res.status(400).send({ error: 'Arquivo vazio' }); }
        
            await processCsvFile(mail);
                res.json({
                    msg: 'Arquivo importado!',
                    file: mail.file
                });
            } catch (error) {
                console.log(error);
                res.status(500).send({ error: error });
            }
        }
    }) 
}

export default { upload };