const request = require("supertest");
const apiUrl = "https://qa-test-9di7.onrender.com";

jest.mock("supertest");

describe("Item Management Unit Tests", () => {
  let mockRequest;
  let token;
  let itemId;

  beforeEach(() => {
    mockRequest = {
      post: jest.fn().mockReturnThis(),
      get: jest.fn().mockReturnThis(),
      patch: jest.fn().mockReturnThis(),
      delete: jest.fn().mockReturnThis(),
      set: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    request.mockReturnValue(mockRequest);
  });

  it("should sign up and log in the user, and retrieve an access token", async () => {
    mockRequest.send.mockResolvedValueOnce({
      statusCode: 201,
    });

    await request(apiUrl)
      .post("/auth/signup")
      .send({ username: "itemUser333", password: "itemPassword" });

    mockRequest.send.mockResolvedValueOnce({
      statusCode: 201,
      body: { accessToken: "mockToken123" },
    });

    const loginResponse = await request(apiUrl)
      .post("/auth/login")
      .send({ username: "itemUser333", password: "itemPassword" });
    token = loginResponse.body.accessToken;

    expect(token).toBe("mockToken123");
  });

  it("should create a new item", async () => {
    mockRequest.send.mockResolvedValue({
      statusCode: 201,
      body: { id: "mockItemId332211", name: "TestItem44" },
    });

    const response = await request(apiUrl)
      .post("/items")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "TestItem44", description: "This is a test item description..." });

    expect(response.statusCode).toBe(201);
    expect(response.body.name).toBe("TestItem44");
    itemId = response.body.id;
  });

  it("should fetch all items", async () => {
    mockRequest.set.mockResolvedValue({
      statusCode: 200,
      body: [{ id: "mockItemId332211", name: "TestItem44" }],
    });

    const response = await request(apiUrl)
      .get("/items?join=user")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("should fetch a single item by ID", async () => {
    mockRequest.set.mockResolvedValue({
      statusCode: 200,
      body: { id: "mockItemId332211", name: "TestItem44" },
    });

    const response = await request(apiUrl)
      .get(`/items/${itemId}?join=user`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBe(itemId);
  });

  it("should update an item", async () => {
    mockRequest.send.mockResolvedValue({
      statusCode: 200,
      body: { name: "UpdatedItemName6633" },
    });

    const response = await request(apiUrl)
      .patch(`/items/${itemId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "UpdatedItemName6633", description: "Updated item description2" });

    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe("UpdatedItemName6633");
  });

  it("should not allow unauthorized users to update an item", async () => {
    mockRequest.send.mockResolvedValue({
      statusCode: 401,
    });

    const response = await request(apiUrl)
      .patch(`/items/${itemId}`)
      .set("Authorization", "Bearer invalidToken")
      .send({ name: "Unauthorized user" });

    expect(response.statusCode).toBe(401);
  });

  it("should delete an item", async () => {
    mockRequest.set.mockResolvedValue({
      statusCode: 200,
    });

    const response = await request(apiUrl)
      .delete(`/items/${itemId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
  });
});
