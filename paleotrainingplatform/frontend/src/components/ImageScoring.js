import React, { useEffect, useState } from "react";
import { Loader } from "semantic-ui-react";
import ReactImageMagnify from "react-image-magnify";
import Axios from "axios";

const ImageScoring = props => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [images, setImages] = useState(null);

  useEffect(() => {
    if (!isLoaded) {
      Axios.get(`http://127.0.0.1:8000/api/training/`).then(result => {
        console.log(result.data);
        setImages(result.data);
        if (result.data) {
          setIsLoaded(true);
        }
      });
    }
  }, [isLoaded]);

  return (
    <div>
      {isLoaded ? (
        <div>
          {images.map(image => {
            return (
              <ReactImageMagnify
                style={{
                  display: "block",
                  marginLeft: "auto",
                  marginRight: "auto"
                }}
                {...{
                  smallImage: {
                    src: `http://127.0.0.1:8000/media/Screen_Shot_2019-09-02_at_1.08.17_PM.png`,
                    width: 300,
                    height: 200
                  },
                  largeImage: {
                    src: `http://127.0.0.1:8000/media/Screen_Shot_2019-09-02_at_1.08.17_PM.png`,
                    width: 600,
                    height: 400
                  }
                }}
              />
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
