import * as React from "react";
import NOC_DATA from "../assets/NOC-data";
import styled from "styled-components/macro";

/** a hidden image per NOC */
export function NOCImages() {
  return (
    <NOCImagesStyles>
      {NOC_DATA.map((node) => (
        <img
          key={node.id}
          id={`image_${node.noc}`}
          src={`/img/NOC_images/${node.noc}.jpg`}
          alt={node.job}
        />
      ))}
    </NOCImagesStyles>
  );
}
const NOCImagesStyles = styled.div`
  display: none;
`;
/** a hidden thumbnail per NOC */
export function NOCThumbnails() {
  return (
    <NOCThumbnailsStyles>
      {NOC_DATA.map((node) => (
        <img
          key={node.id}
          id={`thumbnail_${node.noc}`}
          src={`/img/NOC_Thumbnails/${node.noc}.jpg`}
          alt={node.job}
        />
      ))}
    </NOCThumbnailsStyles>
  );
}
const NOCThumbnailsStyles = styled.div`
  display: none;
`;
