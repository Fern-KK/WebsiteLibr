// Funkcje do dodwania koloru i uswania starych
function lightmode() {
    document.body.classList.remove('darkMode', 'yellowMode');
    document.body.classList.add('lightMode');
    localStorage.setItem("Mode", 0);
}
function darkmode() {
    document.body.classList.remove('lightMode', 'yellowMode');
    document.body.classList.add('darkMode');
    localStorage.setItem("Mode", 1);
}
function yellowmode() {
    document.body.classList.remove('darkMode', 'lightMode');
    document.body.classList.add('yellowMode');
    localStorage.setItem("Mode", 2);
}

// to samo co wczesnie ale dla wielkosci tekstu
function textNormal() {
    document.body.classList.remove('bigText', 'biggerText');
    document.body.classList.add('normalText');
    localStorage.setItem("Font", 0);
}

function textMiddle() {
    document.body.classList.remove('normalText', 'biggerText');
    document.body.classList.add('bigText');
    localStorage.setItem("Font", 1);
}

function textBig() {
    document.body.classList.remove('normalText', 'bigText');
    document.body.classList.add('biggerText');
    localStorage.setItem("Font", 2);
}



// wykrywa klikniecie i wywoluje funkcie kontrastu i czciosnki
document.getElementById('light').addEventListener('click', lightmode);
document.getElementById('dark').addEventListener('click', darkmode);
document.getElementById('yellow').addEventListener('click', yellowmode);

document.getElementById('normalText').addEventListener('click', textNormal);
document.getElementById('bigText').addEventListener('click', textMiddle);
document.getElementById('biggerText').addEventListener('click', textBig);



const mode = localStorage.getItem("Mode");
if (mode === '0') lightmode();
else if (mode === '1') darkmode();
else if (mode === '2') yellowmode();

const font = localStorage.getItem("Font");
if (font === '0') textNormal();
else if (font === '1') textMiddle();
else if (font === '2') textBig();






// sprawdza czy jaki jest dzień i godz i wyświetla czy biblioteka jest teraz otwarta
function checkTime() {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const currentTime = hours * 100 + minutes;

    let state = "Biblioteka jest zamknięta"; 
    
    // Sprawdzamy dni (pon-pt)
    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
        if (currentTime >= 800 && currentTime < 1900) {
            state = "Biblioteka jest otwarta";}
    }
    // sobota
    else if (dayOfWeek === 6 && currentTime >= 800 && currentTime < 1400) {
        state = "Biblioteka jest otwarta";
    }
    const IsOpen = document.getElementById("IsOpen");
    IsOpen.style.fontWeight = 'bold';
    IsOpen.textContent = state;
}

// Co minute odpala checkTime
if(document.getElementById("IsOpen")){
    checkTime();
    setInterval(checkTime, 60000);
}





























if(document.getElementById("katalog")){
   
    let books;
    async function fetchContent() {
        const response = await fetch('https://backend-www-projekt.onrender.com/books');
        if (!response.ok) {
                document.getElementById("loading").remove();
                document.getElementById("katalog").textContent= `HTTP error! Status: ${response.status}`;
            }
        const data = await response.json();
        books = data.books;
        lista();
    }
    fetchContent();
    function lista() {
    // usuwanie ladowania
    document.getElementById("loading").remove();
    books.forEach(element => {
        

        // Główny div
        const bookDiv = document.createElement("div");
        bookDiv.className = "book";
        // dodwananie atrybutów do fitrowania
        bookDiv.setAttribute("title",element.title);
        bookDiv.setAttribute("author",element.author);        
        bookDiv.setAttribute("genre",element.genre);        
        bookDiv.setAttribute("available",element.available);
        bookDiv.setAttribute("ebook",element.ebook);
        if(element.year<476 ){bookDiv.setAttribute("year","pne");}
        if(element.year>=476 && element.year<1500){bookDiv.setAttribute("year","sr");}
        if(element.year>=1500 && element.year<1600){bookDiv.setAttribute("year","16");}
        if(element.year>=1600 && element.year<1700){bookDiv.setAttribute("year","17");}
        if(element.year>=1700 && element.year<1800){bookDiv.setAttribute("year","18");}
        if(element.year>=1800 && element.year<1900){bookDiv.setAttribute("year","19");}
        if(element.year>=1900 && element.year<2000){bookDiv.setAttribute("year","20");}
        if(element.year>=2000 && element.year<2100){bookDiv.setAttribute("year","21");}
        



        
        // div z indoramcjami o książce
        const infoDiv = document.createElement("div");
        
        // Tytuł 
        const title = document.createElement("h2");
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
            button.addEventListener("click", wypozycz);
        } else {
            button.textContent = "Niedostępne";
            button.className = "unavailable";
            button.disabled = true;
        }
        button.dataset.id = element._id; 
        buttonDiv.appendChild(button);
        
        // Dodanie wszystkego do głównego diva
        bookDiv.appendChild(infoDiv);
        bookDiv.appendChild(buttonDiv);
        
        // Dodanie diva do article
        document.getElementById("katalog").appendChild(bookDiv);
        
    });
}}


