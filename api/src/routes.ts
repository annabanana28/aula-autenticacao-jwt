import express, { type Request, type Response } from 'express';
import PessoaController from './controller/PessoaController.js';

const router = express.Router();

router.get('/', (req: Request, res: Response) => { res.send('Hello World!') });

router.get('/api/protegido', 
        (req: Request, res: Response) => 
            { res.send('Rota protegida, se você está vendo essa mensagem é porque está autenticado no sistema') }
    );

router.get('/api/pessoas', PessoaController.todos);

export { router }