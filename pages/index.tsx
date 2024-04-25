import { NextPage } from "next";
import { useEffect, useState } from "react";

const IndexPage: NextPage = () => {
    // useStateを使って2つの状態を定義する
    const [imageUrl, setImageUrl] = useState("");
    const [loading, setLoading] = useState(true);
    // マウント時に画像を読み込む宣言
    useEffect(() => {
        fetchImage().then((newImage) => {
            setImageUrl(newImage.url); // 画像URLの状態を更新する
            setLoading(false); // ローディング状態を更新する
        });
    }, []);
    // ボタンをクリックしたときに画像を読み込む処理
    const handleClick = async () => {
        setLoading(true); // 読み込み中フラグを立てる
        const newImage = await fetchImage();
        setImageUrl(newImage.url); // 画像URLの状態を更新する
        setLoading(false); // ローディング状態を更新する
    };
    return (
        <div>
            <button onClick={handleClick}>他のにゃんこも見る</button>
            <div>{ loading || <img src={imageUrl} /> }</div>
        </div>
    );
};
export default IndexPage;

type Image = {
    url: string;
};

const fetchImage = async (): Promise<Image> => { // asyncは非同期処理を行うことを示す
    const res = await fetch("https://api.thecatapi.com/v1/images/search"); // awaitは非同期処理の結果を待つことを示す
    const images = await res.json(); // awaitは非同期処理の結果を待つことを示す
    console.log(images);
    return images[0];
};

