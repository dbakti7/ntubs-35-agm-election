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
  Appear
} from "spectacle";

import Candidate from "./candidate";

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

const images = {
  bg: require("../assets/bg_skyline.svg"),
  logo: require("../assets/logo-seattlejsconference.svg")
};

preloader(images);

export default class Presentation extends React.Component {
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
            NTUBS 35th AGM Election
          </Heading>
          <Layout>
            <Fill>
              <Text>Something</Text>
            </Fill>
            <Fill>
              <Text>Something</Text>
            </Fill>
          </Layout>
        </Slide>
        <Slide>
          <Heading caps size={6}>
            NTUBS 35th AGM Election
          </Heading>
          <Text>Single candidate</Text>
          <Layout>
            <Fill>
              <Text>Something 1</Text>
            </Fill>
            <Fill>
              <Text>Something</Text>
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
        <Candidate name="Elmer Augustinus Trisno" position="President" />
        <Candidate
          name="Tan Jun Guang Dedrick"
          position="Vice President (Event)"
        />
        <Candidate name="Ong Zhi Huang" position="Vice President (Dharma)" />
        <Candidate
          name="Michelle Trisno"
          position="Honorary General Secretary"
        />
      </Deck>
    );
  }
}
