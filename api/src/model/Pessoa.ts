import type PessoaDTO from "../dto/PessoaDTO.js";
import { DatabaseModel } from "./DatabaseModel.js";

const database = new DatabaseModel().pool;

class Pessoa {
    private id: number = 0;

    constructor(
        private cpf: string,
        private nome: string,
        private sobrenome: string,
        private email: string,
        private cidade: string,
        private pais: string
    ) { }

    // ID (não está no construtor)
    getId(): number {
        return this.id;
    }
    setId(id: number): void {
        this.id = id;
    }

    // CPF
    getCpf(): string {
        return this.cpf;
    }
    setCpf(cpf: string): void {
        this.cpf = cpf;
    }

    // Nome
    getNome(): string {
        return this.nome;
    }
    setNome(nome: string): void {
        this.nome = nome;
    }

    // Sobrenome
    getSobrenome(): string {
        return this.sobrenome;
    }
    setSobrenome(sobrenome: string): void {
        this.sobrenome = sobrenome;
    }

    // Email
    getEmail(): string {
        return this.email;
    }
    setEmail(email: string): void {
        this.email = email;
    }

    // Cidade
    getCidade(): string {
        return this.cidade;
    }
    setCidade(cidade: string): void {
        this.cidade = cidade;
    }

    // País
    getPais(): string {
        return this.pais;
    }
    setPais(pais: string): void {
        this.pais = pais;
    }

    static async listarPessoas(): Promise<Array<PessoaDTO> | null> {
        // Cria uma lista vazia que vai receber as pessoas encontradas no banco
        let listaDePessoas: Array<PessoaDTO> = [];

        try {
            // Bloco try: tenta executar o código; se algo der errado, vai para o catch
            // Define a query SQL que busca todas as pessoas no banco de dados
            const querySelectPessoa = `SELECT * FROM pessoa;`;

            // Executa a query no banco de dados e aguarda o resultado
            // "await" pausa a execução aqui até o banco responder
            const respostaBD = await database.query(querySelectPessoa);

            // Percorre cada linha retornada pelo banco de dados
            // "pessoa" é o apelido dado a cada linha individual retornada
            respostaBD.rows.forEach((pessoa: any) => {
                // Cria um objeto PessoaDTO com os dados de cada linha do banco
                // PessoaDTO é apenas um objeto simples de dados (sem métodos), diferente da classe Pessoa
                const pessoaDTO: PessoaDTO = {
                    id: pessoa.id,                  // ID da pessoa
                    nome: pessoa.nome,              // Nome
                    sobrenome: pessoa.sobrenome,    // Sobrenome
                    cpf: pessoa.cpf,               // CPF
                    email: pessoa.email,           // E-mail
                    cidade: pessoa.cidade,         // Cidade
                    pais: pessoa.pais              // País
                };

                // Adiciona o objeto PessoaDTO à lista
                listaDePessoas.push(pessoaDTO);
            });

            // Retorna a lista com todas as pessoas encontradas
            return listaDePessoas;

        } catch (error) {
            // Se ocorrer qualquer erro durante a consulta, exibe no console para facilitar o debug
            console.log(`Erro ao acessar o modelo: ${error}`);

            // Retorna null para indicar que houve falha
            return null;
        }
    }
}

export default Pessoa;