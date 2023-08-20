import React, { useEffect, useState } from "react";
import axios from "axios"

const url = 'http://localhost:8000';

const Home = () => {

    const [totalIncome,setTotalIncome] = useState(0);
    const [totalExpanse,setTotalExpanses] = useState(0);
    const [incomeData,setIncomeData] = useState([]);
    const [expanseData,setExpanseData] = useState([]);

    useEffect(()=>{
        axios.get(url+'/expanses/totalexpanse')
        .then((res)=>{
            setTotalExpanses(res.data[0].Total);
        })
        .catch((err)=>{
            console.log(err)
        })

        axios.get(url+'/incomes/totalincome')
        .then((res)=>{
            setTotalIncome(res.data[0].Total);
        })
        .catch((err)=>{
            console.log(err)
        })

        axios.get(url+'/expanses/recent/transactions')
        .then((res)=>{
            setExpanseData(res.data)
        })
        .catch((err)=>{
            console.log(err)
        })

        axios.get(url+'/incomes/recent/transactions')
        .then((res)=>{
            setIncomeData(res.data)
        })
        .catch((err)=>{
            console.log(err)
        })

    },[totalExpanse,totalIncome,incomeData,expanseData])

    const expanses  = <tbody>
                        {
                            expanseData.map((ele) => (
                                <>
                                <tr key={ele.ID}>
                                    <td> {ele.Title} </td>
                                    <td> {ele.Amount} </td>
                                    <td> {ele.Date} </td>
                                    <td> {ele.Description} </td>
                                </tr>
                                </>
                            ))
                        }
                    </tbody>


    const total_expanses = 
                        <>
                        <h3> Expanses </h3>
                    <table>
                        <thead>
                        <tr>
                            <th> Title</th>
                            <th> Amount </th>
                            <th> Date </th>
                            <th> Description </th>
                        </tr>
                        </thead>
                        {expanses}
                    </table>
                    </>

    const incomes  = <tbody>
                        {
                            incomeData.map((ele) => (
                                <>
                                <tr key={ele.ID}>
                                    <td> {ele.Title} </td>
                                    <td> {ele.Amount} </td>
                                    <td> {ele.Date} </td>
                                    <td> {ele.Description} </td>
                                </tr>
                                </>
                            ))
                        }
                    </tbody>


    const total_incomes = 
                    <>
                    <h3> Incomes </h3>
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
                    </>

    return (
        <>
        <h1> Dashboard </h1>
        <h3> Total Income - $ {totalIncome} </h3>
        <h3> Total Expanse - $ {totalExpanse} </h3>
        <h2> Recent Transactions </h2>
        {total_incomes}
        {total_expanses}
        </>
    )
}
export default Home