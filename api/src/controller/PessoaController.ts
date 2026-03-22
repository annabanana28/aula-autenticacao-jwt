import type PessoaDTO from "../dto/PessoaDTO.js";
import Pessoa from "../model/Pessoa.js";
import { type Request, type Response } from "express";

class PessoaController {
    static async todos(req: Request, res: Response): Promise<Response> {
        try {
            const pessoas: Array<PessoaDTO> | null = await Pessoa.listarPessoas();
            return res.status(200).json(pessoas);
        } catch (error) {
            console.error(`Erro no modelo. ${error}`);
            return res.status(500).json({ mensagem: "Erro no servidor" });
        }
    }
}

export default PessoaController;