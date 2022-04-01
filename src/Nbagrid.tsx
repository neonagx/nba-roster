import React, { useEffect, useState} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';

const NbaGrid = (props: any) => {
  const { roster } = props;
  const [rows, setRows] = useState<any[]>([])

  const removeButton = () => <Button>Remove</Button>

  useEffect(() => {
    setRows([]);
    let newRows: any = [];
    roster.map((player: any) => {
      newRows.push({
        id: player.personId,
        firstName: player.firstName,
        lastName: player.lastName,
        position: player.pos,
        team: player.lastAffilation,
        removeButton: removeButton()
      })
    });
    setRows(newRows);
  }, [roster]);

  const columns: any = [
    { field: 'firstName', headerName: 'First Name', width: 150 },
    { field: 'lastName', headerName: 'Last Name', width: 150 },
    { field: 'position', headerName: 'Position', width: 150 },
    { field: 'team', headerName: 'Team', width: 150 },
    { field: 'removeButton', headerName: ''}
  ]

  return (
    <div style={{ height: '60vh', width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pagination pageSize={5} />
    </div>
  );
}

export default NbaGrid