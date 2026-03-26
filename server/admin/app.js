// ===== NEEV Admin Panel - Client-Side JS =====

const API = '/api/admin';
let token = localStorage.getItem('neev_admin_token');
let allEnquiries = [];
let allRegistrations = [];

// Auth check
if (!token) {
    window.location.href = '/admin/';
}

// ===== HELPERS =====
function headers() {
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    };
}

async function apiFetch(url, options = {}) {
    const res = await fetch(url, { ...options, headers: headers() });
    if (res.status === 401) {
        localStorage.removeItem('neev_admin_token');
        window.location.href = '/admin/';
        return;
    }
    return res.json();
}

function formatDate(iso) {
    if (!iso) return 'N/A';
    const d = new Date(iso);
    return d.toLocaleDateString('en-IN', {
        day: '2-digit', month: 'short', year: 'numeric',
        hour: '2-digit', minute: '2-digit',
    });
}

function shortDate(iso) {
    if (!iso) return 'N/A';
    const d = new Date(iso);
    return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
}

function toast(message, type = 'success') {
    const el = document.getElementById('toast');
    if (!el) return;

    el.className = `toast ${type} show`;
    el.innerHTML = `<i class="fa-solid fa-${type === 'success' ? 'check-circle' : 'circle-exclamation'}"></i>${message}`;
    
    setTimeout(() => {
        el.classList.remove('show');
    }, 3000);
}

// ===== NAVIGATION =====
const navItems = document.querySelectorAll('.nav-item');
const pages = document.querySelectorAll('.page');

navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const page = item.dataset.page;
        navItems.forEach(n => n.classList.remove('active'));
        item.classList.add('active');
        pages.forEach(p => p.classList.remove('active'));
        document.getElementById(`page-${page}`).classList.add('active');
        closeSidebar();
    });
});

// Mobile sidebar
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('sidebarOverlay');

function openSidebar() {
    sidebar.classList.add('open');
    overlay.classList.add('open');
}
function closeSidebar() {
    sidebar.classList.remove('open');
    overlay.classList.remove('open');
}
menuToggle?.addEventListener('click', openSidebar);
overlay?.addEventListener('click', closeSidebar);

// Logout
function logout() {
    localStorage.removeItem('neev_admin_token');
    window.location.href = '/admin/';
}
document.getElementById('logoutBtn')?.addEventListener('click', logout);
document.getElementById('logoutBtnMobile')?.addEventListener('click', logout);

// ===== DATA LOADING =====
async function loadStats() {
    const stats = await apiFetch(`${API}/stats`);
    if (!stats) return;
    document.getElementById('statTotalEnq').textContent = stats.totalEnquiries;
    document.getElementById('statTotalReg').textContent = stats.totalRegistrations;
    document.getElementById('statNewEnq').textContent = stats.newEnquiries;
    document.getElementById('statNewReg').textContent = stats.newRegistrations;
    document.getElementById('statTodayEnq').textContent = stats.todayEnquiries;
    document.getElementById('statTodayReg').textContent = stats.todayRegistrations;
    document.getElementById('enquiryBadge').textContent = stats.newEnquiries;
    document.getElementById('regBadge').textContent = stats.newRegistrations;
}

async function loadEnquiries() {
    allEnquiries = await apiFetch(`${API}/enquiries`) || [];
    renderEnquiriesTable(allEnquiries);
    renderRecentEnquiries(allEnquiries.slice(0, 5));
}

async function loadRegistrations() {
    allRegistrations = await apiFetch(`${API}/registrations`) || [];
    renderRegistrationsTable(allRegistrations);
    renderRecentRegistrations(allRegistrations.slice(0, 5));
}

async function loadAll() {
    await Promise.all([loadStats(), loadEnquiries(), loadRegistrations()]);
}

