import lmia2020data from './2020';
import { LmiaDataYear, LmiaData } from './types';

export { default as lmia2020data } from './2020';

const allTimeData = [...lmia2020data];

export default {
  2020: lmia2020data,
  allTime: allTimeData,
} as { [key in LmiaDataYear]: LmiaData[] };
