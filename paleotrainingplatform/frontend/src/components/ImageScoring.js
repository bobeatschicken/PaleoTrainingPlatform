import React, { useEffect, useState } from "react";
import { Loader, Label, Grid, Form, Checkbox } from "semantic-ui-react";
import ReactImageMagnify from "react-image-magnify";
import { Link } from "react-router-dom";
import Axios from "axios";

const ImageScoring = props => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [images, setImages] = useState(null);
  const [lesionScores, setLesionScores] = useState({})
  // const [checked, setChecked] = useState(null);
  const lesionTypeOptions = [
    { value: "Type 0", text: "Absence of lesions" },
    { value: "Type A", text: "Type A" },
    { value: "Type B", text: "Type B" },
    { value: "Type C", text: "Type C" },
    { value: "Type D", text: "Type D" },
    { value: "Type E1", text: "Type E1" },
    { value: "Type E2", text: "Type E2" }
  ]
  const [lesionTypes, setLesionTypes] = useState(null);
  const lesionActivityOptions = [
    { value: "1", text: "active" },
    { value: "2", text: "healed" },
    { value: "3", text: "mixed" }
  ];

  const lesionTypeIndex = {
    "Type 0": "1",
    "Type A": "2",
    "Type B": "3",
    "Type C": "4",
    "Type D": "5",
    "Type E1": "6",
    "Type E2": "7",
  }

  useEffect(() => {
    if (!isLoaded) {
      Axios.get(`http://127.0.0.1:8000/api/training/lesionImage/`).then(
        result => {
          if (result.data) {
            // for (var i = 0; i < result.data.length; i++) {
            //   for (var j = 0; j < lesionTypeOptions.length; j++) {
            //     checked[result.data[i].image_url][lesionTypeOptions[j].value] = false;
            //   }
            // }
            // Axios.get(`http://127.0.0.1:8000/api/training/lesionType/`).then(
            //   response => {
            //     setLesionTypes(response.data)
            //     if (response.data) {
            //       setIsLoaded(true)
            //     }
            //   }
            // )
            setImages(result.data);
            setIsLoaded(true);
          }
        }
      );
    }
  }, [isLoaded]);

  function handleSubmit() {
    for (const [imageURL, type] of Object.entries(lesionScores)) {
      console.log(type)
      Axios.post(`http://127.0.0.1:8000/api/training/lesionScore/`, {
        image_url: imageURL,
        score: type
      }).then(function (response) {
        console.log(response)
      })
        .catch(function (error) {
          console.log(error)
        })
    }
  }

  // checkboxChangeHandler = (data) => {
  //   checked[data.name][data.label] = data.checked;
  // }

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
                      // if (data.value == "More than one lesion type present") {
                      //   return (<Form.Group>
                      //     <label>Please select multiple lesion types if applicable:</label>
                      //     {lesionTypeOptions.map(option => {
                      //       <Checkbox
                      //         label={option.text}
                      //         name={image.image_url}
                      //         checked={checked[image.image_url][option.value]}
                      //         onChange={(e, data) => checkboxChangeHandler(data)} />
                      //     })}
                      //   </Form.Group>)
                      // } else {
                      //   const imageURL = image.image_url
                      //   lesionScores[imageURL] = data.value
                      // }
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
          <Link to={{
            pathname: "/results",
            state: {
              scores: lesionScores,
              lesionImages: images
            }
          }}>
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
