import Navegacao from '../../components/Navegacao/Navegacao';
import { useState, useEffect } from 'react';
import PessoaRequests from '../../fetch/PessoaRequests';
import CardPessoa from '../../components/CardPessoa/CardPessoa';
import Button from 'react-bootstrap/Button';
import styles from './PPessoa.module.css';
import type PessoaDTO from '../../dto/PessoaDTO';
import { GrFormNext } from "react-icons/gr";
import { GrFormPrevious } from "react-icons/gr";

function PPessoa() {
    const [pessoas, setPessoas] = useState<Array<PessoaDTO>>([]);
    const [paginaAtual, setPaginaAtual] = useState(1);
    const itensPorPagina = 4;

    useEffect(() => {
        const fetchPessoas = async () => {
            const listaPessoas = await PessoaRequests.listarPessoas();
            setPessoas(listaPessoas);
        };

        fetchPessoas();
    }, []);

    const indiceInicial = (paginaAtual - 1) * itensPorPagina;
    const indiceFinal = indiceInicial + itensPorPagina;
    const pessoasExibidas = pessoas.slice(indiceInicial, indiceFinal);
    const totalPaginas = Math.ceil(pessoas.length / itensPorPagina);

    const proximaPagina = () => {
        if (indiceFinal < pessoas.length) {
            setPaginaAtual(paginaAtual + 1);
        }
    };

    const paginaAnterior = () => {
        if (paginaAtual > 1) {
            setPaginaAtual(paginaAtual - 1);
        }
    };

    return (
        <>
            <Navegacao />
            <div className={styles.cardsContainer}>
                {pessoasExibidas.map(pessoa => (
                    <CardPessoa key={pessoa.id} pessoa={pessoa} />
                ))}
            </div>
            <div className={styles.paginacao}>
                <Button onClick={paginaAnterior} disabled={paginaAtual === 1} className={styles.botao}>
                    {<GrFormPrevious className={styles.iconBotao} />}
                </Button>
                <Button onClick={proximaPagina} disabled={indiceFinal >= pessoas.length} className={styles.botao}>
                    {<GrFormNext className={styles.iconBotao} />}
                </Button>
            </div>
            <p style={{ textAlign: 'center' }}>Página {paginaAtual} de {totalPaginas}</p>
        </>
    );
}

export default PPessoa;