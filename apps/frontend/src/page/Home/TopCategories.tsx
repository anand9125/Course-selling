import CardComponent from "../../componets/TopCard"

function Topcategories() {
  return (
    <div>
        <div>
            <div className="max-w-7xl mx-auto sm:pl-3">
                <div className=' font-semibold p-5  text-2xl md:text-center'>
                    Top Categories
                </div>
                <CardComponent></CardComponent>
            </div>
        </div>
    </div>
  )
}

export default Topcategories