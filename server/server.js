const app = require("./app");
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("Server is running well!")
})
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
