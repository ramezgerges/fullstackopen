const express = require("express");
const morgan = require("morgan");
//const cors = require("cors");
require("dotenv").config();
const Person = require("./models/person");

morgan.token("json", (req) => {
    if (req.method === "POST" && "content-type" in req.headers &&
        req.headers["content-type"].includes("application/json"))
        return JSON.stringify(req.body);
});

const app = express();
//app.use(cors());
app.use(express.static("build"));
app.use(express.json());
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :json"));

app.get("/api/persons", (req, res, next) => {
    Person
        .find({})
        .then(persons => res.json(persons))
        .catch(error => next(error));
});

app.get("/info", (req, res, next) => {
    Person.find({})
        .then(persons => {
            const length = persons.length;
            res.send(
                `<p>Phonebook has info for ${length === 1 ? "1 person" : `${length} people`}</p>
                        <p>${new Date()}</p>`
            );
        })
        .catch(error => next(error));
});

app.get("/api/persons/:id", (req, res, next) => {
    Person
        .findById(req.params.id)
        .then(person => {
            if (person) res.json(person);
            else res.status(404).end();
        })
        .catch(error => next(error));
});

app.delete("/api/persons/:id", (req, res, next) => {
    Person
        .findByIdAndRemove(req.params.id)
        .then(() => {
            res.status(204).end();
        })
        .catch(error => next(error));
});

app.put("/api/persons/:id", (req, res, next) => {
    const body = req.body;
    if (!(body.name)) {
        return res.status(400).json({
            error: "name must be included"
        });
    } else if (!body.number) {
        return res.status(400).json({
            error: "number must be included"
        });
    }

    const person = new Person({
        _id: req.params.id,
        name: body.name,
        number: body.number
    });

    Person.findByIdAndUpdate(req.params.id, person, { new: true , runValidators: true, context: "query" })
        .then(updatedPerson => {
            if (updatedPerson) res.json(updatedPerson);
            else res.status(404).end();
        })
        .catch(error => next(error));
});

app.post("/api/persons", (req, res, next) => {
    const body = req.body;
    if (!(body.name)) {
        return res.status(400).json({
            error: "name must be included"
        });
    } else if (!body.number) {
        return res.status(400).json({
            error: "number must be included"
        });
    }

    const person = new Person({
        name: body.name,
        number: body.number
    });

    person
        .save()
        .then(savedPerson => res.json(savedPerson))
        .catch(error => next(error));
});

const errorHandler = (error, req, res, next) => {
    console.error(error.message);

    if (error.name === "CastError") {
        console.log("here");
        return res.status(400).send({ error: "malformatted id" });
    } else if (error.name === "DocumentNotFoundError") {
        return  res.status(404).end();
    } else if (error.name === "ValidationError") {
        return res.status(400).json({error: error.message});
    } else {
        return res.status(500).end();
    }
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});