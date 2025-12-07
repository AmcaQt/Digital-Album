async function loadAlbum(kohort) {
    try {
        const res = await fetch("album.json");
        const data = await res.json();

        const album = data[kohort];

        if (!album) {
            alert("Kohort not found in album.json");
            return;
        }

        const gallery = document.getElementById("gallery");
        gallery.innerHTML = ""; 

        album.forEach(person => {
            const card = document.createElement("div");
            card.className = "card";

            card.innerHTML = `
                <img src="${person.image}" alt="${person.name}">
                <p>${person.name}</p>
            `;

            gallery.appendChild(card);
        });

    } catch (err) {
        console.error("Error loading album:", err);
    }
}