// ===== RENDER TABLES =====
function renderEnquiriesTable(data) {
    const container = document.getElementById('enquiriesTable');
    if (data.length === 0) {
        container.innerHTML = '<p class="empty-state"><i class="fa-solid fa-inbox" style="font-size:24px;display:block;margin-bottom:8px;"></i>No enquiries found</p>';
        return;
    }
    container.innerHTML = `
        <table class="data-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Exam</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                ${data.map(e => `
                    <tr>
                        <td style="font-weight:600;color:var(--ink);">${e.name}</td>
                        <td>${e.phone}</td>
                        <td>${e.exam || '—'}</td>
                        <td><span class="status-badge ${e.status}">${e.status}</span></td>
                        <td>${shortDate(e.createdAt)}</td>
                        <td>
                            <button class="action-btn" onclick="viewEnquiry('${e.id}')" title="View"><i class="fa-solid fa-eye"></i></button>
                            <button class="action-btn delete" onclick="deleteEnquiry('${e.id}')" title="Delete"><i class="fa-solid fa-trash"></i></button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>`;
}

function renderRegistrationsTable(data) {
    const container = document.getElementById('registrationsTable');
    if (data.length === 0) {
        container.innerHTML = '<p class="empty-state"><i class="fa-solid fa-inbox" style="font-size:24px;display:block;margin-bottom:8px;"></i>No registrations found</p>';
        return;
    }
    container.innerHTML = `
        <table class="data-table">
            <thead>
                <tr>
                    <th>Student Name</th>
                    <th>Father's Name</th>
                    <th>Contact</th>
                    <th>Class</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                ${data.map(r => `
                    <tr>
                        <td style="font-weight:600;color:var(--ink);">${r.studentName}</td>
                        <td>${r.fathersName || '—'}</td>
                        <td>${r.fathersContact || r.applicantPhone || '—'}</td>
                        <td>${r.studentClass || '—'}</td>
                        <td><span class="status-badge ${r.status}">${r.status}</span></td>
                        <td>${shortDate(r.createdAt)}</td>
                        <td>
                            <button class="action-btn" onclick="viewRegistration('${r.id}')" title="View"><i class="fa-solid fa-eye"></i></button>
                            <button class="action-btn delete" onclick="deleteRegistration('${r.id}')" title="Delete"><i class="fa-solid fa-trash"></i></button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>`;
}

function renderRecentEnquiries(data) {
    const container = document.getElementById('recentEnquiries');
    if (data.length === 0) {
        container.innerHTML = '<p class="empty-state">No enquiries yet</p>';
        return;
    }
    container.innerHTML = `
        <table class="data-table">
            <thead><tr><th>Name</th><th>Phone</th><th>Exam</th><th>Status</th><th>Date</th></tr></thead>
            <tbody>
                ${data.map(e => `
                    <tr style="cursor:pointer;" onclick="viewEnquiry('${e.id}')">
                        <td style="font-weight:600;color:var(--ink);">${e.name}</td>
                        <td>${e.phone}</td>
                        <td>${e.exam || '—'}</td>
                        <td><span class="status-badge ${e.status}">${e.status}</span></td>
                        <td>${shortDate(e.createdAt)}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>`;
}

function renderRecentRegistrations(data) {
    const container = document.getElementById('recentRegistrations');
    if (data.length === 0) {
        container.innerHTML = '<p class="empty-state">No registrations yet</p>';
        return;
    }
    container.innerHTML = `
        <table class="data-table">
            <thead><tr><th>Student</th><th>Father</th><th>Class</th><th>Status</th><th>Date</th></tr></thead>
            <tbody>
                ${data.map(r => `
                    <tr style="cursor:pointer;" onclick="viewRegistration('${r.id}')">
                        <td style="font-weight:600;color:var(--ink);">${r.studentName}</td>
                        <td>${r.fathersName || '—'}</td>
                        <td>${r.studentClass || '—'}</td>
                        <td><span class="status-badge ${r.status}">${r.status}</span></td>
                        <td>${shortDate(r.createdAt)}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>`;
}

// ===== SEARCH & FILTER =====
document.getElementById('searchEnquiries')?.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase();
    const status = document.getElementById('filterEnquiries').value;
    const filtered = allEnquiries.filter(item => {
        const matchSearch = item.name.toLowerCase().includes(q) || item.phone.includes(q) || (item.exam || '').toLowerCase().includes(q);
        const matchStatus = status === 'all' || item.status === status;
        return matchSearch && matchStatus;
    });
    renderEnquiriesTable(filtered);
});

document.getElementById('filterEnquiries')?.addEventListener('change', () => {
    document.getElementById('searchEnquiries').dispatchEvent(new Event('input'));
});

document.getElementById('searchRegistrations')?.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase();
    const status = document.getElementById('filterRegistrations').value;
    const filtered = allRegistrations.filter(item => {
        const matchSearch = item.studentName.toLowerCase().includes(q) || (item.fathersName || '').toLowerCase().includes(q) || (item.fathersContact || '').includes(q);
        const matchStatus = status === 'all' || item.status === status;
        return matchSearch && matchStatus;
    });
    renderRegistrationsTable(filtered);
});

