const Produto = require('../models/produto');

exports.listarProdutos = async (req, res) => {
  try {
    const produtos = await Produto.find();
    res.json(produtos);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.obterProduto = async (req, res, next) => {
  try {
    const produto = await Produto.findById(req.params.id);
    if (!produto) {
      return res.status(404).json({ mensagem: 'Produto não encontrado' });
    }
    res.status(200).json(produto);
  } catch (error) {
    next(error);
  }
};

exports.criarProduto = async (req, res) => {
  try {
    const produto = new Produto(req.body);
    await produto.save();
    res.status(201).json(produto);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.buscarProdutoPorId = async (req, res) => {
  try {
    const produto = await Produto.findById(req.params.id);
    if (!produto) {
      return res.status(404).send('Produto não encontrado');
    }
    res.json(produto);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.atualizarProduto = async (req, res) => {
  try {
    const produto = await Produto.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!produto) {
      return res.status(404).send('Produto não encontrado');
    }
    res.json(produto);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// exports.excluirProduto = async (req, res) => {
//   try {
//     const produto = await Produto.findByIdAndDelete(req.params.id);
//     if (!produto) {
//       return res.status(404).send('Produto não encontrado');
//     }
//     res.send('Produto excluído com sucesso');
//   } catch (err) {
//     res.status(500).send(err.message);
//   }
// };


exports.excluirProduto = async (req, res) => {
  const id = req.params.id;

  try {
    const produto = await Produto.findByIdAndRemove(id);

    if (!produto) {
      return res.status(404).send({ message: 'Produto não encontrado.' });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).send({ message: 'Erro ao excluir o produto.' });
  }
};