import React, { useEffect, useState } from 'react';
import NbaGrid from './Nbagrid';
import './App.css';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const accordionProps = {
  sx: {
    pointerEvents: "none",
  },
  expandIcon: (
    <ExpandMoreIcon
      sx={{
        pointerEvents: "auto"
      }}
    />
  )
};

const App = () => {
  const [players, setPlayers] = useState<any[]>([]);
  const [roster, setRoster] = useState<any[]>([]);

  const addToGrid = (id: string) => {
    let addingPlayer: any = {};
    addingPlayer = players.filter((player) => player.personId === id)[0];
    setRoster((prevState) => {
      let result: any[] = [];
      if(prevState.includes(addingPlayer) === false && prevState.length < 5) {
        result = [...prevState, addingPlayer];
      } else {
        result = [...prevState];
      }
      return result;
    })
  }

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
      <Accordion>
        <AccordionSummary {...accordionProps}>
          <Typography>MY DREAM ROSTER</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <NbaGrid roster={roster}/>
        </AccordionDetails>
      </Accordion>
      {players.map((player) => (
        <Card className={"playerCard"} sx={{ width: '100%', maxWidth: 345, display: 'inline-block'}} key={player.personId}>
          <CardHeader
          title={`${player.firstName} ${player.lastName}`}
          />
          <CardMedia
            component="img"
            height="194"
            image={`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${player.personId}.png`}
            // onError={checkImage(this)}
            alt="Player Image Not Available"
          />
          <CardContent>
            PLAYER POSITION: 
          <Avatar alt={'position'} style={{display: 'inline-flex', marginLeft: '10px'}}>
              {player.pos}
          </Avatar>
          </CardContent>
          <Button variant='contained' onClick={() => addToGrid(player.personId)}>Add to Dream Roster</Button>
        </Card>
      ))}
      
    </div>
  );
}

export default App;
