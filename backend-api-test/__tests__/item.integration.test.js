const request = require("supertest");
const { v4: uuidv4 } = require("uuid");
const apiUrl = "https://qa-test-9di7.onrender.com";

describe("Item Management Integration Tests", () => {
  let token;
  let itemId;
  let uniqueUsername;
  let uniqueItem;

  beforeAll(async () => {
    uniqueUsername = `bash-${uuidv4()}`;
    uniqueItem = `item-${uuidv4()}`;
    await request(apiUrl)
      .post("/auth/signup")
      .send({ username: uniqueUsername, password: "itemPassword" });

    const loginResponse = await request(apiUrl)
      .post("/auth/login")
      .send({ username: uniqueUsername, password: "itemPassword" });
    token = loginResponse.body.accessToken;
  });

  jest.setTimeout(20000);
  it("should create a new item", async () => {
    const response = await request(apiUrl)
      .post("/items")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: uniqueItem, description: "This is a test item describtion." });
    expect(201);
    expect(response.body.name).toBe(uniqueItem);
    itemId = response.body.id;
  });

  it("should fetch all items", async () => {
    const response = await request(apiUrl)
      .get("/items?join=user")
      .set("Authorization", `Bearer ${token}`);
    expect(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("should fetch a single item by ID", async () => {
    const response = await request(apiUrl)
      .get(`/items/${itemId}?join=user`)
      .set("Authorization", `Bearer ${token}`);
    expect(200);
    expect(response.body.id).toBe(itemId);
  });

  it("should update an item", async () => {
    const response = await request(apiUrl)
      .patch(`/items/${itemId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "UpdatedItemName321", description: "Updated item description." });
    expect(200);
    expect(response.body.name).toBe("UpdatedItemName321");
  });

  it("should not allow unauthorized users to update an item", async () => {
    const response = await request(apiUrl)
      .patch(`/items/${itemId}`)
      .set("Authorization", "Bearer invalidToken")
      .send({ name: "Unauthorized user" });
    expect(401);
  });

  it("should delete an item", async () => {
    const response = await request(apiUrl)
      .delete(`/items/${itemId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(200);
  });
});
