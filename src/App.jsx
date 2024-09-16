import { useState } from 'react'
import './App.css'
import { useEffect } from 'react'

function App (){
  /* to store the products from the source */
  const [products, setProducts] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  /* fetch the products from the website/source */
  const fetchProducts = async()=>{
    const response = await fetch("http://dummyjson.com/products?limit=100")
    const data = await response.json()

    if (data && data.products) {
      setProducts(data.products)
    }
  }

  useEffect(()=>{
    fetchProducts();
  },[])

  /* handler funtion for pages */

  const selectPageHandler = (selectedPage) =>{
    if (selectedPage >=1  && selectedPage !== page && selectedPage <= products.length/10) {
      setPage(selectedPage)
    }
  }
  return(
    <div className='App'>
      <h1>React Pagination Application</h1>
      {
        products.length &&(
          /* each page gives 10 product items (0-10, 10-20, 20-30 likewise) */
          <div>
            {
              /* if page is 2,=> 2*10 -10 = 10, 2*10=20.map=> products.slice(10,20).map((prod)=>{}) */
              products.slice((page-1)*10, page*10).map((prod)=>{
                return(
                  /* getting each 10 products image and title */
                  <div key={prod.id}>
                    <img src={prod.thumbnail} alt="product image" />
                    <div>{prod.title}</div>
                  </div>
                )
              })
            }
          </div>
        )
      }

      {/* for pages under the products, prev, c.pages(10 pages), next*/}
      {
        products.length && (
          <div className='pagination'>
            <span onClick={()=>selectPageHandler(page - 1)}>prev</span>

            {/* for selected page/to show 10 pages to select  */}
            {
              [...Array(products.length/10)].map((_,i)=>{
                return(
                  <span
                    className={page === i+1?"pagination_selected":""}
                    onClick={()=>selectPageHandler(i+1)}
                    key={i}>
                      {i + 1}
                  </span>
                )
              })
            }

            <span onClick={()=>selectPageHandler(page + 1)}>next</span>
          </div>
        )
      }
    </div>
  )
}
export default App