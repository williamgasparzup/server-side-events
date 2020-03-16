var express = require('express');
var app = express();
var faker = require('faker');

app.get('/', function (_, res) {
    res.send('Hello World!');
});

app.get("/stream", (req, res) => {
    res.set({
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type, Accept",
    })

    setInterval(() => {
        const date = new Date()

        res.write(`data: ${JSON.stringify({
            id: +date,
            unread: true,
            date: date.toISOString(),
            text: faker.lorem.lines(1),
            user: {
                image: faker.image.avatar(),
                name: faker.name.findName()
            }
        })}\n\n`)
    }, 5000)
})

app.listen(3001, function () {
    console.log('Example app listening on port 3001!');
});