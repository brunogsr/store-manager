const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
const { expect } = require('chai');

const { getAllSalesMock } = require('../mocks/sales.mocks');

const salesModel = require('../../../src/models/sales.model');

const connection = require('../../../src/models/connection');

describe('Testes Requisito 1: Camada Model. Testa se busca corretamento todos os produtos ou individualmente', function () {
  afterEach(function () {
    sinon.restore(); // mentoria 
  });
  it('Testa se ao buscar todos os produtos, todos são retornados', async function () {
    sinon.stub(connection, 'execute').resolves([getAllSalesMock]);
    const sales = await salesModel.getAll();
    expect(JSON.stringify(sales)).to.equal(JSON.stringify(getAllSalesMock));
  }); 
  it('Testa se ao buscar um produto pelo id, o produto é retornado', async function () {
    sinon.stub(connection, 'execute').resolves([getAllSalesMock[0]]);
    const sale = await salesModel.getById(1);
    expect(JSON.stringify(sale)).to.equal(JSON.stringify(getAllSalesMock[0]));
  });
  it('Testa se é possível inserir um produto', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
    const insertId = await salesModel.insertSales([{
      productId: 1,
      quantity: 2,
    }]);
    expect(insertId).to.equal(1);
  });
});

// mentoria - - caso necessário, utilizar on first call, on second call 