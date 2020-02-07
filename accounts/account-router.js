const express = require('express');

const db = require('../data/dbConfig.js');

const router = express.Router();

// REQ -- ID, NAME, BUDGET

router.get('/', async (req, res) => {
    try{
        const accounts = await db('accounts');
        res.status(200).json(accounts);
    } catch(err) {
        res.status(500).json({message: "Failed to get accounts"});
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try{
        const account = await db('accounts').where('id', id);
        res.status(200).json(account);
    } catch(err) {
        res.status(500).json({message: "Failed to get account"});
    }
});

router.post('/', async (req, res) => {
    const accountData = req.body;
    try {
        const account = await db('accounts').insert(accountData);
        res.status(201).json(account);
    } catch(err) {
        res.status(500).json({message: "Failed to insert account"});
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const accountData = req.body;
    try {
        const rowsUpdated = await db('accounts').where('id', id).update(accountData);
        res.status(200).json({updated: rowsUpdated});
    } catch(err) {
        res.status(500).json({message: "Failed to update account"});
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const rowsDeleted = await db('accounts').where('id', id).del();
        res.status(200).json({deleted: rowsDeleted});
    } catch(err) {
        res.status(500).json({message: "Failed to delete account"});
    }
});

module.exports = router;