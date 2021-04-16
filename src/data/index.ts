import lmia2016data from './2016';
import lmia2017data from './2017';
import lmia2018data from './2018';
import lmia2019data from './2019';
import lmia2020data from './2020';
import { LmiaDataYear, LmiaData } from './types';

export { default as lmia2016data } from './2016';
export { default as lmia2017data } from './2017';
export { default as lmia2018data } from './2018';
export { default as lmia2019data } from './2019';
export { default as lmia2020data } from './2020';

const allTimeData = [
  ...lmia2016data,
  ...lmia2017data,
  ...lmia2018data,
  ...lmia2019data,
  ...lmia2020data,
];

export default {
  2016: lmia2016data,
  2017: lmia2017data,
  2018: lmia2018data,
  2019: lmia2019data,
  2020: lmia2020data,
  allTime: allTimeData,
} as { [key in LmiaDataYear]: LmiaData[] };
