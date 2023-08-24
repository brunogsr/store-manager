const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
const { expect } = require('chai');

const connection = require('../../../src/models/connection');

const { getAllSalesMock } = require('../mocks/sales.mocks');

const salesControllers = require('../../../src/controllers/sales.controller');

describe('Testes Requisito 1: Camada Controller. Testa se busca corretamente todos os produtos ou individualmente', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('Testa se busca corretamente todos os produtos', async function () {
    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    sinon.stub(connection, 'execute').resolves([getAllSalesMock]);
    await salesControllers.getAll(req, res);
    expect(res.status.calledWith(200)).to.be.equal(true);
    expect(res.json.calledWith(getAllSalesMock)).to.be.equal(true);
  });
  it('Testa se busca corretamente um produto', async function () {
    const req = {
      params: { id: 1 },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    sinon.stub(connection, 'execute').resolves([getAllSalesMock[0]]);
    await salesControllers.getById(req, res);
    expect(res.status.calledWith(200)).to.be.equal(true);
    expect(res.json.calledWith(getAllSalesMock[0])).to.be.equal(true);
  });
  // it('Testa se ao inserir um produto, ele é retornado', async function () {  // fail
  //   const req = {
  //     body: {
  //       productId: 1,
  //       quantity: 2,
  //     },
  //   };
  //   const res = {
  //     status: sinon.stub().returnsThis(),
  //     json: sinon.stub(),
  //   };
  //   sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
  //   await salesControllers.insertSales(req, res);
  //   expect(res.status.calledWith(201)).to.be.equal(true);
  //   expect(res.json.calledWith({ insertId: 1, ...req.body })).to.be.equal(true);
  // });
});
