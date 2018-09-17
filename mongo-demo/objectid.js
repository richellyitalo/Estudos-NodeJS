const mongoose = require('mongoose');

const id = mongoose.Types.ObjectId();
console.log(id);

const idMeu = '123334abcd';

const isValid = mongoose.Types.ObjectId.isValid(idMeu);
console.log(isValid);