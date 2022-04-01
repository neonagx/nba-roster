import React, { useEffect, useState } from 'react';
import NbaGrid from './Nbagrid';
import './App.css';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Avatar from '@mui/material/Avatar';

const App = () => {
  const [players, setPlayers] = useState<any[]>([]);

  useEffect(() => {
    fetch(
      "http://data.nba.net/10s/prod/v1/2021/players.json")
      .then((res) => res.json())
      .then((data) => {
        console.log('data', data.league.standard[0])
        setPlayers(data.league.standard);
      })
  }, [])

  return (
    <div className="App">
      {players.map((player) => (
        <Card className={"playerCard"} sx={{ width: '100%',maxWidth: 345, display: 'inline-block'}} key={player.personId}>
          <CardHeader
          title={`${player.firstName} ${player.lastName}`}
          />
          <CardMedia
            component="img"
            height="194"
            image={`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${player.personId}.png`}
            alt="Player Image Not Available"
          />
          <CardContent>
            PLAYER POSITION: 
          <Avatar alt={'position'} style={{display: 'inline-flex', marginLeft: '10px'}}>
              {player.pos}
          </Avatar>
          </CardContent>
        </Card>
      ))}

      <NbaGrid />
    </div>
  );
}

export default App;
