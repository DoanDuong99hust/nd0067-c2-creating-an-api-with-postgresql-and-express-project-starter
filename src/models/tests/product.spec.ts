import { Product, ProductStore } from "../product";

const store = new ProductStore()

beforeEach(async function () {
  await store.create({
    name: 'product 1',
    price: 100
  });
})

afterEach(async function() {
  await store.truncate()
})

describe("Product Model", () => {
    it('should have an index method', () => {
      expect(store.index).toBeDefined();
    });
  
    it('should have a show method', () => {
      expect(store.show).toBeDefined();
    });
  
    it('should have a create method', () => {
      expect(store.create).toBeDefined();
    });
  
    it('create method should add a product', async () => {
      const result = await store.create({
        id: 0,
        name: 'product 2',
        price: 100
      });
      expect(result.name).toEqual('product 2');
      expect(result.price).toEqual(100);
    });
  
    it('index method should return a list of product', async () => {
      const result = await store.index();
      expect(result).toEqual([
        {
          id: 1,
          name: 'product 1',
          price: 100
        }
      ]);
    });
  
    it('show method should return the correct product', async () => {
      const result = await store.show(1);
      expect(result).toEqual({
        id: 1,
        name: 'product 1',
        price: 100
      });
    });
  });