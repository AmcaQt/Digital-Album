// script.js

const galleryEl = document.getElementById('gallery');
const modal = document.getElementById('modal');
const modalClose = document.getElementById('modalClose');
const modalImg = document.getElementById('modalImg');
const modalName = document.getElementById('modalName');
const modalCaption = document.getElementById('modalCaption');
const modalDate = document.getElementById('modalDate');
const downloadBtn = document.getElementById('downloadBtn');

async function loadAlbum(){
    try{
        const res = await fetch('album.json', {cache: "no-store"});
        if(!res.ok) throw new Error('Could not load album.json');
        const data = await res.json();
        renderGallery(data.album || []);
    }catch(err){
        console.error(err);
        galleryEl.innerHTML = '<p style="color:#7b8794;">Failed to load album.</p>';
    }
    }

    function renderGallery(items){
    galleryEl.innerHTML = '';
    if(items.length === 0){
        galleryEl.innerHTML = '<p style="color:#7b8794;">No photos yet. Add images to album.json</p>';
        return;
    }
    items.forEach(item => {
        const card = document.createElement('article');
        card.className = 'card';
        card.setAttribute('tabindex','0');
        card.innerHTML = `
        <div class="photo-wrap">
            <img src="${item.image}" alt="${escapeHtml(item.name)}"/>
        </div>
        <div class="meta">
            <p class="name">${escapeHtml(item.name)}</p>
            <p class="muted">${escapeHtml(item.caption)}</p>
        </div>
        `;
        card.addEventListener('click', ()=> openModal(item));
        card.addEventListener('keypress', (e)=> { if(e.key === 'Enter') openModal(item); });
        galleryEl.appendChild(card);
    });
    }

    function openModal(item){
    modalImg.src = item.image;
    modalImg.alt = item.name;
    modalName.textContent = item.name;
    modalCaption.textContent = item.caption || '';
    modalDate.textContent = item.date ? `Date: ${item.date}` : '';
    downloadBtn.href = item.image;
    downloadBtn.setAttribute('download', sanitizeFilename(item.name) + '.jpg');
    modal.classList.remove('hidden');
    }

    // close logic
    modalClose.addEventListener('click', ()=> modal.classList.add('hidden'));
    modal.addEventListener('click', (e) => {
    if(e.target === modal) modal.classList.add('hidden');
    });

    // small helpers
    function escapeHtml(str){
    return String(str || '').replace(/[&<>"']/g, m=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[m]));
    }
    function sanitizeFilename(name){
    return String(name || 'photo').replace(/\s+/g,'_').replace(/[^\w\-_.]/g,'');
    }

// init
loadAlbum();
