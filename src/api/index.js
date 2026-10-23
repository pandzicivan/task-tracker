import { http } from "./http";

const qs = (limit, offset) => {
  const qsParams = new URLSearchParams;
  if (Number.isInteger(limit)) {
    qsParams.set("limit", limit);
  }
  if (Number.isInteger(offset)) {
    qsParams.set("offset", offset);
  }
  const str = qsParams.toString();
  return str ? `?${str}` : "";
}

export const getClients = (limit, offset) => http(`/clients${qs(limit, offset)}`);
export const getProjects = (clientId, limit, offset) => http(`/clients/${clientId}/projects${qs(limit, offset)}`);
export const getTasks = (projectId, limit, offset) => http(`/projects/${projectId}/tasks${qs(limit, offset)}`);