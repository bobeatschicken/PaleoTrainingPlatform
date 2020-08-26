import React, { useEffect, useState } from "react";
import { Loader, Label, Dropdown, Grid, Header } from "semantic-ui-react";
import ReactImageMagnify from "react-image-magnify";
import Axios from "axios";

const References = (props) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [lesionReferences, setLesionReferences] = useState(null);
  const [healingReferences, setHealingReferences] = useState(null);
  const BASE_URL = "http://127.0.0.1:8000";

  useEffect(() => {
    if (!isLoaded) {
      Axios.get(`${BASE_URL}/api/training/lesionReference/`)
        .then((result) => {
          setLesionReferences(result.data);
          if (result.data) {
            Axios.get(`${BASE_URL}/api/training/healingReference/`).then(
              (response) => {
                setHealingReferences(response.data);
                if (response.data) {
                  setIsLoaded(true);
                }
              }
            );
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [isLoaded]);

  return (
    <div>
      {isLoaded ? (
        <div>
          <Header size="medium">
            Lesion Expression (Gardner and Jakob, 2019)
          </Header>
          {lesionReferences.map((lesionReference) => {
            return (
              <div>
                <h5
                  style={{
                    marginLeft: "9%",
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
                    marginTop: "50px",
                  }}
                  enlargedImagePosition="over"
                  {...{
                    smallImage: {
                      src: lesionReference.image_url,
                      width: 360,
                      height: 240,
                    },
                    largeImage: {
                      src: lesionReference.image_url,
                      width: 720,
                      height: 480,
                    },
                  }}
                />
                <Grid centered>
                  <Label size="small">{lesionReference.lesion_type.name}</Label>
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
          <br />
          <br />
          <Header size="medium">
            Lesion Activity
            <a href="https://doi.org/10.1007/s12520-019-00780-0">
              {" "}
              (Rinaldo et al., 2019)
            </a>
          </Header>
          {healingReferences.map((healingReference) => {
            return (
              <div>
                <h5
                  style={{
                    marginLeft: "9%",
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
                    marginTop: "50px",
                  }}
                  enlargedImagePosition="over"
                  {...{
                    smallImage: {
                      src: healingReference.image_url,
                      width: 360,
                      height: 240,
                    },
                    largeImage: {
                      src: healingReference.image_url,
                      width: 720,
                      height: 480,
                    },
                  }}
                />
                <Grid centered>
                  <Label size="small">
                    <b>Degree of Healing: </b>
                    {healingReference.healing_type.degree}
                  </Label>
                </Grid>
                <br />
                <br />
                <Grid centered>
                  <Label size="small">
                    <b>Description: </b>
                    {healingReference.healing_type.description}
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
