import React, { useEffect, useState } from "react";
import {
    Card,
    Loader,
    Image
} from "semantic-ui-react";
import Axios from "axios";
import Chart from "react-google-charts";

const Results = props => {

    const [scores, setScores] = useState(null)
    const [images, setImages] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [allScores, setAllScores] = useState(null)
    const [chartData, setChartData] = useState(null)

    useEffect(() => {
        if (!isLoaded) {
            if (props.location.state) {
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
            Axios.get(`http://127.0.0.1:8000/api/training/lesionScore/`).then(
                result => {
                    if (result.data) {
                        setAllScores(result.data)
                        var data = {}
                        for (var i = 0; i < result.data.length; i++) {
                            if (result.data[i].image_url in data) {
                                if (result.data[i].score in data[result.data[i].image_url]) {
                                    data[result.data[i].image_url][result.data[i].score] += 1;
                                } else {
                                    data[result.data[i].image_url][result.data[i].score] = 1;
                                }
                            } else {
                                data[result.data[i].image_url] = { [result.data[i].score]: 1 }
                            }
                        }
                        console.log(data)
                        var scoresDict = {}
                        for (const [imageURL, typeDict] of Object.entries(data)) {
                            for (const [type, count] of Object.entries(typeDict)) {
                                if (!(imageURL in scoresDict)) {
                                    scoresDict[imageURL] = [["Lesion Type", "Frequency", { role: "style" }], [type, count, "gold"]]
                                } else {
                                    scoresDict[imageURL].push([type, count, "gold"])
                                }
                            }
                        }
                        console.log(scoresDict)
                        setChartData(scoresDict)
                        setIsLoaded(true)
                    }
                }
            )
        }
    }, [isLoaded]);

    useEffect(() => {
        localStorage.setItem("scores", JSON.stringify(scores))
        localStorage.setItem("images", JSON.stringify(images))
    })

    return (
        <div>
            {isLoaded ? (
                <Card.Group itemsPerRow={5}>
                    {images.map(image => {
                        return (
                            <Card>
                                <Image src={image.image_url} />
                                {scores[image.image_url] == image.lesion_types.map(function (lesion_type) {
                                    return lesion_type.name
                                }) ? (
                                        <Card.Content>
                                            <Card.Description style={{
                                                color: "green"
                                            }}>Your score: {scores[image.image_url]}</Card.Description>
                                            <Card.Description>Original observer's score: {image.lesion_types.map(function (lesion_type) {
                                                return lesion_type.name
                                            }).join(', ')}</Card.Description>
                                        </Card.Content>
                                    ) : (
                                        <Card.Content>
                                            <Card.Description style={{
                                                color: "red"
                                            }}>Your score: {scores[image.image_url]}</Card.Description>
                                            <Card.Description>Original observer's score: {image.lesion_types.map(function (lesion_type) {
                                                return lesion_type.name
                                            }).join(', ')}</Card.Description>
                                        </Card.Content>
                                    )}
                                <Chart
                                    chartType="ColumnChart"
                                    width="100%"
                                    column="100%"
                                    data={chartData[image.image_url]}
                                />
                            </Card>
                        )
                    })}
                </Card.Group>
            ) : (
                    <Loader active />
                )
            }
        </div >
    );
}

export default Results;
