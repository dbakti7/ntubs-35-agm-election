import React from "react";

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
  Appear
} from "spectacle";

class Candidate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      yes: 0,
      no: 0,
      abstain: 0
    }
  }
  render() {
    const { name, position } = this.props;
    return (
      <Slide>
        <Heading caps size={6}>
          {name}
        </Heading>
        <Text>
          Candidate for: {position}
        </Text>
      </Slide>
    );
  }
}
export default Candidate;
