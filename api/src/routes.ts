import express, { type Request, type Response } from 'express';
import PessoaController from './controller/PessoaController.js';
import { Auth } from './middleware/Auth.js';

const router = express.Router();

router.get('/', (req: Request, res: Response) => { res.send('Hello World!') });

router.post('/api/login', Auth.validacaoUsuario)

router.get('/api/protegido', 
        Auth.verifyToken, 
        (req: Request, res: Response) => 
            { res.send('Rota protegida, se você está vendo essa mensagem é porque está autenticado no sistema') }
    );

router.get('/api/pessoas', PessoaController.todos);
       router.get('/api/protegido', 
        Auth.verifyToken, 
        (req: Request, res: Response) => 
            { res.send('Rota protegida, se você está vendo essa mensagem é porque está autenticado no sistema') }
    );


export { router }