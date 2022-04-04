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

      before(() => sinon.stub(ProductsModel, 'getById').resolves(false))
      after(() => ProductsModel.getById.restore());

      it('Retorna null caso ID seja string.', async () => {
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

    describe('Retorna os novos produtos.', async () => {
      describe('Deve retorna o novo produto.', async () => {
        const fakeService = {
          id: 1,
          name: 'new product',
          quantity: 20,
        };
  
        before(() => {
          sinon.stub(ProductsModel, 'insertProduct').resolves(fakeService);
           sinon.stub(ProductsModel, 'existProduct').resolves([[]]);
        })
        after(() => {
          ProductsModel.insertProduct.restore();
          ProductsModel.existProduct.restore();
        });
  
        it('Retorna um objeto.', async () => {
          const element = await ProductsServices.insertProductService(fakeService);
          expect(element.message).to.be.a('object');
        });
        it('Retorna o novo produto', async () => { 
          const element = await ProductsServices.insertProductService(fakeService);
          expect(element.message).to.have.all.keys('id', 'name', 'quantity');
        });
      });

      describe('Retorna mensagem de erro caso já exista um produto cadastrado.', async () => {
        const fakeService = {
          id: 1,
          name: 'new product',
          quantity: 20,
        }

        before(() => {
          sinon.stub(ProductsModel, 'insertProduct').resolves(fakeService);
          sinon.stub(ProductsModel, 'existProduct').resolves({ result: 'exist' })
        });
  
        after(() => {
          ProductsModel.existProduct.restore();
          ProductsModel.insertProduct.restore();
        })

        it('Retorna status 409 e sua mensagem de erro.', async () => {
          const element = await ProductsServices.insertProductService(fakeService);
          expect(element.status.status).to.be.equal(409);
          expect(element.message.message).to.be.equal('Product already exists');
        });
      });

        // Insert Product
      describe('Retorna status 201, com os novos produtos.', async () => {
        const fakeService = {
          id: 1,
          name: 'new product',
          quantity: 20,
        }

        before(() => {
          sinon.stub(ProductsModel, 'insertProduct').resolves(fakeService);
          sinon.stub(ProductsModel, 'existProduct').resolves([[]])
        });
  
        after(() => {
          ProductsModel.existProduct.restore();
          ProductsModel.insertProduct.restore();
        });

        it('Retorna status com os novos produtos.', async () => {
          const element = await ProductsServices.insertProductService(fakeService);
          expect(element.status.status).to.be.equal(201);
          expect(element.message).to.be.equal(fakeService);
        });
      });

      // Update Product
      describe('Retorna status 404 caso não encontre o ID para fazer update, com a determinada mensagem.', async () => {

        const fakeService = { id: 1, name: 'Update Product', quantity: 10 };

        before(() => {
          sinon.stub(ProductsModel, 'getById').resolves(false);
          sinon.stub(ProductsModel, 'updateProduct').resolves(fakeService);
        });

        after(() => {
          ProductsModel.getById.restore();
          ProductsModel.updateProduct.restore();
        });

        it('Retorna status 404 e sua mensagem de erro.', async () => {
          const dataUpdate = { name: 'Update Product', quantity: 10 };
          const element = await ProductsServices.updateProductService(1, dataUpdate);
          expect(element.status.status).to.be.equal(404);
          expect(element.message.message).to.be.equal('Product not found');
        });
      })

      describe('Retorna status 200, com o dados (objeto) que ira atualizar o produto', async () => {

        const fakeService = { id: 1, name: 'Update Product', quantity: 10 };

        before(() => {
          sinon.stub(ProductsModel, 'getById').resolves(true);
          sinon.stub(ProductsModel, 'updateProduct').resolves(fakeService);
        });

        after(() => {
          ProductsModel.updateProduct.restore();
          ProductsModel.getById.restore();
        });

        it('Retorna status 200.', async () => {
          const dataUpdate = { name: 'Update Product', quantity: 10 };
          const element = await ProductsServices.updateProductService(1, dataUpdate);
          expect(element.status.status).to.be.equal(200);
        })
        it('Retorna o objeto.', async () => {
          const dataUpdate = { name: 'Update Product', quantity: 10 };
          const element = await ProductsServices.updateProductService(1, dataUpdate);
          expect(element.data).to.have.all.keys('id', 'name', 'quantity');
        })
      });

      // Delete Product
      describe('Retorna status 404 caso não encontre o ID para fazer delete, com a determinada mensagem.', async () => {
        before(() => {
          sinon.stub(ProductsModel, 'getById').resolves(false);
          sinon.stub(ProductsModel, 'deleteProduct').resolves(999);
        });

        after(() => {
          ProductsModel.getById.restore();
          ProductsModel.deleteProduct.restore();
        });

        it('Retorna status 404 e sua mensagem de erro.', async () => {
          const element = await ProductsServices.deleteProductService(000);
          expect(element.status.status).to.be.equal(404);
          expect(element.message.message).to.be.equal('Product not found');
        });
      });

      describe('Retorna status 204, confirmando a exclusão do produto', async () => {

        before(() => {
          sinon.stub(ProductsModel, 'getById').resolves(true);
          sinon.stub(ProductsModel, 'deleteProduct').resolves(1);
        });

        after(() => {
          ProductsModel.deleteProduct.restore();
          ProductsModel.getById.restore();
        });

        it('Retorna status 204.', async () => {
          const element = await ProductsServices.deleteProductService(1);
          expect(element.status.status).to.be.equal(204);
        });
      });
    });
  });
});
