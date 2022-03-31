const { expect } = require("chai");
const express = require("express");
const sinon = require("sinon");

const ProductsModel = require("../../../models/products.model");
const ProductsServices = require("../../../services/product.services");

describe.only("Product Service.", async () => {
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
      const getAll = ProductsServices.getAllService();
      express(getAll).to.be.a('object');
    });

    it('Retorna com as determinadas chaves(id, name, quantity).', async () => {
      const getAll = ProductsServices.getAllService();
      express(getAll).to.have.all.keys('id', 'name', 'quantity');
    })
  });

  describe('Retorna o produto referente ao ID.', async () => {
    describe('Verifica se o ID não é uma string.', async () => {

      it('Retorna null caso ID não seja string.', async () => {
        const getById = ProductsServices.getByIdService('id');
        expect(getById).to.be.equal(null);
      });
      it('Retorna null caso ID não exista.', async () => {
        const getById = ProductsServices.getByIdService();
        expect(getById).to.be.equal(null);
      });
    });
  
    describe('Caso o retorno seja inválido', async () => {
      before(() => sinon.stub(ProductsModel, 'getById'). resolves(false));
      after(() => ProductsModel.getAll.restore());

      it('Retorna null', async () => {
        const getById = await ProductsServices.getByIdService(0);
        expect(getById).to.be.equal(null)
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
        expect(getById).to.be.a('object');
      });
      it("Retorna com as determinadas chaves(id, name, quantity).", async () => {
        const getById = await ProductsServices.getByIdService(1);
        expect(getById).to.have.all.keys('id', 'name', 'quantity');
      });
    });
  });
});
