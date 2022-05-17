import React,{useState} from 'react'
import { Button } from 'antd'
import style from './index.module.css'
export default function Bag() {
  const [status, setstatus] = useState(false)
  const change=()=>{
    setstatus(true)
    }
  return (
    <div>
      <Button onClick={()=>change()}>点我</Button>
        <div className={style['box']}>
            <div className={style['front']} style={{opacity:status?'0':'',
            transform:status?'translateX(-110px)':'',
            // transform:status?'rotateX(+' + 90 + 'deg)':''
            }}>
                <span>apple</span>
            </div>
            <div className={style['back']} style={{opacity:status?'1':'',
            transform:status?'translateX(0px)':'',
            // transform:status?'rotateX(+' + 0 + 'deg)':''
            }}>
                <span>apple</span>
                <p>HTML5+CSS3实现悬停翻转的3D卡片</p>
            </div>
        </div>
    </div>
  )
}
