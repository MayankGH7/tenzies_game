import {useEffect, useRef} from "react";
import { DieType } from "../App";
import party from "party-js";

import DieFace from "./DieFace";

interface PropsType {
  dieObj: DieType,
  holdDice: () => void,
  gameWon: boolean
}

const Die = ({dieObj, holdDice, gameWon}: PropsType) => {
  
  const btn = useRef(null);

  useEffect(() => {
    if(gameWon) party.confetti(btn.current! as HTMLButtonElement);
  }, [gameWon]);

  function handleClick()  {
    holdDice();
  } 

  return (
    <button ref={btn} onClick={handleClick} disabled={gameWon} className={`diebtn dark:bg-dark size-20 text-2xl p-4 rounded-xl font-bold shadow-md dark:shadow-purple-500 hover:scale-[1.1] hover:shadow-[none] transition-all duration-500 cursor-pointer  ${dieObj.isHeld && "bg-green-500 dark:bg-holdDie"}`} 
    aria-label={`Die with value ${dieObj.value}, ${dieObj.isHeld ? "held": "not held"}`}
    aria-pressed={dieObj.isHeld}>
      {/* {dieObj.value} */}
      <DieFace face={dieObj.value} />
      </button>
  )
};

export default Die;