// filtrowanie
function applyFilters() {
    const dostep = document.getElementsByName('available')[0].checked;
    const ebook = document.getElementsByName('ebook')[0].checked;
    const yearInput = document.getElementById("yearFilter").value;
    const genreInput = document.getElementById("genreFilter").value;
    const search = document.getElementById("searchInput").value.toUpperCase();


    const books = document.querySelectorAll(".book");
    
    books.forEach(book => {
        let showBook = true;

        const info = (book.getAttribute("title")+' '+book.getAttribute("author")+' '+book.getAttribute("genre")).toUpperCase()
        
        if (dostep) {
            showBook = showBook && book.getAttribute("available") === "true";
        }
        
        if (ebook) {
            showBook = showBook && book.getAttribute("ebook") !== "brak";
        }
        //sprawdza czy jest wartość yearInput i czy nie jest all
        if (yearInput && yearInput !== "all") {
            showBook = showBook && book.getAttribute("year") === yearInput;
        }
        
        if (genreInput && genreInput !== "all") {
            showBook = showBook && book.getAttribute("genre") === genreInput;
        }
        if (search) {
            showBook = showBook && info.includes(search);
        }
        

        if(showBook){
            book.style.display="flex" 
        }else{book.style.display="none" }
    });
};




//jesśli filtr istniej nasłuchuje
if(document.getElementById("filtr")){
document.getElementById("filtr").addEventListener('click', applyFilters);}


//reset
if(document.getElementById("reset")){
document.getElementById("reset").addEventListener('click', function() {
    document.getElementsByName('available')[0].checked = false;
    document.getElementsByName('ebook')[0].checked = false;
    document.getElementById("yearFilter").value = "all";
    document.getElementById("genreFilter").value = "all";
    document.getElementById("searchInput").value = "";

    applyFilters();
})};    



//artykuly
if(document.getElementById("news")){
   
    let news;
    async function fetchContentNews() {
        const response = await fetch('https://backend-www-projekt.onrender.com/books');
        if (!response.ok) {
                document.getElementById("loading").remove();
                document.getElementById("news").textContent= `HTTP error! Status: ${response.status}`;
            }
        const data = await response.json();
        news = data.news;
        listaNews();
    }
    fetchContentNews();
    function listaNews() {
    // usuwanie ladowania
    document.getElementById("loading").remove();
    news.forEach(element => {

        const title = document.createElement("h3");
        const link = document.createElement("a");
        link.href = element.url;
        link.textContent = element.title;
        const p = document.createElement("p");
        p.textContent = element.bit;


        title.appendChild(link);
        document.getElementById("news").appendChild(title);
        document.getElementById("news").appendChild(p);
        
    });
}}







function wypozycz() {
    const button = this;
    const a = prompt("Podaj numer swojej karty bibliotecznej:");
    
    if (a !== null && a.trim() !== "") {
                
        // bieze nalbizszy book
        const bookDiv = button.closest('.book');
        
        // Zmień wygląd przycisku
        button.textContent = "Niedostępne";
        button.classList.remove("available");
        button.classList.add("unavailable");
        button.disabled = true;
        bookDiv.setAttribute('available', 'false');
        
    }
}







// function calendar() {
//     const days = [
//         "Poniedziałek: 8:00-19:00",
//         "Wtorek: 8:00-19:00",
//         "Środa: 8:00-19:00",
//         "Czwartek: 8:00-19:00",
//         "Piątek: 8:00-19:00",
//         "Sobota: 8:00-14:00",
//         "Niedziela: zamknięte"
//     ];   
//     days.forEach(day => {
//         const li = document.createElement("li");
//         const IsOpen = document.getElementById("IsOpen");
//         const ul = document.querySelector('aside'); 
//         ul.appendChild(li);
//         li.textContent = day;
//         li.after(IsOpen);
//     });

// }

// calendar()























