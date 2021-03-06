import { interpolateRdYlGn } from "d3-scale-chromatic";
import { removeKeys } from "../utils/constants";
import NOC_DATA from "./NOC-data";

export const NOC_STATS = Object.keys(NOC_DATA[0]).reduce(
  (acc, nocDataKey) => {
    acc[nocDataKey] = {
      min: NOC_DATA.map((node) => node[nocDataKey]).reduce(
        (acc, cur) => Math.min(acc, cur),
        Infinity
      ),
      max: NOC_DATA.map((node) => node[nocDataKey]).reduce(
        (acc, cur) => Math.max(acc, cur),
        -Infinity
      ),
    };
    return acc;
  },
  {} /* as {
    [hey in keyof NOCDataType]: { min: number; max: number };
  } */
);

export const NOC_NODES = NOC_DATA.map((node) => ({
  ...node,
  imageUrl: `/img/NOC_images/${node.noc}.jpg`,
  imageUrlThumbnail: `/img/NOC_Thumbnails/tn_${node.noc}.jpg`,
  color: getNodeColor(node),
  scale: 1,
}));
console.log(
  "🌟🚨 ~ file: NOC-node.ts ~ line 26 ~ NOC_NODES",
  Object.keys(NOC_NODES[0])
);
const REMOVE = [
  "id",
  "noc",
  "job",
  "title1",
  "title2",
  "title3",
  "allTitles",
  // "workers",
  "minEduc",
  // "yearsStudy",
  // "automationRisk",
  "salaryLow",
  // "salaryMed",
  "salaryHigh",
  "totalSkill",
  "industry",
  "industryNum",
  "sector",
  "cluster",
  "wage",
  // "skillsComp",
  // "skillsLogi",
  // "skillsMath",
  // "skillsLang",
  "topSkill1",
  "topSkill2",
  "topSkill3",
  "s1DataAnalysis",
  "s2DecisionMaking",
  "s3FindingInformation",
  "s4JobTaskPlanningandOrganizing",
  "s5MeasurementandCalculation",
  "s6MoneyMath",
  "s7NumericalEstimation",
  "s8OralCommunication",
  "s9ProblemSolving",
  "s10Reading",
  "s11SchedulingorBudgetingandAccounting",
  "s12DigitalTechnology",
  "s13DocumentUse",
  "s14Writing",
  "s15CriticalThinking",
  "f1Science&Agriculture",
  "f2Engineering",
  "f3Humanities",
  "f4SocialScience",
  "f5FineArts",
  "f6MathAndComputerScience",
  "f7Arts&Education",
  "f8Education(teachertraining)",
  "f9Law",
  "f10Health",
  "f11Health,Nursing&ClinicalLaboratory",
  "f12Business",
  "f13Medical,Dental&Veterinary",
  "d1Agriculture&BiologicalScience",
  "d2Forestry",
  "d3Architecture&LandscapeArchitecture",
  "d4Humanities",
  "d5SocialSciences",
  "d6Fine&AppliedArts",
  "d7ComputerScience",
  "d8OtherArts&Science",
  "d9Education(teachertraining)",
  "d10Engineering",
  "d11Law",
  "d12Mathematics",
  "d13Kinesiology/Recreation/PhysicalEducation",
  "d14Theology",
  "d15PhysicalSciences",
  "d16Therapy&Rehabilitation",
  "d17Health,Nursing&ClinicalLaboratory",
  "d18Business&Commerce",
  "d19Medical,Dental&Veterinary",
  "equalRadius",
  "imageUrl",
  "imageUrlThumbnail",
  "color",
  "scale",
];
export const NOC_NODES_CLEANED = NOC_NODES.map((node) =>
  removeKeys(node, REMOVE)
) as typeof NOC_NODES;
function getNodeColor(node) {
  const pct = node.automationRisk / (NOC_STATS as any).automationRisk.max;
  const col = interpolateRdYlGn(1 - pct);
  const rgb = col.slice(`rgb(`.length, -`)`.length).split(", ");
  const [r, g, b] = rgb.map(Number);
  const colHex = RGBToHex(r, g, b);
  return colHex;
}

function RGBToHex(r, g, b) {
  r = r.toString(16);
  g = g.toString(16);
  b = b.toString(16);

  if (r.length === 1) r = "0" + r;
  if (g.length === 1) g = "0" + g;
  if (b.length === 1) b = "0" + b;

  return "#" + r + g + b;
}

export const NOC_NODES_BY_INDUSTRY = NOC_NODES.reduce((acc, node) => {
  return {
    ...acc,
    [node.industry]: (acc[node.industry] || []).concat(node),
  };
}, {} as { [key: string]: any[] });
