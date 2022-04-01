import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';

export default function NbaGrid() {
  const { data } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 100,
    maxColumns: 6,
  });

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <DataGrid {...data} pagination pageSize={10} />
    </div>
  );
}