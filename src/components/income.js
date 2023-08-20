import React, { useEffect, useState } from 'react'
import axios from "axios"

const url = 'http://localhost:8000/incomes';

const Incomes = () => {

    const [title,setTitle] = useState("");
    const [amount,setAmount] = useState("");
    const [date,setDate] = useState("");
    const [description,setDescription] = useState("");
    const [data,setData] = useState([])
    const [total,setTotal] = useState(0);
    const [isupdate,setIsUpdate] = useState(false)
    const [updateId,setUpdateId] = useState(0)
 
    const handleSubmit = async(event) =>{
        event.preventDefault();
        await axios.post(url+'/addincomes',{title,amount,date,description})
        .then((res)=>{
            console.log("Incomes Added Successfully");
            setTitle("");
            setAmount("");
            setDate("");
            setDescription("");
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    const handleDelete = async(id) => {
       await axios.delete(url+'/delete/'+id)
       .then((res)=>{
            console.log("Deleted")
       })
       .catch((err)=>{
            console.log(err)
       })
    }

    const handleUpdateId = async(id) => {
        await axios.get(url+'/'+id)
        .then((res) => {
            setUpdateId(id);
            setTitle(res.data[0].Title)
            setAmount(res.data[0].Amount);
            setDate(res.data[0].Date);
            setDescription(res.data[0].Description);
            setIsUpdate(true)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const handleUpdate = async(event) => {
        event.preventDefault();
        await axios.patch(url+'/updateIncome/'+updateId,{title,amount,date,description})
        .then((res)=>{
            console.log("Incomes Updated Successfully");
            setTitle("");
            setAmount("");
            setDate("");
            setDescription("");
            setIsUpdate(false)
            setUpdateId(0)
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    const handleCancel = async(event) => {
        setTitle("");
        setAmount("");
        setDate("");
        setDescription("");
        setIsUpdate(false);
        setUpdateId(0);
    }

    useEffect(()=>{
        axios.get(url)
        .then((res)=>{
            setData(res.data)
        })
        .catch((err)=>{
            console.log(err)
        })

        axios.get(url+'/totalincome')
        .then((res) => {
            setTotal(res.data[0].Total)
        })
        .catch((err) => {
            console.log(err)
        })

    },[data,total,isupdate])

    const form = <>
                <label>Title</label>
                <input type='text' name="title" value={title} onChange={(event) => setTitle(event.target.value) } ></input><br></br>
                <label>Amount</label>
                <input type='text' name="amount" value={amount} onChange={(event) => setAmount(event.target.value) } ></input><br></br>
                <label>Date</label>
                <input type='date' name="date" value={date} onChange={(event) => setDate(event.target.value) } ></input><br></br>
                <label>Description</label>
                <input type='text' name="description" value={description} onChange={(event) => setDescription(event.target.value) } ></input><br></br>
                {!isupdate && <button type='submit' onClick={handleSubmit}>Submit</button>}
                {isupdate && <button type = 'submit' onClick={handleUpdate}>Update</button>}
                {<button type='submit' onClick={handleCancel}> Cancel </button>}
                </>

    const incomes  = <tbody>
                        {
                        
                            data.map((ele) => (
                                <>
                                <tr key={ele.ID}>
                                    <td> {ele.Title} </td>
                                    <td> {ele.Amount} </td>
                                    <td> {ele.Date} </td>
                                    <td> {ele.Description} </td>
                                    <td><button type='submit' onClick={e => handleDelete(ele.ID)} > Delete </button></td>
                                    <td> <button type='submit' onClick={e => handleUpdateId(ele.ID)}> Update </button> </td>
                                </tr>
                                </>
                            ))
                        }
                    </tbody>


    const total_incomes = 
                    <table>
                        <thead>
                        <tr>
                            <th> Title</th>
                            <th> Amount </th>
                            <th> Date </th>
                            <th> Description </th>
                        </tr>
                        </thead>
                        {incomes}
                    </table>

    return (
        <>
        <h1>Incomes</h1>
        <h3>Total Income - ${total}</h3>
        {form}
        {total_incomes}
        </>
    )
}

export default Incomes;