import { useState } from "react"
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
  const gameWon = dieNumbers.every(obj => (obj.isHeld && obj.value == dieNumbers[0].value));

  function get10RandomDieNum(): DieType[] {
    return new Array(10)
      .fill(0)
      .map(() => {
        return {id: nanoid(), value: Math.ceil(Math.random() * 6), isHeld: false}
      } )
  }

  function holdDice(id: string){
    setDieNumbers(prev => (
      prev.map(obj => {
        if(obj.id == id) obj.isHeld = !obj.isHeld;
        return obj;
      })
    ))
  }

  function handleRollAllDices(){
    if(gameWon){
      setDieNumbers(get10RandomDieNum());
      return;
    }
    setDieNumbers(prev => {
      return prev.map(obj => {
        if(!obj.isHeld) obj.value = Math.ceil(Math.random() * 6);
        return obj;
      })
    })
  }


  return (
    <main className="min-h-screen flex justify-center items-center flex-col">
      { gameWon && <ReactConfetti /> }
      <h1 className="text-6xl">Tenzies</h1>
      <p className="text-lg m-5">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dark:bg-[#222] rounded-4xl p-10 m-10 grid grid-cols-3 sm:grid-cols-5 gap-4 shadow-[0_0_20px] dark:shadow-red-500">
        {dieNumbers.map(dieObj => {
          return <Die key={dieObj.id} dieObj={dieObj} holdDice={() => holdDice(dieObj.id)}  />
        })}
      </div>
      <button onClick={handleRollAllDices} className="rounded-md font-bold text-xl py-2 px-4 shadow-md dark:shadow-red-500 active:shadow-none transition-colors duration-500">{gameWon ? "New Game" : "Roll"}</button>
    </main>
  )
}

export default App;
