/* eslint-disable react/no-array-index-key */
import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import data from '../data';

function LmiaDataTable() {
  const rows = React.useMemo(
    () =>
      [...data.allTime].map((d, idx) => ({
        id: idx,
        ...d,
      })),
    []
  );

  const column = [
    {
      field: 'Province/Territory',
      headerName: 'Province/Territory',
      flex: 1,
    },
    { field: 'Stream', headerName: 'Stream', flex: 1 },
    { field: 'Employer', headerName: 'Employer', flex: 1 },
    {
      field: 'Address',
      headerName: 'Address',
      flex: 1,
    },
    {
      field: 'Occupation',
      headerName: 'Occupation',
      flex: 1,
    },
    {
      field: 'Approved Positions',
      headerName: 'Approved Positions',
      type: 'number',
      flex: 1,
    },
  ];

  return (
    <div style={{ height: window.innerHeight - 64 * 2, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={column}
        filterModel={{
          items: [
            {
              columnField: 'Province/Territory',
              operatorValue: 'contains',
              value: '',
            },
            {
              columnField: 'Occupation',
              operatorValue: 'contains',
              value: '',
            },
          ],
        }}
      />
    </div>
  );
}

export default LmiaDataTable;
