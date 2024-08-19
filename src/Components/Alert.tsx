import { useState } from "react"

interface AlertProps {
    text: string;
    fn: (flag: boolean) => void;
  }

  export const Alert: React.FC<AlertProps> = ({ text, fn }) => {
    const [flag, setFlag] = useState(true)
    return (
        <div className={`mt-10 w-[300px] py-5 flex justify-between px-10 items-center bg-blue-200 rounded-md hover:cursor-pointer shadow-md absolute z-50 ${flag?'block':'hidden'}`}>
            <div>{text}</div>
            <div onClick={ () => {setFlag(!flag); fn(true)}}>x</div>
        </div>
    )
}