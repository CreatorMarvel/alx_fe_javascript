const newQuoteTextEl = document.getElementById("newQuoteText");
const newQuoteCategoryEl = document.getElementById("newQuoteCategory");
const quoteDisplay = document.getElementById("quoteDisplay");
const showQuote = document.getElementById("newQuote");

const quotes = JSON.parse(localStorage.getItem("quotes")) || [];

const addQuote = () => {
	const textValue = newQuoteTextEl.value.trim();
	const categoryValue = newQuoteCategoryEl.value.trim();

	if (newQuote && newQuoteCategoryEl) {
		const newQuote = {
			quote: textValue,
			category: categoryValue,
		};

		quotes.push(newQuote);
		localStorage.setItem("quotes", JSON.stringify(quotes));

		newQuoteTextEl.value = "";
		newQuoteCategoryEl.value = "";
	}
};

const createAddQuoteForm = (quote, category) => {
	const divEl = document.createElement("div");
	const categoryEl = document.createElement("h2");
	const textEl = document.createElement("p");

	categoryEl.textContent = category;
	textEl.textContent = quote;

	divEl.appendChild(categoryEl);
	divEl.appendChild(textEl);

	quoteDisplay.innerHTML = "";
	quoteDisplay.appendChild(divEl);
};

const showRandomQuote = () => {
	const randomQuote = quotes[Math.floor(Math.random() * quotes.length - 1)];
	createAddQuoteForm(randomQuote.quote, randomQuote.category);
};

function importFromJsonFile(event) {
	const fileReader = new FileReader();
	fileReader.onload = function (event) {
		const importedQuotes = JSON.parse(event.target.result);
		quotes.push(...importedQuotes.quotes);
		localStorage.setItem("quotes", JSON.stringify(quotes));
		alert("Quotes imported successfully!");
	};
	fileReader.readAsText(event.target.files[0]);

	console.log(quotes);
}

function exportToJsonFile() {
	const obj = {
		quote: newQuoteTextEl.value,
		category: newQuoteCategoryEl.value,
	};

	const file = new File([JSON.stringify(obj)], "quotes.json", {
		type: "application/json",
	});

	const link = URL.createObjectURL(file);
	const btn = document.createElement("a");
	btn.textContent = "Export Quotes";
	btn.href = link;
	btn.download = file.name;

	document.body.appendChild(btn);
}

exportToJsonFile();

showQuote.addEventListener("click", showRandomQuote);
