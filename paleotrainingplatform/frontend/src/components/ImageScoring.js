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
            console.log(image);
            return (
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
