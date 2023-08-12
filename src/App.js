import './App.scss';
import { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { action } from './context/store'
import chart from 'chart.js/auto'
import Income from './component/Income';
import Expense from './component/Expense';
import Main from './component/Main';

function App() {
  let data = useSelector(state => state)
  let [income,setIncome] = useState('')
  let [category,setCategory] = useState('')
  let [amount,setAmount] = useState('')
  let [date,setDate] = useState('')
  let dispatch = useDispatch()
  let [incomeGraph,setIncomeGraphValue] = useState('doughnut')
  let [expenseGraph,setExpenseGraphValue] = useState('doughnut')
  let [totalAmount,setTotalAmount] = useState(0);
  useEffect(()=>{
    let incomeClass = document.querySelector('.incomeAmountValue')
    let expenseClass = document.querySelector('.expenseAmountValue')
    let incomeClassNum = Number(incomeClass.innerText.slice(3))
    let expenseClassNum = Number(expenseClass.innerText.slice(3))
    setTotalAmount(va => incomeClassNum-expenseClassNum)
    setIncomeGraph(data);
    setExpenseGraph(data);
  },[data])
  useEffect(()=>{
    setIncomeGraph(data);
  },[incomeGraph])
  useEffect(()=>{
    setExpenseGraph(data);
  },[expenseGraph])

  function setIncomeGraph(data){
    let Income_div = document.querySelector('.IncomeGraph')
    let GraphString = incomeGraph.toLowerCase();
    let ctx = document.getElementById('Incomechart')
    if(ctx !== null){
      let graph = document.getElementById('Incomechart')
      graph.remove()
      ctx = document.createElement('canvas')
      ctx.setAttribute('id','Incomechart')
      Income_div.appendChild(ctx)
      const _income = data.filter((va,ind)=> va.Type === "Income")
      const _Row_label = _income.map((va,index) => va.Category)
      const _label = _Row_label.filter((va,i) => _Row_label.indexOf(va) === i)
      const new_Arr = []
      for(let i =0; i< _label.length; i++){
        new_Arr.push({Category : _label[i] , Amount : 0})
      }
      for(let i = 0; i< _income.length; i++){
        for(let j = 0; j < new_Arr.length; j++){
          if(_income[i].Category === new_Arr[j].Category){
            new_Arr[j].Amount += _income[i].Amount
          }
        }
      }
      const IncomeValue = new_Arr.reduce((total,value) => total += value.Amount,0)
      const incomeAmountValue = document.querySelector('.incomeAmountValue')
      incomeAmountValue.innerText = `Rs.${IncomeValue}`
      new chart(ctx,{
        type : GraphString,
        data : {
          labels : new_Arr.map(va => va.Category),
          datasets: [{
            label : 'Income',
            data : new_Arr.map(va => va.Amount)
          }]
        }
      })
    }else{
      ctx = document.createElement('canvas')
      ctx.setAttribute('id','Incomechart')
      Income_div.appendChild(ctx)
      new chart(ctx,{
      type : GraphString,
      data : {
          labels : data.map(va => va.Category),
          datasets: [{
            label : 'Income',
            data : data.map(va => va.Amount)
          }]
        }
      })
    }
    
  }

  function setExpenseGraph(data){
    let Expense_div = document.querySelector('.ExpenseGraph')
    let ctx = document.getElementById('Expensechart')
    let GraphString = expenseGraph.toLowerCase();
    if(ctx !== null){
      let graph = document.getElementById('Expensechart')
      graph.remove()
      ctx = document.createElement('canvas')
      ctx.setAttribute('id','Expensechart')
      Expense_div.appendChild(ctx)
      const _income = data.filter((va,ind)=> va.Type === "Expense")
      const _Row_label = _income.map((va,index) => va.Category)
      const _label = _Row_label.filter((va,i) => _Row_label.indexOf(va) === i)
      const new_Arr = []
      for(let i =0; i< _label.length; i++){
        new_Arr.push({Category : _label[i] , Amount : 0})
      }
      for(let i = 0; i< _income.length; i++){
        for(let j = 0; j < new_Arr.length; j++){
          if(_income[i].Category === new_Arr[j].Category){
            new_Arr[j].Amount += _income[i].Amount
          }
        }
      }
      const ExpenseValue = new_Arr.reduce((total,value) => total += value.Amount,0)
      const expenseAmountValue = document.querySelector('.expenseAmountValue')
      expenseAmountValue.innerText = `Rs.${ExpenseValue}`
      new chart(ctx,{
        type :GraphString,
        data : {
          labels : new_Arr.map(va => va.Category),
          datasets: [{
            label : 'Income',
            data : new_Arr.map(va => va.Amount)
          }]
        }
      })
    }else{
      ctx = document.createElement('canvas')
      ctx.setAttribute('id','Expensechart')
      Expense_div.appendChild(ctx)
      new chart(ctx,{
      type :GraphString,
      data : {
          labels : data.map(va => va.Category),
          datasets: [{
            label : 'Income',
            data : data.map(va => va.Amount)
          }]
        }
      })
    }
    
  }

  function SubmitHandle(e){
    e.preventDefault()
    if(income === ''){
      alert('Add Type field')
    }else if(category === ''){
      alert('Add Category field')
    }else if(amount === ''){
      alert('Add Amount field')
    }else if(date === ''){
      alert('Add Date field')
    }else{
      let setdataObject = {Type : income, Category : category, Amount : Number(amount), Date : date}
      dispatch(action.add(setdataObject))
      localStorage.setItem('Values',JSON.stringify([...data,setdataObject]))
      setIncomeGraph([...data,setdataObject])
      setExpenseGraph([...data,setdataObject])
    }
  }
  return (
    <div className='background'>
      <div className='Income'>
        <Income setIncomeGraphValue={setIncomeGraphValue} setIncomeGraph={setIncomeGraph} data={data}/>
      </div>
      <div className='ExpenseTracker'>
        <Main setIncome={setIncome} setCategory={setCategory} setAmount={setAmount} SubmitHandle={SubmitHandle} setDate={setDate} data={data} setIncomeGraph={setIncomeGraph} setExpenseGraph={setExpenseGraph} totalAmount={totalAmount}/>
      </div>
      <div className='Expense'>
        <Expense setExpenseGraphValue={setExpenseGraphValue} setExpenseGraph={setExpenseGraph} data={data}/>
      </div>
    </div>
  );
}

export default App;
