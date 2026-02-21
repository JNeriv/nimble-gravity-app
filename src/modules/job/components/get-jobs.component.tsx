import { useEffect, useState } from "react";
import { getJobs } from "../job.service";
import type { JobResponse } from "../model/job.response";
import type { CandidateResponse } from "../../candidate/model/candidate.response";
import { JobItemComponent } from "./job-item.component";

interface Props {
  candidate: CandidateResponse;
}

export const GetJobsComponent = ({ candidate }: Props) => {
  const [jobs, setJobs] = useState<JobResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await getJobs();
        setJobs(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) return <p>Loading jobs...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Open Positions</h2>
      {jobs.map((job) => (
        <JobItemComponent key={job.id} job={job} candidate={candidate} />
      ))}
    </div>
  );
};
