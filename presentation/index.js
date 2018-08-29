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
  Image,
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
  TableRow,
  TableHeader,
  TableBody,
  S
} from 'spectacle'

import Card from './card'

// Import image preloader util
import preloader from 'spectacle/lib/utils/preloader'

import downloadCsv from 'download-csv'

import committeeStructure from './committee_structure'

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


const getTotal = (votingData, type) => {
  return votingData.reduce((prevValue, votingSectionData) => {
    if (!votingSectionData[type] || isNaN(votingSectionData[type])) {
      return prevValue
    }
    return votingSectionData[type] + prevValue
  }, 0)
}

const constructInitialVotingData = () => {
  return [1, 2, 3, 4, 5, 6, 7].map(() => {
    return { yes: 0, no: 0, abstain: 0 }
  })
}

const isCandidateElected = (votingData, position) => {
  const totalYes = getTotal(votingData, 'yes')
  const totalNo = getTotal(votingData, 'no')
  const totalAbstain = getTotal(votingData, 'abstain')
  const totalVote = totalYes + totalNo + totalAbstain
  const percentageYes = totalVote
    ? Math.round(totalYes * 10000 / totalVote) / 100
    : 0
  return [
    'President',
    'Vice President (Event)',
    'Vice President (Dharma)',
    'Honorary General Secretary'
  ].indexOf(position) > -1
    ? percentageYes >= 60
    : percentageYes > 50
}

