import { ReactNode } from "react";

const HighlightProperty = ({ label, value }: { label: string, value: ReactNode }) => {
  return (
    <>
      <div className="flex my-1">
        <div className="w-1/2 font-mono font-semibold">{label}:</div>
        <div className="font-mono">{value}</div>
      </div>
    </>
  )
}

export default HighlightProperty;