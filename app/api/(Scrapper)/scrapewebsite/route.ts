import { NextResponse } from "next/server";
import puppeteer from "puppeteer";
import * as cheerio from "cheerio";

export async function GET() {
  try {

    const browser = await puppeteer.launch({
      // headless: "new", // headless mode, modern chromium
      args: ["--no-sandbox", "--disable-setuid-sandbox"], // for server environments
    });

    const page = await browser.newPage();
  
    // Go to the page
    await page.goto("https://devpost.com/hackathons", {
      waitUntil: "networkidle2", // wait until network is idle
    });
  
    // Get the full HTML after JS executes
    const content = await page.content();
    await browser.close();
  
    // Load into Cheerio
    const $ = cheerio.load(content);
  
    // Parse hackathons
    const results: any[] = [];
  
    $(".hackathon-tile").each((i, el) => {
      const name = $(el).find("h3").text().trim();

      console.log('result.name: ',name)
  
      const imgSrc =
        $(el).find("img.hackathon-thumbnail").attr("src") || "";
      const img = imgSrc.startsWith("//")
        ? "https:" + imgSrc
        : imgSrc;
  
      const timeLeft = $(el)
        .find(".status-label")
        .text()
        .trim();
  
      const prize = $(el)
        .find(".prize-amount")
        .text()
        .trim();
  
      const participants = $(el)
        .find(".participants strong")
        .text()
        .trim();
  
      results.push({
        name,
        img,
        timeLeft,
        prize,
        participants,
      });
    });

    console.log('Result: ',results)
  
    // Return JSON response
    return NextResponse.json(
      { message: "Scraped successfully", data: results },
      { status: 200 }
    );
    
  } catch (error) {
    return NextResponse.json(
        {message:`Issue Ocuured while Scraping: ${error}`},
        {status:500}
    )
  }
}
