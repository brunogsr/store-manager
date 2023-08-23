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
// const productServices = require('../../../src/services/services.products');

describe('Testes Requisito 1: Camada Service. Testa se busca corretamento todos os produtos ou individualmente', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('Testa se ao buscar todos os produtos, todos são retornados', async function () {
    sinon.stub(connection, 'execute').resolves([getAllProductsMock]);
    const products = await productServices.getAll();
    expect(products).to.be.an('array');
    expect(products).to.be.deep.equal(getAllProductsMock);
  });
  it('Testa se ao buscar um produto por Id, ele é retornado', async function () {
    sinon.stub(connection, 'execute').resolves([[getProductMock]]);
    const product = await productServices.findById(1);
    expect(product).to.be.an('object');
    expect(product.data).to.be.deep.equal(getProductMock);
    expect(product.status).to.be.equal(200);
  });
  
  it('Testa se caso não encontre um produto, retorna um erro', async function () {
    sinon.stub(connection, 'execute').resolves([[]]);
    const product = await productServices.findById(1);
    expect(product).to.be.an('object');
    expect(product).to.be.deep.equal({ status: 404, data: { message: 'Product not found' } });
  });
});