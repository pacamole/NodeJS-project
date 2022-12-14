const server = require("./App")

const date = new Date()
const time = "Initialized: " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()

const PORT = 5000
server.listen(PORT, function () {
    console.log(time + "\nServer running on http://localhost:5000")
})