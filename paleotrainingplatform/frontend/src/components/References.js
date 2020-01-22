import React, { useEffect, useState } from "react";
import { Loader, Label, Dropdown, Grid } from "semantic-ui-react";
import ReactImageMagnify from "react-image-magnify";
import Axios from "axios";

const References = props => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [lesionReferences, setLesionReferences] = useState(null);
  const [healingReferences, setHealingReferences] = useState(null)

  useEffect(() => {
    if (!isLoaded) {
      Axios.get(`http://127.0.0.1:8000/api/training/lesionReference/`).then(
        result => {
          setLesionReferences(result.data);
          if (result.data) {
            Axios.get(`http://127.0.0.1:8000/api/training/healingReference/`).then(
              response => {
                setHealingReferences(response.data)
                if (response.data) {
                  setIsLoaded(true);
                }
              }
            )
          }
        }
      );
    }
  }, [isLoaded]);

  return (
    <div>
      {isLoaded ? (
        <div>
          <h2>Lesion Reference Images</h2>
          {lesionReferences.map(lesionReference => {
            return (
              <div>
                <h5
                  style={{
                    marginLeft: "9%"
                  }}
                >
                  {lesionReference.id})
                </h5>
                <ReactImageMagnify
                  style={{
                    display: "block",
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginBottom: "50px",
                    marginTop: "50px"
                  }}
                  enlargedImagePosition="over"
                  {...{
                    smallImage: {
                      src: lesionReference.image_url,
                      width: 360,
                      height: 240
                    },
                    largeImage: {
                      src: lesionReference.image_url,
                      width: 720,
                      height: 480
                    }
                  }}
                />
                <Grid centered>
                  <Label size="small">
                    <b>Lesion Type: </b>
                    {lesionReference.lesion_type.name}
                  </Label>
                </Grid>
                <br />
                <br />
                <Grid centered>
                  <Label size="small">
                    <b>Description: </b>
                    {lesionReference.lesion_type.description}
                  </Label>
                </Grid>
                <br />
                <br />
              </div>
            );
          })}
          <br/>
          <br/>
          <h2>Healing Reference Images</h2>
          {healingReferences.map(healingReference => {
            return (
              <div>
                <h5
                  style={{
                    marginLeft: "9%"
                  }}
                >
                  {healingReference.id})
                </h5>
                <ReactImageMagnify
                  style={{
                    display: "block",
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginBottom: "50px",
                    marginTop: "50px"
                  }}
                  enlargedImagePosition="over"
                  {...{
                    smallImage: {
                      src: healingReference.image_url,
                      width: 360,
                      height: 240
                    },
                    largeImage: {
                      src: healingReference.image_url,
                      width: 720,
                      height: 480
                    }
                  }}
                />
                <Grid centered>
                  <Label size="small">
                    <b>Degree of Expression: </b>
                    {healingReference.degree}
                  </Label>
                </Grid>
                <br />
                <br />
                <Grid centered>
                  <Label size="small">
                    <b>Description: </b>
                    {healingReference.description}
                  </Label>
                </Grid>
                <br />
                <br />
              </div>
            );
          })}
        </div>
      ) : (
        <Loader active />
      )}
    </div>
  );
};

export default References;
