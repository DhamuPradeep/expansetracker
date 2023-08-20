import express from "express"
import mysql, { createConnection } from "mysql"

const router = express.Router()

const db = createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"expansetracker",
})

const getAllExpanses = async(req,res) => {
    const sql = "SELECT ID,Title,Amount,date_format(date,'%D-%M-%Y') AS Date,Description FROM expanses";
    db.query(sql,(err,data) => {
        if(err)
            return res.json("Error while axcessing the database")
        return res.json(data);
    })
}

const addNewExpanse = async(req,res) => {
    const sql = "INSERT INTO expanses(`Title`,`Amount`,`Date`,`Description`) VALUES(?)";
    const values = [
        req.body.title,
        req.body.amount,
        req.body.date,
        req.body.description
    ]

    db.query(sql,[values],(err,data) => {
        if(err)
            return res.json("Error in adding Expanse")
        return res.json(data);
    })
}

const deleteExpanse = async(req,res) => {
    const sql = "DELETE FROM expanses WHERE ID = ?";
    const id = req.params.id;
    
    db.query(sql,id,(err,data) => {
        if(err)
            return res.json(err)
        return res.json(data)
    })
}

const totalExpanse = async(req,res) => {
    const sql = "SELECT SUM(Amount) AS Total FROM expanses";
    db.query(sql,(err,data)=>{
        if(err)
            return res.json("Error in Getting Total Sum")
        return res.json(data)
    })
}

const getExpanse = async(req,res) => {
    const sql = "SELECT ID,Title,Amount,date_format(date,'%Y-%m-%d') AS Date,Description FROM expanses WHERE ID = ?";
    const id = req.params.id;

    db.query(sql,[id],(err,data)=>{
        if(err)
            return res.json(err)
        return res.json(data)
    })
}


const updateExpanse = async(req,res) => {
    const sql = "UPDATE expanses SET Title = ? , Amount = ?,Date = ?, Description = ? WHERE ID = ? ";
    const values = [
        req.body.title,
        req.body.amount,
        req.body.date,
        req.body.description,
        req.params.id
    ]
    db.query(sql,values,(err,data) => {
        if(err)
            return res.json(err)
        return res.json(data)
    })
}

const recentTransactions = async(req,res) => {
    const sql = "SELECT ID,Title,Amount,date_format(date,'%D-%M-%Y') AS Date,Description FROM expanses ORDER BY Date DESC LIMIT 3";
    db.query(sql,(err,data) => {
        if(err)
            return res.json("Error while axcessing the database")
        return res.json(data);
    })
}

router.get('/',getAllExpanses);
router.post('/addexpanses',addNewExpanse);
router.delete('/delete/:id',deleteExpanse);
router.get('/totalexpanse',totalExpanse);
router.get('/:id',getExpanse);
router.patch('/updateExpanse/:id',updateExpanse);
router.get('/recent/transactions',recentTransactions);

export default router