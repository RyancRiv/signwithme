const request = require("supertest");
const app = require("../server"); 

describe("GET /download-avatar", () => {
  test("should return 400 if no URL is provided", async () => {
    const response = await request(app).get("/download-avatar");
    expect(response.status).toBe(400);
    expect(response.text).toBe("Missing avatar URL.");
  });

  test("should return 500 if the URL is invalid", async () => {
    const response = await request(app).get("/download-avatar").query({ url: "invalid-url" });
    expect(response.status).toBe(500);
    expect(response.text).toBe("Error downloading avatar.");
  });

  test("should download an avatar file successfully", async () => {
    const validUrl = "https://models.readyplayer.me/64b7b2b2f1f72.glb"; // Replace with a real testable URL
    const response = await request(app).get("/download-avatar").query({ url: validUrl });

    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toBe("model/gltf-binary");
    expect(response.headers["content-disposition"]).toBe('attachment; filename="avatar.glb"');
  });
});
