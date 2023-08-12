import React from "react"
import { useDispatch } from "react-redux"
import {action} from '../context/store'

function Main({setIncome,setCategory,SubmitHandle,setAmount,data,setDate,totalAmount}){
    let dispatch = useDispatch();
    return(
        <React.Fragment>
            <h1>Expense Tracker</h1>
            <br />
            <h1>Total Balance <br /> <center>₹{totalAmount}</center></h1>
            <br />
            <h3>
                Try Adding:
                Add Income for ₹ 100 in 
                Category Salary for Monday
            </h3>
            <br />
            <form onSubmit={SubmitHandle}>
            <select onChange={e => setIncome(e.target.value)}>
                <option selected hidden disabled>Type</option>
                <option>Income</option>
                <option>Expense</option>
            </select>
            <select onChange={e => setCategory(e.target.value)}>
                <option selected disabled hidden>Category</option>
                <option>Bussiness</option>
                <option>Investment</option>
                <option>Extra Money</option>
                <option>Deposits</option>
                <option>Lottery</option>
                <option>Gifts</option>
                <option>Salary</option>
                <option>Saving</option>
                <option>Rental Income</option>
            </select>
            <input type='number' placeholder='Amount' onChange={e => setAmount(e.target.value)}/>
            <input type='date' onChange={e => setDate(e.target.value)}/>
            <input type='submit' />
            </form>
            <div className='History'>
            {data.map((va,index) => {
                return(
                <div className='item' key={index}>
                <h4>{va.Type}</h4>
                <h4>{va.Category}</h4>
                <p>Rs. {va.Amount}</p>
                <p>{va.Date}</p>
                <button onClick={()=> { 
                    dispatch(action.remove({va,index}));
                    let value = JSON.parse(localStorage.getItem('Values'))
                    console.log(value)
                    let new_ARRAy = value.filter((va,i) => i !== index)
                    localStorage.setItem('Values',JSON.stringify(new_ARRAy));
                    }}>Delete</button>
                </div>
                )
            })}
            </div>
        </React.Fragment>
    )
}


export default Main