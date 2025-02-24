import { Candidate } from "../interfaces/Candidate.interface";
import { useState, useEffect } from "react";

const SavedCandidates = () => {

  const [candidates, setCandidates] = useState<Candidate[]>([])

  useEffect(() => {
    const storedCandidates: Candidate[] = JSON.parse(localStorage.getItem("candidates") as string) || [];
    console.log(storedCandidates);
    setCandidates(storedCandidates);
  }, []);

  const deleteRow = (index: number) => {
    const updatedCandidates = [...candidates];
    updatedCandidates.splice(index, 1);
    setCandidates(updatedCandidates);
    localStorage.setItem("candidates", JSON.stringify(updatedCandidates)); 
  }

  return (
    <>
      <div>
        <h2>Potential Candidates</h2>
        <table className = "table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Username</th>
              <th>Location</th>
              <th>Email</th>
              <th>Company</th>
              <th>Bio</th>
              <th>Reject</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate: Candidate, index: number) => (
              <tr key={candidate.login}>
            <td><img width = "100px" src={candidate.avatar_url}/></td>
            <td>{candidate.login}</td>
            <td>{candidate.location}</td>
            <td>{candidate.email}</td>
            <td>{candidate.company}</td>
            <td>{candidate.bio}</td>
            <td><button onClick={() => deleteRow(index)}>Reject</button></td>
            </tr>
          ))};
          </tbody>
        </table>
      </div>
    </>
  );
};

export default SavedCandidates;