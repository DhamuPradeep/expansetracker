import express from "express"
import mysql, { createConnection } from "mysql"

const router = express.Router()

const db = createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"expansetracker",
})

const getAllIncomes = async(req,res) => {
    const sql = "SELECT ID,Title,Amount,date_format(date,'%D-%M-%Y') AS Date,Description FROM incomes";
    db.query(sql,(err,data) => {
        if(err)
            return res.json("Error while axcessing the database")
        return res.json(data);
    })
}

const addNewIncome = async(req,res) => {
    const sql = "INSERT INTO incomes(`Title`,`Amount`,`Date`,`Description`) VALUES(?)";
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

const deleteIncome = async(req,res) => {
    const sql = "DELETE FROM incomes WHERE ID = ?";
    const id = req.params.id;
    
    db.query(sql,id,(err,data) => {
        if(err)
            return res.json(err)
        return res.json(data)
    })
}

const totalIncome = async(req,res) => {
    const sql = "SELECT SUM(Amount) AS Total FROM incomes";
    db.query(sql,(err,data)=>{
        if(err)
            return res.json("Error in Getting Total Sum")
        return res.json(data)
    })
}

const getIncome = async(req,res) => {
    const sql = "SELECT ID,Title,Amount,date_format(date,'%Y-%m-%d') AS Date,Description FROM incomes WHERE ID = ?";
    const id = req.params.id;

    db.query(sql,[id],(err,data)=>{
        if(err)
            return res.json(err)
        return res.json(data)
    })
}

const updateIncome = async(req,res) => {
    const sql = "UPDATE incomes SET Title = ? , Amount = ?,Date = ?, Description = ? WHERE ID = ? ";
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
    const sql = "SELECT ID,Title,Amount,date_format(date,'%D-%M-%Y') AS Date,Description FROM incomes ORDER BY Date LIMIT 3";
    db.query(sql,(err,data) => {
        if(err)
            return res.json("Error while axcessing the database")
        return res.json(data);
    })
}

router.get('/',getAllIncomes);
router.post('/addincomes',addNewIncome);
router.delete('/delete/:id',deleteIncome);
router.get('/totalincome',totalIncome);
router.get('/:id',getIncome);
router.patch('/updateIncome/:id',updateIncome);
router.get('/recent/transactions',recentTransactions);


export default router