import React, { useState } from 'react'
import style from './index.module.css'
import { UpCircleOutlined, DownCircleOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons'
export default function Main() {
    const [day, setday] = useState(1)
    const change = (str) => {
        setday(str)

    }
    return (
        <div>
            <div className={style['btn-box']}>
                <div className={style['btn-box-item']} onClick={() => change(1)}>
                    <UpCircleOutlined /> 你叉叉
                </div>
                <div className={style['btn-box-item']} onClick={() => change(0)}>
                    <DownCircleOutlined /> 穷哈哈
                </div>
            </div>
            <div className={style['btn-button']}>
                <div className={style['btn-box-item']} >
                    <UserAddOutlined /> 注册
                </div>
                <div className={style['btn-box-item']} >
                    <UserOutlined /> 登陆
                </div>
            </div>
            <div>

            </div>
            <div className={day === 1 ? style['light'] : style['dark']} id={style['container']} >
                <div className={style['bg']}></div>
                <div className={style['moon-box']}>
                    <div className={style['moon']}></div>
                </div>
                <div className={style['sun-box']}>
                    <div className={style['sun']}></div>
                </div>
                <div className={style['sea']}>
                    <span class='iconfont' style={{fontSize:'100px',color:day===1?'':'white'}}>&#xe642;</span>
                </div>
            </div>

        </div>
    )
}
