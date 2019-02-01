const request = require("supertest");
const server = require("./server.js");
const db = require("../data/dbConfig");

afterAll(async () => {
  await db("games").truncate();
});

describe("server.js", () => {
  describe("GET / endpoint", () => {
    it("Respond with Status Code 200", async () => {
      let response = await request(server).get("/games");
      console.log(response.status);
      expect(response.status).toEqual(200);
    });
    it("Respond with JSON", async () => {
      let response = await request(server).get("/games");
      expect(response.type).toMatch(/json/i);
    });
    it("Endpoint Returns Array", async () => {
      const expected = [];
      let response = await request(server).get("/games");
      expect(response.body).toEqual(expected);
    });
  });

  describe("Post / endpoint", () => {
    it("Added User and Provide 201 Status Code", async () => {
      const body = {
        title: "Monopoly",
        genre: "Board"
      };
      let response = await request(server)
        .post("/games")
        .send(body);
      expect(response.body).toEqual({
        id: 1,
        title: "Monopoly",
        genre: "Board",
        releaseYear: null
      });
      expect(response.status).toEqual(201);
    });
    it("Missing Non Nullable Value (Table Incomplete) and Provide 422 Status Code", async () => {
        const body = {
          title: "Test Invalid"
        };
        let response = await request(server)
          .post("/games")
          .send(body);
        console.log(response.status);
        expect(response.status).toEqual(422);
      });

  });

  //   describe("Delete / endpoint", () => {
  //     it("should delete user and provide correct response", async () => {
  //       const id = 1;
  //       response = await request(server).delete(`/users/${id}`);
  //       expect(response.body).toEqual({});
  //       expect(response.status).toEqual(204);
  //     });
  //   });

  //   describe("Delete / endpoint", () => {
  //     it("should delete user and provide correct response", async () => {
  //       const id = 2;
  //       response = await request(server).delete(`/users/${id}`);
  //       expect(response.body).toEqual({});
  //       expect(response.status).toEqual(204);
  //     });
  //   });
});
