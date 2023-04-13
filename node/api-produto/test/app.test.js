const request = require('supertest');
const mongoose = require('mongoose');

const app = require('../app');
const Produto = require('../models/produto');

describe('Testes integrados de produtos', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://mongouser:mongopwd@localhost:27017/admin', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await Produto.deleteMany();
  });

  it('Deve criar um novo produto com sucesso', async () => {
    const response = await request(app).post('/produtos').send({
      nome: 'Produto Teste',
      descricao: 'Descrição do Produto Teste',
      preco: 9.99,
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('_id');
  });

  it('Deve listar todos os produtos', async () => {
    await Produto.create({
      nome: 'Produto 1',
      descricao: 'Descrição do Produto 1',
      preco: 19.99,
    });

    await Produto.create({
      nome: 'Produto 2',
      descricao: 'Descrição do Produto 2',
      preco: 29.99,
    });

    const response = await request(app).get('/produtos');

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
  });

  it('Deve retornar um produto específico', async () => {
    const produtoCriado = await Produto.create({
      nome: 'Produto Teste',
      descricao: 'Descrição do Produto Teste',
      preco: 9.99,
    });

    const response = await request(app).get(`/produtos/${produtoCriado._id}`);

    expect(response.status).toBe(200);
    expect(response.body.nome).toBe(produtoCriado.nome);
    expect(response.body.descricao).toBe(produtoCriado.descricao);
    expect(response.body.preco).toBe(produtoCriado.preco);
  });

  it('Deve atualizar um produto existente', async () => {
    const produtoCriado = await Produto.create({
      nome: 'Produto Teste',
      descricao: 'Descrição do Produto Teste',
      preco: 9.99,
    });

    const response = await request(app)
      .put(`/produtos/${produtoCriado._id}`)
      .send({
        nome: 'Produto Teste Editado',
        descricao: 'Descrição do Produto Teste Editado',
        preco: 19.99,
      });

    expect(response.status).toBe(200);
    expect(response.body.nome).toBe('Produto Teste Editado');
    expect(response.body.descricao).toBe('Descrição do Produto Teste Editado');
    expect(response.body.preco).toBe(19.99);
  });

  it('Deve excluir um produto existente', async () => {
    const produtoCriado = await Produto.create({
      nome: 'Produto Teste',
      descricao: 'Descrição do Produto Teste',
      preco: 9.99,
    });

    const response = await request(app).delete(`/produtos/${produtoCriado._id}`);

    expect(response.status).toBe(204);
    expect(await Produto.findById(produtoCriado._id)).toBeNull();
  });
});
