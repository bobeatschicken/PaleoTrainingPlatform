import React from "react";
import ImageScoring from "./ImageScoring";
import References from "./References";
import SplitterLayout from "react-splitter-layout";
import "react-splitter-layout/lib/index.css";

const ImageForm = props => {
    return (
        <SplitterLayout percentage secondaryInitialSize={25} secondaryMinSize={25}>
          <div className="my-pane">
            <ImageScoring />
          </div>
          <div className="my-pane">
            <References />
          </div>
        </SplitterLayout>
      );
}

export default ImageForm;