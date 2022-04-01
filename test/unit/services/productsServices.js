const { expect } = require("chai");
const sinon = require("sinon");

const ProductsModel = require("../../../models/products.model");
const ProductsServices = require("../../../services/product.services");

describe("Product Service.", async () => {
  describe("Retorna todos os produtos.", async () => {
    const fakeModel = [
      {
        "id": 1,
        "name": "produto A",
        "quantity": 10
      },
      {
        "id": 2,
        "name": "produto B",
        "quantity": 20
      },
    ];

    before(() => sinon.stub(ProductsModel, 'getAll').resolves(fakeModel));
    after(() => ProductsModel.getAll.restore());

    it('Retorna um objeto.', async () => {
      const getAll = await ProductsServices.getAllService();
      expect(getAll).to.be.a('array');
    });

    it('Retorna com as determinadas chaves(id, name, quantity).', async () => {
      const getAll = await ProductsServices.getAllService();
      expect(getAll[0]).to.have.all.keys('id', 'name', 'quantity');
    })
  });

  describe('Retorna o produto referente ao ID.', async () => {
    describe('Verifica se o ID não é uma string.', async () => {

      it('Retorna null caso ID não seja string.', async () => {
        const getById = await ProductsServices.getByIdService('id');
        expect(getById).to.be.equal(null);
      });
      it('Retorna null caso ID não exista.', async () => {
        const getById = await ProductsServices.getByIdService();
        expect(getById).to.be.equal(null);
      });
    });
  
    describe('Caso o retorno seja inválido', async () => {
      before(() => sinon.stub(ProductsModel, 'getById').withArgs(1).resolves(null));
      after(() => ProductsModel.getById.restore());

      it('Retorna null', async () => {
        const getById = await ProductsServices.getByIdService(1);
        expect(getById).to.be.null;
      });
    });

    describe('Retorna o objeto referente ao ID', () => {
      const fakeService = [{
        "id": 1,
        "name": "produto A",
        "quantity": 10
      }];

        before(() => sinon.stub(ProductsModel, 'getById').resolves(fakeService));
        after(() => ProductsModel.getById.restore());

      it("Retorna um objeto", async () => {
        const getById = await ProductsServices.getByIdService(1);
        expect(getById[0]).to.be.a('object');
      });
      it("Retorna com as determinadas chaves(id, name, quantity).", async () => {
        const getById = await ProductsServices.getByIdService(1);
        expect(getById[0]).to.have.all.keys('id', 'name', 'quantity');
      });
    });

    describe('Deve retorna o novo produto.', async () => {
      const fakeService = {
        id: 1,
        name: 'new product',
        quantity: 20,
      }

      before(() => sinon
      .stub(ProductsModel, 'insertProduct')
      .resolves(fakeService));
      after(() => ProductsModel.insertProduct.restore());

      it('Retorna um objeto.', async () => {
        const element = await ProductsServices.insertProductService(fakeService);
        expect(element).to.be.a('object');
      })
      it('Retorna o novo produto', async () => { 
        const element = await ProductsServices.insertProductService(fakeService);
        expect(element.name).to.be.equal('new project');
        expect(element.quantity).to.be.equal(20)
      })
    })
  });
});
