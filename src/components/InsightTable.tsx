/* eslint-disable react/no-array-index-key */
import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      minWidth: 320,
    },
    title: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  })
);

interface Props {
  tableTitle?: string;
  tableHeaderRow: string[];
  data: {
    [key: string]: string | number;
  }[];
  ranking?: boolean;
}

export default function InsightTable(props: Props) {
  const { tableTitle, tableHeaderRow, data, ranking = false } = props;
  const classes = useStyles();

  return (
    <div>
      {tableTitle && (
        <Typography variant="h6" component="h2" className={classes.title}>
          {tableTitle}
        </Typography>
      )}
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="insight table">
          <TableHead>
            <TableRow>
              {ranking && <TableCell>Rank 🎖</TableCell>}
              {tableHeaderRow.map((header, columnIdx) => (
                <TableCell
                  key={header}
                  align={
                    columnIdx === tableHeaderRow.length - 1
                      ? 'right'
                      : undefined
                  }
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, idx) => (
              <TableRow key={`${tableHeaderRow[idx]}-row-${idx}`}>
                {ranking && <TableCell>{idx + 1}</TableCell>}
                {Object.keys(row).map((key, columnIdx) => (
                  <TableCell
                    key={key}
                    align={
                      columnIdx === Object.keys(row).length - 1
                        ? 'right'
                        : undefined
                    }
                  >
                    {row[key]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
