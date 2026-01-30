/* ==========================================
   PHOTOS & MEDIA SCREEN
   ========================================== */

function initPhotosScreen() {
  renderPhotosGrid();
  renderDocsList();
  setupPhotosEventListeners();
  updatePhotosCount();
  updatePhotosNextButton();

  // Re-init Lucide icons
  if (window.lucide) {
    lucide.createIcons();
  }
}

/* ------------------------------------------
   Render Functions
   ------------------------------------------ */

function renderPhotosGrid() {
  const grid = document.getElementById('photosGrid');
  const primaryZone = document.getElementById('primaryPhotoZone');
  if (!grid || !primaryZone) return;

  const state = getState();
  const photos = state.photos || [];
  const primary = photos[0];
  const thumbnails = photos.slice(1); // All photos after cover
  const maxVisibleThumbnails = 6;
  const overflowCount = Math.max(0, thumbnails.length - maxVisibleThumbnails);

  // ========== RENDER PRIMARY PHOTO ==========
  if (primary) {
    primaryZone.classList.add('has-photo');
    primaryZone.innerHTML = `
      <img src="${primary.url}" alt="${primary.name}" class="photos-primary-img" />
      <div class="photos-primary-badge">
        <i data-lucide="star"></i> Cover Photo
      </div>
      <div class="photos-drag-handle">
        <i data-lucide="grip-vertical"></i>
      </div>
    `;
  } else {
    primaryZone.classList.remove('has-photo');
    primaryZone.innerHTML = `
      <div class="photos-primary-empty">
        <i data-lucide="upload" style="width: 32px; height: 32px;"></i>
        <p>Drop your cover photo here</p>
      </div>
    `;
  }

  // ========== RENDER GRID (always 6 slots) ==========
  let gridHTML = '';

  for (let i = 0; i < 6; i++) {
    const photo = thumbnails[i];
    const isLastSlot = i === 5;
    const showOverflow = isLastSlot && overflowCount > 0;

    if (showOverflow) {
      // Last slot shows "+N more" overlay
      const lastVisiblePhoto = thumbnails[5];
      gridHTML += `
        <div class="photos-grid-item photos-grid-overflow" onclick="openPhotosGallery()">
          ${lastVisiblePhoto ? `<img src="${lastVisiblePhoto.url}" alt="" />` : ''}
          <div class="photos-overflow-overlay">
            <span>+${overflowCount + 1}</span>
            <span class="photos-overflow-label">more</span>
          </div>
        </div>
      `;
    } else if (photo) {
      // Regular photo thumbnail
      const isVideo = photo.type === 'video';
      gridHTML += `
        <div class="photos-grid-item ${isVideo ? 'photos-grid-item--video' : ''}" data-index="${i + 1}">
          ${isVideo ? `
            <img src="${photo.url}" alt="${photo.name}" />
            <div class="photos-video-badge">
              <i data-lucide="play"></i>
            </div>
          ` : `
            <img src="${photo.url}" alt="${photo.name}" />
          `}
          <div class="photos-drag-handle">
            <i data-lucide="grip-vertical"></i>
          </div>
          <button class="photos-remove-btn" onclick="removePhoto(${i + 1}); event.stopPropagation();">
            <i data-lucide="x"></i>
          </button>
        </div>
      `;
    } else if (thumbnails.length === i) {
      // First empty slot = "+" add button
      gridHTML += `
        <div class="photos-grid-add" onclick="triggerPhotoUpload()">
          <i data-lucide="plus"></i>
        </div>
      `;
    } else {
      // Remaining empty slots = subtle placeholder
      gridHTML += `
        <div class="photos-grid-empty"></div>
      `;
    }
  }

  grid.innerHTML = gridHTML;

  // ========== SHOW FULL-WIDTH ADD BAR IF GRID IS FULL ==========
  const addBar = document.getElementById('photosAddBar');
  if (addBar) {
    if (thumbnails.length >= 6) {
      // Grid is full (7+ total photos), show add bar
      addBar.classList.remove('hidden');
    } else {
      // Grid has room, hide add bar
      addBar.classList.add('hidden');
    }
  }

  // Re-init icons
  if (window.lucide) {
    lucide.createIcons();
  }
}

function openPhotosGallery() {
  // Open modal or expand view to see all photos
  console.log('Open gallery with all photos');
  // TODO: Implement gallery modal
}

