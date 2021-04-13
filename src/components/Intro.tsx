import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Container, Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      fontWeight: 'bold',
    },
  })
);

function Intro() {
  const classes = useStyles();

  return (
    <Grid item xs={12}>
      <Container maxWidth="md">
        <Typography variant="h4" className={classes.title}>
          What is a Labour Market Impact Assessment?
        </Typography>
        <Typography>
          A Labour Market Impact Assessment (LMIA) is a document that an
          employer in Canada may need to get before hiring a foreign worker.
        </Typography>
        <Typography variant="h4" className={classes.title}>
          Purpose of this website is to...
        </Typography>
        <ul>
          <li>
            <Typography>
              Show how many LMIA are issued for each Province
            </Typography>
          </li>
          <li>
            <Typography>Find out which employers hired most</Typography>
          </li>
          <li>
            <Typography>Know which occupations are demanding</Typography>
          </li>
        </ul>
      </Container>
    </Grid>
  );
}

export default Intro;
