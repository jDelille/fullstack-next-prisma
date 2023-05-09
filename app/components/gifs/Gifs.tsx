'use client'

import { Grid } from "@giphy/react-components";
import { useState } from "react";
import { GiphyFetch } from "@giphy/js-fetch-api";
import styles from './Gifs.module.scss';
import ResizeObserver from "react-resize-observer";
import Input from "../input/Input";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

const giphyFetch = new GiphyFetch("sXpGFDGZs0Dv1mmNFvYaGUvYwKX0PWIh");

type GifsProps = {
 onChange: (base64: string) => void;
 setCustomValue: (id: string, value: any) => void;
 register: UseFormRegister<FieldValues>;
 errors: FieldErrors;
}

const Gifs: React.FC<GifsProps> = ({ onChange, setCustomValue, register, errors }) => {
 const fetchGifs = (offset: number) =>
  giphyFetch.trending({ offset, limit: 10 });
 const [width, setWidth] = useState(window.innerWidth);
 return (
  <SimpleBar className={styles.gifs}>
   <div className={styles.search}>
    <Input placeholder="Search for a gif" id="gifSearch" label="" register={register} errors={errors} />
   </div>
   <Grid
    onGifClick={(gif, e) => { e.preventDefault(); setCustomValue('photo', gif.images.downsized) }}
    fetchGifs={fetchGifs}
    width={400}
    columns={3}
    gutter={2}
   />
   <ResizeObserver
    onResize={({ width }) => {
     setWidth(width);
    }}
   />
  </SimpleBar>
 );
}

export default Gifs;