// Import React
import React from 'react'

// Import Spectacle Core tags
import {
  BlockQuote,
  Cite,
  Deck,
  Fill,
  // Fit,
  Heading,
  // Image,
  Layout,
  // Link,
  ListItem,
  List,
  Quote,
  Slide,
  Text,
  // Appear,
  SlideSet,
  Table,
  TableHeaderItem,
  TableItem,
  TableRow
} from 'spectacle'

import Card from './card'

// Import image preloader util
// import preloader from 'spectacle/lib/utils/preloader'

// Import theme
// import createTheme from "spectacle/lib/themes/default";
import theme from '../themes/formidable/index.js'

// Require CSS
require('normalize.css')
require('spectacle/lib/themes/default/index.css')
require('../themes/formidable/index.css')
// Best way to include fonts rite
// require("../fonts/worksans.css");
// require("../fonts/biorhyme.css");
// require("../fonts/silkscreen.css");
require('../fonts/montserrat.css')

// const images = {
//   bg: require("../assets/bg_skyline.svg"),
//   logo: require("../assets/logo-seattlejsconference.svg")
// };

// preloader(images);

export default class Presentation extends React.Component {
  constructor(props) {
    super(props)
    this.renderVotingInput = this.renderVotingInput.bind(this)
    this.state = {
      election: {
        President: {
          candidate: 'Elmer Augustinus Trisno',
          votingData: [
            { yes: 0, no: 0, abstain: 0 }, // one for each section
            { yes: 0, no: 0, abstain: 0 },
            { yes: 0, no: 0, abstain: 0 },
            { yes: 0, no: 0, abstain: 0 },
            { yes: 0, no: 0, abstain: 0 }
          ]
        },
        'Vice President (Event)': {
          candidate: 'Tan Jun Guang Dedrick',
          votingData: [
            { yes: 0, no: 0, abstain: 0 },
            { yes: 0, no: 0, abstain: 0 },
            { yes: 0, no: 0, abstain: 0 },
            { yes: 0, no: 0, abstain: 0 },
            { yes: 0, no: 0, abstain: 0 }
          ]
        },
        'Vice President (Dharma)': {
          candidate: 'Ong Zhi Huang',
          votingData: [
            { yes: 0, no: 0, abstain: 0 },
            { yes: 0, no: 0, abstain: 0 },
            { yes: 0, no: 0, abstain: 0 },
            { yes: 0, no: 0, abstain: 0 },
            { yes: 0, no: 0, abstain: 0 }
          ]
        },
        'Honorary General Secretary': {
          candidate: 'Michelle Trisno',
          votingData: [
            { yes: 0, no: 0, abstain: 0 },
            { yes: 0, no: 0, abstain: 0 },
            { yes: 0, no: 0, abstain: 0 },
            { yes: 0, no: 0, abstain: 0 },
            { yes: 0, no: 0, abstain: 0 }
          ]
        }
      }
    }
  }
  renderElection() {
    const positions = Object.keys(this.state.election)
    return positions.map(position => {
      const positionData = this.state.election[position]
      if (positionData.candidate) {
        return this.renderCandidateSingle(
          positionData.candidate,
          position,
          positionData.votingData
        )
      }
      // Multiple candidate!
      return null
    })
  }
  renderVotingInput(value, position, kind = 'yes', section = 0) {
    return (
      <input
        type="number"
        value={value}
        onChange={e => {
          const newValue = parseInt(e.target.value, 10)
          this.setState({
            election: {
              ...this.state.election,
              [position]: {
                ...this.state.election[position],
                votingData: [
                  ...this.state.election[position].votingData.slice(0, section),
                  {
                    ...this.state.election[position].votingData[section],
                    [kind]: newValue
                  },
                  ...this.state.election[position].votingData.slice(section + 1)
                ]
              }
            }
          })
        }}
      />
    )
  }
  renderCandidateSingle(name, position, votingData) {
    const getTotal = type => {
      return votingData.reduce((prevValue, votingSectionData) => {
        return votingSectionData[type] + prevValue
      }, 0)
    }
    const totalYes = getTotal('yes')
    const totalNo = getTotal('no')
    const totalAbstain = getTotal('abstain')
    const totalVote = totalYes + totalNo + totalAbstain
    const percentageYes = totalVote
      ? Math.round(totalYes * 10000 / totalVote) / 100
      : 0
    const percentageNo = totalVote
      ? Math.round(totalNo * 10000 / totalVote) / 100
      : 0
    const percentageAbstain = totalVote
      ? Math.round(totalAbstain * 10000 / totalVote) / 100
      : 0

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
        <Slide>
          <Heading caps size={5}>
            Voting
          </Heading>
          <Table>
            <TableRow>
              <TableHeaderItem />
              <TableHeaderItem>
                <Card color="green" />
                <Text>For</Text>
              </TableHeaderItem>
              <TableHeaderItem>
                <Card color="red" />
                <Text>Against</Text>
              </TableHeaderItem>
              <TableHeaderItem>
                <Card color="black" />
                <Text>Abstain</Text>
              </TableHeaderItem>
            </TableRow>
            {votingData.map((votingSectionData, index) => {
              return (
                <TableRow>
                  <TableItem className="noLineBreak">
                    Section {['A', 'B', 'C', 'D', 'E'][index]}
                  </TableItem>
                  <TableItem>
                    {this.renderVotingInput(
                      votingSectionData.yes,
                      position,
                      'yes',
                      index
                    )}
                  </TableItem>
                  <TableItem>
                    {this.renderVotingInput(
                      votingSectionData.no,
                      position,
                      'no',
                      index
                    )}
                  </TableItem>
                  <TableItem>
                    {this.renderVotingInput(
                      votingSectionData.abstain,
                      position,
                      'abstain',
                      index
                    )}
                  </TableItem>
                </TableRow>
              )
            })}
            <TableRow>
              <TableItem className="totalPercentage">Total</TableItem>
              <TableItem className="totalPercentage">
                {totalYes}{' '}
                <span className="smaller">({percentageYes.toFixed(2)}%)</span>
              </TableItem>
              <TableItem className="totalPercentage">
                {totalNo}{' '}
                <span className="smaller">({percentageNo.toFixed(2)}%)</span>
              </TableItem>
              <TableItem className="totalPercentage">
                {totalAbstain}{' '}
                <span className="smaller">
                  ({percentageAbstain.toFixed(2)}%)
                </span>
              </TableItem>
            </TableRow>
          </Table>
        </Slide>
        <Slide>
          <Heading caps size={4}>
            Voting Result
          </Heading>
          <Text size={4}>
            {name}
          </Text>
          <Text caps>
            {`is ${[
              'President',
              'Vice President (Event)',
              'Vice President (Dharma)',
              'Honorary General Secretary'
            ].indexOf(position) > -1
              ? percentageYes >= 60 ? 'elected' : 'not elected'
              : percentageYes > 50 ? 'elected' : 'not elected'}`}
          </Text>
          <Text>
            as {position}
          </Text>
        </Slide>
      </SlideSet>
    )
  }
  render() {
    return (
      <Deck
        progress="none"
        theme={theme}
        transition={['fade']}
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
            <ListItem>Escort: Peter</ListItem>
            <ListItem>
              Vote counters:
              <List>
                <ListItem>Aryani Paramita</ListItem>
                <ListItem>Benny Febriansyah</ListItem>
                <ListItem>Evando</ListItem>
                <ListItem>Handoko</ListItem>
                <ListItem>Jefferson</ListItem>
                <ListItem>Kang Chun Hee</ListItem>
                <ListItem>Le Quang Luan</ListItem>
                <ListItem>Lee Su Ann</ListItem>
                <ListItem>Naing Htoo Aung</ListItem>
                <ListItem>Robert Liono</ListItem>
                <ListItem>Tew Hong Boon</ListItem>
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
            Voting Procedure: Multiple Candidates
          </Heading>
          <Layout>
            <Fill>
              <Card color="blue" />
              <Text>For Candidate 1</Text>
            </Fill>
            <Fill>
              <Card color="yellow" />
              <Text>For Candidate 2</Text>
            </Fill>
            <Fill>
              <Card color="black" />
              <Text>Abstain</Text>
            </Fill>
          </Layout>
        </Slide>
        <Slide>
          <Heading caps size={6}>
            Election criteria: Single candidate
          </Heading>
          <List>
            <ListItem>Three types of votes: For, Against, and Abstain</ListItem>
            <ListItem>
              For President/VPs/HGS, the number of "For" votes must be at least
              60% (≥ 60%) of total votes.
            </ListItem>
            <ListItem>
              For other positions, the number of "For" votes must be more than
              50% (>50%) of total votes.
            </ListItem>
          </List>
        </Slide>
        <Slide>
          <Heading caps size={6}>
            Election criteria: Multiple candidates
          </Heading>
          <List>
            <ListItem>Two types of votes: For, and Abstain</ListItem>
            <ListItem>Elected if "For" votes >50%</ListItem>
            <ListItem>
              Elected if "For" votes &lt;50%, "Abstain" votes &lt;40%, and
              obtains more "For" votes than other candidates, i.e. not tied.
            </ListItem>
          </List>
        </Slide>
        <Slide>
          <Heading caps size={6}>
            Election criteria: Multiple candidates ("For" votes &lt;50%,
            "Abstain" votes &lt;40%, and tied)
          </Heading>
          <List>
            <ListItem>
              If tied: 2-candidate scenario: both not elected.
            </ListItem>
            <ListItem>
              If tied: >2-candidate sencario: 2nd round voting for tied
              candidates only. If in 2nd round both has equal 50% "For" votes,
              both not elected.
            </ListItem>
          </List>
        </Slide>
        <Slide>
          <Heading caps size={6}>
            New Committee Taking Office
          </Heading>
          <Text>
            At least one half of the committee members of the Management
            Committee (including President) must be elected during the election,
            for the committee to take office.
          </Text>
        </Slide>
        <Slide>
          <Heading caps size={6}>
            Tenure
          </Heading>
          <Quote>
            The tenure of office bearers shall be one academic year.
          </Quote>
          <Cite>NTUBS Constitution: VI, 2(c)</Cite>
        </Slide>
        <Slide>
          <Heading caps size={6}>
            Co-opt Members for Management Committee
          </Heading>
          <BlockQuote>
            <Text>
              The Management Committee have the power to appoint members to fill
              any vacancy that may occur in the Management Committee during its
              term of office in an acting capacity until the next Annual General
              Meeting
            </Text>
            <Cite>NTUBS Constitution: VI, 5 (b)</Cite>
          </BlockQuote>
        </Slide>
        <Slide>
          <Heading>Election</Heading>
        </Slide>
        {this.renderElection()}
      </Deck>
    )
  }
}
