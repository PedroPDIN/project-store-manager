const { expect } = require("chai");
const sinon = require("sinon");

const ProductsServices = require("../../../services/product.services");
const ProductsControllers = require("../../../controllers/products.controller");

describe("Products Controllers", async () => {
  describe("Retorna status 200, com todos os produtos.", async () => {
    const fakeController = [
      {
        id: 1,
        name: "produto A",
        quantity: 10,
      },
      {
        id: 2,
        name: "produto B",
        quantity: 20,
      },
    ];

    const response = {};
    const request = {};

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(ProductsServices, "getAllService").resolves(fakeController);
    });
    after(() => ProductsServices.getAllService.restore());

    it("Retorna status 200.", async () => {
      await ProductsControllers.getAllController(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });
    it("Retorna todos os produtos (json)", async () => {
      await ProductsControllers.getAllController(request, response);
      expect(response.json.calledWith(fakeController)).to.be.equal(true);
    });
  });

  describe("Retorna status 404, caso não encontre ID do produto.", async () => {
    const response = {};
    const request = {};

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(ProductsServices, "getByIdService").resolves(false);
    });
    after(() => ProductsServices.getByIdService.restore());

    it("Retorna status 404.", async () => {
      await ProductsControllers.getByIdController(request, response);
      expect(response.status.calledWith(404)).to.be.true;
    });

    it("Retorna a mensagem.", async () => {
      const message = { message: "ID not found" };
      await ProductsControllers.getByIdController(request, response);
      expect(response.json.calledWith(message)).to.be.true;
    });
  });

  describe("Retorna status 200 e o produto referente ao id.", async () => {
    const fakeControllerId = [
      {
        id: 1,
        name: "produto A",
        quantity: 10,
      },
    ];

    const response = {};
    const request = {};

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      request.params = { id: 1 };
      sinon.stub(ProductsServices, "getByIdService").resolves(fakeControllerId);
    });
    after(() => ProductsServices.getByIdService.restore());

    it('Retorna status 200.', async () => {
      await ProductsControllers.getByIdController(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });
    
    it('Retorna a o objeto, conforme o ID especifico.', async () => {
      await ProductsControllers.getByIdController(request, response);
      expect(response.json.calledWith(fakeControllerId)).to.be.equal(true);
    });
  });
});
