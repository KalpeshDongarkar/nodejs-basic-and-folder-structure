
module.exports = (app) => {
    app.get("/other", (req, res) => {
        res.send("Hello Im other Route")
    })
}