import { useEffect, useState } from "react";
import { Octokit } from "@octokit/core";

import "./home.styles.scss";
import Input from "../input/input.component";
import Header from "../header/header.component";
import Button from "../button/button.component";
import CommitDetails from "../commit-details/commit-details.component";

const Home = () => {
  const [commitDetails, setCommitDetails] = useState([]);

  useEffect(() => {
    const octokit = new Octokit({
      auth: "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",
    });
    octokit
      .request("GET /repos/sriniv2s2n/git-commit-history-app/commits", {
        owner: "OWNER",
        repo: "REPO",
      })
      .then((res) => setCommitDetails(res.data));
  }, []);

  return (
    <div className="home-container">
      <Header />
      <div className="access-key-container">
        <Input />
        <Button btnLabel={"Fetch History"} onClick={() => {}} />
      </div>
      <div className="commit-history-container">
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
  );
};

export default Home;
