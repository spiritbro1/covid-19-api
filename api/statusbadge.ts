import { NowResponse, NowRequest } from "@now/node";
import unfetch from "isomorphic-unfetch";
import withRetry from "@zeit/fetch-retry";
const fetch = withRetry(unfetch);
export default async function handler(req: NowRequest, res: NowResponse) {
  const result = await fetch(
    "https://github.com/spiritbro1/covid-19-api/releases/download/saved_data/status.json"
  );
  const badge = await result.json();
  res.json({
    schemaVersion: 1,
    label: (<string>req.query.status).replace(/_/g, " "),
    message: badge[req.query.status],
    color: req.query.status === "error" ? "red" : "green",
  });
}
