const newQuoteTextEl = document.getElementById("newQuoteText");
const newQuoteCategoryEl = document.getElementById("newQuoteCategory");
const quoteDisplay = document.getElementById("quoteDisplay");
const showQuote = document.getElementById("newQuote");

const getQuotes = (byFilter) => {
	if (byFilter) {
		console.log(byFilter);
		return byFilter;
	}
	return JSON.parse(localStorage.getItem("quotes")) || [];
};

const quotes = getQuotes();

const addQuote = () => {
	const textValue = newQuoteTextEl.value.trim();
	const categoryValue = newQuoteCategoryEl.value.trim();

	if (newQuoteCategoryEl) {
		const newQuote = {
			quote: textValue,
			category: categoryValue,
		};

		quotes.push(newQuote);
		localStorage.setItem("quotes", JSON.stringify(quotes));

		newQuoteTextEl.value = "";
		newQuoteCategoryEl.value = "";
		populateCategories();
	}
};

const createAddQuoteForm = (qt, ctg) => {
	const divEl = document.createElement("div");
	const categoryEl = document.createElement("h2");
	const textEl = document.createElement("p");

	categoryEl.textContent = ctg;
	textEl.textContent = qt;

	divEl.appendChild(categoryEl);
	divEl.appendChild(textEl);

	quoteDisplay.innerHTML = "";
	quoteDisplay.appendChild(divEl);
};

const showRandomQuote = () => {
	const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
	createAddQuoteForm((qt = randomQuote.quote), (ctg = randomQuote.category));
};

const importFromJsonFile = (event) => {
	const fileReader = new FileReader();
	fileReader.onload = function (event) {
		const importedQuotes = JSON.parse(event.target.result);
		quotes.push(...importedQuotes.quotes);
		localStorage.setItem("quotes", JSON.stringify(quotes));
		alert("Quotes imported successfully!");
		populateCategories();
	};
	fileReader.readAsText(event.target.files[0]);

	console.log(quotes);
};

const exportToJsonFile = () => {
	const obj = {
		quote: newQuoteTextEl.value,
		category: newQuoteCategoryEl.value,
	};
	const blob = new Blob([JSON.stringify(obj)], { type: "application/json" });
	const file = new File([blob], "quotes.json", { type: "application/json" });

	const link = URL.createObjectURL(file);
	const btn = document.querySelector(".export-to-json");
	btn.textContent = "Export Quotes";
	btn.href = link;
	btn.download = file.name;

	document.body.appendChild(btn);
};

const populateCategories = () => {
	const categories = getQuotes();
	const allCtgs = [];

	for (const ctg of categories) {
		allCtgs.push(ctg.category);
	}

	const populateCategories = Array.from(new Set(allCtgs));

	populateCategories.map((element) => {
		const selectDisplay = document.querySelector("#categoryFilter");
		const option = document.createElement("option");
		option.textContent = element;
		option.setAttribute("value", element);
		selectDisplay.appendChild(option);
	});
};

const filterQuotes = (e) => {
	const categoryFilter = document.getElementById("categoryFilter").value;
	let allQuotes = getQuotes();

	const filteredQuotes = allQuotes.filter(
		(quote) => quote.category === categoryFilter
	);
	return getQuotes(filteredQuotes);
};

populateCategories();

exportToJsonFile();

showQuote.addEventListener("click", showRandomQuote);