function renderDocsList() {
  const list = document.getElementById('docsList');
  if (!list) return;

  const state = getState();
  const docs = state.documents || [];

  if (docs.length === 0) {
    list.innerHTML = '';
    return;
  }

  list.innerHTML = docs.map((doc, i) => `
    <div class="photos-doc-item">
      <i data-lucide="file-text"></i>
      <span>${doc.name}</span>
      <button onclick="removeDocument(${i})">
        <i data-lucide="x"></i>
      </button>
    </div>
  `).join('');

  if (window.lucide) {
    lucide.createIcons();
  }
}

/* ------------------------------------------
   Event Listeners
   ------------------------------------------ */

function setupPhotosEventListeners() {
  // Photo upload buttons
  document.getElementById('uploadPhotosBtn')?.addEventListener('click', () => triggerPhotoUpload('image'));
  document.getElementById('uploadVideoBtn')?.addEventListener('click', () => triggerPhotoUpload('video'));
  document.getElementById('upload3dBtn')?.addEventListener('click', () => triggerPhotoUpload('3d'));

  // Primary photo zone click
  document.getElementById('primaryPhotoZone')?.addEventListener('click', (e) => {
    const state = getState();
    if (!state.photos || state.photos.length === 0) {
      triggerPhotoUpload('image');
    }
  });

  // Document upload button
  document.getElementById('uploadDocsBtn')?.addEventListener('click', triggerDocUpload);

  // Website URL input
  const urlInput = document.getElementById('buildingWebsiteUrl');
  if (urlInput) {
    // Set initial value
    const state = getState();
    if (state.buildingWebsiteUrl) {
      urlInput.value = state.buildingWebsiteUrl;
    }

    // Save on change
    urlInput.addEventListener('change', (e) => {
      updateState('buildingWebsiteUrl', e.target.value);
    });
  }
}

/* ------------------------------------------
   Upload Handlers
   ------------------------------------------ */

function triggerPhotoUpload(type = 'image') {
  // For demo, we'll add a mock photo
  console.log('Upload triggered for:', type);

  const state = getState();
  if (!state.photos) {
    updateState('photos', []);
  }

  const photos = getState().photos;

  const mockPhoto = {
    id: Date.now(),
    type: type === 'video' ? 'video' : 'image',
    name: type === 'video' ? 'Video Tour' : `Photo ${photos.length + 1}`,
    url: `https://picsum.photos/seed/${Date.now()}/400/300`
  };

  photos.push(mockPhoto);
  updateState('photos', photos);

  renderPhotosGrid();
  updatePhotosCount();
  updatePhotosNextButton();
}

function removePhoto(index) {
  const state = getState();
  if (state.photos && state.photos[index]) {
    state.photos.splice(index, 1);
    updateState('photos', state.photos);
    renderPhotosGrid();
    updatePhotosCount();
    updatePhotosNextButton();
  }
}

function triggerDocUpload() {
  // For demo, we'll add a mock document
  console.log('Document upload triggered');

  const state = getState();
  if (!state.documents) {
    updateState('documents', []);
  }

  const docs = getState().documents;

  const mockDoc = {
    id: Date.now(),
    name: `Floorplan_${docs.length + 1}.pdf`,
    type: 'pdf'
  };

  docs.push(mockDoc);
  updateState('documents', docs);

  renderDocsList();
}

function removeDocument(index) {
  const state = getState();
  if (state.documents && state.documents[index]) {
    state.documents.splice(index, 1);
    updateState('documents', state.documents);
    renderDocsList();
  }
}

/* ------------------------------------------
   UI Updates
   ------------------------------------------ */

function updatePhotosCount() {
  const countEl = document.getElementById('photosCount');
  if (countEl) {
    const state = getState();
    const count = state.photos?.length || 0;
    const minPhotos = 5;
    countEl.textContent = `${count} of ${minPhotos} min`;

    // Visual indicator
    if (count >= minPhotos) {
      countEl.style.color = '#16a34a'; // green
    } else {
      countEl.style.color = '';
    }
  }
}

function updatePhotosNextButton() {
  const nextBtn = document.getElementById('footer-next-btn');
  if (nextBtn) {
    const state = getState();
    const photoCount = state.photos?.length || 0;

    // For demo: always allow continue. In production: photoCount >= 5
    const canContinue = true;

    nextBtn.disabled = !canContinue;
  }
}

// Register screen init callback
onScreenLoad('photos', initPhotosScreen);

console.log('photos.js loaded');
