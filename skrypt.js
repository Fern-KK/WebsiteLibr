// Funkcje do dodwania koloru i uswania starych
function lightmode() {
    document.body.classList.remove('darkMode', 'yellowMode');
    document.body.classList.add('lightMode');
    setCookie('mode', '0');
}
function darkmode() {
    document.body.classList.remove('lightMode', 'yellowMode');
    document.body.classList.add('darkMode');
    setCookie('mode', '1');
}
function yellowmode() {
    document.body.classList.remove('darkMode', 'lightMode');
    document.body.classList.add('yellowMode');
    setCookie('mode', '2');
}

// to samo co wczesnie ale dla wielkosci tekstu
function textNormal() {
    document.body.classList.remove('bigText', 'biggerText');
    document.body.classList.add('normalText');
    setCookie('font', '0');
}

function textMiddle() {
    document.body.classList.remove('normalText', 'biggerText');
    document.body.classList.add('bigText');
    setCookie('font', '1');
}

function textBig() {
    document.body.classList.remove('normalText', 'bigText');
    document.body.classList.add('biggerText');
    setCookie('font', '2');
}

// do ustawiania cookies
function setCookie(name, value) {
    document.cookie = `${name}=${value}; path=/; max-age=86400`;
}

// zalaczanie domyslnych ustawien
if (!document.cookie.includes('mode=')) {
    setCookie('mode', '0');
}
if (!document.cookie.includes('font=')) {
    setCookie('font', '0');
}

// wykrywa klikniecie i wywoluje funkcie kontrastu i czciosnki
document.getElementById('light').addEventListener('click', lightmode);
document.getElementById('dark').addEventListener('click', darkmode);
document.getElementById('yellow').addEventListener('click', yellowmode);

document.getElementById('normalText').addEventListener('click', textNormal);
document.getElementById('bigText').addEventListener('click', textMiddle);
document.getElementById('biggerText').addEventListener('click', textBig);

// sprawdza cookies
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

// kontrast
const mode = getCookie('mode');
if (mode === '0') lightmode();
else if (mode === '1') darkmode();
else if (mode === '2') yellowmode();

// czcionski
const font = getCookie('font');
if (font === '0') textNormal();
else if (font === '1') textMiddle();
else if (font === '2') textBig();







let books;
async function fetchContent() {
    const response = await fetch('https://backend-www-projekt.onrender.com/books');
    const data = await response.json();
    books = data;
    lista();
}
fetchContent();
function lista() {
    books.forEach(element => {
        // Główny div
        const bookDiv = document.createElement("div");
        bookDiv.className = "book";
        
        // div z indoramcjami o książce
        const infoDiv = document.createElement("div");
        
        // Tytuł 
        const title = document.createElement("h3");
        title.textContent = element.title;
        infoDiv.appendChild(title);
        
        // Autor i rok 
        const authorYear = document.createElement("p");
        let year;
        if (element.year > 0) {
            year = `${element.year}`;
        } else if (element.year < 0) {
            year = `${Math.abs(element.year)} p.n.e.`;}
        authorYear.textContent = `${element.author} (${year})`;
        infoDiv.appendChild(authorYear);
        
        // Gatunek 
        const genre = document.createElement("p");
        genre.textContent = `Gatunek: ${element.genre}`;
        infoDiv.appendChild(genre);
        
        // e-booki
        const ebook = document.createElement("p");
        if (element.ebook !== "brak") {
            const ebookLink = document.createElement("a");
            ebookLink.href = element.ebook;
            ebookLink.textContent = "PDF";
            ebookLink.target = "_blank";
            ebook.textContent = "Wersja elektroniczna: ";
            ebook.appendChild(ebookLink);
        } else {
            ebook.textContent = "Wersja elektroniczna: brak";
        }
        infoDiv.appendChild(ebook);
        
        // Przycisk 
        const buttonDiv = document.createElement("div");
        const button = document.createElement("button");
        if (element.available) {
            button.textContent = "Wypożycz";
            button.className = "available";
        } else {
            button.textContent = "Niedostępne";
            button.className = "unavailable";
            button.disabled = true;
        }
        buttonDiv.appendChild(button);
        
        // Dodanie wszystkego do głównego diva
        bookDiv.appendChild(infoDiv);
        bookDiv.appendChild(buttonDiv);
        
        // Dodanie diva do article
        document.getElementById("katalog").appendChild(bookDiv);
    });
}