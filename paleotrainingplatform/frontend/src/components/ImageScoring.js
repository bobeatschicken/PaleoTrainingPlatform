import React, { useEffect, useState } from "react";
import { Loader, Label, Dropdown, Grid } from "semantic-ui-react";
import ReactImageMagnify from "react-image-magnify";
import Axios from "axios";

const ImageScoring = props => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [images, setImages] = useState(null);
  const lesionTypeOptions = [
    { value: "Type 0", text: "Type 0" },
    { value: "Type 1", text: "Type 1" },
    {
      value: "Type 2+3",
      text: "Type 2+3"
    },
    {
      value: "Type 4",
      text: "Type 4"
    },
    {
      value: "Type 5",
      text: "Type 5"
    },
    { value: "Type 6", text: "Type 6" },
    { value: "Other", text: "Other" }
  ];
  const lesionActivityOptions = [
    { value: "1", text: "active" },
    { value: "2", text: "healed" },
    { value: "3", text: "mixed" }
  ];

  useEffect(() => {
    if (!isLoaded) {
      Axios.get(`http://127.0.0.1:8000/api/training/lesionImage/`).then(
        result => {
          setImages(result.data);
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
          {images.map(image => {
            return (
              <div>
                <h2
                  style={{
                    marginLeft: "17%"
                  }}
                >
                  {image.id})
                </h2>
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
                      src: image.image_url,
                      width: 900,
                      height: 600
                    },
                    largeImage: {
                      src: image.image_url,
                      width: 1800,
                      height: 1200
                    }
                  }}
                />
                <Grid centered>
                  <Label size="big">
                    a) Which category is the lesion above most appropriately
                    assigned?
                  </Label>
                </Grid>
                <br />
                <br />
                <Grid centered>
                  <Dropdown
                    style={{
                      width: "39%"
                    }}
                    placeholder="Select lesion type"
                    fluid
                    search
                    selection
                    options={lesionTypeOptions}
                  />
                </Grid>
                <br />
                <br />
                <Grid centered>
                  <Label size="big">
                    b) Which category best describes the state of the lesion
                    above?
                  </Label>
                </Grid>
                <br />
                <br />
                <Grid centered>
                  <Dropdown
                    style={{
                      width: "36%"
                    }}
                    placeholder="Select lesion type"
                    fluid
                    search
                    selection
                    options={lesionActivityOptions}
                  />
                </Grid>
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

export default ImageScoring;
