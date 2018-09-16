const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect("mongodb://localhost/mongo-exercises");
    console.log("Conectado");
  } catch (err) {
    console.log("Não foi possível conectar", err.message);
  }
}

connect();

const courseSchema = mongoose.Schema({
  tags: [String],
  date: { type: Date, default: Date.now },
  name: String,
  author: String,
  isPublished: Boolean,
  price: Number
});

const Course = mongoose.model("Course", courseSchema);

async function getCourses() {
  return await Course.find({
    isPublished: true,
    tags: { $in: ["backend", "frontend"] }
  })
    // Alternativa do $in
    // .or([{ tags: "frontend" }, { tags: "backend" }])
    .sort({ price: -1 })
    .select({ name: 1, author: 1 });
}

async function run() {
  const res = await getCourses();
  console.log(res);
}

run();
