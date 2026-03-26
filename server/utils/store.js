import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, '..', 'data');

function readJSON(filename) {
    const filePath = path.join(DATA_DIR, filename);
    try {
        const raw = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(raw);
    } catch {
        return [];
    }
}

function writeJSON(filename, data) {
    const filePath = path.join(DATA_DIR, filename);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

export function getAll(filename) {
    return readJSON(filename);
}

export function getById(filename, id) {
    const items = readJSON(filename);
    return items.find(item => item.id === id) || null;
}

export function create(filename, entry) {
    const items = readJSON(filename);
    items.unshift(entry); // newest first
    writeJSON(filename, items);
    return entry;
}

export function update(filename, id, updates) {
    const items = readJSON(filename);
    const index = items.findIndex(item => item.id === id);
    if (index === -1) return null;
    items[index] = { ...items[index], ...updates, updatedAt: new Date().toISOString() };
    writeJSON(filename, items);
    return items[index];
}

export function remove(filename, id) {
    const items = readJSON(filename);
    const index = items.findIndex(item => item.id === id);
    if (index === -1) return false;
    items.splice(index, 1);
    writeJSON(filename, items);
    return true;
}
