const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utilis/geocode")
const weatherStack = require("./utilis/weatherStack")
const port=process.env.PORT;

app = express();

//setup directory 
const directorFile = path.join(__dirname, "../public");
const dirViews = path.join(__dirname, "../templete/views")
const dirpartial = path.join(__dirname, "../templete/partial")

//setup HanderlBars file
app.set("view engine", "hbs");
app.set("views", dirViews);

hbs.registerPartials(dirpartial)
//setup Static Directory file
app.use(express.static(directorFile));

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather-App",
        name: "Mahdi Soultana"
    });
})
app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help",
        message:"Our Services Is Availibale 24/24 hours , our Team is for help !!!",
        name: "Mahdi Soultana"
    });
})
app.get("/about", (req, res) => {
    res.render("about", {
        title: "About-Me",
        
        message:"I'm really Happy to see About me you can read a lot in my GitHub Profile !!!",
        name: "Mahdi Soultana"
    });
})


app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "you must provide trem Location !"
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error });
        }
        weatherStack(longitude, latitude, (err, dataWeather) => {
            if (err) {
                return res.send({ err });
            }
            res.send({
                location, dataWeather, address: req.query.address
            })
        })
    })
});

app.get("/product", (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "error you must seach term "
        })
    }
    res.send({
        product: []
    })

});


app.get("/help/*", (req, res) => {
    res.render("helpNotFound", {
        Message: "Your Articale Help Page Not Found !",
        title: "Ooops Not Found !",
        name: "Mahdi SOULTANA"
    })
})

app.get("*", (req, res) => {
    res.render("404", {
        Message: "404 Page Not Found !",
        title: "404",
        name: "Mahdi SOULTANA"
    })
})
app.listen(port, () => {
    console.log("Server is run in port !"+port)
})