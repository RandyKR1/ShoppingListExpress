process.env.NODE_ENV = "test";
const request = require("supertest");

const app = require("../app");
let items = require("../fakeDb")

let testItem = { name: "newItem", price:200 }

beforeEach(function () {
  items.push(testItem);
});

afterEach(function () {
  items.length = 0;
});


/** GET /items - returns `{items: [item, ...]}` */

describe("GET /items", () => {
  test("Get all items", async () => {
    const res = await request(app).get("/items");
    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual({ items: [testItem] })
  })
})


/** GET /items/[name] - return data about one item: `{item: item}` */

describe("GET /items/:name", () => {
  test("Gets a single item", async () => {
    const res = await request(app).get(`/items/${testItem.name}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.item).toEqual(testItem);
  });

  test("Responds with 404 if can't find item", async () => {
    const res = await request(app).get(`/items/0`);
    expect(res.statusCode).toBe(404);
  });
});



/** POST /items - create item from data; return `{item: item}` */

describe("POST /items", () => {
  test("Creates a new item", async () => {
    const res = await request(app).post('/items').send({
        name: "Taco",
        price: 0
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.item.name).toEqual("Taco");
    expect(res.body.item.price).toEqual(0);
  });
});



// /** PATCH /items/[name] - update item; return `{item: item}` */

describe("PATCH /items/:name", () => {
  test("Updates a single item", async () => {
    const res = await request(app).patch(`/items/${testItem.name}`).send({
        name: "Troll"
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.item).toEqual({
      name: "Troll"
    });
  });

  test("Responds with 404 if can't find item", async () => {
    const response = await request(app).patch(`/items/0`);
    expect(response.statusCode).toBe(404);
  });
});



/** DELETE /items/[name] - delete item, 
 *  return `{message: "item deleted"}` */

describe("DELETE /items/:name", () => {
  test("Deletes a single a item", async () => {
    const res = await request(app).delete(`/items/${testItem.name}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: "Deleted Item" });
  });
});


