const mongoose = require("mongoose");

if (process.argv.length < 3) {
    console.log("Please provide the password as an argument: node mongo.js <password>");
    process.exit(1);
} else if (process.argv.length > 3 && process.argv.length !== 5) {
    console.log("Syntax error. Correct usage: node mongo.js <password> <field name> <field value>");
    process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://fullstack:${password}@cluster0.zocbc.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });

const personSchema = new mongoose.Schema({
    name: String,
    number: String
});

const Person = mongoose.model("Person", personSchema);

const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
});

if (process.argv.length === 5) {
    person.save().then(() => {
        console.log(`added ${process.argv[3]} ${process.argv[4]} to phonebook`);
        mongoose.connection.close();
    });
} else {
    console.log("phonebook:");
    Person.find({}).then((result) => {
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`);
        });
        mongoose.connection.close();
    });
}