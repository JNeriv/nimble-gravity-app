import { useState } from "react";
import type { JobResponse } from "../model/job.response";
import type { CandidateResponse } from "../../candidate/model/candidate.response";
import { applyToJob } from "../../candidate/candidate.service";

interface Props {
  job: JobResponse;
  candidate: CandidateResponse;
}

export const JobItemComponent = ({ job, candidate }: Props) => {
  const [repoUrl, setRepoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!repoUrl.trim()) {
      setMessage("Please enter a valid repository URL");
      return;
    }

    try {
      setLoading(true);
      setMessage(null);

      await applyToJob({
        applicationId: candidate.applicationId,
        uuid: candidate.uuid,
        candidateId: candidate.candidateId,
        jobId: job.id,
        repoUrl,
      });

      setMessage("Application sent successfully!");
    } catch (err: any) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "1rem",
        marginBottom: "1rem",
        borderRadius: "6px",
      }}
    >
      <h3>{job.title}</h3>

      <input
        type="text"
        placeholder="https://github.com/JNeriv/nimble-gravity-app"
        value={repoUrl}
        onChange={(e) => {
          console.log("Typing:", e.target.value);
          setRepoUrl(e.target.value);
        }}
        style={{ width: "100%", marginBottom: "0.5rem" }}
      />

      <button onClick={handleSubmit}>
        {loading ? "Sending..." : "Submit"}
      </button>

      {message && <p style={{ marginTop: "0.5rem" }}>{message}</p>}
    </div>
  );
};
