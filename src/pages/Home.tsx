import { useEffect, useState } from "react"
import ConfettiExplosion, { ConfettiProps } from 'react-confetti-explosion';
import emojis from "../emoji/emoji.json";


const Home = () => {

    const largeProps: ConfettiProps = {
        force: 0.8,
        duration: 10000,
        particleCount: 300,
        width: 1600,
        colors: ['#041E43', '#1471BF', '#5BB4DC', '#FC027B', '#66D805'],
        onComplete: () => startAgain()
    };

    const [isExploding, setIsExploding] = useState<boolean>(false);
    const [boxes, setBoxes] = useState<string[]>([])
    const [numberOfSelection, setNumberOfSelection] = useState<number>(0);
    const [selectedIndex, setSelectedIndex] = useState<number[]>([]);
    const [solvedIndex, setSolvedIndex] = useState<number[]>([]);

    const handleClick = (index: number) => {
        if (selectedIndex.includes(index)) {
            setNumberOfSelection(numberOfSelection === 0 ? 0 : numberOfSelection - 1)
            setSelectedIndex(selectedIndex.filter((i: number) => index !== i));
        } else {
            if (numberOfSelection === 2) {
                if (boxes[selectedIndex[0]] === boxes[selectedIndex[1]]) {
                    setSolvedIndex([...solvedIndex, selectedIndex[0], selectedIndex[1]])
                }
                setNumberOfSelection(1)
                setSelectedIndex([index]);
            } else {
                setNumberOfSelection(numberOfSelection + 1)
                setSelectedIndex([...selectedIndex, index]);
            }
        }
    }

    const startAgain = () => {
        const emojisArray = emojis.sort(() => 0.5 - Math.random())
        let randomEmojis = emojisArray.slice(0, 18);
        setBoxes([...randomEmojis.sort(() => 0.5 - Math.random()), ...randomEmojis.sort(() => 0.5 - Math.random())])
        setIsExploding(false)
        setNumberOfSelection(0)
        setSelectedIndex([])
        setSolvedIndex([])
    }

    useEffect(() => {
        const emojisArray = emojis.sort(() => 0.5 - Math.random())
        let randomEmojis = emojisArray.slice(0, 18);
        setBoxes([...randomEmojis.sort(() => 0.5 - Math.random()), ...randomEmojis.sort(() => 0.5 - Math.random())])
    }, [])

    useEffect(() => {
        if (boxes.length > 0 && boxes.length === solvedIndex.length) setIsExploding(true)
    }, [solvedIndex])


    return (
        <div className="container">
            <h2 className="heading">Guess the Emoji!</h2>
            {isExploding ? <ConfettiExplosion {...largeProps} /> : null}
            <div className="layout">
                {boxes.map((box: any, index: number) => {
                    const condition = selectedIndex.includes(index) || solvedIndex.includes(index);
                    return (
                        <div key={index} className={`item ${condition ? 'warning-bg' : 'danger-bg'}`} onClick={() => handleClick(index)}>
                            {condition ?
                                <span className="emoji">
                                    {box}
                                </span> : <span className="emoji colorTransparent">0</span>}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Home