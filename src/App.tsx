import { useState, useRef, useEffect } from "react"
import { nanoid } from "nanoid"
import ReactConfetti from "react-confetti";

import Die from "./components/Die"

export interface DieType {
    id: string,
    value: number,
    isHeld: boolean,
  }

function App() {

  
  const [dieNumbers, setDieNumbers] = useState<DieType[]>(() => get10RandomDieNum());
  const [confettiDim, setConfettiDim] = useState([window.innerWidth, window.innerHeight]);
  const [rollCount, setRollCount] = useState(0);
  const rollBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const updateDimensions = () => {
      setConfettiDim([window.innerWidth, window.innerHeight]);
    };
    
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [])

  const gameWon = dieNumbers.every(obj => (obj.isHeld && obj.value == dieNumbers[0].value));

  useEffect(() => {
    if (gameWon) rollBtn.current?.focus();
  }, [gameWon]);

  function get10RandomDieNum(): DieType[] {
    return new Array(10)
      .fill(0)
      .map(() => {
        return {id: nanoid(), value: Math.ceil(Math.random() * 6), isHeld: false}
      } )
  }

  function holdDice(id: string){
    setDieNumbers(prev => (
      prev.map(obj => (
        obj.id === id ? { ...obj, isHeld: !obj.isHeld } : obj
      ))
    ))
  }

  function handleRollAllDices(){
    if(gameWon){
      setDieNumbers(get10RandomDieNum());
      setRollCount(0);
      return;
    };
    setRollCount(prev => prev + 1);
    setDieNumbers(prev => {
      return prev.map(obj => (
        obj.isHeld ? obj : { ...obj, value: Math.ceil(Math.random() * 6) }
      ))
    })
  }


  return (
    <>
    { gameWon && <ReactConfetti width={confettiDim[0]}  height={confettiDim[1]}/> }
    <main className="min-h-screen flex justify-center items-center flex-col">
      <h1 className="text-6xl mt-5">Tenzies</h1>
      <p className="text-lg m-5 text-center">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="flex items-center gap-x-2 font-medium"><span>Roll count: </span><h2 className="inline text-4xl font-bold">{rollCount}</h2></div>
      <div className="die-container dark:bg-[#222] rounded-4xl p-10 m-10 grid grid-cols-2 nm:grid-cols-3 sm:grid-cols-5 gap-4 shadow-[0_0_20px]">
        {dieNumbers.map(dieObj => {
          return <Die key={dieObj.id} dieObj={dieObj} holdDice={() => holdDice(dieObj.id)} gameWon={gameWon} />
        })}
      </div>
      <button ref={rollBtn} onClick={handleRollAllDices} className="rounded-md font-bold text-xl py-2 px-4 shadow-md dark:shadow-[dodgerblue] active:shadow-none transition-colors duration-500 mb-10">{gameWon ? "New Game" : "Roll"}</button>
    </main>
  </>
  )
}

export default App;
