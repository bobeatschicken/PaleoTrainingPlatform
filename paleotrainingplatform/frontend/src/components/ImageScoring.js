import React, { useEffect, useState } from "react";
import { Loader, Label, Grid, Form, Checkbox } from "semantic-ui-react";
import ReactImageMagnify from "react-image-magnify";
import { Link } from "react-router-dom";
import Axios from "axios";

const ImageScoring = (props) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [images, setImages] = useState(null);
  const [lesionScores, setLesionScores] = useState({});
  const [healingScores, setHealingScores] = useState({});
  const [showCheckBox, setShowCheckBox] = useState(new Map());
  const [checked, setChecked] = useState({});
  const [resultDict, setResultDict] = useState({});
  const [lesionSelected, setLesionSelected] = useState(new Map());
  const [educationLevel, setEducationLevel] = useState(null);
  const [timesTaken, setTimesTaken] = useState(null);
  const BASE_URL = "https://osteologic.herokuapp.com";

  const lesionTypeOptions = [
    {
      value: "Absence of pathological lesions",
      text: "Absence of pathological lesions",
    },
    { value: "Type A", text: "Type A" },
    { value: "Type B", text: "Type B" },
    { value: "Type C", text: "Type C" },
    { value: "Type D", text: "Type D" },
    { value: "Type E1", text: "Type E1" },
    { value: "Type E2", text: "Type E2" },
    { value: "Multiple", text: "More than one lesion type present" },
    {
      value: "Photo quality insufficient for determination",
      text: "Photo quality insufficient for determination",
    },
  ];
  const lesionActivityOptions = [
    { value: "N/A", text: "N/A" },
    { value: "1", text: "1" },
    { value: "2", text: "2" },
    { value: "3", text: "3" },
    { value: "4", text: "4" },
    {
      value: "Photo quality insufficient for determination",
      text: "Photo quality insufficient for determination",
    },
  ];
  const statusOptions = [
    { value: "Undergraduate", text: "Undergraduate" },
    { value: "MA student", text: "MA student" },
    { value: "post-MA PhD student", text: "post-MA PhD student" },
    { value: "post-PhD academic", text: "post-PhD academic" },
    { value: "post-MA non-academic", text: "post-MA non-academic" },
    { value: "post-PhD non-academic", text: "post-PhD non-academic" },
  ];

  const timesCompleted = [
    { value: "First Time", text: "First Time" },
    { value: "2-5", text: "2-5" },
    { value: "6-10", text: "6-10" },
    { value: "10-15", text: "10-15" },
    { value: "16+", text: "16+" },
  ];

  Axios.defaults.xsrfCookieName = "csrftoken";
  Axios.defaults.xsrfHeaderName = "X-CSRFToken";

  function getRandom(arr, n) {
    var result = new Array(n),
      len = arr.length,
      taken = new Array(len);
    if (n > len)
      throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
      var x = Math.floor(Math.random() * len);
      result[n] = arr[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
  }

  useEffect(() => {
    if (!isLoaded) {
      Axios.get(`${BASE_URL}/api/training/lesionImage/`)
        .then((result) => {
          if (result.data) {
            let quiz = getRandom(result.data, 5);
            setImages(quiz);
            setIsLoaded(true);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [isLoaded]);

  function handleSubmit() {
    for (const [imageURL, scoresDict] of Object.entries(checked)) {
      var types = [];
      for (const [type, value] of Object.entries(scoresDict)) {
        if (value) {
          types.push(type);
        }
      }
      types.sort();
      resultDict[imageURL] = types.join(", ");
    }
    for (const [imageURL, type] of Object.entries(lesionScores)) {
      resultDict[imageURL] = type;
    }
    for (const [imageURL, type] of Object.entries(resultDict)) {
      Axios.post(`${BASE_URL}/api/training/lesionScore/`, {
        image_url: imageURL,
        score: type,
        education_level: educationLevel,
        times_taken: timesTaken,
        csrfmiddlewaretoken: window.CSRF_TOKEN,
      })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    for (const [imageURL, degree] of Object.entries(healingScores)) {
      Axios.post(`${BASE_URL}/api/training/healingScore/`, {
        image_url: imageURL,
        score: degree,
        education_level: educationLevel,
        times_taken: timesTaken,
        csrfmiddlewaretoken: window.CSRF_TOKEN,
      })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  function handleSubmitDisplay() {
    if (
      educationLevel &&
      timesTaken &&
      Object.keys(lesionScores).length + Object.keys(checked).length ===
        images.length &&
      Object.keys(lesionScores).length + Object.keys(checked).length ===
        Object.keys(healingScores).length
    ) {
      return (
        <Link
          to={{
            pathname: "/results",
            state: {
              scores: resultDict,
              lesionImages: images,
              healingResult: healingScores,
            },
          }}
        >
          <Form.Button positive onClick={() => handleSubmit()}>
            Submit
          </Form.Button>
        </Link>
      );
    } else {
      return (
        <Form.Button negative disabled>
          Submit
        </Form.Button>
      );
    }
  }

  const checkboxChangeHandler = (data) => {
    const imageURL = data.name;
    const typeOption = data.label;
    const value = data.checked;

    if (imageURL in checked) {
      checked[imageURL][typeOption] = value;
    } else {
      var nestedDict = { [typeOption]: value };
      checked[imageURL] = nestedDict;
    }
    const newChecked = { ...checked };
    setChecked(newChecked);
  };

  return (
    <div>
      {isLoaded ? (
        <Form>
          <h1
            style={{
              marginLeft: "17%",
            }}
          >
            Preliminary Questions:
          </h1>
          <br />
          <Grid centered>
            <Label size="big">
              Which of the following best describes your
              educational/professional status?
            </Label>
          </Grid>
          <br />
          <br />
          <Grid centered>
            <Form.Select
              style={{
                clear: "both",
              }}
              options={statusOptions}
              onChange={(e, data) => {
                setEducationLevel(data.value);
              }}
            />
          </Grid>
          <br />
          <br />
          <Grid centered>
            <Label size="big">
              Approximately how many times have you completed the orbital roof
              lesion scoring exercise?
            </Label>
          </Grid>
          <br />
          <br />
          <Grid centered>
            <Form.Select
              options={timesCompleted}
              onChange={(e, data) => {
                setTimesTaken(data.value);
              }}
            />
          </Grid>
          <br />
          {images.map((image, index) => {
            return (
              <div>
                <h2
                  style={{
                    marginLeft: "17%",
                  }}
                >
                  {index + 1})
                </h2>
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
                      src: image.image_url,
                      width: 900,
                      height: 600,
                    },
                    largeImage: {
                      src: image.image_url,
                      width: 1800,
                      height: 1200,
                    },
                  }}
                />
                <Grid centered>
                  Age: {image.age}
                  <br />
                  Sex: {image.sex}
                  <br />
                  Site: {image.site}
                  <br />
                  Time Period: {image.time_period}
                </Grid>
                <br />
                <br />
                <Grid centered>
                  <Label size="big">
                    a) To which category is the orbital lesion above most
                    appropriately assigned?
                  </Label>
                </Grid>
                <br />
                <br />
                <Grid centered>
                  <Form.Select
                    style={{
                      clear: "both",
                    }}
                    onChange={(e, data) => {
                      if (data.value == "Multiple") {
                        delete lesionScores[image.image_url];
                        const newLesionScores = { ...lesionScores };
                        setLesionScores(newLesionScores);
                        setShowCheckBox(
                          new Map(showCheckBox.set(image.image_url, true))
                        );
                        setLesionSelected(
                          new Map(lesionSelected.set(image.image_url, true))
                        );
                      } else if (
                        data.value == "Absence of pathological lesions"
                      ) {
                        delete healingScores[image.image_url];
                        delete lesionScores[image.image_url];
                        lesionScores[image.image_url] = data.value;
                        const newLesionScores = { ...lesionScores };
                        setLesionScores(newLesionScores);
                        setShowCheckBox(
                          new Map(showCheckBox.set(image.image_url, false))
                        );
                        setLesionSelected(
                          new Map(lesionSelected.set(image.image_url, false))
                        );
                      } else {
                        delete checked[image.image_url];
                        lesionScores[image.image_url] = data.value;
                        const newLesionScores = { ...lesionScores };
                        setLesionScores(newLesionScores);
                        setShowCheckBox(
                          new Map(showCheckBox.set(image.image_url, false))
                        );
                        setLesionSelected(
                          new Map(lesionSelected.set(image.image_url, true))
                        );
                      }
                    }}
                    options={lesionTypeOptions}
                  />
                </Grid>
                <br />
                <br />
                {showCheckBox.get(image.image_url) && (
                  <Grid centered>
                    <label>
                      Please select multiple lesion types if applicable:
                    </label>
                    {lesionTypeOptions.slice(1, 7).map((option) => {
                      return (
                        <Checkbox
                          style={{
                            marginLeft: "10px",
                          }}
                          label={option.text}
                          name={image.image_url}
                          onChange={(e, data) => checkboxChangeHandler(data)}
                        />
                      );
                    })}
                  </Grid>
                )}
                <br />
                <br />
                <Grid centered>
                  <Label size="big">
                    b) Which category best describes the activity state of the
                    lesion above?
                  </Label>
                </Grid>
                <br />
                <br />
                <Grid centered>
                  <Form.Select
                    name={image.image_url + " healing score"}
                    options={lesionActivityOptions}
                    onChange={(e, data) => {
                      healingScores[image.image_url] = data.value;
                      const newHealingScores = { ...healingScores };
                      setHealingScores(newHealingScores);
                    }}
                  />
                </Grid>

                <br />
                <br />
              </div>
            );
          })}
          <Grid centered>{handleSubmitDisplay()}</Grid>
        </Form>
      ) : (
        <Loader active>Generating Quiz</Loader>
      )}
    </div>
  );
};

export default ImageScoring;
