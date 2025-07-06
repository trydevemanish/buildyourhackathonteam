import { NextResponse } from "next/server";
import puppeteer from "puppeteer";
import * as cheerio from "cheerio";

type results = {
   name :string
   imgSrc : string;
   img :string;
   timeLeft :string;
   prize : string;
   participants :string;
}

export async function GET() {
  try {

    const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    // Load the page
    const response = await page.goto("https://devpost.com/hackathons", {
      waitUntil: "networkidle2",
    });

    if (!response || response.status() !== 200) {
      throw new Error("Failed to load Devpost hackathons page");
    }

    // Wait for dynamic content
    await page.waitForSelector(".hackathons-container", { timeout: 60000 });

    // Get HTML after JS execution
    const content = await page.content();
    await browser.close();

    // Parse with Cheerio
    const $ = cheerio.load(content);
    const results: results[] = [];

    $(".hackathon-tile").each((i, el) => {
      const name = $(el).find("h3").text().trim();
      const imgSrc = $(el).find("img.hackathon-thumbnail").attr("src") || "";
      const img = imgSrc.startsWith("//") ? "https:" + imgSrc : imgSrc;
      const timeLeft = $(el).find(".status-label").text().trim();
      const prize = $(el).find(".prize-amount").text().trim();
      const participants = $(el).find(".participants strong").text().trim();

      if (name) {
        results.push({
          name, img, timeLeft, prize, participants,
          imgSrc: ""
        });
      }

    });

    console.log('Result in backend',results)

    return NextResponse.json(
      { message: "Scraped successfully", data: results },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: `Issue occurred while scraping: ${error}` },
      { status: 500 }
    );
  }
}