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
    const message = { message: "ID not found" };

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(message);
      request.params = { id: 1 };

      sinon.stub(ProductsServices, "getByIdService").resolves(null);
    });

    after(() => {
      ProductsServices.getByIdService.restore();
    });

    it("Retorna status 404.", async () => {
      await ProductsControllers.getByIdController(request, response);
      expect(response.status.calledWith(404)).to.be.equal(true);
    });

    it("Retorna a mensagem.", async () => {
      await ProductsControllers.getByIdController(request, response);
      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
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

    it("Retorna status 200.", async () => {
      await ProductsControllers.getByIdController(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it("Retorna a o objeto, conforme o ID especifico.", async () => {
      await ProductsControllers.getByIdController(request, response);
      expect(response.json.calledWith(fakeControllerId)).to.be.equal(true);
    });
  });

  describe("Retorna status 404, caso exista produto cadastrado.", async () => {
    const fakeController = {
      status: { status: 409 },
      message: { message: "Product already exists" },
    };

    const response = {};
    const request = {};

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      request.body = { name: "new product", quantity: 20 };

      sinon
        .stub(ProductsServices, "insertProductService")
        .resolves(fakeController);
    });
    after(() => {
      ProductsServices.insertProductService.restore();
    });

    it("Retorna status 409.", async () => {
      await ProductsControllers.insertProductController(request, response);
      expect(response.status.calledWith(409)).to.be.equal(true);
    });

    it("Retorna a mensagem.", async () => {
      await ProductsControllers.insertProductController(request, response);
      expect(
        response.json.calledWith({ message: "Product already exists" })
      ).to.be.equal(true);
    });
  });

  describe("Retorna status 201 com o novo produto.", async () => {
    const fakeController = {
      status: { status: 201 },
      data: { id: 1, name: "new product", quantity: 20 },
    };

    const response = {};
    const request = {};

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      request.body = { name: "new product", quantity: 20 };

      sinon
        .stub(ProductsServices, "insertProductService")
        .resolves(fakeController);
    });

    after(() => {
      ProductsServices.insertProductService.restore();
    });

    it("Retorna status 201.", async () => {
      await ProductsControllers.insertProductController(request, response);
      expect(response.status.calledWith(201)).to.be.equal(true);
    });

    it("Retorna o objeto com os dados do novo produto.", async () => {
      const fakeObj = { id: 1, name: "new product", quantity: 20 };
      await ProductsControllers.insertProductController(request, response);
      expect(response.json.calledWith(fakeObj)).to.be.true;
    });
  });

  describe("Retorna status 404 caso não encontre o produto para fazer o update, com a message de erro", async () => {
    const fakeService = {
      status: { status: 404 },
      message: { message: "Product not found" },
    };
    const response = {};
    const request = {};

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      request.params = { id: 1 };
      request.body = { name: "new product", quantity: 20 };
      sinon
        .stub(ProductsServices, "updateProductService")
        .resolves(fakeService);
    });

    after(() => {
      ProductsServices.updateProductService.restore();
    });

    it("Retorna status 404.", async () => {
      await ProductsControllers.updateProductController(request, response);
      expect(response.status.calledWith(404)).to.be.equal(true);
    });

    it("Retorna a mensagem.", async () => {
      await ProductsControllers.updateProductController(request, response);
      expect(
        response.json.calledWith({ message: "Product not found" })
      ).to.be.equal(true);
    });
  });

  describe("Retorna status 200 caso encontre o produto para fazer o update, com os dados (objeto).", async () => {
    const fakeService = {
      status: { status: 200 },
      data: { id: 1, name: "update product", quantity: 10 },
    };

    const response = {};
    const request = {};

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      request.params = { id: 1 };
      request.body = { name: "new product", quantity: 20 };

      sinon
        .stub(ProductsServices, "updateProductService")
        .resolves(fakeService);
    });

    after(() => {
      ProductsServices.updateProductService.restore();
    });

    it("Retorna status 200.", async () => {
      await ProductsControllers.updateProductController(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it("Retorna os dados (objeto).", async () => {
      const fakeObj = { id: 1, name: "update product", quantity: 10 };
      await ProductsControllers.updateProductController(request, response);
      expect(response.json.calledWith(fakeObj)).to.be.true;
    });
  });

  describe('Retorna status 404 caso não encontre a venda para ser deletado, com a mensagem de erro.', async () => {
    const fakeService = { 
      status: { status: 404 }, 
      message: { message: 'Product not found' } 
    };

    const response = {};
    const request = {};

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      request.params = { id: 1 };

      sinon
        .stub(ProductsServices, 'deleteProductService')
        .resolves(fakeService);
    });
    after(() => {
      ProductsServices.deleteProductService.restore();
    });

    it("Retorna status 404.", async () => {
      await ProductsControllers.deleteProductController(request, response);
      expect(response.status.calledWith(404)).to.be.equal(true);
    });

    it("Retorna a mensagem.", async () => {
      await ProductsControllers.deleteProductController(request, response);
      expect(response.json.calledWith({ message: "Product not found" })).to.be.equal(true);
    });
  })

  describe("Retorna status 204, confirmando a exclusão da tabela.", async () => {
    const fakeService = {
      status: { status: 204 },
    };

    const response = {};
    const request = {};

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      response.end = sinon.stub().returns()

      request.params = { id: 1 };

      sinon
        .stub(ProductsServices, "deleteProductService")
        .resolves(fakeService);
    });

    after(() => {
      ProductsServices.deleteProductService.restore();
    });

    it("Retorna status 204.", async () => {
      await ProductsControllers.deleteProductController(request, response);
      expect(response.status.calledWith(204)).to.be.equal(true);
    });
  });
});
