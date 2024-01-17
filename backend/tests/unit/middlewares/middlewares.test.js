const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
const { expect } = require('chai');
const { validateName } = require('../../../src/middlewares/products.middlewares');

describe('Teste se o middleware validateName está funcionando corretamente', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('Testa se o middleware retorna um erro 400 quando o campo name não é enviado', async function () {
    const req = {
      body: {
        name: '',
      },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returns({ message: '"name" is required' }),
    };
    const next = sinon.stub();
    await validateName(req, res, next);
    expect(res.status.calledWith(400)).to.be.equal(true);
    expect(res.json.calledWith({ message: '"name" is required' })).to.be.equal(true);
  });
  it('Testa se o middleware retorna um erro 422 quando o campo name é menor que 5 caracteres', async function () {
    const req = {
      body: {
        name: '1234',
      },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returns({ message: '"name" length must be at least 5 characters long' }),
    };
    const next = sinon.stub();
    await validateName(req, res, next);
    expect(res.status.calledWith(422)).to.be.equal(true);
    expect(res.json.calledWith({ message: '"name" length must be at least 5 characters long' })).to.be.equal(true);
  });
  it('Testa se o middleware chama o next quando o campo name é válido', async function () {
    const req = {
      body: {
        name: '12345',
      },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub();
    await validateName(req, res, next);
    expect(next.called).to.be.equal(true);
  });
});
