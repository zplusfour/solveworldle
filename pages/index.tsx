import { GetServerSideProps } from "next";
import * as puppeteer from "puppeteer";
import { useState } from "react";
import Image from "next/image";
import { CODES } from "../src/codes";

// @ts-ignore
export default function Home({ answer, fl }) {
  const [country, setCountry] = useState<string>("");
  const [flag, showFlag] = useState<boolean>(false);

  return (
    <div className="container">
      <header style={{textAlign:'center'}}>
        <Image src={fl} alt={`flag of ${country}`} width="128" height="75" style={{ display: flag ? 'block' : 'none' }} />
        <h1 id="r" style={{ fontSize: '40px' }}>{country}</h1>
      </header>
      <div style={{textAlign:'center'}}>
        <button
          onClick={() => { setCountry(answer); showFlag(true) }}
          style={{ borderRadius: '20px', border: 'none' }}
        >🎉 reveal</button>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (_ctx) => {
  const browser = await puppeteer.launch({});
  const page = await browser.newPage();

  await page.goto('https://worldle.teuteuf.fr/');
  let img = await page.waitForSelector('img.h-full');
  // @ts-ignore
  let imgSrc = await page.evaluate(img => img.src, img);
  let code = imgSrc.replace('https://', '').split('/')[3];
  let answer = CODES[code];
  let flag = `https://countryflagsapi.com/png/${code}`;

  return {
    props: {
      answer,
      fl: flag
    }
  }
}