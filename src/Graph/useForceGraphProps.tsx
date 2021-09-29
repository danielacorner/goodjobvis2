import { useWindowSize } from "../hooks/useWindowSize";
import { useCallback, useRef } from "react";
import { useControls } from "leva";

type GraphNode = { id_str: string; imageUrl: string };

export const NODE_DIAMETER = 25;
export const AVATAR_DIAMETER = NODE_DIAMETER * 4;
const LIGHTGREY = "#D3D3D3";
const LIKE = "#a40880";
const RETWEET_TO_TWEET = "#179245";
const USER_TO_TWEET = LIGHTGREY;
/** https://www.npmjs.com/package/react-force-graph */
// tslint:disable-next-line
export function useForceGraphProps() {
  const { imageWidth } = useControls({
    imageWidth: 70,
  });
  const fgRef = useRef();
  const onBackgroundClick = useCallback(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const tooltipNode = { id_str: "123" };
  const { isLikeLink, isRetweetLink, isTweetToRetweetLink, other } =
    useControls({
      isLikeLink: false,
      isRetweetLink: false,
      isTweetToRetweetLink: false,
      other: "#000000",
    });
  const { width, height } = useWindowSize();

  const onNodeHover = useCallback((node) => {
    if (node) {
    }
  }, []);
  // on click, open the bottom drawer containing tweet info
  const onNodeClick = useCallback((node) => {}, []);

  const isPaused = false;
  const { d3VelocityDecay, d3AlphaDecay, cooldownTime } = useControls({
    d3VelocityDecay: 0,
    d3AlphaDecay: 0,
    cooldownTime: 0,
  });
  const forceGraphProps = {
    width,
    height,
    onNodeHover,
    onNodeClick,
    d3VelocityDecay,
    d3AlphaDecay,
    cooldownTime: isPaused ? 0 : cooldownTime,
    // warmupTicks: 10,
    // nodeAutoColorBy: "group",
    // cooldownTime: 400 * (showUserNodes ? 2 : 1),
    // all nodes ratio of node area per value unit:
    nodeRelSize: NODE_DIAMETER,
    // node size:
    nodeVal: (node) => {
      return 1 * (node.isUserNode ? AVATAR_DIAMETER / NODE_DIAMETER : 1);
    },
    // nodeColor: (node) => getNodeColor(node, colorBy),
    // onEngineStop: () =>
    //   fgRef.current && !is3d ? (fgRef.current as any).zoomToFit(400) : null,
    nodeCanvasObject: ((node: GraphNode & { x: number; y: number }, ctx) => {
      //   // draw the bot score if we have one
      //   const MOCK_BOT_SCORE: BotScore = {
      //     overall: 1,
      //     astroturf: 2,
      //     fake_follower: 3,
      //     financial: 4,
      //     self_declared: 5,
      //     spammer: 4,
      //     other: 5,
      //   };
      //   if (MOCK_BOT_SCORE || node.botScore) {
      //     // if (node.isUserNode && node.botScore) {
      //     drawBotScore({ ...node, botScore: MOCK_BOT_SCORE }, ctx);
      //   }
      //   if (node.sentimentResult) {
      //     // if (node.isUserNode && node.botScore) {
      //     drawSentimentResult(node, ctx);
      //   }

      if (tooltipNode?.id_str === node.id_str) {
        drawHighlightCircle(node, ctx);
      }
      ctx.beginPath();
      ctx.arc(
        node.x, // x: The horizontal coordinate of the arc's center.
        node.y, // y: The vertical coordinate of the arc's center.
        AVATAR_DIAMETER / 2 - 10, // radius
        0, // startAngle
        Math.PI * 2 // endAngle
      );
      ctx.fillStyle = "tomato";
      ctx.fill();
      ctx.closePath();

      //   if (colorBy === COLOR_BY.profilePhoto || node.isUserNode) {
      //     if (isStorybook) {
      //       // draw offline indicatr
      //       ctx.beginPath();
      //       ctx.arc(
      //         node.x, // x: The horizontal coordinate of the arc's center.
      //         node.y, // y: The vertical coordinate of the arc's center.
      //         AVATAR_DIAMETER / 2 - 10, // radius
      //         0, // startAngle
      //         Math.PI * 2 // endAngle
      //       );
      //       ctx.fillStyle = "tomato";
      //       ctx.fill();
      //     } else {
      // show profile photo

      drawProfilePhoto(node, ctx, node.imageUrl, imageWidth, imageWidth);
      //     }
      //   } else if (colorBy === COLOR_BY.media) {
      //     // show media
      //     const mediaArr = getMediaArr(node);
      //     if (!mediaArr[0]) {
      //       // draw an empty circle if there's no media
      //       ctx.beginPath();
      //       ctx.arc(node.x, node.y, NODE_DIAMETER / 2, 0, Math.PI * 2);
      //       // stroke styles https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/stroke
      //       ctx.strokeStyle = "cornflowerblue";
      //       ctx.stroke();
      //    }
      //   } else {
      //     // draw circle
      //     ctx.beginPath();
      //     ctx.arc(node.x, node.y, NODE_DIAMETER / 2, 0, Math.PI * 2);
      //     // stroke styles https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/stroke
      //     ctx.fillStyle = getNodeColor(node, colorBy);
      //     ctx.fill();
      //   }
    }) as any,
    linkWidth: 1,
    backgroundColor: "transparent",
    linkColor: (({ source, target }) => {
      // TODO: link by replies

      return isLikeLink
        ? LIKE
        : isRetweetLink || isTweetToRetweetLink
        ? RETWEET_TO_TWEET
        : source.isUserNode
        ? USER_TO_TWEET
        : other;
    }) as any,
    linkCurvature: (({ source, target }) => {
      // const isTweetToRetweetLink = getIsTweetToRetweetLink({ source, target });
      return isLikeLink ? 0.1 : isRetweetLink ? 0.2 : 0;
    }) as any,
    // linkCurveRotation: ({ source, target }) => {
    //   const isLikeLink = getIsLikeLink({ source, target });
    //   const isRetweetLink = getIsRetweetLink({ source, target });
    //   // const isTweetToRetweetLink = getIsTweetToRetweetLink({ source, target });
    //   return isLikeLink ? 1 : isRetweetLink ? Math.PI * -2 : 0;
    // },
    linkLineDash: (({ source, target }) => {
      return isLikeLink
        ? [5, 15]
        : isRetweetLink
        ? undefined
        : isTweetToRetweetLink
        ? [15, 15]
        : [1, 1];
    }) as any,
    // linkOpacity: ({ source, target }) => {
    // const isLikeLink = getIsLikeLink({ source, target });
    // const isRetweetLink = getIsRetweetLink({ source, target });
    // return isLikeLink ? 0.2 : isRetweetLink ? 0.8 : 1;
    // },
    linkDirectionalArrowLength: (({ source, target }) => {
      return isLikeLink
        ? 15
        : isRetweetLink || isTweetToRetweetLink
        ? 15
        : null;
    }) as any,
    linkDirectionalArrowRelPos: (({ source, target }) => {
      return !source.isUserNode && (isLikeLink || isRetweetLink)
        ? 1
        : isTweetToRetweetLink
        ? 0
        : null;
    }) as any,
    // nodeThreeObject: (colorBy === COLOR_BY.mediaType
    //   ? undefined
    //   : colorBy === COLOR_BY.media
    //   ? (node: Tweet) => {
    //       const mediaArr = getMediaArr(node);
    //       const first = mediaArr[0];
    //       if (!allowedMediaTypesStrings.includes(first?.type)) {
    //         return null;
    //       }
    //       const imgSrc = node.isUserNode
    //         ? node.user.profile_image_url_https
    //         : first?.poster || first?.src;

    //       const imgTexture = new THREE.TextureLoader().load(imgSrc);
    //       const color = new THREE.Color(
    //         node.isUserNode
    //           ? "hsl(200,100%,75%)"
    //           : first?.type === "video"
    //           ? "hsl(10,100%,80%)"
    //           : "hsl(120,100%,80%)"
    //       );
    //       const material = new THREE.SpriteMaterial({
    //         map: imgTexture,
    //         color,
    //       });
    //       const sprite = new THREE.Sprite(material);
    //       const scaleDown = 0.35;
    //       const { h, w, d } = node.isUserNode
    //         ? {
    //             h: 48,
    //             w: 48,
    //             d: 48,
    //           }
    //         : {
    //             h: first?.sizes.small.h * scaleDown,
    //             w: first?.sizes.small.w * scaleDown,
    //             d: 0,
    //           };
    //       sprite.scale.set(w, h, d);

    //       return sprite;
    //     }
    //   : colorBy === COLOR_BY.profilePhoto
    //   ? (node) => {
    //       const imgSrc = node.user.profile_image_url_https;
    //       const imgTexture = new THREE.TextureLoader().load(imgSrc);
    //       const color = new THREE.Color("hsl(10,100%,100%)");
    //       const material = new THREE.SpriteMaterial({
    //         map: imgTexture,
    //         color,
    //       });
    //       const sprite = new THREE.Sprite(material);
    //       const { h, w, d } = {
    //         h: 48,
    //         w: 48,
    //         d: 0,
    //       };
    //       sprite.scale.set(w, h, d);

    //       return sprite;
    //     }
    //   : undefined) as any,

    onBackgroundClick,

    enableZoomPanInteraction: true,
    enableNavigationControls: true,
    // onLinkHover: (link, prevLink) => {},
    enablePointerInteraction: /* tweets.length<500 */ true,
    enableNodeDrag: true,
    // when we start to drag, pause the simulation
  };

  return { fgRef, forceGraphProps };
}

function drawHighlightCircle(node: any, ctx: any) {
  // circle
  ctx.beginPath();
  // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/arc
  ctx.arc(
    node.x, // x: The horizontal coordinate of the arc's center.
    node.y, // y: The vertical coordinate of the arc's center.
    AVATAR_DIAMETER, // radius
    0, // startAngle
    Math.PI * 2 // endAngle
  );
  ctx.strokeStyle = "white";
  ctx.lineWidth = 2;
  ctx.stroke();

  /*
   * restore() restores the canvas context to its original state
   * before we defined the clipping region
   */
  // ctx.restore();
  // ctx.beginPath();
  // ctx.arc(node.x, node.y, AVATAR_DIAMETER / 2, 0, 2 * Math.PI, false);
  // ctx.lineWidth = 10;
  // ctx.strokeStyle = "blue";
  // ctx.stroke();
  // ctx.clip();
  // ctx.closePath();
  // ctx.clip();
  // ctx.fill();
}

function drawProfilePhoto(
  node,
  ctx: any,
  imageUrl: string,
  imgWidth: number,
  imgHeight: number
) {
  //       // show the first image/video preview

  var thumbImg = document.createElement("img");
  thumbImg.src = imageUrl;
  thumbImg.onload = function () {
    ctx.save();
    ctx.beginPath();

    ctx.arc(
      node.x, // x: The horizontal coordinate of the arc's center.
      node.y, // y: The vertical coordinate of the arc's center.
      imgWidth * 0.5, // radius
      0, // startAngle
      Math.PI * 2, // endAngle
      true
    );
    ctx.closePath();
    ctx.clip();

    ctx.drawImage(
      thumbImg,
      node.x - imgWidth / 2,
      node.y - imgHeight / 2,
      imgWidth,
      imgHeight
    );

    ctx.beginPath();
    ctx.arc(0, 0, 25, 0, Math.PI * 2, true);
    ctx.clip();
    ctx.closePath();
    ctx.restore();
  };
}
