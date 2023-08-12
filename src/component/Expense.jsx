import React from "react"

function Expense({setExpenseGraphValue,setExpenseGraph,data}){
    return(
        <React.Fragment>
            <h2>Expense</h2>
            <div className="optionselector">
                <span className="expenseAmountValue">Expense</span>
                <select onChange={e => {
                        setExpenseGraphValue(e.target.value)
                    }}>
                    <option>Bar</option>
                    <option selected>Doughnut</option>
                </select>
            </div>
            <div className='ExpenseGraph'>
                <canvas id='Expensechart'></canvas>
            </div>
        </React.Fragment>
    )
}

export default Expense