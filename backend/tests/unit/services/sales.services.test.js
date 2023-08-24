const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
const { expect } = require('chai');

const { getAllSalesMock } = require('../mocks/sales.mocks');

const salesService = require('../../../src/services/sales.service');

const connection = require('../../../src/models/connection');

describe('Testes Requisito 1: Camada Service. Testa se busca corretamento todos os produtos ou individualmente', function () {
  afterEach(function () {
    sinon.restore(); 
  });
  it('Testa se ao buscar todos os produtos, todos são retornados', async function () {
    sinon.stub(connection, 'execute').resolves([getAllSalesMock]);
    const sales = await salesService.getAll();
    expect(JSON.stringify(sales)).to.equal(JSON.stringify({ status: 200, data: getAllSalesMock }));
  });
  it('Testa se ao buscar um produto pelo id, o produto é retornado', async function () {
    sinon.stub(connection, 'execute').resolves([getAllSalesMock]);
    const id = 1;
    const sale = await salesService.getById(id);
    expect(JSON.stringify(sale)).to.equal(JSON.stringify({ status: 200, data: getAllSalesMock }));
  });
  it('Testa se caso não encontre um produto, retorna um erro', async function () {
    sinon.stub(connection, 'execute').resolves([[]]);
    const invalidId = 123123123;
    const sale = await salesService.getById(invalidId);
    expect(sale).to.be.an('object');
    expect(sale.data).to.be.deep.equal({ message: 'Sale not found' });
    expect(sale.status).to.be.equal(404);
  });
});