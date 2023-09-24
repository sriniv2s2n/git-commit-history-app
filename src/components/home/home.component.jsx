import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { Octokit } from '@octokit/core';

import './home.styles.scss';
import Input from '../input/input.component';
import Header from '../header/header.component';
import Button from '../button/button.component';
import CommitDetails from '../commit-details/commit-details.component';

const pat =
  'github' +
  '_pa' +
  '_11AKHVFQY0RJbZocklpt4e' +
  '_3DDR3wSnbPDcp1YX2Y75Hrm' +
  'S10NfED5kJ4g0YVKS' +
  'SutBMXMD7BHgfYhTiky';

const Home = () => {
  const refreshCountTimerId = useRef(null);
  const getCommitDetailsTimerId = useRef(null);
  const [refreshCount, setRefreshCount] = useState(30);
  const [commitDetails, setCommitDetails] = useState([]);
  const [userId, setUserId] = useState('sriniv2s2n');
  const [repoName, setRepoName] = useState('git-commit-history-app');
  const [personalAccessToken, setPersonalAccessToken] = useState(pat);

  const getCommitDetails = () => {
    if (personalAccessToken || localStorage.getItem('gitPersonalAccessToken')) {
      const octokit = new Octokit({
        auth:
          personalAccessToken || localStorage.getItem('gitPersonalAccessToken'),
      });
      octokit
        .request(`GET /repos/${userId}/${repoName}/commits`, {
          owner: 'OWNER',
          repo: 'REPO',
        })
        .then((res) => {
          startTimer();
          setCommitDetails(res.data);
          if (personalAccessToken)
            localStorage.setItem('gitPersonalAccessToken', personalAccessToken);
        })
        .catch((error) => {
          alert(error);
          setCommitDetails([]);
          stopTimer();
        });
    }
  };

  useEffect(() => {
    getCommitDetails();
  }, []);

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
          value={userId}
          onChange={(e) => {
            setUserId(e.target.value);
          }}
          label={'User Id'}
        />
        <Input
          value={repoName}
          onChange={(e) => {
            setRepoName(e.target.value);
          }}
          label={'Repository Name'}
        />
        <Input
          type="password"
          value={personalAccessToken}
          onChange={(e) => {
            setPersonalAccessToken(e.target.value);
          }}
          label={'Personal Access Token'}
        />
        <Button btnLabel={'Fetch History'} onClick={getCommitDetails} />
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
