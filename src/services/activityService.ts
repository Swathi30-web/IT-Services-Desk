import api from "./api";
import type { Activity } from "../types/activity";

const ACTIVITIES_KEY = "service_desk_activities";

export const initialActivities: Activity[] = [
  {
    id: "ACT01",
    ticketId: "T01",
    action: "Ticket created",
    actorId: "U03",
    actorName: "Employee User",
    timestamp: "2026-09-05T09:30:00.000Z",
    time: "09:30 AM",
    details: "Ticket created with High priority",
  },
  {
    id: "ACT02",
    ticketId: "T01",
    action: "Ticket assigned to Support Agent",
    actorId: "U01",
    actorName: "Admin User",
    timestamp: "2026-09-05T10:00:00.000Z",
    time: "10:00 AM",
    details: "Assigned to Support Agent (U02)",
  },
  {
    id: "ACT03",
    ticketId: "T01",
    action: "Status changed to In Progress",
    actorId: "U02",
    actorName: "Support Agent",
    timestamp: "2026-09-06T10:15:00.000Z",
    time: "10:15 AM",
    details: "Investigation started",
  },
  {
    id: "ACT04",
    ticketId: "T04",
    action: "Ticket created",
    actorId: "U04",
    actorName: "Swathi Candidate",
    timestamp: "2026-09-01T08:30:00.000Z",
    time: "08:30 AM",
    details: "Network issue reported",
  },
  {
    id: "ACT05",
    ticketId: "T04",
    action: "Resolution added",
    actorId: "U02",
    actorName: "Support Agent",
    timestamp: "2026-09-02T16:00:00.000Z",
    time: "04:00 PM",
    details: "Network cable replaced. Ticket marked as Resolved.",
  },
];

export const getStoredActivities = (): Activity[] => {
  const data = localStorage.getItem(ACTIVITIES_KEY);
  if (!data) {
    localStorage.setItem(ACTIVITIES_KEY, JSON.stringify(initialActivities));
    return initialActivities;
  }
  try {
    return JSON.parse(data);
  } catch {
    return initialActivities;
  }
};

export const setStoredActivities = (activities: Activity[]) => {
  localStorage.setItem(ACTIVITIES_KEY, JSON.stringify(activities));
};

export const getActivities = async (): Promise<Activity[]> => {
  try {
    const response = await api.get<Activity[]>("/activities");
    if (response.data && response.data.length > 0) {
      setStoredActivities(response.data);
      return response.data;
    }
  } catch {
    // fallback
  }
  return getStoredActivities();
};

export const getActivitiesByTicketId = async (
  ticketId: string
): Promise<Activity[]> => {
  try {
    const response = await api.get<Activity[]>(
      `/activities?ticketId=${ticketId}`
    );
    if (response.data) {
      return response.data;
    }
  } catch {
    // fallback
  }
  const all = getStoredActivities();
  return all.filter((a) => a.ticketId === ticketId);
};

export const createActivity = async (
  activity: Activity
): Promise<Activity> => {
  const current = getStoredActivities();
  const updated = [...current, activity];
  setStoredActivities(updated);

  try {
    const response = await api.post<Activity>("/activities", activity);
    return response.data;
  } catch {
    return activity;
  }
};
