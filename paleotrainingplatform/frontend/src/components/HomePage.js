/* eslint-disable max-classes-per-file */
/* eslint-disable react/no-multi-comp */

import { createMedia } from "@artsy/fresnel";
import PropTypes from "prop-types";
import React, { Component } from "react";
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Image,
  Segment,
  Visibility,
  Icon,
} from "semantic-ui-react";
import { Link } from "react-router-dom";

const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    mobile: 0,
    tablet: 768,
    computer: 1024,
  },
});

/* Heads up!
 * HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled
 * components for such things.
 */
const HomepageHeading = ({ mobile }) => (
  <Container text>
    <Header
      as="h1"
      content="Osteologic"
      inverted
      style={{
        fontSize: mobile ? "2em" : "4em",
        fontWeight: "normal",
        marginBottom: "1em",
        marginTop: mobile ? "1.5em" : "3em",
      }}
    />
    <Link
      to={{
        pathname: "/quiz",
      }}
    >
      <Button primary size="huge">
        Take me to the quiz!
        <Icon name="right arrow" />
      </Button>
    </Link>
  </Container>
);

HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
};

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
class DesktopContainer extends Component {
  state = {};

  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });

  render() {
    const { children } = this.props;
    const { fixed } = this.state;

    return (
      <Media greaterThan="mobile">
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign="center"
            style={{ minHeight: 500, padding: "1em 0em" }}
            vertical
          >
            <HomepageHeading />
          </Segment>
        </Visibility>

        {children}
      </Media>
    );
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
};

const ResponsiveContainer = ({ children }) => (
  /* Heads up!
   * For large applications it may not be best option to put all page into these containers at
   * they will be rendered twice for SSR.
   */
  <MediaContextProvider>
    <DesktopContainer>{children}</DesktopContainer>
  </MediaContextProvider>
);

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
};

const HomepageLayout = () => (
  <ResponsiveContainer>
    <Segment style={{ padding: "8em 0em" }} vertical>
      <Grid container stackable verticalAlign="middle">
        <Grid.Row textAlign="center" style={{ marginBottom: "10em" }}>
          <Grid.Column>
            <Divider
              as="h4"
              className="header"
              horizontal
              style={{ margin: "3em 0em", textTransform: "uppercase" }}
            >
              About
            </Divider>
            <p style={{ fontSize: "1.33em" }}>
              This site hosts an interactive training platform for
              paleopathologists. We begin by focusing on orbital roof lesions,
              which are commonly reported indicators of stress in the skeletal
              record. The goal is to provide paleopathologists and
              paleopathology students an opportunity to test their skills at
              applying standard scoring criteria to a range of skeletal
              materials and to expand the training resources available to those
              whose osteological training relies on teaching collections with
              limited examples of pathological skeletal lesions.
            </p>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row textAlign="center" style={{ marginBottom: "10em" }}>
          <Grid.Column>
            <Divider
              as="h4"
              className="header"
              horizontal
              style={{ margin: "3em 0em", textTransform: "uppercase" }}
            >
              Motivation
            </Divider>
            <p style={{ fontSize: "1.33em" }}>
              Currently, most researchers who study health in past societies
              learn to identify skeletal disease using a limited set of
              materials. Several standard scoring systems have been developed
              for collecting consistent data on these lesions, but standardized
              descriptions of a particular pathology might be paired in
              reference books with one or a few photos. The most commonly used
              references for learning to identify and score common skeletal
              lesions are 20-40 years old and use poor-resolution photos to
              demonstrate the features of interest (Buikstra and Ubelaker, 1994;
              Stuart-Macadam, 1991). Perhaps as a result, tests of interobserver
              agreement in scoring pathology yield disheartening results:
              different researchers often generate different pathology data from
              the same skeletal materials (Jacobi and Danforth, 2002).
              Standardized data collection remains a challenge in
              paleopathology, particularly when comparing data collected by
              different researchers from different skeletal collections.
            </p>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row textAlign="center" style={{ marginBottom: "10em" }}>
          <Grid.Column>
            <Divider
              as="h4"
              className="header"
              horizontal
              style={{ margin: "3em 0em", textTransform: "uppercase" }}
            >
              How To Use the Site
            </Divider>
            <p style={{ fontSize: "1.33em" }}>
              The site catalog includes >200 high-resolution photographs
              alongside visual and descriptive references for morphology and
              activity status. Each quiz consists of 5 photos for which you are
              asked to score lesion morphology and activity status. After
              completing a quiz you will be able to see how your scores compare
              to the original researcher who supplied the photograph, and how
              your scores compare to others who have scored the same photograph.
              You may then take another quiz. Quiz lesions are generated
              randomly and you may or may not encounter images you have seen on
              the previous quiz. We hope that you will return to the scoring
              quiz multiple times to practice scoring orbital roof lesions, but
              we ask that you do not take more than 25 quizzes in a single day.
              Improved accuracy or consistency due to memorizing individual
              photos does nothing for building your osteological skill set and
              will bias the site-collected data on how repeated site use affects
              scoring consistency. We have chosen to use scoring references from
              Rinaldo et al. (2019) for activity status of orbital roof lesions
              at time of death. This scoring reference yielded the most
              consistent interobserver concordance in a workshop testing
              multiple scoring references for porous cranial lesions at the 2019
              meeting of the Paleopathology Association.
            </p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>

    <Segment style={{ padding: "0em" }} vertical>
      <Grid celled="internally" columns="equal" stackable>
        <Grid.Row textAlign="center">
          <Grid.Column style={{ paddingBottom: "5em", paddingTop: "5em" }}>
            <Image src="./../static/healing.jpg" />
          </Grid.Column>
          <Grid.Column style={{ paddingBottom: "5em", paddingTop: "5em" }}>
            <Image src="./../static/lesions.jpg" />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
    <Segment inverted vertical style={{ padding: "5em 0em" }}>
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column textAlign="center">
              <Header as="h4" inverted>
                Contact
              </Header>
              <p>
                Please feel free to contact Amy Anderson
                (anderson.amy.susan@gmail.com) with questions or comments.
              </p>
              <Divider as="h4" inverted></Divider>
              <p>
                Buikstra JE, Ubelaker DH. 1994. Standards for data collection
                from human skeletal remains: Proceedings of a seminar at the
                Field Museum of Natural History. Fayetteville: Arkansas
                Archeological Survey Press.{" "}
              </p>
              <p>
                Jacobi KP, Danforth ME. 2002. Analysis of interobserver scoring
                patterns in porotic hyperostosis and cribra orbitalia. Int J
                Osteoarchaeol 12:248–258.
              </p>
              <p>
                Stuart-Macadam P. 1991. Anaemia in Roman Britain: Poundbury
                Camp. in H. Bush and M. Zvelebil (eds.) Health in Past
                Societies. Biocultural Interpretations of Human Skeletal Remains
                in Archaeological Contexts, British Archaeological Reports,
                International Series 567. Oxford: Tempus Reparatum. 101-113.
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  </ResponsiveContainer>
);

export default HomepageLayout;