document.getElementById('filterRegistrations')?.addEventListener('change', () => {
    document.getElementById('searchRegistrations').dispatchEvent(new Event('input'));
});

// ===== MODAL =====
const modal = document.getElementById('detailModal');
const modalBody = document.getElementById('modalBody');
const modalFooter = document.getElementById('modalFooter');
const modalTitle = document.getElementById('modalTitle');

document.getElementById('modalClose')?.addEventListener('click', () => modal.classList.remove('active'));
modal?.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('active'); });

function openModal(title, bodyHTML, footerHTML = '') {
    modalTitle.textContent = title;
    modalBody.innerHTML = bodyHTML;
    modalFooter.innerHTML = footerHTML;
    modal.classList.add('active');
}

// ===== VIEW ENQUIRY =====
window.viewEnquiry = function(id) {
    const e = allEnquiries.find(x => x.id === id);
    if (!e) return;

    const details = `
        <div class="detail-row"><span class="detail-label">Name</span><span class="detail-value">${e.name}</span></div>
        <div class="detail-row"><span class="detail-label">Phone</span><span class="detail-value">${e.phone}</span></div>
        <div class="detail-row"><span class="detail-label">Email</span><span class="detail-value">${e.email || 'Not provided'}</span></div>
        <div class="detail-row"><span class="detail-label">Exam</span><span class="detail-value">${e.exam || 'N/A'}</span></div>
        <div class="detail-row"><span class="detail-label">Message</span><span class="detail-value">${e.message || 'No message'}</span></div>
        <div class="detail-row"><span class="detail-label">Source</span><span class="detail-value">${e.source || 'website'}</span></div>
        <div class="detail-row"><span class="detail-label">Status</span><span class="detail-value"><span class="status-badge ${e.status}">${e.status}</span></span></div>
        <div class="detail-row"><span class="detail-label">Submitted</span><span class="detail-value">${formatDate(e.createdAt)}</span></div>
        <h4 style="margin-top:20px;font-size:12px;color:#5a6a7a;text-transform:uppercase;letter-spacing:1px;">Update Status</h4>
        <div class="modal-actions-row" style="margin-top:10px;">
            ${['new', 'contacted', 'resolved'].map(s => 
                `<button class="status-action-btn ${e.status === s ? 'active-status' : ''}" onclick="updateEnquiryStatus('${id}', '${s}')">${s}</button>`
            ).join('')}
        </div>
        <textarea class="notes-textarea" id="enqNotes" placeholder="Add notes about this enquiry...">${e.notes || ''}</textarea>
    `;

    const footer = `
        <button class="status-action-btn" onclick="saveEnquiryNotes('${id}')"><i class="fa-solid fa-save" style="margin-right:6px;"></i>Save Notes</button>
        <button class="delete-action-btn" onclick="deleteEnquiry('${id}')"><i class="fa-solid fa-trash" style="margin-right:6px;"></i>Delete</button>
    `;

    openModal('Enquiry Details', details, footer);
};

