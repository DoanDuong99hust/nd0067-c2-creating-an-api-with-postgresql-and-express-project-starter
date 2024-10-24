import { OrdersStore } from "../orders";

const store = new OrdersStore()

beforeEach(async function () {
  await store.create({
    user_id: 1,
    order_status: 'DONE'
  });
})

afterEach(async function() {
  await store.truncate()
})

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
        user_id: 2,
        order_status: 'DONE'
      });
      expect(result).toEqual({
        id: 2,
        user_id: 2,
        order_status: 'DONE'
      });
    });
  
    it('index method should return a list of order', async () => {
      const result = await store.index();
      expect(result).toEqual([{
        id: 1,
        user_id: 1,
        order_status: 'DONE'
      }]);
    });
  
    it('show method should return the correct order', async () => {
      const result = await store.show(1);
      expect(result).toEqual({
        id: 1,
        user_id: 1,
        order_status: 'DONE'
      });
    });

    it('show method should return the correct order by user_id', async () => {
      const result = await store.showByUserId(1);
      expect(result).toEqual({
        id: 1,
        user_id: 1,
        order_status: 'DONE'
      });
    });
  });