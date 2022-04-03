import { FC, ReactElement, useEffect, useState } from 'react';
import './App.css';

// Material UI Card Elements
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';

// Material UI Accordion ELements
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// Local types and style imports
import { Player } from './Interfaces';
import NbaGrid from './Nbagrid';
import {
  PositionColor,
  AccordionStyle,
  AccordionDetailsStyle,
  CardStyle,
  AvatarStyle
} from './Styles';

const App: FC = (): ReactElement => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [roster, setRoster] = useState<Player[]>([]);

  const addToGrid = (id: string) => {
    let addingPlayer: Player;
    addingPlayer = players.filter((player) => player.personId === id)[0];
    setRoster((prevState) => {
      let result: Player[] = [];

      // Prevents adding more than 5 players in the data grid.
      if (prevState.length === 5) {
        alert('Cannot Add more than 5 players');
        return prevState;
      }

      // Prevents adding same players
      if (prevState.includes(addingPlayer) === false && prevState.length < 5) {
        result = [...prevState, addingPlayer];
      } else {
        result = [...prevState];
        alert('Cannot Add Same Player Twice');
      }
      return result;
    })
  }

  const accordionProps = {
    expandIcon: (
      <ExpandMoreIcon
        sx={{
          pointerEvents: "auto"
        }}
      />
    )
  };

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
      <Accordion sx={AccordionStyle}>
        <AccordionSummary {...accordionProps}>
          <Typography>MY NBA FANTASY TEAM ROSTER</Typography>
        </AccordionSummary>
        <AccordionDetails sx={AccordionDetailsStyle}>
          <NbaGrid roster={roster} setRoster={setRoster} />
        </AccordionDetails>
      </Accordion>
      {players.map((player) => (
        <Card className={"playerCard"} sx={CardStyle} key={player.personId}>
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
            <Avatar alt={'position'} sx={{ ...AvatarStyle, backgroundColor: PositionColor(player.pos) }}>
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
