import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import GitHubIcon from '@material-ui/icons/GitHub';

function GithubLink() {
  return (
    <IconButton
      color="default"
      aria-label="open github"
      onClick={() =>
        window.open('https://github.com/edwhywong/lmia-canada', '_blank')
      }
    >
      <GitHubIcon />
    </IconButton>
  );
}

export default GithubLink;
