const request = require("supertest");
const app = require("../app");
const nock = require("nock");
require("dotenv").config();

describe("Holiday Routes", () => {
  beforeEach(() => {
  
    nock("https://calendarific.com/api/v2")
      .get("/holidays")
      .query({
        api_key: process.env.CALENDARIFIC_API_KEY,
        country: "US",
        year: "2024",
      })
      .reply(200, {
        response: {
          holidays: [
            { name: "New Year's Day", date: { iso: "2024-01-01" } },
            { name: "Independence Day", date: { iso: "2024-07-04" } },
          ],
        },
      });


    nock("https://calendarific.com/api/v2")
      .get("/countries")
      .query({ api_key: process.env.CALENDARIFIC_API_KEY })
      .reply(200, {
        response: {
          countries: [
            { name: "United States", iso3166: "US" },
            { name: "Canada", iso3166: "CA" },
          ],
        },
      });
  });

  it("should get holidays", async () => {
    try {
      const response = await request(app).get(
        "/api/holidays?country=US&year=2024"
      );
      console.log(response.body); 
      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
      expect(response.body).toEqual([
        { name: "New Year's Day", date: { iso: "2024-01-01" } },
        { name: "Independence Day", date: { iso: "2024-07-04" } },
      ]);
    } catch (error) {
      console.error("Error during /api/holidays request:", error);
    }
  });

  it("should get countries", async () => {
    try {
      const response = await request(app).get("/api/countries");
      console.log(response.body); 
      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
      expect(response.body).toEqual([
        { name: "United States", iso3166: "US" },
        { name: "Canada", iso3166: "CA" },
      ]);
    } catch (error) {
      console.error("Error during /api/countries request:", error);
    }
  });
});
