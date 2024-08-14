import FilterProducts from '../Components/FilterProducts';


function AdminProductsList() {
  return (
    <div className='w-full flex flex-col'>
        <div className='flex flex-col justify-center pb-40'>
        <FilterProducts action={'edit'}/>
        </div>
    </div>
  )
}

export default AdminProductsList