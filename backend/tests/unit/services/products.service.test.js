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
const productServices = require('../../../src/services/products.service');

describe('Testes Requisito 1: Camada Service. Testa se busca corretamento todos os produtos ou individualmente', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('Testa se ao buscar todos os produtos, todos são retornados', async function () {
    sinon.stub(connection, 'execute').resolves([getAllProductsMock]);
    const products = await productServices.getAll();
    expect(JSON.stringify(products)).to.equal(JSON.stringify({ status: 200, data: getAllProductsMock }));
  });
  
  it('Testa se ao buscar um produto por Id, ele é retornado', async function () {
    sinon.stub(connection, 'execute').resolves([[getProductMock]]);
    const product = await productServices.getById(1);
    expect(product).to.be.an('object');
    expect(product.data).to.be.deep.equal(getProductMock);
    expect(product.status).to.be.equal(200);
  });
  
  it('Testa se caso não encontre um produto, retorna um erro', async function () {
    sinon.stub(connection, 'execute').resolves([[]]);
    const invalidId = 123123123;
    const product = await productServices.getById(invalidId);
    expect(product).to.be.an('object');
    expect(product.data).to.be.deep.equal({ message: 'Product not found' });
    expect(product.status).to.be.equal(404);
  });

  it('Testa se é possível inserir um produto', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
    const product = await productServices.insertProduct('teste');
    expect(product).to.be.an('object');
    expect(product.data).to.be.deep.equal({ id: 1, name: 'teste' });
    expect(product.status).to.be.equal(201);
  });
});