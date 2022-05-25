console.log("Start of JS file");

// API base currency selection broken URL shown in console instead

// Grabbing API and replacing base currency with selected currency
function getAPI() {
	const baseCurrency = getBaseCurrency();
	apiURL = `https://kc-exchangeratesapi.herokuapp.com/latest?base=${baseCurrency}`;
	fetch(apiURL)
	.then((response) => response.json())
	.then((data) => {
		apiData = data;
		showCheckboxList(apiData);
		console.log(apiURL);
		});
	}
	

// base currency selection
function getBaseCurrency() {
	console.log('--getBaseCurrency is being run');

	let selectBaseCurrency = document.querySelector('.CurrencyChooser-select');
	let baseCurrency = selectBaseCurrency.value;
	console.log(baseCurrency);
	
	return baseCurrency;
}

// Using API to show all tickers (button and dropdown)
function showCheckboxList() {
	console.log("-- ShowCheckboxList is being invoked");
	let checkboxList = document.querySelector(".CurrencyCheckboxList");
	let CurrencyChooserselect = document.querySelector(".CurrencyChooser-select");

	checkboxList.innerHTML = ``;
	CurrencyChooserselect.innerHTML = ``;

	for (let [ticker] of Object.entries(apiData.rates)) {
		const symbols = ticker;
		checkboxList.innerHTML += `
				<label> 
						<input type="checkbox" id="cbox" onClick="showBarChart('${symbols}')">
						<span>${ticker}</span>
				</label>
				`;
		CurrencyChooserselect.innerHTML += `
				<option value="${symbols}">
						${symbols}
				</option>
				`;
	}
}

// Unfinsihed, Selecting ticker to show barchart
function showBarChart(symbols) {
	console.log("--showBarChart function being invoked");
	let chart = document.querySelector(".BarChart");
	let symbolValue = apiData.rates[symbols];
	let height = symbolValue * 9; // unfinished

	console.log(height)
	chart.innerHTML = ``
	
	chart.innerHTML += `
		<div class="BarChart-bar" style="height: ${height}%;">
			${symbols}<br>
			${apiData.rates[symbols]}
		</div>
	`;
}

getAPI();
