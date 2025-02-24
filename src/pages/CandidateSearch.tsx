import { useState, useEffect } from 'react';
import { Candidate } from '../interfaces/Candidate.interface';
import { searchGithub, searchGithubUser } from '../api/API';

const CandidateSearch = () => {
  const [potential, setPotential] = useState<Candidate[]>([]);
  const [candidate, setCandidate] = useState<Candidate>();
  const [currentIndex, setCurrentIndex] = useState(0)

  const getCandidates = async () => {
    const potentialCand = await searchGithub();
    if (potentialCand.length === 0) return;
    console.log(potentialCand);
    setPotential(potentialCand);
    const currentCandidate = await searchGithubUser(potentialCand[currentIndex]);
    setCandidate(currentCandidate);
    console.log(potentialCand);
  };

  const nextCandidate = () => {
    if (currentIndex === potential.length - 1) {
      console.log("no more candidates left")
    } else {
      setCandidate(potential[currentIndex + 1])
      setCurrentIndex(currentIndex + 1)
    }
  };

  useEffect(() => {
    getCandidates();
  }, [])


  const storeCandidate = () => {
    nextCandidate();
    let storedCandidates: Candidate[] = JSON.parse(localStorage.getItem("candidates") as string) || []
    console.log(storedCandidates)

    if (candidate) {
      storedCandidates.push(candidate);
      localStorage.setItem("candidates", JSON.stringify(storedCandidates));
    }

    console.log(storedCandidates)
  }

  return (
    <div>
      <h1>Candidate Search</h1>
      <div>
        {currentIndex === potential.length - 1 ? (
          <div>No more candidates</div>
        ) : (
          <div>
            <img width= "200px" src={candidate && candidate.avatar_url} />
            <p>{candidate && candidate.login}</p>
            <p>{candidate && candidate.email}</p>
            <p>{candidate && candidate.location}</p>
            <p>{candidate && candidate.company}</p>
            <p>{candidate && candidate.bio}</p>

          </div>
        )}
        <button className = "removeButton" onClick={nextCandidate}>-</button>
        <button className = "addButton" onClick={storeCandidate}>+</button>
      </div>
    </div>
  );
};

export default CandidateSearch;
