// Import React
import React from "react";

// Import Spectacle Core tags
import {
  BlockQuote,
  Cite,
  Deck,
  Fill,
  Fit,
  Heading,
  Image,
  Layout,
  Link,
  ListItem,
  List,
  Quote,
  Slide,
  Text,
  Appear,
  SlideSet
} from "spectacle";

import Card from "./card";

// Import image preloader util
import preloader from "spectacle/lib/utils/preloader";

// Import theme
// import createTheme from "spectacle/lib/themes/default";
import theme from "../themes/formidable/index.js";

// Require CSS
require("normalize.css");
require("spectacle/lib/themes/default/index.css");
require("../themes/formidable/index.css");
// Best way to include fonts rite
// require("../fonts/worksans.css");
// require("../fonts/biorhyme.css");
// require("../fonts/silkscreen.css");
require("../fonts/montserrat.css");

// const images = {
//   bg: require("../assets/bg_skyline.svg"),
//   logo: require("../assets/logo-seattlejsconference.svg")
// };

// preloader(images);

export default class Presentation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      election: {
        President: [
          { name: "Elmer Augustinus Trisno", yes: 0, no: 0, abstain: 0 }
        ],
        "Vice President (Event)": [
          { name: "Tan Jun Guang Dedrick", yes: 0, no: 0, abstain: 0 }
        ],
        "Vice President (Dharma)": [
          { name: "Ong Zhi Huang", yes: 0, no: 0, abstain: 0 }
        ],
        "Honorary General Secretary": [
          { name: "Michelle Trisno", yes: 0, no: 0, abstain: 0 }
        ]
      }
    };
  }
  renderElection() {
    const positions = Object.keys(this.state.election);
    return positions.map((position) => {
      const candidates = this.state.election[position];
      if (candidates.length === 1) {
        return this.renderCandidate(candidates[0].name, position);
      }
      return this.renderCandidate(candidates[0].name, position);
    });
  }
  renderCandidate(name, position) {
    return (
      <SlideSet key={name}>
        <Slide>
          <Heading caps size={5}>
            Election Speech
          </Heading>
          <Heading caps size={6}>
            {position}
          </Heading>
          <Text>
            Candidate: {name}
          </Text>
        </Slide>
        <Slide>
          <Heading caps size={5}>
            Question &amp; Answer
          </Heading>
          <Heading caps size={6}>
            {position}
          </Heading>
          <Text>
            Candidate: {name}
          </Text>
        </Slide>
      </SlideSet>
    );
  }
  render() {
    return (
      <Deck
        progress="none"
        theme={theme}
        transition={["fade"]}
        transitionDuration={500}
      >
        <Slide>
          <Heading>NTUBS 35th AGM Election</Heading>
        </Slide>
        <Slide>
          <Heading caps size={6}>
            Election Committee
          </Heading>
          <List>
            <ListItem>Chairperson: Kenrick</ListItem>
            <ListItem>Secretary/Time keeper: Rizky Wirawan Pratama</ListItem>
            <ListItem>Escord: Someone</ListItem>
            <ListItem>
              Vote counters:
              <List>
                <ListItem>Item 1</ListItem>
                <ListItem>Item 2</ListItem>
                <ListItem>Item 3</ListItem>
                <ListItem>Item 4</ListItem>
              </List>
            </ListItem>
          </List>
        </Slide>
        <Slide>
          <Heading caps size={6}>
            Election Procedures, Rules, and Regulations
          </Heading>
          <BlockQuote>
            <Quote>Ordinary members shall have the right to vote.</Quote>
            <Cite>NTUBS Constitution: III, 2 (a) (i)</Cite>
          </BlockQuote>
        </Slide>
        <Slide>
          <Heading caps size={6}>
            Election Procedures, Rules, and Regulations
          </Heading>
          <Text>
            In order to be eligible to vote for a particular position, voters
            are required to:
            <List>
              <ListItem>
                Attend all the election speeches of that particular position.
              </ListItem>
              <ListItem>
                Stay till the process of voting and vote-counting for that
                particular position ends
              </ListItem>
            </List>
          </Text>
        </Slide>
        <Slide>
          <Heading caps size={6}>
            Time allocations
          </Heading>
          <List>
            <ListItem>
              President, VP (Event), VP (Dharma), and Hon. Gen. Secretary: 3
              minutes for speech, 3 minutes for Q&amp;A
            </ListItem>
            <ListItem>
              Other positions: 2 minutes for speech, 2 minutes for Q&amp;A
            </ListItem>
          </List>
          <Text>Bell would be rung when there is 1 minute left</Text>
        </Slide>
        <Slide>
          <Heading caps size={6}>
            Rules for Q&amp;A session
          </Heading>
          <List>
            <ListItem>
              Eligibility for asking question to candidate: Ordinary, Associate
              and Honorary members and NTUBS alumni.
            </ListItem>
            <ListItem>How? Raise your hand!</ListItem>
            <ListItem>
              The Election Chairperson shall have the final choice of whom to
              select to ask the questions in the event of more than one person
              wishing to ask questions.
            </ListItem>
          </List>
        </Slide>
        <Slide>
          <Heading caps size={6}>
            Rules for Voting session
          </Heading>
          <List>
            <ListItem>
              Each Voter is given a set of five cards (5 different colours).
            </ListItem>
            <ListItem>
              During the voting process, voter will have to raise his/her hand,
              holding the voting the card to indicate the casting vote.
            </ListItem>
            <ListItem>
              Voters are to keep their hands raised until the vote-counting
              process completes. The Vote Counters will signal when the counting
              process ends.
            </ListItem>
          </List>
        </Slide>
        <Slide>
          <Heading caps size={6}>
            Voting Procedure: Single Candidate
          </Heading>
          <Layout>
            <Fill>
              <Card color="green" />
              <Text>For</Text>
            </Fill>
            <Fill>
              <Card color="red" />
              <Text>Against</Text>
            </Fill>
            <Fill>
              <Card color="black" />
              <Text>Abstain</Text>
            </Fill>
          </Layout>
        </Slide>
        <Slide>
          <Heading caps size={6}>
            NTUBS 35th AGM Election
          </Heading>
          <Text>Multiple candidates</Text>
          <Layout>
            <Fill>
              <Text>Something 1</Text>
            </Fill>
            <Fill>
              <Text>Something</Text>
            </Fill>
          </Layout>
        </Slide>
        {this.renderElection()}
      </Deck>
    );
  }
}
