const baneRoute = (req, res) => {
    res.send("Bane Bogosavac");
}

const karliRoute = (req, res) => {
    res.send("Karli Moss Bogosavac");
}

module.exports = {
    baneRoute, karliRoute
}