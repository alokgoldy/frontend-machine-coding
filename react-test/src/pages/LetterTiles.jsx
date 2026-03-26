import { useState, useMemo, useCallback } from 'react';

const style = {
  letterContainer: {
    overflow: 'auto'
  },
  letter: {
    float: "left",
    padding: "10px 10px",
    background: "#c9e4ed",
    borderRadius: "5px",
    marginRight: "5px",
    marginTop: "5px",
    cursor: "pointer",
  },
  outputString: {
    marginTop: "20px",
    textAlign: "center",
  }
}

const Tile = ({ letter, outputArray, setOutputArray, tally, setTally }) => {

  const onClick = useCallback(() => {
    if (!tally[letter]) {
      setTally({ ...tally, [letter]: 1 })
      setOutputArray([...outputArray, letter])
    } else if (tally[letter] && tally[letter] === 2) {
      setTally({ ...tally, [letter]: 0 })
      const slicedArray = outputArray.slice(0, outputArray.length - 2)
      setOutputArray([...slicedArray, "_"])
    } else {
      setTally({ ...tally, [letter]: tally[letter] + 1 })
      setOutputArray([...outputArray, letter])
    }
  }, [letter, outputArray, setOutputArray, tally, setTally])


  return (
    <button type="button" onClick={onClick} style={style.letter}>
      {letter}
    </button>
  )
}

export default function LetterTile() {
  const [outputArray, setOutputArray] = useState([]);
  const [tally, setTally] = useState({});

  const alphabetArray = useMemo(() => {
    const arr = [];

    for (let i = 65; i <= 90; i++) {
      const char = String.fromCharCode(i);
      arr.push(char);
    }
    return arr;
  }, [])

  return (
    <section>
      <aside style={style.letterContainer} id="letterContainer">
        {alphabetArray.map((letter, idx) => (
          <Tile
            tally={tally}
            setTally={setTally}
            letter={letter}
            key={idx}
            outputArray={outputArray}
            setOutputArray={setOutputArray}
          />
        ))}
      </aside>
      <div style={style.outputString} id="outputString">
        {outputArray.join("")}
      </div>
    </section>
  )
}