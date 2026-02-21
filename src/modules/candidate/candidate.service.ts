import type { ApplyToJobRequest } from "./model/apply-to-job.request";
import type { CandidateResponse } from "./model/candidate.response";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getCandidateByEmail = async (
  email: string,
): Promise<CandidateResponse> => {
  const response = await fetch(
    `${BASE_URL}/api/candidate/get-by-email?email=${email}`,
  );

  if (!response.ok) {
    const errorBody = await response.json();
    throw new Error(errorBody.message || "Error fetching candidate");
  }

  return response.json();
};

export const applyToJob = async (
  body: ApplyToJobRequest,
): Promise<{ ok: boolean }> => {
  const response = await fetch(`${BASE_URL}/api/candidate/apply-to-job`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorBody = await response.json();
    throw new Error(errorBody.message || "Error applying to job");
  }

  return response.json();
};