export default class Presentation extends React.Component {
  constructor(props) {
    super(props)
    this.renderVotingInput = this.renderVotingInput.bind(this)
    this.renderElection = this.renderElection.bind(this)
    this.renderPreElection = this.renderPreElection.bind(this)
    this.renderPostElection = this.renderPostElection.bind(this)
    this.handleDownloadData = this.handleDownloadData.bind(this)
    this.localStoreKey = 'NTUBS-AGM-36-election-data'
    this.state = {
      election: {
        // 'Some important position': {
        //   candidates: ['A', 'B'],
        //   votingData: [
        //     { yes0: 0, yes1: 0, abstain: 0 }, // one for each section
        //     { yes0: 0, yes1: 0, abstain: 0 },
        //     { yes0: 0, yes1: 0, abstain: 0 },
        //     { yes0: 0, yes1: 0, abstain: 0 },
        //     { yes0: 0, yes1: 0, abstain: 0 }
        //   ]
        // },
        President: {
          candidate: 'Michelle Trisno',
          votingData: constructInitialVotingData()
        },
        'Vice President (Event)': {
          candidate: 'Jeffrey Huang',
          votingData: constructInitialVotingData()
        },
        'Vice President (Dharma)': {
          candidate: 'Danry Lim Wei Huang',
          votingData: constructInitialVotingData()
        },
        'Honorary General Secretary': {
          candidate: 'Willson Nicholas',
          votingData: constructInitialVotingData()
        },
        'Honorary Treasurer': {
          candidate: 'Arvin Liangdy',
          votingData: constructInitialVotingData()
        },
        'External Liason Director': {
          candidate: 'Chan Jun Hang',
          votingData: constructInitialVotingData()
        },
        'Event Director': {
          candidate: 'Eric Kho',
          votingData: constructInitialVotingData()
        },
        'Special Project Director': {
          candidate: 'Soh Yan Da',
          votingData: constructInitialVotingData()
        },
        'Metta Director': {
          candidate: 'Regina Yeo',
          votingData: constructInitialVotingData()
        },
        'Dharma Propagation Director': {
          candidate: 'Sim Jun Xun',
          votingData: constructInitialVotingData()
        },
        'Fellowship Director': {
          candidate: 'Alene Ku',
          votingData: constructInitialVotingData()
        },
        'Publication Director': {
          candidate: 'Wilson Goenawan',
          votingData: constructInitialVotingData()
        },
        'Welfare Director': {
          candidate: 'Tan Qi An',
          votingData: constructInitialVotingData()
        },
        'Marketing Director': {
          candidate: 'Andre Yoga',
          votingData: constructInitialVotingData()
        },
        'Resource Director': {
          candidate: 'Daniel Wijaya',
          votingData: constructInitialVotingData()
        }
      }
    }
    const positions = Object.keys(this.state.election)
    this.imagesData = {}
    console.log(positions)
    console.log(this.state.election)
    const images = positions.map(position => {
      const positionData = this.state.election[position]
      if (positionData.candidate) {
        console.log(positionData.candidate)
        const image = require('../images/' + positionData.candidate + '.png')
        this.imagesData[position] = image
        return image
      }
    })
    preloader(images)
  }
  componentDidMount() {
    // Read from local storage
    if (window && window.localStorage) {
      const store = window.localStorage.getItem(this.localStoreKey)
      if (store) {
        try {
          const tempState = JSON.parse(store)
          this.setState(tempState)
        } catch (e) {
          console.error("Local store state isn't a valid JSON")
        }
      }
    }
  }
  componentDidUpdate() {
    // Save to local storage
    if (window && window.localStorage) {
      window.localStorage.setItem(
        this.localStoreKey,
        JSON.stringify(this.state)
      )
    }
  }
  renderPreElection() {
    const positions = Object.keys(this.state.election)
    return (
      <Slide>
        <Heading caps size={5}>
          Order of Elections
        </Heading>
        <List>
          {positions.map(position => {
            return <ListItem key={position}>{position}</ListItem>
          })}
        </List>
      </Slide>
    )
  }
  handleDownloadData() {
    const data = []

    const columns = {
      position: 'Position',
      candidate: 'Candidate',
      yesSectionA: 'For Votes (Section A)',
      yesSectionB: 'For Votes (Section B)',
      yesSectionC: 'For Votes (Section C)',
      yesSectionD: 'For Votes (Section D)',
      yesSectionE: 'For Votes (Section E)',
      yesSectionF: 'For Votes (Section F)',
      yesSectionG: 'For Votes (Section G)',
      noSectionA: 'Against Votes (Section A)',
      noSectionB: 'Against Votes (Section B)',
      noSectionC: 'Against Votes (Section C)',
      noSectionD: 'Against Votes (Section D)',
      noSectionE: 'Against Votes (Section E)',
      noSectionF: 'Against Votes (Section F)',
      noSectionG: 'Against Votes (Section G)',
      abstainSectionA: 'Abstain Votes (Section A)',
      abstainSectionB: 'Abstain Votes (Section B)',
      abstainSectionC: 'Abstain Votes (Section C)',
      abstainSectionD: 'Abstain Votes (Section D)',
      abstainSectionE: 'Abstain Votes (Section E)',
      abstainSectionF: 'Abstain Votes (Section F)',
      abstainSectionG: 'Abstain Votes (Section G)',
      totalYes: 'Total For Votes',
      totalNo: 'Total Against Votes',
      totalAbstain: 'Total Abstain Votes',
      totalVote: 'Total Votes',
      percentageYes: 'Percentage For Votes',
      percentageNo: 'Percentage Against Votes',
      percentageAbstain: 'Percentage Abstain Votes',
      isElected: 'Is Candidate Elected?'
    }
    const sectionNames = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
    const positions = Object.keys(this.state.election)
    positions.forEach(position => {
      const positionData = this.state.election[position]
      if (positionData.candidate) {
        const candidate = positionData.candidate
        const votingData = positionData.votingData
        // TODO: Refactor this voting data counting logic out
        const totalYes = getTotal(votingData, 'yes')
        const totalNo = getTotal(votingData, 'no')
        const totalAbstain = getTotal(votingData, 'abstain')
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
        const isElected = isCandidateElected(votingData, position)
        const datum = {
          position,
          candidate,
          totalYes,
          totalNo,
          totalAbstain,
          totalVote,
          percentageYes,
          percentageNo,
          percentageAbstain,
          isElected
        }
        for (let i = 0; i < 7; i++) {
          datum['yesSection' + sectionNames[i]] = votingData[i].yes
        }
        for (let i = 0; i < 7; i++) {
          datum['noSection' + sectionNames[i]] = votingData[i].no
        }
        for (let i = 0; i < 7; i++) {
          datum['abstainSection' + sectionNames[i]] = votingData[i].abstain
        }


        data.push(datum)
      }
      // TODO: Multiple candidates
    })

    downloadCsv(data, columns, `election-data-exported-${Date.now()}.csv`)
  }
  renderPostElection() {
    const positions = Object.keys(this.state.election)
    // TODO: list down who is succesful in getting position
    return (
      <Slide>
        <Heading size={5}>
          36<sup>th</sup> AGM Election Result
        </Heading>
        <List>
          {positions.map(position => {
            const positionData = this.state.election[position]
            if (positionData.candidate) {
              const isElected = isCandidateElected(
                positionData.votingData,
                position
              )
              return (
                <ListItem key={position}>
                  {position}: {isElected ? positionData.candidate : '<empty>'}
                </ListItem>
              )
            }
            return null
          })}
        </List>
        <Text>
          <button onClick={this.handleDownloadData}>Export</button>
        </Text>
      </Slide>
    )
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
      if (positionData.candidates) {
        return this.renderCandidateMultiple(
          positionData.candidates,
          position,
          positionData.votingData
        )
      }
      return null
    })
  }
  renderVotingInput(value, position, kind = 'yes', section = 0) {
    return (
      <input
        type="number"
        value={value}
        min={0}
        step={1}
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
    const totalYes = getTotal(votingData, 'yes')
    const totalNo = getTotal(votingData, 'no')
    const totalAbstain = getTotal(votingData, 'abstain')
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
    const isElected = isCandidateElected(votingData, position)

    return (
      <SlideSet key={position} id={position}>
        <Slide>
          <Heading caps size={5}>
            Election Speech
          </Heading>
          <Heading caps size={6}>
            {position}
          </Heading>
          <Text>Candidate: {name}</Text>
        </Slide>
        <Slide className="rallyFormSlide">
          <Image src={this.imagesData[position]} className="rallyForm" />
        </Slide>
        <Slide>
          <Heading caps size={5}>
            Question &amp; Answer
          </Heading>
          <Heading caps size={6}>
            {position}
          </Heading>
          <Text>Candidate: {name}</Text>
        </Slide>
        <Slide>
          <Heading caps size={5}>
            Voting
          </Heading>
          <Text>
            {name} for {position}
          </Text>
          <Table>
            <TableHeader>
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
            </TableHeader>
            <TableBody>
              {votingData.map((votingSectionData, index) => {
                return (
                  <TableRow key={index}>
                    <TableItem className="noLineBreak">
                      Section {['A', 'B', 'C', 'D', 'E', 'F', 'G'][index]}
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
            </TableBody>
          </Table>
          <Text>Is Elected? {isElected ? 'Yes' : 'No'}</Text>
        </Slide>
        <Slide>
          <Heading caps size={4}>
            Voting Result
          </Heading>

          <Layout>
            <Fill>
              <Text>{name}</Text>
              <Text caps bold>
                {`is ${isElected ? 'elected' : 'not elected'}`}
              </Text>
              <Text>as {position}</Text>
            </Fill>
          </Layout>
        </Slide>
      </SlideSet>
    )
  }
  renderCandidateMultiple(names, position, votingData) {
    return null
    // TODO: Bug with library
    const colors = ['blue', 'yellow', 'green', 'red']

    const totalYesPerCandidate = names.map((name, index) => {
      return getTotal(votingData, 'yes' + index)
    })
    const totalYes = totalYesPerCandidate.reduce(
      (prevValue, currentValue) => prevValue + currentValue,
      0
    )

    const totalAbstain = getTotal(votingData, 'abstain')
    const totalVote = totalYes + totalAbstain

    const percentageYesPerCandidate = names.map((name, index) => {
      return totalVote
        ? Math.round(totalYesPerCandidate[index] * 10000 / totalVote) / 100
        : 0
    })
    const percentageAbstain = totalVote
      ? Math.round(totalAbstain * 10000 / totalVote) / 100
      : 0

    const speechQaSlides = []
    names.forEach(name => {
      speechQaSlides.push(
        <Slide key={'speech' + name}>
          <Heading caps size={5}>
            Election Speech
          </Heading>
          <Heading caps size={6}>
            {position}
          </Heading>
          <Text>Candidate: {name}</Text>
        </Slide>
      )
      speechQaSlides.push(
        <Slide key={'qa' + name}>
          <Heading caps size={5}>
            Question &amp; Answer
          </Heading>
          <Heading caps size={6}>
            {position}
          </Heading>
          <Text>Candidate: {name}</Text>
        </Slide>
      )
    })

    return (
      <SlideSet key={position} id={position}>
        {speechQaSlides}
        <Slide>
          <Heading caps size={5}>
            Voting
          </Heading>
          <Table>
            <TableRow>
              <TableHeaderItem />
              {names.map((name, index) => {
                return (
                  <TableHeaderItem key={name}>
                    <Card color={colors[index % 4]} />
                    <Text>For {name}</Text>
                  </TableHeaderItem>
                )
              })}
              <TableHeaderItem>
                <Card color="black" />
                <Text>Abstain</Text>
              </TableHeaderItem>
            </TableRow>
            {votingData.map((votingSectionData, index) => {
              return (
                <TableRow key={index}>
                  <TableItem className="noLineBreak">
                    Section {['A', 'B', 'C', 'D', 'E'][index]}
                  </TableItem>
                  {names.map((name, nameIndex) => {
                    return (
                      <TableItem key={name}>
                        {this.renderVotingInput(
                          votingSectionData['yes' + nameIndex],
                          position,
                          'yes' + nameIndex,
                          index
                        )}
                      </TableItem>
                    )
                  })}
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

              {names.map((name, index) => {
                return (
                  <TableItem key={name} className="totalPercentage">
                    {totalYesPerCandidate[index]}{' '}
                    <span className="smaller">
                      ({percentageYesPerCandidate[index].toFixed(2)}%)
                    </span>
                  </TableItem>
                )
              })}

              <TableItem className="totalPercentage">
                {totalAbstain}{' '}
                <span className="smaller">
                  ({percentageAbstain.toFixed(2)}%)
                </span>
              </TableItem>
            </TableRow>
          </Table>
        </Slide>
        {/* <Slide>
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
        </Slide> */}
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
          <Heading>NTUBS 36th AGM Election</Heading>
        </Slide>
        <Slide>
          <Heading caps size={6}>
            Election Committee
          </Heading>
          <List>
            <ListItem>Chairperson: Marshall Valiant Lugan</ListItem>
            <ListItem>Secretary/Time keeper: Dhika</ListItem>
            <ListItem>Escort: Dian</ListItem>
            <ListItem>
              Vote counters:
              <List>
                <ListItem>Benny Febriansyah</ListItem>
                <ListItem>Finnie</ListItem>
                <ListItem>Jefferson Qiu</ListItem>
                <ListItem>Meliana</ListItem>
                <ListItem>Melitta</ListItem>
                <ListItem>Sherly</ListItem>
                <ListItem>Evando</ListItem>
                <ListItem>Sri</ListItem>
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
          <Text><S type="italic">Please refer to your booklet</S></Text>
          {/* <List>
            <ListItem>Two types of votes: For, and Abstain</ListItem>
            <ListItem>Elected if "For" votes >50%</ListItem>
            <ListItem>
              Elected if "For" votes &lt;50%, "Abstain" votes &lt;40%, and
              obtains more "For" votes than other candidates, i.e. not tied.
            </ListItem>
          </List> */}
        </Slide>
        {/* <Slide>
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
        </Slide> */}
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
          <BlockQuote>
            <Quote>
              The election committee's decision is final.
            </Quote>
          </BlockQuote>
        </Slide>
        <Slide>
          <Heading>Election</Heading>
        </Slide>
        <Slide>{committeeStructure()}</Slide>
        {this.renderPreElection()}
        {this.renderElection()}
        {this.renderPostElection()}
      </Deck>
    )
  }
}
