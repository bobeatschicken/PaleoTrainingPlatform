import React, { useEffect, useState } from "react";
import { Loader, Label, Dropdown, Grid } from "semantic-ui-react";
import ReactImageMagnify from "react-image-magnify";
import Axios from "axios";

const References = props => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [references, setReferences] = useState(null);
  const lesionActivityOptions = [
    { value: "1", text: "active" },
    { value: "2", text: "healed" },
    { value: "3", text: "mixed" }
  ];

  useEffect(() => {
    if (!isLoaded) {
      Axios.get(`http://127.0.0.1:8000/api/training/lesionReference/`).then(
        result => {
          setReferences(result.data);
          if (result.data) {
            setIsLoaded(true);
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
          {references.map(reference => {
            return (
              <div>
                <h5
                  style={{
                    marginLeft: "9%"
                  }}
                >
                  {reference.id})
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
                      src: reference.image_url,
                      width: 360,
                      height: 240
                    },
                    largeImage: {
                      src: reference.image_url,
                      width: 720,
                      height: 480
                    }
                  }}
                />
                <Grid centered>
                  <Label size="small">
                    <b>Lesion Type: </b>
                    {reference.lesion_type.name}
                  </Label>
                </Grid>
                <br />
                <br />
                <Grid centered>
                  <Label size="small">
                    <b>Description: </b>
                    {reference.lesion_type.description}
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
