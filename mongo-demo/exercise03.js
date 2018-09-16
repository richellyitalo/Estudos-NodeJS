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
    isPublished: true
  })
    .or([{ price: { $gte: 15 } }, { name: /.*by.*/i }])
    // .where('price')
    // .gt(15)
    .sort('-price')
    .select('name author price');
}

async function run() {
  const res = await getCourses();
  console.log(res);
}

run();
