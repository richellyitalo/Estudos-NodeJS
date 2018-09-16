const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Conectado ao mongo DB..."))
  .catch(err => console.error("Não foi possível conectar.", err));

// Schema
const courseSchema = new mongoose.Schema({
  name: { 
    type: String,
    required: true,
    match: /.*react.*/i
  },
  category: {
    type: String,
    enum: ['web', 'mobile', 'desktop']
  },
  price: {
    type: Number,
    get: v => Math.round(v),
    set: v => Math.round(v)
  },
  author: {
    type: String,
    validate: {
      isAsync: true,
      validator: (v, cb) => {
        setTimeout(() => {
          const result = v === 'Richelly';
          cb(result);
        }, 4000);
      },
      message: 'Valor informado diferente de \'Richelly\''
    }
  },
  // Validação customizada
  tags: {
    type: Array,
    validate: {
      validator: v => v && v.length > 0,
      message: 'Deve ser informada pelo menos uma Tag'
    },
  },
  date: { type: Date, default: Date.now },
  isPublished: Boolean
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "ReactJs",
    category: 'web',
    author: "Italo",
    tags: null,
    price: 10,
    isPublished: true
  });

  // Validacao #1
  // try {
  //   const result = await course.save();
  //   console.log(result);
  // } catch(ex) {
  //   console.log(ex.message);
  // }

  // Validacao #2
  // course.validate(err => {
  //   console.log('Deu ruim', err.message);
  // })

  // Validacao #3
  try {
    await course.validate();
  } catch (ex) {
    // console.log("Não salvou", ex.message);
    for (field in ex.errors) {
      console.log(ex.errors[field].message);
    }
  }
}

async function getCourses() {
  const courses = await Course
    // .find({ name: 'ReactJs' })
    // .find({ tags: { $in: ["front"] } })

    // Iniciacom ^
    // .find({ author: /^Rich/})

    // Termina com $
    // .find({ author: /lo$/})

    // Contém
    // .find({ author: /.*i.*/i }) // i diz que pode ser maiusculo ou minusculo

    // Paginação
    // const pageNumber = 2;
    // const pageSize = 10;
    // .skip((pageNumber -1) * pageSize)
    // .limit(pageSize)

    .find()
    .limit(2)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 })
    .count();

  console.log(courses);
}

// Atualizar via query find
async function updateCourse_QueryFind(id) {
  const course = await Course.findById(id);
  if (!course) return;

  course.isPublished = true;
  course.author = "Outro Autor";

  const result = await course.save();
  console.log(result);
}

// updateCourse_QueryFind('5b9db8085e205c2d242e0e49');

// Atualizar via find
async function updateCourse_UpdateFirst(id) {
  // #1
  // const result = await Course.update({ _id: id}, {
  //   $set: {
  //     name: 'Jual',
  //     isPublished: false
  //   }
  // });
  // console.log(result);

  // #2
  // const course = await Course.findByIdAndUpdate(id, {
  //   $set: {
  //     name: 'Jamil',
  //     isPublished: true
  //   }
  // });
  // console.log(course);

  // #3
  const course = await Course.findByIdAndUpdate(
    { _id: id },
    {
      $set: {
        name: "Jazico",
        isPublished: false
      }
    },
    { new: true }
  );
  console.log(course);
}

// updateCourse_UpdateFirst('5b9db8085e205c2d242e0e49');

async function removeCourse(id) {
  // const result = await Course.deleteOne({_id: id});
  const course = await Course.findByIdAndDelete({ _id: id });
  console.log(course);
}

// removeCourse('5b9dd7183fdfcf1d44decfc3');

createCourse();
