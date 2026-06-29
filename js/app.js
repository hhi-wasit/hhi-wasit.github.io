// ===== SUPABASE CONFIG =====
const SUPA_URL = 'https://mijyhuzrwzvmtdwtyvud.supabase.co';
const SUPA_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1panlodXpyd3p2bXRkd3R5dnVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEwMTY5OTAsImV4cCI6MjA5NjU5Mjk5MH0.3oKzU8NcV9OgldhSIjQv_aToemaxX_Mk5myErvG20ZU';

// ===== SUPABASE HELPERS =====
async function sbFetch(path, options = {}) {
  const headers = {
    'apikey': SUPA_KEY,
    'Authorization': 'Bearer ' + SUPA_KEY,
    'Content-Type': 'application/json',
    ...options.headers
  };
  const res = await fetch(SUPA_URL + path, { ...options, headers });
  if (!res.ok) {
    const err = await res.text();
    throw new Error('Supabase error: ' + res.status + ' ' + err);
  }
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

// ===== HHI DATA STORE =====
const HHI = {

  // --- NEWS ---
  async getNews() {
    return await sbFetch('/rest/v1/news?select=*&order=date.desc');
  },
  async addNews(item) {
    return await sbFetch('/rest/v1/news', {
      method: 'POST',
      headers: { 'Prefer': 'return=representation' },
      body: JSON.stringify(item)
    });
  },
  async deleteNews(id) {
    await sbFetch('/rest/v1/news?id=eq.' + id, { method: 'DELETE' });
  },

  // --- THESES ---
  async getTheses() {
    return await sbFetch('/rest/v1/theses?select=*&order=year.desc,created_at.desc');
  },
  async addThesis(item) {
    return await sbFetch('/rest/v1/theses', {
      method: 'POST',
      headers: { 'Prefer': 'return=representation' },
      body: JSON.stringify(item)
    });
  },
  async deleteThesis(id) {
    await sbFetch('/rest/v1/theses?id=eq.' + id, { method: 'DELETE' });
  },

  // --- BULLETIN ---
  async getBulletins() {
    return await sbFetch('/rest/v1/bulletins?select=*&order=date.desc');
  },
  async addBulletin(item) {
    return await sbFetch('/rest/v1/bulletins', {
      method: 'POST',
      headers: { 'Prefer': 'return=representation' },
      body: JSON.stringify(item)
    });
  },
  async deleteBulletin(id) {
    await sbFetch('/rest/v1/bulletins?id=eq.' + id, { method: 'DELETE' });
  },

  // --- STAFF ---
  async getStaff() {
    return await sbFetch('/rest/v1/staff?select=*&order=sort_order.asc,created_at.asc');
  },
  async addStaff(item) {
    return await sbFetch('/rest/v1/staff', {
      method: 'POST',
      headers: { 'Prefer': 'return=representation' },
      body: JSON.stringify(item)
    });
  },
  async deleteStaff(id) {
    await sbFetch('/rest/v1/staff?id=eq.' + id, { method: 'DELETE' });
  },

  // --- NEWS IMAGE UPLOAD ---
  async uploadNewsImage(file) {
    const ext = file.name.split('.').pop();
    const filename = Date.now() + '_' + Math.random().toString(36).slice(2) + '.' + ext;
    const res = await fetch(SUPA_URL + '/storage/v1/object/news-images/' + filename, {
      method: 'POST',
      headers: {
        'apikey': SUPA_KEY,
        'Authorization': 'Bearer ' + SUPA_KEY,
        'Content-Type': file.type || 'image/jpeg',
        'x-upsert': 'true'
      },
      body: file
    });
    if (!res.ok) throw new Error('Image upload failed: ' + await res.text());
    return SUPA_URL + '/storage/v1/object/public/news-images/' + filename;
  },

  // --- STAFF PHOTO UPLOAD ---
  async uploadStaffPhoto(file) {
    const ext = file.name.split('.').pop();
    const filename = Date.now() + '_' + Math.random().toString(36).slice(2) + '.' + ext;
    const res = await fetch(SUPA_URL + '/storage/v1/object/staff-photos/' + filename, {
      method: 'POST',
      headers: {
        'apikey': SUPA_KEY,
        'Authorization': 'Bearer ' + SUPA_KEY,
        'Content-Type': file.type || 'image/jpeg',
        'x-upsert': 'true'
      },
      body: file
    });
    if (!res.ok) throw new Error('Photo upload failed: ' + await res.text());
    return SUPA_URL + '/storage/v1/object/public/staff-photos/' + filename;
  },

  // --- PDF UPLOAD (theses) ---
  async uploadPDF(file) {
    const ext = file.name.split('.').pop();
    const filename = Date.now() + '_' + Math.random().toString(36).slice(2) + '.' + ext;
    const res = await fetch(SUPA_URL + '/storage/v1/object/theses/' + filename, {
      method: 'POST',
      headers: {
        'apikey': SUPA_KEY,
        'Authorization': 'Bearer ' + SUPA_KEY,
        'Content-Type': 'application/pdf',
        'x-upsert': 'true'
      },
      body: file
    });
    if (!res.ok) throw new Error('Upload failed: ' + await res.text());
    return SUPA_URL + '/storage/v1/object/public/theses/' + filename;
  },

  // --- BULLETIN PDF UPLOAD ---
  async uploadBulletinPDF(file) {
    const ext = file.name.split('.').pop();
    const filename = Date.now() + '_' + Math.random().toString(36).slice(2) + '.' + ext;
    const res = await fetch(SUPA_URL + '/storage/v1/object/bulletins/' + filename, {
      method: 'POST',
      headers: {
        'apikey': SUPA_KEY,
        'Authorization': 'Bearer ' + SUPA_KEY,
        'Content-Type': 'application/pdf',
        'x-upsert': 'true'
      },
      body: file
    });
    if (!res.ok) throw new Error('Upload failed: ' + await res.text());
    return SUPA_URL + '/storage/v1/object/public/bulletins/' + filename;
  },

  // --- AUTH ---
  async login(password) {
    try {
      const data = await sbFetch(
        '/rest/v1/admin_config?key=eq.admin_password&value=eq.' + encodeURIComponent(password) + '&select=key'
      );
      if (data && data.length > 0) {
        try { sessionStorage.setItem('hhi_admin', 'true'); } catch(e) {}
        return true;
      }
      return false;
    } catch(e) {
      return false;
    }
  },
  isLoggedIn() {
    try { return sessionStorage.getItem('hhi_admin') === 'true'; } catch(e) { return false; }
  },
  logout() {
    try { sessionStorage.removeItem('hhi_admin'); } catch(e) {}
  }
};

// ===== UTILITIES =====
function formatDate(str) {
  const d = new Date(str);
  return d.toLocaleDateString('ar-IQ', { day: 'numeric', month: 'long', year: 'numeric' });
}
function escHtml(s) {
  return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
