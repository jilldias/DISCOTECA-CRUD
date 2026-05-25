const albumName = document.getElementById('albumName');
const artistName = document.getElementById('artistName');
const yearInput = document.getElementById('year');
const saveButton = document.getElementById('saveButton');
const clearButton = document.getElementById('clearButton');
const albumList = document.getElementById('albumList');

let editingId = null;
const API_BASE = '/discoteca';

async function fetchAlbums() {
  try {
    const response = await fetch(API_BASE);
    if (!response.ok) throw new Error('Não foi possível carregar a discoteca');
    const albums = await response.json();
    renderAlbums(albums);
  } catch (error) {
    alert(error.message);
  }
}

function renderAlbums(albums) {
  albumList.innerHTML = '';
  if (!albums.length) {
    const empty = document.createElement('div');
    empty.className = 'album-item';
    empty.textContent = 'Nenhum disco cadastrado ainda.';
    empty.style.justifyContent = 'center';
    empty.style.gridTemplateColumns = '1fr';
    albumList.appendChild(empty);
    return;
  }

  albums.forEach((album) => {
    const item = document.createElement('div');
    item.className = 'album-item';

    item.innerHTML = `
      <div class="album-info">
        <div class="album-dot"></div>
        <span>${album.nomeAlbum}</span>
      </div>
      <span>${album.nomeArtista}</span>
      <span>${album.ano || ''}</span>
      <div class="actions-group">
        <button class="action-btn edit" data-id="${album.id}">ALTERAR</button>
        <button class="action-btn delete" data-id="${album.id}">EXCLUIR</button>
      </div>
    `;

    albumList.appendChild(item);
  });
}

function resetForm() {
  editingId = null;
  albumName.value = '';
  artistName.value = '';
  yearInput.value = '';
  saveButton.textContent = '🎵 SALVAR DISCO';
}

async function saveAlbum() {
  const nomeAlbum = albumName.value.trim();
  const nomeArtista = artistName.value.trim();
  const ano = Number(yearInput.value);

  if (!nomeAlbum || !nomeArtista || !ano) {
    alert('Preencha todos os campos corretamente.');
    return;
  }

  const payload = { nomeAlbum, nomeArtista, ano };

  try {
    const response = editingId
      ? await fetch(`${API_BASE}/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
      : await fetch(API_BASE, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

    if (!response.ok) {
      throw new Error('Não foi possível salvar o disco.');
    }

    resetForm();
    await fetchAlbums();
  } catch (error) {
    alert(error.message);
  }
}

async function editAlbum(id) {
  try {
    const response = await fetch(`${API_BASE}/${id}`);
    if (!response.ok) throw new Error('Disco não encontrado.');
    const album = await response.json();
    editingId = album.id;
    albumName.value = album.nomeAlbum || '';
    artistName.value = album.nomeArtista || '';
    yearInput.value = album.ano || '';
    saveButton.textContent = 'ATUALIZAR DISCO';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } catch (error) {
    alert(error.message);
  }
}

async function deleteAlbum(id) {
  if (!confirm('Tem certeza que deseja excluir este disco?')) return;

  try {
    const response = await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Não foi possível excluir o disco.');
    await fetchAlbums();
    if (editingId === id) resetForm();
  } catch (error) {
    alert(error.message);
  }
}

albumList.addEventListener('click', (event) => {
  const button = event.target.closest('button');
  if (!button) return;
  const id = Number(button.dataset.id);
  if (button.classList.contains('edit')) {
    editAlbum(id);
  } else if (button.classList.contains('delete')) {
    deleteAlbum(id);
  }
});

saveButton.addEventListener('click', saveAlbum);
clearButton.addEventListener('click', resetForm);

fetchAlbums();
