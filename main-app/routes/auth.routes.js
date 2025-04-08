
module.exports = (app) => {
    app.get("/auth", (req, res) => {
        res.send("Hello Im Auth Route")
    })
}