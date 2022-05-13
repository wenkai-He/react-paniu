import React, { useState} from 'react'
import style from './index.module.css'
import { UpCircleOutlined, DownCircleOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom';
export default function Main() {
    const navigate = useNavigate()
    const [day, setday] = useState(1)
    const change = (str) => {
        setday(str)
    }
    // useEffect(() => {
    //     var owen = document.getElementById('owen');
    //     owen.width = 1000;
    //     owen.height = 1000;
    //     var context = owen.getContext('2d');
    //     context.strokeStyle = 'white';
    //     context.beginPath();
    //     context.arc(700,265,15,0,Math.PI*2,true)
    //     context.closePath();
    //     context.fillStyle='white';
    //     context.fill();

    //     context.beginPath();
    //     context.arc(600,255, 100, 0, Math.PI/4, false)
    //     context.stroke();

    //     context.moveTo(670, 325);//创建一个起点
    //     context.lineTo(640, 320);//创建一个终点然后连起来
    //     context.lineTo(640, 360);//创建一个终点然后连起来
    //     context.stroke();
    // }, [])


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
                <div className={style['btn-box-item']} onClick={() => {
                    navigate('/register')
                }}>
                    <UserAddOutlined /> 注册
                </div>
                <div className={style['btn-box-item']} onClick={() => {
                    navigate('/login')
                }}>
                    <UserOutlined /> 登陆
                </div>
            </div>
            <div>

            </div>
            <div className={day === 1 ? style['light'] : style['dark']} id={style['container']} >
                <div className={style['bg']}></div>
                <div className={style['moon-box']}>
                    {/* <canvas id="owen" >
                        您的浏览器不支持canvas，请更换浏览器.
                    </canvas> */}
                    <div className={style['moon']}></div>
                </div>
                <div className={style['sun-box']}>
                    <div className={style['sun']}></div>
                </div>
                <div className={style['sea']}>
                    <span className='iconfont' style={{ fontSize: '100px', color: day === 1 ? '' : 'white' }}>&#xe642;</span>
                </div>
            </div>

        </div>
    )
}
