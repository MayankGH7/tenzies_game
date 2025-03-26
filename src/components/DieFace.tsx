function DieFace({ face }: { face: number }) {
  const layouts: Record<number, React.JSX.Element> = {
    1: <div className="size-full flex items-center justify-center"><span className="die-face"></span></div>,
    2: <div className="size-full flex flex-col justify-between"><span className="die-face self-end"></span><span className="die-face"></span></div>,
    3: <div className="size-full flex flex-col justify-between"><span className="die-face self-end"></span><span className="die-face self-center"></span><span className="die-face"></span></div>,
    4: <div className="size-full grid grid-cols-2"><span className="die-face self-start justify-self-start"></span><span className="die-face self-start justify-self-end"></span><span className="die-face self-end justify-self-start"></span><span className="die-face self-end justify-self-end"></span></div>,
    5: <div className="size-full grid grid-cols-2 relative"><span className="die-face self-start justify-self-start"></span><span className="die-face self-start justify-self-end"></span><span className="die-face absolute top-1/2 left-1/2 -translate-1/2"></span><span className="die-face self-end justify-self-start"></span><span className="die-face self-end justify-self-end"></span></div>,
    6: <div className="size-full grid grid-cols-2"><span className="die-face self-start justify-self-start"></span><span className="die-face self-start justify-self-end"></span><span className="die-face self-center justify-self-start"></span><span className="die-face self-center justify-self-end"></span><span className="die-face self-end justify-self-start"></span><span className="die-face self-end justify-self-end"></span></div>
  };
  
  return layouts[face];
}

export default DieFace;