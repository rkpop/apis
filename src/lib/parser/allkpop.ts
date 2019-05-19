import Cheerio from "cheerio";
import { isUndefined } from "util";
import Moment from "moment";

import { Article } from "../../model";
import { get, fromXAgo } from "../../lib/general";

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const getAuthor = async (cheerio: CheerioStatic): Promise<string> => {
  return cheerio(".author")
    .text()
    .trim();
};

const getTitle = async (cheerio: CheerioStatic): Promise<string> => {
  return cheerio("#article-title")
    .text()
    .trim();
};

const getVerification = async (cheerio: CheerioStatic): Promise<boolean> => {
  return cheerio(".akp_staff").length > 0;
};

const getDate = async (cheerio: CheerioStatic): Promise<Date> => {
  let dateArray = cheerio(".home_left")
    .text()
    .trim()
    .split(" ")
    .slice(-4);
  if (daysOfWeek.indexOf(dateArray[0].slice(0, -1)) != -1) {
    return Moment(dateArray.slice(1).join(" "), "MMMM DD, YYYY").toDate();
  } else {
    return fromXAgo(parseInt(dateArray[1], 10), dateArray[2]);
  }
};

const parser = async (url: string): Promise<Article | null> => {
  const data = await get(url);
  if (isUndefined(data)) {
    return null;
  }
  const processable = Cheerio.load(data);
  const [author, title, isVerified, date] = await Promise.all([
    getAuthor(processable),
    getTitle(processable),
    getVerification(processable),
    getDate(processable),
  ]);
  const article: Article = { author, title, isVerified, date };
  return article;
};

export default parser;
