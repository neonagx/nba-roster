import React, { useEffect, useState } from 'react';
import NbaGrid from './Nbagrid';
import './App.css';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';

const App = () => {
  const [players, setPlayers] = useState<any[]>([]);

  useEffect(() => {
    fetch(
      "http://data.nba.net/10s/prod/v1/2021/players.json")
      .then((res) => res.json())
      .then((data) => {
        setPlayers(data.league.standard);
      })
  }, [])

  return (
    <div className="App">
      {players.map((player) => (
        <Card className={"playerCard"} sx={{ maxWidth: 345 }} key={player.personId}>
          {/* <CardHeader avatar={

        }/> */}
          <CardMedia
            component="img"
            height="194"
            image={`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${player.personId}.png`}
            alt="Player Image Not Available"
          />
        </Card>
      ))}

      <NbaGrid />
    </div>
  );
}

export default App;
