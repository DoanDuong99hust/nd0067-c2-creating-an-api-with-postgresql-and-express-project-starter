import { OrdersProductStore } from "../orders_product";

const store = new OrdersProductStore()

describe("OrdersProduct Model", () => {
    it('should have an index method', () => {
      expect(store.index).toBeDefined();
    });
  
    it('should have a show method', () => {
      expect(store.show).toBeDefined();
    });
  
    it('should have a create method', () => {
      expect(store.create).toBeDefined();
    });

    it('should have a showByOrderId method', () => {
        expect(store.showByOrderId).toBeDefined();
    });

    it('should have a showByProductId method', () => {
        expect(store.showByProductId).toBeDefined();
    });

  });