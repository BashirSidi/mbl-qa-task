describe("Authentication E2E Tests", () => {
  const apiUrl = "https://qa-test-9di7.onrender.com";
  let token = "";

  it("should sign up a user successfully", () => {
    cy.request({
      method: "POST",
      url: `${apiUrl}/auth/signup`,
      body: {
        username: "bashir22",
        password: "bash123",
      },
      timeout: 60000,
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.username).to.eq("bashir22");
      expect(response.body.id).to.exist;
    });
  });

  it("should log in with correct credentials", () => {
    cy.request({
      method: "POST",
      url: `${apiUrl}/auth/login`,
      body: {
        username: "bashir22",
        password: "bash123",
      },
      timeout: 60000,
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.accessToken).to.exist;
      token = response.body.accessToken;
    });
  });

  it("should fail login with incorrect credentials", () => {
    cy.request({
      method: "POST",
      url: `${apiUrl}/auth/login`,
      body: {
        username: "bash",
        password: "bash",
      },
      timeout: 60000,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401);
    });
  });

  // it("should log out successfully", () => {
  //   cy.request({
  //     method: "POST",
  //     url: `${apiUrl}/auth/logout`,
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //     timeout: 60000,
  //   }).then((response) => {
  //     expect(response.status).to.eq(200);
  //   });
  // });
});
