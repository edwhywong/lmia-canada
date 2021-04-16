export type Province =
  | 'Alberta'
  | 'British Columbia'
  | 'Manitoba'
  | 'New Brunswick'
  | 'Newfoundland and Labrador'
  | 'Northwest Territories'
  | 'Nova Scotia'
  | 'Nunavut'
  | 'Ontario'
  | 'Prince Edward Island'
  | 'Quebec'
  | 'Saskatchewan'
  | 'Yukon'
  | 'Employers carrying on business in Canada with Head Office outside of Canada';

export interface LmiaData {
  'Province/Territory': Province;
  Stream: string;
  Employer: string;
  Address: string;
  Occupation: string;
  'Approved Positions': string | number;
}

export type LmiaDataYear =
  | '2016'
  | '2017'
  | '2018'
  | '2019'
  | '2020'
  | 'allTime';
