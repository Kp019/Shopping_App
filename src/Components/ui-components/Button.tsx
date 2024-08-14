interface ButtonProps {
    btnName: string;
  }

  
export const CartButtons = () => {
    return (
        <div className="flex  border-2 px-6 py-2 w-full rounded-full justify-center items-center gap-2 hover:shadow-lg duration-300">
            <img className=" w-5" src="https://img.icons8.com/?size=100&id=85080&format=png&color=000000"/>
            <div>add to cart</div>
        </div>
    )
}

export const PrimaryButton = ({btnName}:ButtonProps) => {
    return (
        <button className="bg-blue-700 text-white w-full px-6 py-2 rounded-full">{btnName}</button>
    )
}

export const SecondaryButton = ({btnName}:ButtonProps) => {
    return (
        <button className="bg-blue-500 border-2 text-white w-full px-6 py-2 rounded-full">{btnName}</button>
    )
}