describe("Item Management E2E Tests", () => {
  const apiUrl = "https://qa-test-9di7.onrender.com";
  let token = "";
  let itemId = "";

  before(() => {
    cy.request({
      method: "POST",
      url: `${apiUrl}/auth/signup`,
      body: {
        username: "itemUser77",
        password: "itemPassword",
      },
    });

    cy.request({
      method: "POST",
      url: `${apiUrl}/auth/login`,
      body: {
        username: "itemUser77",
        password: "itemPassword",
      },
    }).then((response) => {
      token = response.body.accessToken;
    });
  });

  it("should create a new item", () => {
    cy.request({
      method: "POST",
      url: `${apiUrl}/items`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: {
        name: "TestItem55",
        description: "This is a test item description.",
      },
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.name).to.eq("TestItem55");
      itemId = response.body.id;
    });
  });

  it("should fetch all items", () => {
    cy.request({
      method: "GET",
      url: `${apiUrl}/items?join=user`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(Array.isArray(response.body)).to.be.true;
    });
  });

  it("should fetch a single item by ID", () => {
    cy.request({
      method: "GET",
      url: `${apiUrl}/items/${itemId}?join=user`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.id).to.eq(itemId);
    });
  });

  it("should update an item", () => {
    cy.request({
      method: "PATCH",
      url: `${apiUrl}/items/${itemId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: {
        name: "UpdatedItemName3",
        description: "Updated item description2",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.name).to.eq("UpdatedItemName3");
    });
  });

  it("should not allow unauthorized users to update an item", () => {
    cy.request({
      method: "PATCH",
      url: `${apiUrl}/items/${itemId}`,
      headers: {
        Authorization: "Bearer invalidToken",
      },
      body: {
        name: "Unauthorized user",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401);
    });
  });

  it("should delete an item", () => {
    cy.request({
      method: "DELETE",
      url: `${apiUrl}/items/${itemId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
});
