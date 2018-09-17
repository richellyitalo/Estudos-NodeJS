const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  authors: [authorSchema]
  // author: authorSchema
}));

async function createCourse(name, author) {
  const course = new Course({
    name, 
    author
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}

async function updateAuthor(courseId) {
  // Removendo author
  // const result = await Course.findByIdAndUpdate(courseId, {
  //   $unset: {
  //     author: ''
  //   }
  // });
  // course.author.name = 'Novo autor';
  // const result = await course.save();
  const result = await Course.findByIdAndUpdate(courseId, {
    $set: {
      // author: {
      //   name: 'João novo'
      // }
      'author.name': 'Francisco novo'
    }
  });
  console.log(result);
}

async function createCourseWithAuthors(name, authors) {
  const course = new Course({
    name,
    authors
  });

  const result = await course.save();
  console.log(result);
}

async function addAuthor(courseId, author) {
  const course = await Course.findById(courseId);

  course.authors.push(author);

  course.save();
}

async function removeAuthor(courseId, authorId) {
  const course = await Course.findById(courseId);
  const author = course.authors.id(authorId);
  author.remove();
  course.save();
}

removeAuthor('5b9f0201d3e8663240f388f3', '5b9f0201d3e8663240f388f2');
// addAuthor('5b9f0201d3e8663240f388f3', new Author({name: 'Rijelly'}));

// createCourseWithAuthors('Java', [
//   new Author({name: 'Jão'}),
//   new Author({name: 'Pedro'})
// ]);

// updateAuthor('5b9ef92e0985673184d6be3a');


// createCourse('Node Course', new Author({ name: 'Mosh' }));
