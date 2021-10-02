import NOC_DATA from "./NOC-data";

export const NOC_NODES = NOC_DATA.map((node) => ({
  ...node,
  imageUrl: `/img/NOC_images/${node.noc}.jpg`,
  imageUrlThumbnail: `/img/NOC_Thumbnails/tn_${node.noc}.jpg`,
}));
