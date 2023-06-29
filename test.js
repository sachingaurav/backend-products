const chai = require("chai");
const { expect } = chai;

// Import the file that contains the MongoDB connection code
const connectToMongoDB = require("./app.js"); // Replace "your-file-name" with the actual file name

describe("MongoDB Connection Test", () => {
  it("should connect to MongoDB successfully", async () => {
    // Execute the MongoDB connection code
    const result = await connectToMongoDB();

    // Expect the result to be true indicating a successful connection
    expect(result).to.be.true;
  });
});

after(function () {
  process.exit();
});
