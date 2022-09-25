const search = function () {
  const search = document.getElementById("search");

  let keyword = search.value;
  let language = getLanguage();
  const apiKey = "6157b3a94d66439d803599800d245524";

  let url = `https://newsapi.org/v2/everything?q=${keyword}&language=${language}&apiKey=${apiKey}`;

  fetch(url)
    .then((data) => {
      return data.json();
    })
    .then((data) => {
      showArticles(data);
    });
};

const getLanguage = function () {
  const allLanguages = document.getElementById("all");
  const en = document.getElementById("en");
  const fr = document.getElementById("fr");
  const de = document.getElementById("de");
  const es = document.getElementById("es");

  if (allLanguages.checked) {
    return "";
  }

  if (en.checked) {
    return "en";
  }

  if (fr.checked) {
    return "fr";
  }

  if (de.checked) {
    return "de";
  }

  if (es.checked) {
    return "es";
  }
};

const showArticles = function (data) {
  //hide resultsError
  let resultsError = document.getElementById("resultsError");
  resultsError.style = "display:none";

  //hide container
  let tableContainer = document.getElementById("tableContainer");
  tableContainer.style = "display:none";

  //empty table
  let articlesTable = document.getElementById("articlesTable");
  articlesTable.innerHTML = "";

  //if more than 0 articles build table
  if (data.articles && data.articles.length > 0) {
    tableContainer.style = "display:block";

    buildHeaders(articlesTable);
    buildRows(articlesTable, data.articles);
  } else {
    if (data.articles) {
      resultsError.innerHTML = "No results found!";
    } else {
      resultsError.innerHTML = "Type something!";
    }
    resultsError.style = "display:block";
  }
};

const buildHeaders = function (table) {
  let headerRow = table.insertRow(0);

  let numberHeader = headerRow.insertCell(0);
  let titleHeader = headerRow.insertCell(1);
  let dateHeader = headerRow.insertCell(2);

  numberHeader.innerHTML = "<b><u>No</u></b>";
  titleHeader.innerHTML = "<b><u>TITLE</u></b>";
  dateHeader.innerHTML = "<b><u>DATE</u></b>";
  titleHeader.style = "width:80%";
};

const buildRows = function (table, articles) {
  for (let i = 0; i < 25; i++) {
    let article = articles[i];

    //if article is undefined
    if (!article) {
      return;
    }

    let row = table.insertRow(i + 1);

    let number = row.insertCell(0);
    let title = row.insertCell(1);
    let date = row.insertCell(2);

    number.innerHTML = i + 1;
    title.innerHTML = `<a href="#">${article.title}</a>`;

    //calls function showArticleDetails when you click on it
    title.addEventListener("click", () => {
      showArticleDetails(article);
    });

    date.innerHTML = article.publishedAt.substring(0, 10);
  }
};

const showArticleDetails = function (article) {
  const link = document.createElement("div");
  link.innerHTML = `<h4><a href="${article.url}" target="_blank">Go to Article!</a><h4>`;

  let description = article.description;
  if (!description) {
    description = "Description unavailable";
  }

  let author = article.author;
  if (!author) {
    author = "N/A";
  }

  let source = article.source.Name;
  if (!source) {
    source = "N/A";
  }

  swal({
    title: article.title,
    text: description + "\n\n Author: " + author + "\n Source: " + source,
    content: link,
    icon: article.urlToImage,
  });
};
