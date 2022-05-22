import React,{useEffect} from 'react'
import axios from 'axios'
export default function Bag() {
  useEffect(() => {
    axios.get('/api2/findStockRange?code=sh600519&start=20200101&end=20220520').then(res=>{
      console.log(res.data);
    })       
  }, [])
  
  return (
    <div>Bag</div>
  )
}
