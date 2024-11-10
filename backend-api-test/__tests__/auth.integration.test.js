const request = require("supertest");
const apiUrl = "https://qa-test-9di7.onrender.com";

describe("Authentication Integration Tests", () => {
  let token;

  jest.setTimeout(10000);
  it("should sign up a user successfully", async () => {
    const response = await request(apiUrl)
      .post("/auth/signup")
      .send({ username: "bash612", password: "bash123" });
    expect(201);
    expect(response.body.username).toBe("bash612");
    expect(response.body.id).toBeDefined();
  });

  it("should log in with correct credentials", async () => {
    const response = await request(apiUrl)
      .post("/auth/login")
      .send({ username: "bash612", password: "bash123" });
    expect(201);
    expect(response.body.accessToken).toBeDefined();
  });

  it("should fail login with incorrect credentials", async () => {
    const response = await request(apiUrl)
      .post("/auth/login")
      .send({ username: "bash", password: "bash" });
    expect(401);
  });

  it("should log out successfully", async () => {
    const response = await request(apiUrl)
      .post("/auth/logout")
      .set("Authorization", `Bearer ${token}`);
    expect(200);
  });
});
