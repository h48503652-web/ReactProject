
import type { CommentCreate, Ticket, TicketCreate, TicketUpdate, Comment, Status, Priority } from "../components/tickets";
import apiClient from "./apiClient";


export const getTickets = async (): Promise<Ticket[]> => {
  const response = await apiClient.get("/tickets");
  return response.data;
};

export const getTicketById = async (id: number | null): Promise<Ticket> => {
  const response = await apiClient.get(`/tickets/${id}`);
  return response.data;
};

export const createTicket = async (ticket: TicketCreate): Promise<Ticket> => {
  const response = await apiClient.post("/tickets", ticket);
  return response.data;
};

export const updateTicket = async (id: number , data: TicketUpdate): Promise<Ticket> => {
  const response = await apiClient.patch(`/tickets/${id}`, data);
  return response.data;
};

export const deleteTicket = async (id: number ): Promise<void> => { 
  await apiClient.delete(`/tickets/${id}`);
  
};

export const getComments = async (ticket_id: number | null): Promise<Comment[]> => {
  const response = await apiClient.get(`/tickets/${ticket_id}/comments`);
  return response.data;
};

export const addComment = async (ticket_id: number | null, content: string): Promise<Comment> => {
  const response = await apiClient.post(`/tickets/${ticket_id}/comments`, { content });
  return response.data;
};

export const getStatuses = async (): Promise<Status[]> => {
  const response = await apiClient.get("/statuses");
  
  return response.data;
}

export const adminCreateStatus = async (statusData: { name: string }) : Promise<Status>=> {
  const response = await apiClient.post("/statuses", statusData);
  return response.data;
};

export const getPriorities = async (): Promise<Priority[]> => {
  const response = await apiClient.get("/priorities");
  return response.data;
}
export const adminCreatePriority = async (priorityData: { name: string }) : Promise<Priority>=> {
  const response = await apiClient.post("/priorities", priorityData);
  return response.data;
}


