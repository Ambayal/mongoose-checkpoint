// Importing necessary modules and setting up mongoose
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file

// Connecting to MongoDB using Mongoose
mongoose.connect("mongodb://localhost;27017/", { useNewUrlParser: true, useUnifiedTopology: true });

// Creating a person schema using mongoose
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number },
  favoriteFoods: { type: [String] } // favoriteFoods as an array of strings
});

// Creating a Person model from the schema
const Person = mongoose.model('Person', personSchema);

// Creating a new person document and saving it to the database
const person = new Person({
  name: 'John',
  age: 30,
  favoriteFoods: ['Pizza', 'Burger']
});

person.save(function(err, data) {
  if (err) return console.error(err);
  console.log('Person saved successfully:', data);
});

// Creating multiple people records using model.create()
const arrayOfPeople = [
  { name: 'Alice', age: 25, favoriteFoods: ['Pasta', 'Ice Cream'] },
  { name: 'Bob', age: 35, favoriteFoods: ['Steak', 'Sushi'] }
];

Person.create(arrayOfPeople, function(err, people) {
  if (err) return console.error(err);
  console.log('People created successfully:', people);
});

// Finding people by name using model.find()
Person.find({ name: 'John' }, function(err, people) {
  if (err) return console.error(err);
  console.log('People with name John:', people);
});

// Finding one person by favorite food using model.findOne()
const food = 'Pizza';
Person.findOne({ favoriteFoods: food }, function(err, person) {
  if (err) return console.error(err);
  console.log(`Person with favorite food ${food}:`, person);
});

// Finding a person by _id using model.findById()
const personId = 'insert_person_id_here';
Person.findById(personId, function(err, person) {
  if (err) return console.error(err);
  console.log('Person found by ID:', person);
});

// Updating a person's favoriteFoods and saving using classic update
const personIdToUpdate = 'insert_person_id_here';
Person.findById(personIdToUpdate, function(err, person) {
  if (err) return console.error(err);
  person.favoriteFoods.push('Hamburger');
  person.save(function(err, updatedPerson) {
    if (err) return console.error(err);
    console.log('Person updated successfully:', updatedPerson);
  });
});

// Updating a person's age using findOneAndUpdate()
const personNameToUpdate = 'Alice';
Person.findOneAndUpdate({ name: personNameToUpdate }, { age: 20 }, { new: true }, function(err, updatedPerson) {
  if (err) return console.error(err);
  console.log('Person updated using findOneAndUpdate:', updatedPerson);
});

// Deleting one person by _id using findByIdAndRemove()
const personIdToDelete = 'insert_person_id_here';
Person.findByIdAndRemove(personIdToDelete, function(err, removedPerson) {
  if (err) return console.error(err);
  console.log('Person removed by ID:', removedPerson);
});

// Deleting all people with name "Mary" using Model.remove()
const nameToDelete = 'Mary';
Person.remove({ name: nameToDelete }, function(err, result) {
  if (err) return console.error(err);
  console.log(`Removed all people with name ${nameToDelete}. Result:`, result);
});

// Chain search query helpers to find people who like burritos, sort by name, limit 2, and hide their age
Person.find({ favoriteFoods: 'Burritos' })
  .sort('name')
  .limit(2)
  .select('-age')
  .exec(function(err, data) {
    if (err) return console.error(err);
    console.log('People who like Burritos (sorted by name, limited to 2, age hidden):', data);
  });
