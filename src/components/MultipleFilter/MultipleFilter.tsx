import React, { useState, useEffect } from 'react';
import {
  makeStyles,
  Theme,
  createStyles,
  useTheme,
} from '@material-ui/core/styles';
import {
  FormControl,
  InputLabel,
  Select,
  Input,
  Chip,
  MenuItem,
} from '@material-ui/core';
import { FilterType } from './types';
import { capitalizeFirstLetter } from '../../utils';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(
  occupation: string,
  occupationFilters: string[],
  theme: Theme
) {
  return {
    fontWeight:
      occupationFilters.indexOf(occupation) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

interface Props {
  value: string[];
  filterType: FilterType;
  optionList: string[];
  handleChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
  handleChangeMultiple: (event: React.ChangeEvent<{ value: unknown }>) => void;
}

function MultipleFilter(props: Props) {
  const {
    filterType,
    value,
    optionList,
    handleChange,
    handleChangeMultiple,
  } = props;
  const theme = useTheme();
  const classes = useStyles();
  const [isNativeSelect, setIsNativeSelect] = useState(window.innerWidth < 600);

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 600px)');

    const changeEventHandler = (e: MediaQueryListEvent) => {
      const mobileView = e.matches;
      if (mobileView) {
        setIsNativeSelect(true);
      } else {
        setIsNativeSelect(false);
      }
    };

    mql.addEventListener('change', changeEventHandler);
    return () => {
      mql.removeEventListener('change', changeEventHandler);
    };
  }, []);

  return (
    <FormControl className={classes.formControl}>
      {isNativeSelect ? (
        <>
          <InputLabel shrink htmlFor="select-multiple-native">
            {capitalizeFirstLetter(filterType)}
          </InputLabel>
          <Select
            native
            multiple
            value={value}
            onChange={handleChangeMultiple}
            inputProps={{
              name: filterType,
              id: `${filterType}-select-helper-label`,
              style: {
                whiteSpace: 'normal',
              },
            }}
          >
            {optionList.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </Select>
        </>
      ) : (
        <>
          <InputLabel id={`${filterType}-select-helper-label`}>
            {capitalizeFirstLetter(filterType)}
          </InputLabel>
          <Select
            labelId={`${filterType}-select-helper-label`}
            id={`${filterType}-select-helper`}
            multiple
            value={value}
            onChange={handleChange}
            input={<Input id={`select-multiple-${filterType}`} />}
            renderValue={(selected) => (
              <div className={classes.chips}>
                {(selected as string[]).map((v) => (
                  <Chip key={v} label={v} className={classes.chip} />
                ))}
              </div>
            )}
            MenuProps={MenuProps}
          >
            {optionList.map((opt) => (
              <MenuItem
                key={opt}
                value={opt}
                style={getStyles(opt, value, theme)}
              >
                {opt}
              </MenuItem>
            ))}
          </Select>
        </>
      )}
    </FormControl>
  );
}

export default MultipleFilter;
