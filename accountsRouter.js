const express = require('express')
const { use } = require('./api/server')
const db = require('./data/dbConfig')
const router = express.Router()


function checkPost(req, res, next){
    let userData = req.body
    if (!userData.name || !userData.budget){res.status(500).json({Error: "Please include a name and a budget"})
    } else next()}

router.get('/',(req, res) => {
    db.select('*')
        .from('accounts')
        .then(account => {
            res.status(200).json({response: account})
        })
        .catch(error => {
            res.status(500).json({error: error.message})
        })
})

router.get("/:id", (req, res) => {
    db("accounts")
      .where('id', '=', req.params.id)
      .then(account => {
            res.status(200).json({ data: account });
        })
        .catch((error) => {
            res.status(500).json({error: error.message});
        });
  });

router.post("/", checkPost, (req, res) => {
    db("accounts")
        .insert(req.body)
        .then(account => {
            res.status(201).json({ data: account });
        })
        .catch((error) => {
            res.status(500).json({ error: err.message });
        });
});

router.delete("/:id", (req, res) => {
    db("accounts")
        .delete()
        .where({ 
            id: req.params.id })
        .then(account => {
            res.status(200).json(account);
        })
        .catch((error) => {
            res.status(500).json({ error: error.message });
        });
});

router.put("/:id", checkPost, (req, res) => {
    db("accounts")
        .where({ 
            id: req.params.id })
        .update(req.body)
        .then(account => {
            res.status(201).json({ data: account })
        .catch((error) => {
            res.status(500).json({ error: error.message });
        }); 
    });
});




module.exports = router
