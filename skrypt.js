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
    books = data.books;
    lista();
}
fetchContent();

function lista() {
    document.getElementById("loading").remove();

    books.forEach(book => {
        const bookDiv = document.createElement("div");
        bookDiv.className = "book";
        
        const infoDiv = document.createElement("div");
        
        // Title
        const title = document.createElement("h3");
        title.textContent = book.title;
        infoDiv.appendChild(title);
        
        // Author and year
        const authorYear = document.createElement("p");
        let year;
        if (book.year > 0) {
            year = `${book.year}`;
        } else if (book.year < 0) {
            year = `${Math.abs(book.year)} p.n.e.`;
        }
        authorYear.textContent = `${book.author} (${year})`;
        infoDiv.appendChild(authorYear);
        
        // Genre
        const genre = document.createElement("p");
        genre.textContent = `Gatunek: ${book.genre}`;
        infoDiv.appendChild(genre);
        
        // E-book
        const ebook = document.createElement("p");
        if (book.ebook !== "brak") {
            const ebookLink = document.createElement("a");
            ebookLink.href = book.ebook;
            ebookLink.textContent = "PDF";
            ebookLink.target = "_blank";
            ebook.textContent = "Wersja elektroniczna: ";
            ebook.appendChild(ebookLink);
        } else {
            ebook.textContent = "Wersja elektroniczna: brak";
        }
        infoDiv.appendChild(ebook);
        
        // Button
        const buttonDiv = document.createElement("div");
        const button = document.createElement("button");
        if (book.available) {
            button.textContent = "Wypożycz";
            button.className = "available";
            button.dataset.id = book.id; // Add the book ID as data attribute
            button.addEventListener('click', wypozycz);
        } else {
            button.textContent = "Niedostępne";
            button.className = "unavailable";
            button.disabled = true;
        }
        buttonDiv.appendChild(button);
        
        bookDiv.appendChild(infoDiv);
        bookDiv.appendChild(buttonDiv);
        
        document.getElementById("katalog").appendChild(bookDiv);
    });
}
























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
setInterval(checkTime, 60000);
checkTime();




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



























































// async function wypozycz(event) {
//     const button = event.target;
//     const bookId = button.dataset.id;
    
//     try {
//         // Disable button immediately
//         button.disabled = true;
//         button.textContent = "Przetwarzanie...";
        
//         const response = await fetch(`https://backend-www-projekt.onrender.com/books/${bookId}`, {
//             method: 'PATCH',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 available: false
//             })
//         });
        
//         const data = await response.json();
        
//         if (response.ok) {
//             // Update UI
//             button.textContent = "Niedostępne";
//             button.className = "unavailable";
            
//             // Update local books array
//             const bookIndex = books.findIndex(book => book.id === parseInt(bookId));
//             if (bookIndex !== -1) {
//                 books[bookIndex].available = false;
//             }
//         } else {
//             // Re-enable button if error
//             button.disabled = false;
//             button.textContent = "Wypożycz";
//             alert(data.error || "Wystąpił błąd podczas próby wypożyczenia");
//         }
//     } catch (error) {
//         console.error("Error:", error);
//         button.disabled = false;
//         button.textContent = "Wypożycz";
//         alert("Wystąpił błąd połączenia. Spróbuj ponownie.");
//     }
// }






