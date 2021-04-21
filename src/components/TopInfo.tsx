import React, { useState, useMemo } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Button, Container, Grid, Typography } from '@material-ui/core';
import _ from 'lodash';
import { LmiaData, LmiaDataYear, Province } from '../data/types';
import { FilterType } from './MultipleFilter/types';
import data from '../data';
import InsightTable from './InsightTable';
import MultipleFilter from './MultipleFilter';

type OccupationInfo = { occupation: string; quantity: number };
type EmployerInfo = { employer: string; quantity: number };
type ProvinceInfo = { province: Province; quantity: number };

const occupationList = [
  ...Array.from(
    new Set(([...data.allTime] as LmiaData[]).map((d) => d.Occupation))
  ),
].sort();

const provinceList = [
  ...Array.from(
    new Set(
      ([...data.allTime] as LmiaData[]).map((d) => d['Province/Territory'])
    )
  ),
].sort();
interface Props {
  infoType: 'occupation' | 'employer' | 'province';
}

const yearOptions: LmiaDataYear[] = [
  '2020',
  '2019',
  '2018',
  '2017',
  '2016',
  'allTime',
];

const rowOptions = [25, 50, 100];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    optionBtn: {
      marginRight: theme.spacing(1),
      marginTop: theme.spacing(0.5),
      marginBottom: theme.spacing(0.5),
    },
    formControl: {
      marginTop: theme.spacing(1),
      display: 'flex',
      minWidth: 120,
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: 2,
    },
  })
);

function TopInfo(props: Props) {
  const { infoType } = props;
  const classes = useStyles();
  const [year, setYear] = useState<LmiaDataYear>('2020');
  const [rowNumber, setRowNumber] = useState(25);
  const [occupationFilters, setOccupationFilters] = useState<string[]>([]);
  const [provinceFilters, setProvinceFilters] = useState<string[]>([]);

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
        if (provinceFilters.length) {
          tempData = tempData.filter((d) =>
            provinceFilters.includes(d['Province/Territory'])
          );
        }
        if (occupationFilters.length) {
          tempData = tempData.filter((d) =>
            occupationFilters.includes(d.Occupation)
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
  }, [infoType, year, provinceFilters, occupationFilters]);

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

  const handleChange = (type: FilterType) => (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    switch (type) {
      case 'occupation':
        setOccupationFilters(event.target.value as string[]);
        break;
      case 'province':
        setProvinceFilters(event.target.value as string[]);
        break;
      default:
        break;
    }
  };

  const handleChangeMultiple = (type: FilterType) => (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const { options } = event.target as HTMLSelectElement;
    const value: string[] = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    switch (type) {
      case 'occupation':
        setOccupationFilters(value);
        break;
      case 'province':
        setProvinceFilters(value);
        break;
      default:
        break;
    }
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
          <>
            <MultipleFilter
              filterType="province"
              value={provinceFilters}
              optionList={provinceList}
              handleChange={handleChange('province')}
              handleChangeMultiple={handleChangeMultiple('province')}
            />
            <MultipleFilter
              filterType="occupation"
              value={occupationFilters}
              optionList={occupationList}
              handleChange={handleChange('occupation')}
              handleChangeMultiple={handleChangeMultiple('occupation')}
            />
          </>
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
