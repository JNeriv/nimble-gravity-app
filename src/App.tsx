import { useEffect, useState } from "react";
import { getCandidateByEmail } from "./modules/candidate/candidate.service";
import type { CandidateResponse } from "./modules/candidate/model/candidate.response";
import { GetJobsComponent } from "./modules/job/components/get-jobs.component";

function App() {
  const [candidate, setCandidate] = useState<CandidateResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCandidate = async () => {
      try {
        const data = await getCandidateByEmail("juanpabloneri2000@gmail.com");
        setCandidate(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidate();
  }, []);

  if (loading) return <p>Loading candidate...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>
        Hola, soy {candidate?.firstName} {candidate?.lastName}
      </h1>

      <p>Email: {candidate?.email}</p>
      <p>UUID: {candidate?.uuid}</p>

      <hr style={{ margin: "2rem 0" }} />

      <GetJobsComponent candidate={candidate!} />
    </div>
  );
}

export default App;
