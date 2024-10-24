import { User, UserStore } from "../user";

const store = new UserStore()

beforeEach(async function () {
  await store.create({
    first_name: 'first name 1',
    last_name: 'last name 1',
    username: 'adtest 1',
    password: '1'
  });
})

afterEach(async function() {
  await store.truncate()
})

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
        first_name: 'first name 2',
        last_name: 'last name 2',
        username: 'adtest 2',
        password: '1'
      });
      expect(result.first_name).toEqual('first name 2');
      expect(result.last_name).toEqual('last name 2');
      expect(result.username).toEqual('adtest 2');
    });

    it('index method should return a list of user', async () => {
      const result = await store.index();
      expect(result.length).toEqual(1);
    });
  
    it('show method should return the correct user', async () => {
      const result = await store.show(1);
      expect(result.first_name).toEqual('first name 1');
      expect(result.last_name).toEqual('last name 1');
      expect(result.username).toEqual('adtest 1');
    });
  });