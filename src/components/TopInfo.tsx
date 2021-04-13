import React, { useState, useMemo } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {
  Button,
  Container,
  FormControl,
  Grid,
  Typography,
  InputLabel,
  Select,
} from '@material-ui/core';
import _ from 'lodash';
import { LmiaData, LmiaDataYear, Province } from '../data/types';
import data from '../data';
import InsightTable from './InsightTable';

type OccupationInfo = { occupation: string; quantity: number };
type EmployerInfo = { employer: string; quantity: number };
type ProvinceInfo = { province: Province; quantity: number };

const occupationList = [
  ...Array.from(
    new Set(([...data.allTime] as LmiaData[]).map((d) => d.Occupation))
  ),
].sort();

interface Props {
  infoType: 'occupation' | 'employer' | 'province';
}

const yearOptions: LmiaDataYear[] = ['2020', 'allTime'];

const rowOptions = [25, 50, 100];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    optionBtn: {
      marginRight: theme.spacing(1),
    },
    formControl: {
      marginTop: theme.spacing(1),
      minWidth: 120,
    },
  })
);

function TopInfo(props: Props) {
  const { infoType } = props;
  const classes = useStyles();
  const [year, setYear] = useState<LmiaDataYear>('2020');
  const [rowNumber, setRowNumber] = useState(25);
  const [occupationFilterText, setOccupationFilterText] = useState('');

  const tableData = useMemo(() => {
    let filteredData: (OccupationInfo | EmployerInfo | ProvinceInfo)[] = [];
    let tempData: LmiaData[] = [...data[year]];
    let tempGroup: _.Dictionary<LmiaData[]>;
    switch (infoType) {
      case 'occupation':
        tempGroup = _.groupBy(tempData, 'Occupation');
        filteredData = _.sortBy(
          Object.keys(tempGroup).map((key) => ({
            occupation: key,
            quantity: tempGroup[key]
              .map((d) => Number(d['Approved Positions']))
              .reduce((a, c) => a + c, 0),
          })),
          'quantity'
        ).reverse();
        break;
      case 'employer':
        if (occupationFilterText) {
          tempData = tempData.filter(
            (d) => d.Occupation === occupationFilterText
          );
        }
        tempGroup = _.groupBy(tempData, 'Employer');
        filteredData = _.sortBy(
          Object.keys(tempGroup).map((key) => ({
            employer: key,
            quantity: (tempGroup[key] as LmiaData[])
              .map((d) => Number(d['Approved Positions']))
              .reduce((a, c) => a + c, 0),
          })),
          'quantity'
        ).reverse();
        break;
      case 'province':
        tempGroup = _.groupBy(tempData, 'Province/Territory');
        filteredData = _.sortBy(
          Object.keys(tempGroup).map((key) => ({
            province: key as Province,
            quantity: tempGroup[key]
              .map((d) => Number(d['Approved Positions']))
              .reduce((a, c) => a + c, 0),
          })),
          'quantity'
        ).reverse();
        break;
      default:
        break;
    }
    return filteredData;
  }, [infoType, year, occupationFilterText]);

  const getTableTitle = () => {
    switch (infoType) {
      case 'employer':
        return 'Employer';
      case 'occupation':
        return 'Occupation';
      case 'province':
        return 'LMIA issued by Province';
      default:
        return '';
    }
  };

  const getTableHeaderRow = () => {
    let firstColumn = '';
    switch (infoType) {
      case 'employer':
        firstColumn = 'Employer 🏢';
        break;
      case 'occupation':
        firstColumn = 'Occupation 💼';
        break;
      case 'province':
        firstColumn = 'Province/Territory';
        break;
      default:
        break;
    }
    return [firstColumn, 'Quantity'];
  };

  const handleOccupationChange = (
    event: React.ChangeEvent<{ name?: string | undefined; value: unknown }>
  ) => {
    setOccupationFilterText(event.target.value as string);
  };

  return (
    <Grid item xs={12}>
      <Container maxWidth="md">
        {yearOptions.map((opt) => (
          <Button
            key={`year-option-${opt}`}
            variant={year === opt ? 'contained' : 'outlined'}
            color={year === opt ? 'primary' : undefined}
            onClick={() => {
              setYear(opt);
            }}
            className={classes.optionBtn}
          >
            {opt}
          </Button>
        ))}
        <Typography variant="h6" component="h2" className={classes.title}>
          Top
        </Typography>

        {rowOptions.map((opt) => (
          <Button
            key={`row-option-${opt}`}
            variant={rowNumber === opt ? 'contained' : 'outlined'}
            color={rowNumber === opt ? 'primary' : undefined}
            onClick={() => {
              setRowNumber(opt);
            }}
            className={classes.optionBtn}
          >
            {opt}
          </Button>
        ))}
        {infoType === 'employer' && (
          <div>
            <FormControl className={classes.formControl}>
              <InputLabel id="occupation-select-helper-label">
                Occupation
              </InputLabel>
              <Select
                native
                value={occupationFilterText}
                onChange={handleOccupationChange}
                inputProps={{
                  name: 'occupation',
                  id: 'occupation-select-helper-label',
                }}
              >
                <option aria-label="None" value="" />
                {occupationList.map((occ) => (
                  <option key={occ} value={occ}>
                    {occ}
                  </option>
                ))}
              </Select>
            </FormControl>
          </div>
        )}
        <InsightTable
          tableTitle={getTableTitle()}
          tableHeaderRow={getTableHeaderRow()}
          data={tableData.slice(0, rowNumber)}
          ranking
        />
      </Container>
    </Grid>
  );
}

export default TopInfo;
