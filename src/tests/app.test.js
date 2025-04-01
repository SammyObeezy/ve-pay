const request = require("supertest");
const app = require("../src/server"); // Adjust the path to your server file

describe("Authentication Operations", () => {
  it("should register a new user", async () => {
    const res = await request(app)
      .post("/api/register")
      .send({ email: "testuser@example.com", password: "testpassword" });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty(
      "message",
      "Verification email sent! User created successfully!"
    );
  });

  it("should login a user", async () => {
    const res = await request(app)
      .post("/api/login")
      .send({ email: "testuser@example.com", password: "testpassword" });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "User logged in successfully");
  });
});

describe("Blog Operations", () => {
  let token;

  beforeAll(async () => {
    const res = await request(app)
      .post("/api/login")
      .send({ email: "admin@example.com", password: "adminpassword" });
    token = res.body.token;
  });

  it("should create a new blog post", async () => {
    const res = await request(app)
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "New Blog",
        content: "This is a new blog post",
        categories: [],
        tags: [],
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("message", "Blog created successfully");
  });

  it("should fetch all blog posts", async () => {
    const res = await request(app).get("/api/blogs");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});

describe("FAQ Operations", () => {
  let token;

  beforeAll(async () => {
    const res = await request(app)
      .post("/api/login")
      .send({ email: "admin@example.com", password: "adminpassword" });
    token = res.body.token;
  });

  it("should create a new FAQ", async () => {
    const res = await request(app)
      .post("/api/faqs")
      .set("Authorization", `Bearer ${token}`)
      .send({
        question: "What is Ve-Pay?",
        answer: "Ve-Pay is a payment platform.",
        categories: [],
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("message", "FAQ created successfully");
  });

  it("should fetch all FAQs", async () => {
    const res = await request(app).get("/api/faqs");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});

describe("Video Operations", () => {
  let token;

  beforeAll(async () => {
    const res = await request(app)
      .post("/api/login")
      .send({ email: "admin@example.com", password: "adminpassword" });
    token = res.body.token;
  });

  it("should add a new video", async () => {
    const res = await request(app)
      .post("/api/videos")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "New Video",
        link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("message", "Video link added successfully");
  });

  it("should fetch all videos", async () => {
    const res = await request(app).get("/api/videos");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});
