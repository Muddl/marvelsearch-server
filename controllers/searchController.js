require("dotenv").config();

const axios = require("axios").default;

const search = (req, res) => {
    const queryText = req.params.query;

    const searchParams = {
        "q": encodeURIComponent(queryText),
        "q.parser": "simple",
        "q.options": {
            "fields": [
                "name^3",
                "description^2"
            ]
        },
        "sort": "_score desc"
    }

    axios.get(process.env.SEARCH_ENDPOINT, {
        params: searchParams
    })
    .then(result => {
        console.log(result.data.hits);
        res.send(result.data.hits.hit);
    })
    .catch(err => {
        console.log(err);
        res.status(500).send({ message: err.message || "Something unexpected happened here..." });
    });
};

exports.search = search;