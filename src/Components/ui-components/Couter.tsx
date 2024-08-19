export const Counterbtn = ({action}:any) => {
    return(
        <div className=" hover:cursor-pointer">
            {action === 'add' ? 
            <div>
                <img className="w-6" src="https://img.icons8.com/?size=100&id=84991&format=png&color=000000" alt="" />
            </div>:<div>
                <img className="w-6" src="https://img.icons8.com/?size=100&id=14088&format=png&color=000000" alt="" />
            </div>}
        </div>
    )
}