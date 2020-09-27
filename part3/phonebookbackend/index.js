import express from "express";
import morgan from "morgan";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.static("build"));
app.use(express.json());

morgan.token("json", (req) => {
    if (req.method === "POST" && "content-type" in req.headers &&
        req.headers["content-type"].includes("application/json"))
        return JSON.stringify(req.body);
});
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :json"));

let persons = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
    },
    {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
    },
    {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
    },
    {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
    }
];

app.get("/api/persons", (req, res) => {
    res.json(persons);
});

app.get("/info", (req, res) => {
    res.send(
        `<p>Phonebook has info for ${persons.length} people</p>
<p>${new Date()}</p>`
    );
});

app.get("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id);
    const person = persons.find(person => person.id === id);
    if (person) res.json(person);
    else res.status(404).end();
});

app.delete("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id);
    persons = persons.filter(person => person.id !== id);
    res.status(204).end();
});

app.post("/api/persons", (req, res) => {
    const person = { ...req.body };
    if (!("name" in person)) {
        return res.status(400).json({
            error: "name must be included"
        });
    }
    if (!("number" in person)) {
        return res.status(400).json({
            error: "number must be included"
        });
    }
    if (persons.find(p => p.name === person.name)) {
        return res.status(400).json({
            error: "name must be unique"
        });
    }

    //from MDN
    const getRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    };

    person.id = getRandomInt(1, Number.MAX_SAFE_INTEGER);
    persons.push(person);
    res.json(person);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});