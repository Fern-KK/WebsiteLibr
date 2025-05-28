const express = require("express");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.static("public")); // For serving images

// Folder do przechowywania zdjęć
const storage = multer.diskStorage({
    destination: "public/uploads/",
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Endpoint do obsługi postów
app.post("/api/posts", upload.single("image"), (req, res) => {
    const message = req.body.message;
    let imageUrl = null;

    if (req.file) {
        imageUrl = "/uploads/" + req.file.filename;
    }

    const post = {
        message,
        imageUrl
    };

    // Można tu dodać zapis do bazy lub pliku, np. JSON
    console.log("New post:", post);

    res.json(post);
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
