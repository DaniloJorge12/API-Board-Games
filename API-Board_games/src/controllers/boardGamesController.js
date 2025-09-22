import boardGames from "../models/dados.js";

//Buscar itens
const getAllgames = (req, res) => {
    const { id, nome, categoria, minJogadores, maxJogadores, duracao, complexidade, editor, preco } = req.query;
    let resultado = boardGames;

    if(nome) {
        resultado = resultado.filter(g => g.nome.toLowerCase().includes(nome.toLowerCase()))
    }

    if(id) {
        resultado = resultado.filter(g => g.id === parseInt(id))
    }    

    if(minJogadores) {
        resultado = resultado.filter(g => g.minJogadores === minJogadores)
    }

    if(maxJogadores) {
        resultado = resultado.filter(g => g.maxJogadores === maxJogadores)
    }

    if(categoria) {
        resultado = resultado.filter(g => g.categoria.toLowerCase().includes(categoria.toLowerCase()))
    }

    if(complexidade) {
        resultado = resultado.filter(g => g.complexidade.toLowerCase().includes(complexidade.toLowerCase()))
    }

    if(editor) {
        resultado = resultado.filter(g => g.editor.toLowerCase().includes(editor.toLowerCase()))
    }

    if(duracao) {
        resultado = resultado.filter(g => g.duracao == duracao)
    }

    if(preco) {
        resultado = resultado.filter(g => g.preco == preco)
    }
    
    res.status(200).json({
        total: resultado.length,
        games: resultado
    });
};

const getGamesByld = (req, res) => {
    const id = parseInt(req.params.id);
    const game = boardGames.find(g => g.id === id);

    if(!game) {
        return res.status(404).json({
            message: "Board Game não encontrado"
        });
    }
    
    res.status(200).json(game);    
};

const createGame = (req, res) => {
    const { nome, categoria, minJogadores, maxJogadores, duracao, complexidade, editor, preco } = req.body || {};

    if(!nome || !categoria || !complexidade || !editor ) {
        return res.status(400).json({
            success: false,
            message: "Nome, categoria, complexibilidade e editor são obrigatórios!"
        });
    }

    const novoGame = {
        id: boardGames.length + 1,
        nome,
        categoria,
        minJogadores,
        maxJogadores,
        duracao,
        complexidade,
        editor,
        preco
    };

    boardGames.push(novoGame);
    res.status(201).json({
        success: true,
        message: "Novo Board Game cadastrado com sucesso",
        boardGames: novoGame
    });
};

//Delete
const deleteGame = (req, res) => {
    const id = parseInt(req.params.id);

    if(isNaN(id)) {
        return res.status(400).json({
            success: false,
            message: "O ID selecionado é invalido"
        });
    }

    //Verificar se não tem outro Board Game com o ID
    const gameParaRemover = boardGames.find(g => g.id === id);

    if(!gameParaRemover) {
        return res.status(404).json({
            success: false,
            message: `O Board Game com o ID ${id} não existe`
        });
    }

    //Remover o Board Game com ID
    const gamesFiltrados = boardGames.filter(g => g.id !== id);
    boardGames.splice(0, boardGames.length, ...gamesFiltrados);


    res.status(200).json({
        success: true,
        message: `O Board Game com o ${id} foi removido com sucesso`
    })
};

//Update
const updateGame = (req, res) => {
    const id = parseInt(req.params.id);
    const { nome, categoria, minJogadores, maxJogadores, duracao, complexidade, editor, preco } = req.query;

    if(isNaN(id)){
        return res.status(400).json({
            success: false,
            message: "O id deve ser um número válido!"
        })
    }

    const gameExiste = boardGames.find(g => g.id === id);
    if(!gameExiste){
        return res.status(404).json({
            success: false,
            message: `O Board Game com o id ${id} é inexistente`
        })
    }

    const gamesAtualizado = boardGames.map(g => 
        g.id === id ? {
            ...g,