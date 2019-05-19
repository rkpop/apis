import Cheerio from "cheerio";
import { isUndefined } from "util";

import { Article } from "../../model";
import { get } from "../../lib/general/request";

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

const parser = async (url: string): Promise<Article | null> => {
  const data = await get(url);
  if (isUndefined(data)) {
    return null;
  }
  const processable = Cheerio.load(data);
  const [author, title, isVerified] = await Promise.all([
    getAuthor(processable),
    getTitle(processable),
    getVerification(processable),
  ]);
  const article: Article = { author, title, isVerified };
  return article;
};

export default parser;
