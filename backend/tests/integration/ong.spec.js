const request = require("supertest");

const app = require("../../src/app");
const connection = require("../../src/database/connection");

describe("ONG", () => {
  beforeEach(async () => {
    await connection.migrate.rollback(); /**limpa o banco */
    await connection.migrate.latest(); /** executa as migrations via codigo */
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("should be able to create a new ONG", async () => {
    const response = await request(app)
      .post("/ongs")
      // .set('Authorization', 'id da ong') /** testar rota com um header de auth*/
      .send({
        name: "APAC",
        email: "contato@apac.com",
        whatsapp: "55996928998",
        city: "Fortaleza",
        uf: "CE"
      });

    expect(response.body).toHaveProperty("id");
    expect(response.body.id).toHaveLength(8);
  });
});
