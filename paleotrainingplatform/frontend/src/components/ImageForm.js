import React from "react";
import ImageScoring from "./ImageScoring";
import References from "./References";
import SplitterLayout from "react-splitter-layout";
import { Segment, GridColumn, Header, Grid } from "semantic-ui-react";
import "react-splitter-layout/lib/index.css";

const ImageForm = props => {
  return (
    <Segment style={{
      height: "100vh",
    }}>
      <Grid columns={2} relaxed="very" divided style={{ height: "100%" }}>
        <GridColumn width={11} style={{ height: "100%", overflowY: "scroll" }}>
          <ImageScoring />
        </GridColumn>
        <GridColumn width={5} style={{ height: "100%", overflowY: "scroll" }}>
          <Header size="large">Lesion Reference Images</Header>
          <References />
        </GridColumn>
      </Grid>
    </Segment>
  )
}

export default ImageForm;