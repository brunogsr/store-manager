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
const productControllers = require('../../../src/controllers/products.controller');
const productServices = require('../../../src/services/products.service');

describe('Testes Requisito 1: Camada Controller. Testa se busca corretamento todos os produtos ou individualmente', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('Testa se busca corretamento todos os produtos', async function () {
    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    sinon.stub(productServices, 'getAll').resolves({
      status: 200,
      data: getAllProductsMock,
    });
    await productControllers.getAll(req, res);
    expect(res.status.calledWith(200)).to.be.equal(true);
    expect(res.json.calledWith(getAllProductsMock)).to.be.equal(true);
  });
  it('Testa se busca corretamento um produto', async function () {
    const req = {
      params: { id: 1 },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    sinon.stub(connection, 'execute').resolves([[getProductMock]]);
    await productControllers.getById(req, res);
    expect(res.status.calledWith(200)).to.be.equal(true);
    expect(res.json.calledWith(getProductMock)).to.be.equal(true);
  });
  it('Testa se ao inserir um produto, ele é retornado', async function () {
    const req = {
      body: {
        name: 'product',
      },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    sinon.stub(productServices, 'insertProduct').resolves({
      status: 201,
      data: { insertId: 1 },
    });
    await productControllers.insertProduct(req, res);
    expect(res.status.calledWith(201)).to.be.equal(true);
    expect(res.json.calledWith({ insertId: 1 })).to.be.equal(true);
  });
});
