import { DieType } from "../App";

interface PropsType {
  dieObj: DieType,
  holdDice: () => void
}

const Die = ({dieObj, holdDice}: PropsType) => {

  return (
    <button onClick={() => holdDice()} className={`diebtn dark:bg-dark size-20 text-2xl p-4 rounded-xl font-bold shadow-md dark:shadow-purple-500 hover:scale-[1.1] hover:shadow-[none] transition-all duration-500 cursor-pointer  ${dieObj.isHeld && "bg-green-500 dark:bg-holdDie"}`} 
    aria-label={`Die with value ${dieObj.value}, ${dieObj.isHeld ? "held": "not held"}`}
    aria-pressed={dieObj.isHeld}
    >{dieObj.value}</button>
  )
};

export default Die;
