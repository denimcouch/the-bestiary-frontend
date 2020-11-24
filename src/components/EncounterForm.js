import React from "react";
import { Segment, Header, Button } from "semantic-ui-react";
import { formatEXP } from "../components/MonsterTable";

function currentEncounter(monster) {
  return (
    <Segment>
      <Header as="h4">{monster.name}</Header>
      <div>
        <span>CR: {monster.challenge_rating}</span>{" "}
        <span>EXP: {formatEXP(monster.exp)}</span>
      </div>
    </Segment>
  );
}

function EncounterForm(props) {
  let { chosenMonsters, nameEncounter, resetEncounter, partyEXP } = props;

  const calculateTotalEXP = (monsters) => {
    let pooledEXP = monsters.map((monster) => monster.exp);
    return pooledEXP.length !== 0 ? pooledEXP.reduce((a, b) => a + b) : 0;
  };
  const calculateAdjustedEXP = (monsters) => {
    let totalEXP = calculateTotalEXP(monsters);
    let length = monsters.length;
    // debugger
    if (length === 1) {
      return totalEXP * 1;
    } else if (length === 2) {
      return totalEXP * 1.5;
    } else if (length >= 3 && length <= 6) {
      return totalEXP * 2;
    } else if (length >= 7 && length <= 10) {
      return totalEXP * 2.5;
    } else if (length >= 11 && length <= 14) {
      return totalEXP * 3;
    } else if (length >= 15) {
      return totalEXP * 4;
    } else {
      return totalEXP;
    }
  };
  const calculateDifficulty = (monsters) => {
      let adjustedEXP = calculateAdjustedEXP(monsters)

      if (adjustedEXP < partyEXP[1]){
          return 'Easy'
      } else if (adjustedEXP >= partyEXP[1] && adjustedEXP < partyEXP[2]){
          return 'Medium'
      } else if (adjustedEXP >= partyEXP[2] && adjustedEXP < partyEXP[3]){
          return 'Hard'
      } else {
          return 'Deadly'
      }
  }

  return (
    <Segment.Group className="current-encounter-cont">
      <Segment>
        <Header as="h2">Encounter Info</Header>
      </Segment>
      <Segment.Group>
        <div className="current-encounter-monsters">
          {chosenMonsters.map((mon) => currentEncounter(mon))}
        </div>
      </Segment.Group>
      <Segment.Group horizontal>
        <Segment>
          Total EXP: {formatEXP(calculateTotalEXP(chosenMonsters))}
        </Segment>
        <Segment>
          Adjusted EXP: {formatEXP(calculateAdjustedEXP(chosenMonsters))}
        </Segment>
        <Segment>Difficulty: {calculateDifficulty(chosenMonsters)}</Segment>
      </Segment.Group>
      <Segment>
        <Button positive>Create Encounter</Button>
        <Button onClick={() => resetEncounter()} negative>
          Reset Encounter
        </Button>
      </Segment>
    </Segment.Group>
  );
}

export default EncounterForm;
