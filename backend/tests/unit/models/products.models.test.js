const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
const { expect } = require('chai');

const connection = require('../../../src/models/connection');

const {
  getAllProductsMock,
  getProductMock,
} = require('../mocks/products.mocks');
const productsModel = require('../../../src/models/products.model');

describe('Testes Requisito 1: Camada Model. Testa se busca corretamento todos os produtos ou individualmente', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('Testa se ao buscar todos os produtos, todos são retornados', async function () {
    sinon.stub(connection, 'execute').resolves([getAllProductsMock]);
    const products = await productsModel.getAll();
    expect(products).to.be.an('array');
    expect(products).to.be.deep.equal(getAllProductsMock);
  });

  it('Testa se ao buscar um produto pelo id, o produto é retornado', async function () {
    sinon.stub(connection, 'execute').resolves([[getProductMock]]);
    const product = await productsModel.getById(1);
    expect(product).to.be.an('object');
    expect(product).to.be.deep.equal(getProductMock);
  });
});