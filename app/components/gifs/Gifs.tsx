'use client'

import { Grid } from "@giphy/react-components";
import { useState } from "react";
import { GiphyFetch } from "@giphy/js-fetch-api";
import styles from './Gifs.module.scss';
import ResizeObserver from "react-resize-observer";

const giphyFetch = new GiphyFetch("sXpGFDGZs0Dv1mmNFvYaGUvYwKX0PWIh");

type GifsProps = {
 onChange: (base64: string) => void;
 setCustomValue: (id: string, value: any) => void;
}

const Gifs: React.FC<GifsProps> = ({ onChange, setCustomValue }) => {
 const fetchGifs = (offset: number) =>
  giphyFetch.trending({ offset, limit: 10 });
 const [width, setWidth] = useState(window.innerWidth);
 return (
  <div className={styles.gifs}>
   <Grid
    onGifClick={(gif, e) => { e.preventDefault(); setCustomValue('photo', gif.images.downsized) }}
    fetchGifs={fetchGifs}
    width={width}
    columns={2}
    gutter={6}
   />
   <ResizeObserver
    onResize={({ width }) => {
     setWidth(width);
    }}
   />
  </div>
 );
}

export default Gifs;