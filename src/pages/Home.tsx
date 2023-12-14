import { Fragment, useEffect, useState } from "react"
import emojis from "../emoji/emoji.json";

const Home = () => {
    const [boxes, setBoxes] = useState<string[]>([])
    const handleClick = (index: number) => {
        console.log(index)
    }

    useEffect(() => {
        const emojisArray = emojis.sort(() => 0.5 - Math.random())
        let randomEmojis = emojisArray.slice(0, 18);
        setBoxes([...randomEmojis.sort(() => 0.5 - Math.random()), ...randomEmojis.sort(() => 0.5 - Math.random())])
    }, [])

    return (
        <div className="container">
            <h2 className="heading">Guess the Object!</h2>
            <div className="layout">
                {boxes.map((box: any, index: number) => (
                    <div key={index} className="item" onClick={() => handleClick(box)}><span className="emoji">{box}</span></div>
                ))}
            </div>
        </div>
    )
}

export default Home