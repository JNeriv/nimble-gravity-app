import type { JobResponse } from "./model/job.response";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getJobs = async (): Promise<JobResponse[]> => {
  const response = await fetch(`${BASE_URL}/api/jobs/get-list`);

  if (!response.ok) {
    const errorBody = await response.json();
    throw new Error(errorBody.message || "Error fetching jobs");
  }

  return response.json();
};
