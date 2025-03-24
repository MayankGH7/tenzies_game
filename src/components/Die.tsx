import { DieType } from "../App";

interface PropsType {
  dieObj: DieType,
  holdDice: () => void
}

const Die = ({dieObj, holdDice}: PropsType) => {

  return (
    <button onClick={() => holdDice()} className={`dark:bg-dark size-20 text-2xl p-4 rounded-md font-bold shadow-md dark:shadow-red-500 hover:shadow-[none] transition-shadow duration-500 cursor-pointer ${dieObj.isHeld && "bg-green-500"}`}>{dieObj.value}</button>
  )
};

export default Die;