// ===== VIEW REGISTRATION =====
window.viewRegistration = function(id) {
    const r = allRegistrations.find(x => x.id === id);
    if (!r) return;

    const fields = [
        ['Reg No', r.regNo],
        ['Student Name', r.studentName],
        ['Date of Birth', r.dob],
        ['Gender', r.gender],
        ['School', r.schoolName],
        ['Class', r.studentClass],
        ['Father\'s Name', r.fathersName],
        ['Father\'s Contact', r.fathersContact],
        ['Mother\'s Name', r.mothersName],
        ['Mother\'s Contact', r.mothersContact],
        ['Address', r.address],
        ['Date of Joining', r.dateOfJoining],
        ['Fee Package', r.feePackage],
        ['Medium', r.medium],
        ['Board', r.board],
        ['Stream (11-12)', r.stream11_12],
        ['Stream (9-10)', r.stream9_10],
        ['Heard About Us', r.heardAboutUs],
        ['Reference By', r.referenceBy],
        ['Status', `<span class="status-badge ${r.status}">${r.status}</span>`],
        ['Submitted', formatDate(r.createdAt)],
    ];

    const details = fields
        .filter(([, val]) => val)
        .map(([label, val]) => `<div class="detail-row"><span class="detail-label">${label}</span><span class="detail-value">${val}</span></div>`)
        .join('') + `
        <h4 style="margin-top:20px;font-size:12px;color:#5a6a7a;text-transform:uppercase;letter-spacing:1px;">Update Status</h4>
        <div class="modal-actions-row" style="margin-top:10px;">
            ${['new', 'contacted', 'enrolled', 'rejected'].map(s =>
                `<button class="status-action-btn ${r.status === s ? 'active-status' : ''}" onclick="updateRegStatus('${id}', '${s}')">${s}</button>`
            ).join('')}
        </div>
        <textarea class="notes-textarea" id="regNotes" placeholder="Add notes about this registration...">${r.notes || ''}</textarea>
    `;

    const footer = `
        <button class="status-action-btn" onclick="saveRegNotes('${id}')"><i class="fa-solid fa-save" style="margin-right:6px;"></i>Save Notes</button>
        <button class="delete-action-btn" onclick="deleteRegistration('${id}')"><i class="fa-solid fa-trash" style="margin-right:6px;"></i>Delete</button>
    `;

    openModal('Registration Details', details, footer);
};

// ===== UPDATE STATUS =====
window.updateEnquiryStatus = async function(id, status) {
    await apiFetch(`${API}/enquiries/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ status }),
    });
    toast(`Enquiry marked as "${status}"`);
    modal.classList.remove('active');
    await loadAll();
};

window.updateRegStatus = async function(id, status) {
    await apiFetch(`${API}/registrations/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ status }),
    });
    toast(`Registration marked as "${status}"`);
    modal.classList.remove('active');
    await loadAll();
};

// ===== SAVE NOTES =====
window.saveEnquiryNotes = async function(id) {
    const notes = document.getElementById('enqNotes')?.value || '';
    await apiFetch(`${API}/enquiries/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ notes }),
    });
    toast('Notes saved');
    await loadAll();
};

window.saveRegNotes = async function(id) {
    const notes = document.getElementById('regNotes')?.value || '';
    await apiFetch(`${API}/registrations/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ notes }),
    });
    toast('Notes saved');
    await loadAll();
};

// ===== DELETE =====
window.deleteEnquiry = async function(id) {
    if (!confirm('Are you sure you want to delete this enquiry?')) return;
    await apiFetch(`${API}/enquiries/${id}`, { method: 'DELETE' });
    toast('Enquiry deleted');
    modal.classList.remove('active');
    await loadAll();
};

window.deleteRegistration = async function(id) {
    if (!confirm('Are you sure you want to delete this registration?')) return;
    await apiFetch(`${API}/registrations/${id}`, { method: 'DELETE' });
    toast('Registration deleted');
    modal.classList.remove('active');
    await loadAll();
};

// ===== REFRESH =====
document.getElementById('refreshBtn')?.addEventListener('click', async () => {
    const btn = document.getElementById('refreshBtn');
    btn.innerHTML = '<i class="fa-solid fa-circle-notch spinner"></i> Refreshing...';
    await loadAll();
    btn.innerHTML = '<i class="fa-solid fa-arrows-rotate"></i> Refresh';
    toast('Data refreshed');
});

// ===== INIT =====
loadAll();
