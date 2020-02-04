import React, {useEffect, useState} from "react";
import {
  Card,
  Loader,
  Image
} from "semantic-ui-react";

const Results = props => {

  const [scores, setScores] = useState(null)
  const [images, setImages] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false);


  useEffect(() => {
    if (!isLoaded) {
        if (props.location.state) {
            console.log(props)
            setScores(props.location.state.scores)
            setImages(props.location.state.lesionImages)
        }
        const scoresData = localStorage.getItem('scores')
        if (scoresData) {
            setScores(JSON.parse(scoresData))
        }
        const imagesData = localStorage.getItem('images')
        if (imagesData) {
            setImages(JSON.parse(imagesData))
        }
        setIsLoaded(true)
    }
  }, [isLoaded]);

  useEffect(() => {
      localStorage.setItem("scores", JSON.stringify(scores))
      localStorage.setItem("images", JSON.stringify(images))
  })

  function printScores() {
    console.log(scores)
    console.log(images)
  }
  return (
      <div>
          {isLoaded ? (
              <Card.Group itemsPerRow={5}>
                  {images.map(image => {
                      return (
                          <Card>
                              <Image src={image.image_url} />
                              <Card.Content>
                                  <Card.Description>Your score: {scores[image.image_url]}</Card.Description>
                                  <Card.Description>Actual score: {image.lesion_types.map(function(lesion_type) {
                                      return lesion_type.name
                                  }).join(', ')}</Card.Description>
                              </Card.Content>
                          </Card>
                      )
                  })}
              </Card.Group>
          ) : (
              <Loader active />
          )}
      </div>
  );
}

export default Results;
