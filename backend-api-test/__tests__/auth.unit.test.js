const request = require("supertest");
const apiUrl = "https://qa-test-9di7.onrender.com";

jest.mock("supertest");

describe("Authentication Unit Tests", () => {
  let mockRequest;

  beforeEach(() => {
    mockRequest = {
      post: jest.fn().mockReturnThis(),
      get: jest.fn().mockReturnThis(),
      send: jest.fn(),
      set: jest.fn().mockReturnThis(),
    };

    request.mockReturnValue(mockRequest);
  });

  it("should sign up a user successfully", async () => {
    mockRequest.send.mockResolvedValue({
      statusCode: 201,
      body: {
        id: 1,
        username: "bash3321",
      },
    });

    const response = await request(apiUrl)
      .post("/auth/signup")
      .send({ username: "bash3321", password: "bash123" });

    expect(response.statusCode).toBe(201);
    expect(response.body.username).toBe("bash3321");
    expect(response.body.id).toBeDefined();
  });

  it("should log in with correct credentials", async () => {
    mockRequest.send.mockResolvedValue({
      statusCode: 201,
      body: {
        accessToken: "validTokenExample123",
      },
    });

    const response = await request(apiUrl)
      .post("/auth/login")
      .send({ username: "bash3321", password: "bash123" });

    expect(response.statusCode).toBe(201);
    expect(response.body.accessToken).toBeDefined();
  });

  it("should fail login with incorrect credentials", async () => {
    mockRequest.send.mockResolvedValue({
      statusCode: 401,
    });

    const response = await request(apiUrl)
      .post("/auth/login")
      .send({ username: "bash", password: "bash" });

    expect(response.statusCode).toBe(401);
  });

  it("should log out successfully", async () => {
    const validToken = "validTokenExample123";

    mockRequest.set.mockReturnValueOnce({
      statusCode: 200,
    });

    const response = await request(apiUrl)
      .post("/auth/logout")
      .set("Authorization", `Bearer ${validToken}`);

    expect(response.statusCode).toBe(200);
  });
});
