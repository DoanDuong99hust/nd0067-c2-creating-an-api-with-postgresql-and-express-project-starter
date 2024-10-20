import { User, UserStore } from "../user";

const store = new UserStore()

describe("User Model", () => {
    it('should have an index method', () => {
      expect(store.index).toBeDefined();
    });
  
    it('should have a show method', () => {
      expect(store.show).toBeDefined();
    });
  
    it('should have a create method', () => {
      expect(store.create).toBeDefined();
    });
  
    it('create method should add a user', async () => {
      const result = await store.create({
        id: 0,
        first_name: 'first name 1',
        last_name: 'last name 1',
        username: 'ad',
        password: '1'
      });
      expect(result).toEqual({
        id: 1,
        first_name: 'first name 1',
        last_name: 'last name 1',
        username: 'ad',
        password: '1'
      });
    });
  
    it('index method should return a list of user', async () => {
      const result = await store.index();
      expect(result).toEqual([{
        id: 1,
        first_name: 'first name 1',
        last_name: 'last name 1',
        username: 'ad',
        password: '1'
      }]);
    });
  
    it('show method should return the correct user', async () => {
      const result = await store.show(1);
      expect(result).toEqual({
        id: 1,
        first_name: 'first name 1',
        last_name: 'last name 1',
        username: 'ad',
        password: '1'
      });
    });
  });