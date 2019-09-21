import React from "react";
import Loader from "react-loader-spinner";
import ImageLoader from "react-image";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const Image = ({ src, alt, ...rest }) =>
  <ImageLoader
    src={src}
    alt={alt}
    {...rest}
    loader={
      <div
        style={{
          width: "100%",
          height: "200px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Loader
          type="Hearts"
          color="#78C2AD"
          height={80}
          width={80}
          timeOut={10 * 1000}
        />
      </div>
    }
  />;

export default Image;
