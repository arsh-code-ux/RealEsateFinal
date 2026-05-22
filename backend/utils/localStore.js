const fs = require('fs/promises')
const path = require('path')

const dataDir = path.join(__dirname, '..', 'data')
const usersFile = path.join(dataDir, 'users.json')
const propertiesFile = path.join(dataDir, 'properties.json')

async function ensureFile(filePath, fallbackValue) {
  await fs.mkdir(dataDir, { recursive: true })

  try {
    const raw = await fs.readFile(filePath, 'utf8')
    if (!raw.trim()) {
      await fs.writeFile(filePath, JSON.stringify(fallbackValue, null, 2), 'utf8')
      return fallbackValue
    }
    return JSON.parse(raw)
  } catch (error) {
    if (error.code === 'ENOENT') {
      await fs.writeFile(filePath, JSON.stringify(fallbackValue, null, 2), 'utf8')
      return fallbackValue
    }
    throw error
  }
}

async function saveFile(filePath, value) {
  await fs.mkdir(dataDir, { recursive: true })
  await fs.writeFile(filePath, JSON.stringify(value, null, 2), 'utf8')
}

function createId(prefix) {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`
}

function normalizeArray(value) {
  return Array.isArray(value) ? value : []
}

async function loadUsers() {
  return normalizeArray(await ensureFile(usersFile, []))
}

async function saveUsers(users) {
  await saveFile(usersFile, normalizeArray(users))
}

async function loadProperties() {
  return normalizeArray(await ensureFile(propertiesFile, []))
}

async function saveProperties(properties) {
  await saveFile(propertiesFile, normalizeArray(properties))
}

module.exports = {
  createId,
  loadUsers,
  saveUsers,
  loadProperties,
  saveProperties,
}
