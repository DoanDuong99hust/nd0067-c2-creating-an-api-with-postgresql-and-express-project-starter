import { Orders, OrdersStore } from "../orders";

const store = new OrdersStore()

describe("Orders Model", () => {
    it('should have an index method', () => {
      expect(store.index).toBeDefined();
    });
  
    it('should have a show method', () => {
      expect(store.show).toBeDefined();
    });
  
    it('should have a create method', () => {
      expect(store.create).toBeDefined();
    });
  
    it('create method should add a order', async () => {
      const result = await store.create({
        id: 0,
        product_ids: [1,2,3],
        product_quantities: [10,10,10],
        user_id: 1,
        order_status: 'DONE'
      });
      expect(result).toEqual({
        id: 1,
        product_ids: [1,2,3],
        product_quantities: [10,10,10],
        user_id: 1,
        order_status: 'DONE'
      });
    });
  
    it('index method should return a list of order', async () => {
      const result = await store.index();
      expect(result).toEqual([{
        id: 1,
        product_ids: [1,2,3],
        product_quantities: [10,10,10],
        user_id: 1,
        order_status: 'DONE'
      }]);
    });
  
    it('show method should return the correct order', async () => {
      const result = await store.show(1);
      expect(result).toEqual({
        id: 1,
        product_ids: [1,2,3],
        product_quantities: [10,10,10],
        user_id: 1,
        order_status: 'DONE'
      });
    });
  });