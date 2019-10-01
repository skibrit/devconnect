import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import { getGithubRepose } from "../../../actions/profile";
import Spinner from "../../layouts/spinner/spinner";

const GithubRepo = ({ repose, username, getGithubRepose }) => {
  const [isRepoLoaded, setRepoLoaded] = useState(false);

  useEffect(
    () => {
      getGithubRepose(username);
    },
    [getGithubRepose]
  );

  useEffect(
    () => {
      if (repose) {
        setRepoLoaded(true);
      }
    },
    [repose]
  );

  return (
    <Fragment>
      {!repose
        ? <Spinner height="150px" spinnerSize="50px" classNames="spinner" />
        : <div className="github-repose-wrapper">
            <div className="github-repose-inner-wrapper">
              {repose.map(
                ({
                  id,
                  name,
                  html_url,
                  description,
                  stargazers_count,
                  watchers_count,
                  forks_count,
                  language
                }) => {
                  return (
                    <div className="github-repo-row" key={id} index={id}>
                      <div className="github-repo-inner-row">
                        <h3 className="repo-title">
                          <a
                            href="#"
                            onClick={e => {
                              e.preventDefault();
                              window.open(html_url);
                            }}
                          >
                            {name}
                          </a>
                        </h3>
                        <h4 className="repo-desc">
                          {description.length > 40
                            ? description.substring(0, 40) + " ..."
                            : description}
                        </h4>
                        <div className="repo-info-list-wrapper">
                          <ul className="repo-info-list">
                            <li>
                              <div className="badge badge-primary">
                                Stars: {stargazers_count}
                              </div>
                            </li>
                            <li>
                              <div className="badge badge-dark">
                                Watchers: {watchers_count}
                              </div>
                            </li>
                            <li>
                              <div className="badge badge-secondary">
                                Forks: {forks_count}
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>}
    </Fragment>
  );
};

const mapStateToProps = state => ({
  repose: state.profileStates.profile
    ? state.profileStates.profile.repose
    : null
});

const mapDispatchToProps = {
  getGithubRepose
};

export default connect(mapStateToProps, mapDispatchToProps)(GithubRepo);
