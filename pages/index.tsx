import { NextPage } from "next";

const IndexPage: NextPage = () => {
    return <div>猫画像予定地</div>;
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

