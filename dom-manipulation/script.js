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

const createQuoteElement = (quote, category) => {
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

	createQuoteElement(randomQuote.quote, randomQuote.category);
};

showQuote.addEventListener("click", showRandomQuote);
