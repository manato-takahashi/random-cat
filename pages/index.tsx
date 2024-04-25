import { GetServerSideProps, NextPage } from "next";
import { useState } from "react";

// getServerSidePropsから渡されるpropsの型
type Props = {
    initialImageUrl: string;
}

// ページコンポーネント関数にpropsを受け取る引数を追加する
const IndexPage: NextPage<Props> = ({ initialImageUrl }) => {
    // useStateを使って2つの状態を定義する
    const [imageUrl, setImageUrl] = useState(initialImageUrl); // 初期値を渡す
    const [loading, setLoading] = useState(false); // 初期状態はfalseにしておく

    // // マウント時に画像を読み込む宣言
    // useEffect(() => {
    //     fetchImage().then((newImage) => {
    //         setImageUrl(newImage.url); // 画像URLの状態を更新する
    //         setLoading(false); // ローディング状態を更新する
    //     });
    // }, []);

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

// サーバーサイドで実行する処理
export const getServerSideProps: GetServerSideProps<Props> = async () => {
    const image = await fetchImage();
    return {
        props: {
            initialImageUrl: image.url,
        },
    };
};

type Image = {
    url: string;
};

const fetchImage = async (): Promise<Image> => { // asyncは非同期処理を行うことを示す
    const res = await fetch("https://api.thecatapi.com/v1/images/search"); // awaitは非同期処理の結果を待つことを示す
    const images = await res.json(); // awaitは非同期処理の結果を待つことを示す
    console.log(images);
    return images[0];
};

