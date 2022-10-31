import { useEffect } from 'react';

function loadImage(src) {
  return new Promise((resolve, reject) => {
    let img = new Image();
    img.src = src;
    img.onload = function () {
      resolve();
    };
  });
}

export default function IndexPage() {
  useEffect(() => {
    const canvas = document.getElementById('canvas');
    // 通过判断getContext方法是否存在来判断浏览器的支持性
    if (canvas.getContext) {
      // 获取绘图上下文
      const ctx = canvas.getContext('2d');
      const sun = new Image();
      const moon = new Image();
      const earth = new Image();
      function init() {
        sun.src = 'https://img.lovepik.com/element/40097/4339.png_300.png';
        moon.src =
          'https://www.freepnglogos.com/uploads/moon-png/moon-png-annual-celestial-overview-simone-matthews-18.png';
        earth.src =
          'http://inews.gtimg.com/newsapp_bt/0/6520150605/641.jpg&refer=http://inews.gtimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1669533779&t=0f6bbe3d562cc79b287b623a1eccf47f';
        Promise.all([
          loadImage('https://img.lovepik.com/element/40097/4339.png_300.png'),
          loadImage(
            'https://www.freepnglogos.com/uploads/moon-png/moon-png-annual-celestial-overview-simone-matthews-18.png',
          ),
          loadImage(
            'http://inews.gtimg.com/newsapp_bt/0/6520150605/641.jpg&refer=http://inews.gtimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1669533779&t=0f6bbe3d562cc79b287b623a1eccf47f',
          ),
        ]).then(() => {
          window.requestAnimationFrame(draw);
        });
      }
      function draw() {
        const ctx = document.getElementById('canvas').getContext('2d');
        ctx.globalCompositeOperation = 'destination-over';
        // 清空画布
        ctx.clearRect(0, 0, 500, 500);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
        ctx.strokeStyle = 'rgba(0, 153, 255, 0.4)';
        ctx.save(); // 第一次保存画布状态
        ctx.translate(250, 250); // 把原心移到画布中间
        // 画一个地球
        const time = new Date();
        const earthDeg =
          ((2 * Math.PI) / 60) * time.getSeconds() +
          ((2 * Math.PI) / 60000) * time.getMilliseconds();
        ctx.rotate(earthDeg);
        ctx.translate(200, 0);

        ctx.save();
        ctx.clearRect(0, 0, 80, 80);
        ctx.beginPath();
        ctx.arc(0, 0, 20, 0, Math.PI * 2, false);
        ctx.clip();
        ctx.drawImage(earth, -20, -20, 40, 40);
        ctx.closePath();
        ctx.restore();
        // 画一个月亮
        // ctx.save(); // 第二次保存画布状态
        const moonDeg =
          ((2 * Math.PI) / 6) * time.getSeconds() +
          ((2 * Math.PI) / 6000) * time.getMilliseconds();
        ctx.rotate(moonDeg);
        ctx.translate(0, 40);
        ctx.drawImage(moon, -7.5, -7.5, 15, 15);
        // 恢复状态
        // ctx.restore();
        ctx.restore();
        // 画一个地球运行的轨迹
        ctx.beginPath();
        ctx.arc(250, 250, 200, 0, Math.PI * 2, false);
        ctx.stroke();
        // 画一个太阳
        ctx.drawImage(sun, 0, 0, 500, 500);
        window.requestAnimationFrame(draw);
      }
      init();
    }
  }, []);
  return (
    <div>
      <canvas id="canvas" width="500" height="500">
        当前浏览器不支持canvas元素，请升级或更换浏览器！
      </canvas>
    </div>
  );
}
