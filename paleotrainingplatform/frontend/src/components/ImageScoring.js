import React, { useEffect, useState, useCallback } from "react";
import { Loader, Label, Grid, Form, Checkbox } from "semantic-ui-react";
import ReactImageMagnify from "react-image-magnify";
import { Link } from "react-router-dom";
import Axios from "axios";

const ImageScoring = props => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [images, setImages] = useState(null);
  const [lesionScores, setLesionScores] = useState({})
  const [healingScores, setHealingScores] = useState({})
  const [showCheckBox, setShowCheckBox] = useState(new Map())
  const [checked, setChecked] = useState({});
  const [resultDict, setResultDict] = useState({})
  const [showHealingOptions, setShowHealingOptions] = useState(new Map())
  const lesionTypeOptions = [
    { value: "Absence of pathological lesions", text: "Absence of pathological lesions" },
    { value: "Type A", text: "Type A" },
    { value: "Type B", text: "Type B" },
    { value: "Type C", text: "Type C" },
    { value: "Type D", text: "Type D" },
    { value: "Type E1", text: "Type E1" },
    { value: "Type E2", text: "Type E2" },
    { value: "Multiple", text: "More than one lesion type present" }
  ]
  const [lesionTypes, setLesionTypes] = useState(null);
  const lesionActivityOptions = [
    { value: "1", text: "1" },
    { value: "2", text: "2" },
    { value: "3", text: "3" },
    { value: "4", text: "4" }
  ];

  useEffect(() => {
    if (!isLoaded) {
      Axios.get(`http://paleotrainingplatform.pythonanywhere.com/api/training/lesionImage/`).then(
        result => {
          if (result.data) {
            setImages(result.data);
            setIsLoaded(true);
          }
        }
      ).catch(function (error) {
        console.log(error)
      })
    }
  }, [isLoaded]);

  function handleSubmit() {
    var temp
    for (const [imageURL, scoresDict] of Object.entries(checked)) {
      var types = []
      for (const [type, value] of Object.entries(scoresDict)) {
        if (value) {
          types.push(type)
        }
      }
      types.sort()
      resultDict[imageURL] = types.join(', ')
    }
    for (const [imageURL, type] of Object.entries(lesionScores)) {
      resultDict[imageURL] = type
    }
    for (const [imageURL, type] of Object.entries(resultDict)) {
      Axios.post(`http://paleotrainingplatform.pythonanywhere.com/api/training/lesionScore/`, {
        image_url: imageURL,
        score: type
      }).then(function (response) {
        console.log(response)
      })
        .catch(function (error) {
          console.log(error)
        })
    }
    for (const [imageURL, degree] of Object.entries(healingScores)) {
      Axios.post(`http://paleotrainingplatform.pythonanywhere.com/api/training/healingScore/`, {
        image_url: imageURL,
        score: degree
      }).then(function (response) {
        console.log(response)
      })
        .catch(function (error) {
          console.log(error)
        })
    }
  }

  const checkboxChangeHandler = (data) => {
    const imageURL = data.name
    const typeOption = data.label
    const value = data.checked

    if (imageURL in checked) {
      checked[imageURL][typeOption] = value
    } else {
      var nestedDict = { [typeOption]: value }
      checked[imageURL] = nestedDict
    }
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
                    a) To which category is the orbital lesion above most appropriately assigned?
                  </Label>
                </Grid>
                <br />
                <br />
                <Grid centered>
                  <Form.Select
                    style={{
                      clear: 'both'
                    }}
                    fluid
                    onChange={(e, data) => {
                      if (data.value == "Multiple") {
                        delete lesionScores[image.image_url]
                        setShowCheckBox(new Map(showCheckBox.set(image.image_url, true)))
                        setShowHealingOptions(new Map(showHealingOptions.set(image.image_url, true)))
                      } else if (data.value == "Absence of pathological lesions") {
                        delete healingScores[image.image_url]
                        delete lesionScores[image.image_url]
                        lesionScores[image.image_url] = data.value
                        setShowCheckBox(new Map(showCheckBox.set(image.image_url, false)))
                        setShowHealingOptions(new Map(showHealingOptions.set(image.image_url, false)))
                      } else {
                        delete checked[image.image_url]
                        lesionScores[image.image_url] = data.value
                        setShowCheckBox(new Map(showCheckBox.set(image.image_url, false)))
                        setShowHealingOptions(new Map(showHealingOptions.set(image.image_url, true)))
                      }
                    }}
                    options={lesionTypeOptions}
                  />
                </Grid>
                <br />
                <br />
                {showCheckBox.get(image.image_url) &&
                  <Grid centered>
                    <label>Please select multiple lesion types if applicable:</label>
                    {lesionTypeOptions.slice(1, 7).map(option => {
                      return (
                        <Checkbox
                          style={{
                            marginLeft: "10px"
                          }}
                          label={option.text}
                          name={image.image_url}
                          onChange={(e, data) => checkboxChangeHandler(data)}
                        />
                      )
                    })}
                  </Grid>
                }
                <br />
                <br />
                {showHealingOptions.get(image.image_url) &&
                  <div>
                    <Grid centered>
                      <Label size="big">
                        b) Which category best describes the activity state of the lesion above?
                      </Label>
                    </Grid>
                    <br />
                    <br />
                    <Grid centered>
                      <Form.Select
                        fluid
                        name={image.image_url + " healing score"}
                        options={lesionActivityOptions}
                        onChange={(e, data) => {
                          healingScores[image.image_url] = data.value
                        }}
                      />
                    </Grid>
                  </div>
                }
                <br />
                <br />
              </div>
            );
          })}
          <Grid centered>
            <Link to={{
              pathname: "/results",
              state: {
                scores: resultDict,
                lesionImages: images,
                healingResult: healingScores
              }
            }}>
              <Form.Button onClick={() => handleSubmit()}>Submit</Form.Button>
            </Link>
          </Grid>
        </Form>
      ) : (
          <Loader active />
        )}
    </div>
  );
};

export default ImageScoring;
