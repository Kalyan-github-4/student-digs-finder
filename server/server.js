//SERVER.JS

const app = require("./app");
const PORT = process.env.PORT || 5000;

console.log(__dirname);

app.get("/", (req, res) => {
    res.send("Server is running well!🚀")
})


app.listen(PORT, () => console.log(`Server running on ${PORT}`));
