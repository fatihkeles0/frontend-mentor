
const expensesChart  = document.querySelector(".expenses-chart__bars");

let data;


fetch("data.json")

    .then(function(response){
        return response.json();
    })

    .then(function (jsonData){
        data = jsonData;
        expensesChartBarCreater(data);
    })

    .catch(function(error){
        console.log("Error json is not found !", error)
    });



    function expensesChartBarCreater(data){
    
        for(let i = 0; i < data.length; i++){
        let chartDayDiv = document.createElement("div");
        chartDayDiv.className = "expenses-chart__day";

        chartDayDiv.addEventListener("click", (event) => {
            handleChartDayClick(event,data);
        });


        let chartBarDiv = document.createElement("div");
        chartBarDiv.className = "expenses-chart__bar";

        let chartDayLabelDiv = document.createElement("p");

        chartDayLabelDiv.className = "expenses-chart__day-label";
        chartDayLabelDiv.textContent = data[i].day;

        expensesChart.appendChild(chartDayDiv);
        chartDayDiv.appendChild(chartBarDiv);
        chartDayDiv.appendChild(chartDayLabelDiv);
        }

        expensesChartBarHeightCreater(data);



    }


function expensesChartBarHeightCreater(data) {
    const highestAmount = Math.max(...data.map(item => item.amount));

    const chartBars = expensesChart.querySelectorAll(".expenses-chart__bar");

    for (let i = 0; i < data.length; i++) {
        const barHeight = (data[i].amount / highestAmount) * 100;

        chartBars[i].style.height = `${barHeight}px`;
    }

    expensesChartActiveDay(data);
}


function expensesChartActiveDay(data){

    const expensesChartBars = document.querySelectorAll(".expenses-chart__bar");

    const weekdays = ["sun","mon","tue","wed","thu","fri","sat"]
    const toDay = weekdays[new Date().getDay()];

   
    for (let i = 0; i < data.length; i++){
        if (data[i].day === toDay){
            expensesChartBars[i].style.backgroundColor = "var(--clr-primary-blue-300)";
        }
    }
  
}



function handleChartDayClick(event,data){

    const clickedDay = event.currentTarget;
    const clickedDayText = clickedDay.querySelector(".expenses-chart__day-label").textContent;

    const activeDivs = expensesChart.querySelectorAll(".active");
    activeDivs.forEach(div => div.remove());


    for (let i = 0; i<data.length; i++){
       if (data[i].day == clickedDayText){
            const activeDiv = document.createElement("div");
            activeDiv.className = "active";
            activeDiv.textContent = data[i].amount;
            clickedDay.prepend(activeDiv);
       }    
    }
  
}





          