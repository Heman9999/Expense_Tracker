import React from "react"

function Income({setIncomeGraphValue,setIncomeGraph,data}){
    return(
        <React.Fragment>
            <h2>Income</h2>
            <div className="optionselector">
                <span className="incomeAmountValue">Income</span>
                <select onChange={e => {
                        setIncomeGraphValue(e.target.value)
                    }}>
                    <option>Bar</option>
                    <option selected>Doughnut</option>
                </select>
            </div>
            <div className='IncomeGraph'>
                <canvas id='Incomechart'></canvas>
            </div>
        </React.Fragment>
    )
}


export default Income