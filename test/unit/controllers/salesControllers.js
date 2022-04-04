const { expect } = require("chai");
const sinon = require("sinon");

const SalesServices = require("../../../services/sales.services");
const SalesControllers = require("../../../controllers/sales.controller");

describe("Sales Controller.", async () => {
  describe("Retorna status 200, com todos as vendas.", async () => {
    const fakeController = [
      {
        saleId: 1,
        date: "2021-09-09T04:54:29.000Z",
        productId: 1,
        quantity: 2,
      },
      {
        saleId: 1,
        date: "2021-09-09T04:54:54.000Z",
        productId: 2,
        quantity: 2,
      },
    ];

    const response = {};
    const request = {};

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(SalesServices, "getAllService").resolves(fakeController);
    });
    after(() => SalesServices.getAllService.restore());

    it("Retorna status 200.", async () => {
      await SalesControllers.getAllController(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });
    it("Retorna todos os produtos (json)", async () => {
      await SalesControllers.getAllController(request, response);
      expect(response.json.calledWith(fakeController)).to.be.equal(true);
    });
  });

  describe("Retorna status 404, caso não encontre ID do produto.", async () => {
    const response = {};
    const request = {};
    const message = { message: "ID not found" };

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(message);
      request.params = { id: 1 };

      sinon.stub(SalesServices, "getByIdService").resolves(false);
    });
    after(() => SalesServices.getByIdService.restore());

    it("Retorna status 404.", async () => {
      await SalesControllers.getByIdController(request, response);
      expect(response.status.calledWith(404)).to.be.equal(true);
    });
    it("Retorna a mensagem.", async () => {
      await SalesControllers.getByIdController(request, response);
      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });
  });

  describe("Retorna status 200 e o produto referente ao id.", async () => {
    const fakeControllerId = [
      {
        "date": "2021-09-09T04:54:29.000Z",
        "productId": 1,
        "quantity": 2
      },
      {
        "date": "2021-09-09T04:54:54.000Z",
        "productId": 2,
        "quantity": 2
      }
    ];

    const response = {};
    const request = {};

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      request.params = { id: 1 };
      sinon.stub(SalesServices, "getByIdService").resolves(fakeControllerId);
    });
    after(() => SalesServices.getByIdService.restore());

    it('Retorna status 200.', async () => {
      await SalesControllers.getByIdController(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });
    
    it('Retorna a o objeto, conforme o ID especifico.', async () => {
      await SalesControllers.getByIdController(request, response);
      expect(response.json.calledWith(fakeControllerId)).to.be.equal(true);
    });
  });

  describe('Retorna status 201, confirmando que o cadastro de uma nova venda foi feita com sucesso', async () => {
    const fakeService =  { 
      id: 1, 
      itemsSold: [{ productId: 1, quantity: 3}]
    };

    const response = {};
    const request = {};

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      request.body = [{ productId: 1, quantity: 10 }];

      sinon.stub(SalesServices, 'insertSaleService').resolves(fakeService);
    });

    after(() => {
      SalesServices.insertSaleService.restore();
    })

    it('Retorna status 201.', async () => {
      await SalesControllers.insertSaleController(request, response);
      expect(response.status.calledWith(201)).to.be.equal(true);
    });
  });

  describe('Retorna status 200, confirmando que a atualização de uma venda foi feita com sucesso', async () => {
    const fakeService =  { 
      id: 1, 
      itemUpdated: [{ productId: 1, quantity: 3}]
    };

    const response = {};
    const request = {};

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      request.params = { id: 1 };
      request.body = [{ productId: 1, quantity: 10 }];

      sinon.stub(SalesServices, 'updateSaleService').resolves(fakeService);
    });

    after(() => {
      SalesServices.updateSaleService.restore();
    })

    it('Retorna status 200.', async () => {
      await SalesControllers.updateSaleController(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });
  });
});
