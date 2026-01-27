import fs from "fs";
import path from "path";

const clientsPath = path.resolve("backend/clients.json");
if (!fs.existsSync(clientsPath)) fs.writeFileSync(clientsPath, JSON.stringify([]));

export function getClients() {
  return JSON.parse(fs.readFileSync(clientsPath));
}

export function addClient(name) {
  const clients = getClients();
  clients.push({ name, createdAt: Date.now() });
  fs.writeFileSync(clientsPath, JSON.stringify(clients, null, 2));
}
