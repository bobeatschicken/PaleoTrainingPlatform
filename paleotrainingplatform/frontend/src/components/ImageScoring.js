import React, { useEffect, useState } from "react";
import { Loader, Label, Dropdown, Grid, Form } from "semantic-ui-react";
import ReactImageMagnify from "react-image-magnify";
import {Link} from "react-router-dom";
import Axios from "axios";

const ImageScoring = props => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [images, setImages] = useState(null);
  const [lesionTypeOptions, setLesionTypeOptions] = useState(null);
  const [lesionScores, setLesionScores] = useState({})
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
            Axios.get(`http://127.0.0.1:8000/api/training/lesionType/`).then(
              response => {
                var options = []
                for (var i = 0; i < response.data.length; i++) {
                  options.push({value: response.data[i].name, text: response.data[i].name})
                }
                setLesionTypeOptions(options)
                if (response.data) {
                  setIsLoaded(true)
                }
              }
            )
          }
        }
      );
    }
  }, [isLoaded]);

  function handleSubmit() {
    console.log(lesionScores)
  }

  return (
    <div>
      {isLoaded ? (
        <Form>
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
                  <Form.Select 
                  fluid
                  onChange={(e, data) => {
                    const imageURL = image.image_url
                    lesionScores[imageURL] = data.value
                  }}
                  options={lesionTypeOptions} 
                  />
                </Grid>
                <br />
                <br />
                {/* <Grid centered>
                  <Label size="big">
                    b) Which category best describes the state of the lesion
                    above?
                  </Label>
                </Grid>
                <br />
                <br />
                <Grid centered>
                  <Form.Select
                  fluid
                  name={image.image_url + " healing score"}
                  options={lesionActivityOptions}
                  />
                </Grid> */}
              </div>
            );
          })}
          <Link to="/results">
          <Form.Button onClick={() => handleSubmit()}>Submit</Form.Button>
          </Link>
        </Form>
      ) : (
        <Loader active />
      )}
    </div>
  );
};

export default ImageScoring;
