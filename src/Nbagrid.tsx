import React, { FC, BaseSyntheticEvent, useEffect, useState, ReactElement } from 'react';

import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Button from '@mui/material/Button';

import { PlayerRow, Player, NbaGridProps } from './Interfaces';
import { DataGridStyle } from './Styles';

const NbaGrid: FC<NbaGridProps> = (props): ReactElement => {
  const { roster, setRoster } = props;
  const [rows, setRows] = useState<PlayerRow[]>([])

  useEffect(() => {
    setRows([]);
    let newRows: PlayerRow[] = [];
    roster.map((player: Player) =>
      newRows.push({
        id: player.personId,
        firstName: player.firstName,
        lastName: player.lastName,
        position: player.pos,
      })
    );
    setRows(newRows);
  }, [roster]);

  const columns: GridColDef[] = [
    { field: 'firstName', headerName: 'First Name', width: 100 },
    { field: 'lastName', headerName: 'Last Name', width: 100 },
    { field: 'position', headerName: 'Position', width: 100 },
    {
      field: 'removeButton', headerName: '', renderCell: (params) => {
        const onClick = (e: BaseSyntheticEvent) => {
          e.stopPropagation();

          let newRows = rows.filter(row => row.id !== params.id);
          setRows(newRows);

          setRoster((prevState: Player[]) => {
            let newState = prevState.filter(state => state.personId !== params.id);
            return newState;
          })
        }
        return <Button onClick={onClick}>Remove</Button>
      }
    }
  ]

  return (
    <div>
      <DataGrid
        rows={rows}
        columns={columns}
        sx={DataGridStyle}
        rowsPerPageOptions={[]} />
    </div>
  );
}

export default NbaGrid