import { FC, ReactElement, useEffect, useState } from 'react';
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

import { Player } from './Interfaces';
import NbaGrid from './Nbagrid';

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

const App: FC = (): ReactElement => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [roster, setRoster] = useState<Player[]>([]);

  const addToGrid = (id: string) => {
    let addingPlayer: Player;
    addingPlayer = players.filter((player) => player.personId === id)[0];
    setRoster((prevState) => {
      let result: Player[] = [];
      if(prevState.length === 5) {
        alert('Cannot Add more than 5 players');
        return prevState;
      }

      if(prevState.includes(addingPlayer) === false && prevState.length < 5) {
        result = [...prevState, addingPlayer];
      } else {
        result = [...prevState];
        alert('Cannot Add Same Player Twice');
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
      <Accordion sx={{ width: '450px', maxWidth: '100%', position: 'fixed', zIndex: '100', left: '50%', transform: "translate(-50%, 0)"}}>
        <AccordionSummary {...accordionProps}>
          <Typography>MY NBA FANTASY TEAM ROSTER</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{maxWidth: '100%'}}>
          <NbaGrid roster={roster} setRoster={setRoster}/>
        </AccordionDetails>
      </Accordion>
      {players.map((player) => (
        <Card className={"playerCard"} sx={{ width: '100%', maxWidth: 345, display: 'inline-block', marginTop: '7vh'}} key={player.personId}>
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
          <Avatar alt={'position'} sx={{display: 'inline-flex', marginLeft: '10px'}}>
              {player.pos}
          </Avatar>
          </CardContent>
          <Button variant='contained' onClick={() => addToGrid(player.personId)}>Add to My Fantasy Team Roster</Button>
        </Card>
      ))}
      
    </div>
  );
}

export default App;
