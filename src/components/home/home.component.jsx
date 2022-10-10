import { useState, useRef } from "react";
import { Octokit } from "@octokit/core";

import "./home.styles.scss";
import Input from "../input/input.component";
import Header from "../header/header.component";
import Button from "../button/button.component";
import CommitDetails from "../commit-details/commit-details.component";

const Home = () => {
  const refreshCountTimerId = useRef(null);
  const getCommitDetailsTimerId = useRef(null);
  const [refreshCount, setRefreshCount] = useState(30);
  const [commitDetails, setCommitDetails] = useState([]);
  const [personalAccessToken, setPersonalAccessToken] = useState("");

  const getCommitDetails = () => {
    const octokit = new Octokit({
      auth: personalAccessToken,
    });
    octokit
      .request("GET /repos/sriniv2s2n/git-commit-history-app/commits", {
        owner: "OWNER",
        repo: "REPO",
      })
      .then((res) => {
        setCommitDetails(res.data);
        startTimer();
      })
      .catch((error) => {
        alert(error);
        setCommitDetails([]);
        stopTimer();
      });
  };

  const startTimer = () => {
    stopTimer();
    getCommitDetailsTimerId.current = setInterval(() => {
      getCommitDetails();
    }, 30000);

    refreshCountTimerId.current = setInterval(() => {
      setRefreshCount((c) => {
        if (c > 0) return c - 1;
        return 0;
      });
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(getCommitDetailsTimerId.current);
    clearInterval(refreshCountTimerId.current);
    setRefreshCount(30);
  };

  return (
    <div className="home-container">
      <Header />
      <div className="access-key-container">
        <Input
          value={personalAccessToken}
          onChange={(e) => {
            setPersonalAccessToken(e.target.value);
          }}
        />
        <Button btnLabel={"Fetch History"} onClick={getCommitDetails} />
      </div>
      <div className="commit-history-container">
        <div className="commit-history-header">
          <div className="header">Commit Details</div>
          <div className="refresh-btn">
            <Button
              btnLabel={`Refresh ${refreshCount}`}
              onClick={getCommitDetails}
            />
          </div>
        </div>
        <div className="commit-history-details">
          {commitDetails.map(({ commit }) => {
            const {
              message,
              author: { name, date },
            } = commit;
            return (
              <CommitDetails
                message={message}
                author={name}
                time={date}
                key={date}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
