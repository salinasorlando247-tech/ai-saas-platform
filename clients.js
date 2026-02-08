import fs from "fs";
import path from "path";

const clientsFile = path.resolve("./backend/analytics.json");

export function getClients() {
  if (!fs.existsSync(clientsFile)) {
    fs.writeFileSync(clientsFile, JSON.stringify({ clients: {} }, null, 2));
  }
  const data = JSON.parse(fs.readFileSync(clientsFile, "utf8"));
  return data.clients;
}

export function saveClients(clients) {
  fs.writeFileSync(clientsFile, JSON.stringify({ clients }, null, 2));
}

export function addClient(name, industry) {
  const clients = getClients();
  if (!clients[name]) {
    clients[name] = {
      posts: [],
      engagement: [],
      bestTimes: {},
      industry,
    };
    saveClients(clients);
  }
}

export function updateClient(name, updates) {
  const clients = getClients();
  if (clients[name]) {
    clients[name] = { ...clients[name], ...updates };
    saveClients(clients);
  }
}

export function deleteClient(name) {
  const clients = getClients();
  if (clients[name]) {
    delete clients[name];
    saveClients(clients);
  }
}
