<template>
  <div :style="{ background: `url(${bg})` }" class="box">
    <div class="box-left">
      <div class="box-left-card">
        <section>
          <div>较上日+ {{ store.chinaAdds.localConfirmH5 }}</div>
          <div>{{ store.chinaTotals.localConfirm }}</div>
          <div>本土现有确诊</div>
        </section>
        <section>
          <div>较上日+ {{ store.chinaAdds.nowConfirm }}</div>
          <div>{{ store.chinaTotals.nowConfirm }}</div>
          <div>现有确诊</div>
        </section>
        <section>
          <div>较上日+ {{ store.chinaAdds.confirm }}</div>
          <div>{{ store.chinaTotals.confirm }}</div>
          <div>累计确诊</div>
        </section>
        <section>
          <div>较上日+ {{ store.chinaAdds.noInfect }}</div>
          <div>{{ store.chinaTotals.noInfect }}</div>
          <div>无症状感染者</div>
        </section>
        <section>
          <div>较上日+ {{ store.chinaAdds.importedCase }}</div>
          <div>{{ store.chinaTotals.importedCase }}</div>
          <div>境外输入</div>
        </section>
        <section>
          <div>较上日+ {{ store.chinaAdds.dead }}</div>
          <div>{{ store.chinaTotals.dead }}</div>
          <div>累计死亡</div>
        </section>
      </div>

      <div class="box-left-pie"></div>

      <div class="box-left-line"></div>
    </div>
    <div id="china" class="box-center">
    </div>
    <div class="box-right">
      <table class="table" cellspacing="0" border="1">
        <thead>
          <tr>
            <th>地区</th>
            <th>新增确诊</th>
            <th>累计确诊</th>
            <th>治愈</th>
            <th>死亡</th>
          </tr>
        </thead>
        <transition-group enter-active-class="animate__animated animate__flipInY" tag="tbody">
          <tr v-for="(item, index) in store.childs" :key="item.name">
            <td align="center">{{ item.name }}</td>
            <td align="center">{{ item.today.confirm }}</td>
            <td align="center">{{ item.total.confirm }}</td>
            <td align="center">{{ item.total.heal }}</td>
            <td align="center">{{ item.total.dead }}</td>
          </tr>
        </transition-group>
      </table>

      <div class="earth"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import bg from 'assets/background.jpg'
import { useStore } from './store'
import { onMounted } from 'vue'
import * as echarts from 'echarts' // echarts 5 需要这么使用
import 'echarts-gl';
import './assets/china.js'
import 'animate.css'
import { geoCoordMap } from './assets/geoMap'

const store = useStore()

const initCharts = () => {
  const city = store.info.diseaseh5Shelf.areaTree[0].children
  store.childs = city[1].children
  const data = city.map(ele => ({
    name: ele.name,
    value: geoCoordMap[ele.name].concat(ele.total.nowConfirm),
    children: ele.children
  }))

  const charts = echarts.init(document.querySelector('#china') as HTMLElement);

  charts.setOption({
    geo: {
      map: "china",
      aspectScale: 0.8,
      layoutCenter: ["50%", "50%"],
      layoutSize: "100%",
      itemStyle: {
        // normal: {
        areaColor: {
          type: "linear-gradient",
          x: 0,
          y: 1200,
          x2: 1000,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: "#152E6E", // 0% 处的颜色
            },
            {
              offset: 1,
              color: "#0673AD", // 50% 处的颜色
            },
          ],
          global: true, // 缺省为 false
        },
        shadowColor: "#0f5d9d",
        shadowOffsetX: 0,
        shadowOffsetY: 15,
        opacity: 0.5,
        // },

      },
      emphasis: {
        areaColor: "#0f5d9d",
      },
      regions: [
        {
          name: "南海诸岛",
          itemStyle: {
            areaColor: "rgba(0, 10, 52, 1)",
            borderColor: "rgba(0, 10, 52, 1)",
            // normal: {
            opacity: 0,
            label: {
              show: false,
              color: "#009cc9",
            },
            // },
          },
          label: {
            show: true,
            color: "#FFFFFF",
            fontSize: 12,
          },
        },
      ],
    },
    series: [
      {
        type: "map",
        // selectedMode: "multiple",
        map: "china",
        aspectScale: 0.8,
        layoutCenter: ["50%", "50%"], //地图位置
        layoutSize: "100%",
        // zoom: 1, //当前视角的缩放比例
        // roam: true, //是否开启平游或缩放
        // scaleLimit: {
        //   //滚轮缩放的极限控制
        //   min: 1,
        //   max: 2,
        // },
        label: {
          show: true,
          color: "#FFFFFF",
          fontSize: 12,
        },
        itemStyle: {
          areaColor: "#0c3653",
          borderColor: "#1cccff",
          borderWidth: 1.8,
        },
        emphasis: {
          areaColor: "#56b1da",
          label: {
            show: true,
            color: "#fff",
          },
        },
        data: data,
      },
      {
        type: 'scatter',
        coordinateSystem: 'geo',
        //   symbol: 'image://http://ssq168.shupf.cn/data/biaoji.png',
        // symbolSize: [30,120],
        // symbolOffset:[0, '-40%'] ,
        symbol: 'pin',
        symbolSize: [45, 45],
        label: {
          // normal: {
          show: true,
          color: "#fff",
          formatter(item: any) {
            if (item.data === undefined) return 0
            return item.data.value[2]
          }
          // }
        },
        itemStyle: {
          // normal: {
          color: '#1E90FF', //标志颜色
          // }
        },
        data: data
      },
    ],
  })

  charts.on('click', (e: any) => {
    store.childs = e.data.children
  })
}

const initPie = () => {
  const colors = ['#3c90ff', '#fff225', '#00aaff', '#33ffbb', '#ffec8c', '#ff9c3c', '#657aff', '#ffffff', '#ffab66', '#7cff33']
  const series = store.cityDetail.map(e => ({
    name: e.city,
    value: e.confirm
  }))
  const centerX = '50%'
  const angle = 0

  function total(): number {
    let count = 0
    series.forEach(o => {
      count += o.value
    })
    return count
  }

  function getCirlPoint(x0, y0, r, angle) {
    //获取圆上面某点的坐标(x0,y0表示坐标，r半径，angle角度)
    let x1 = x0 + r * Math.cos((angle * Math.PI) / 180)
    let y1 = y0 + r * Math.sin((angle * Math.PI) / 180)
    return {
      x: x1,
      y: y1
    }
  }

  function _pie1() {
    let data = []
    series.forEach((o: any, i) => {
      o.itemStyle = {
        // normal: {
        borderWidth: 1,
        shadowBlur: 20,
        borderRadius: 20,
        borderColor: colors[i],
        shadowColor: colors[i]
        // }
      }
      data.push(o, {
        value: total() / 50,
        itemStyle: {
          // normal: {
          label: {
            show: false
          },
          labelLine: {
            show: false
          },
          color: 'rgba(0, 0, 0, 0)',
          borderColor: 'rgba(0, 0, 0, 0)',
          borderWidth: 0
          // }
        }
      })
    })
    return data
  }

  const charts = echarts.init(document.querySelector('.box-left-pie') as HTMLElement);

  charts.setOption({
    backgroundColor: '#223651',
    title: {
      text: '确诊人数前十城市',
      left: 'center',
      top: 0,
      textStyle: {
        color: '#ccc'
      }
    },
    fontSize: 16,
    tooltip: {
      trigger: 'item',
      textStyle: {
        color: '#fff'
      },
      backgroundColor: 'rgba(16, 32, 40, 0.88)',
      borderRadius: 4,
      borderColor: '#20749e',
      formatter: params => {
        return params.marker + params.name + ': ' + params.value
      }
    },
    color: colors,
    legend: [
      {
        // orient: 'vertical',
        // right: '0%',
        itemGap: 20,
        itemWidth: 14,
        itemHeight: 14,
        top: '6%',
        textStyle: {
          color: '#fff'
        },
        data: series.slice(Math.floor(series.length / 2), series.length)
      },
      {
        // orient: 'vertical',
        top: '10%',
        itemGap: 20,
        itemWidth: 14,
        itemHeight: 14,
        // top: 'top',
        textStyle: {
          color: '#fff'
        },
        data: series.slice(0, Math.ceil(series.length / 2))
      }
    ],
    series: [
      {
        type: 'pie',
        clockwise: false,
        radius: ['60%', '70%'],
        center: [centerX, '60%'],
        // hoverAnimation: false,
        // itemStyle: {

        // },
        label: {
          show: true
        },
        data: _pie1()
      },
      {
        type: 'custom',
        coordinateSystem: 'none',
        renderItem: (params, api) => {
          return {
            type: 'arc',
            shape: {
              // cx: api.getWidth() / 2,
              cx: centerX,
              cy: api.getHeight() / 2,
              r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.45,
              startAngle: ((0 + angle) * Math.PI) / 180,
              endAngle: ((360 + angle) * Math.PI) / 180
            },
            style: {
              stroke: {
                type: 'linear',
                x: 1,
                y: 0.5,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: 'transparent' // 0% 处的颜色
                  },
                  {
                    offset: 0.6,
                    color: '#00eaff' // 100% 处的颜色
                  }
                ]
              },
              fill: 'transparent',
              lineWidth: 1
            },
            // style: api.style(),
            silent: true
          }
        },
        data: [0]
      },
      {
        type: 'custom',
        coordinateSystem: 'none',
        renderItem: (params, api) => {
          // let x0 = api.getWidth() / 2
          let x0 = centerX
          let y0 = api.getHeight() / 2
          let r = (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.45
          let point = getCirlPoint(x0, y0, r, -95 + angle)
          return {
            type: 'circle',
            shape: {
              cx: point.x,
              cy: point.y,
              r: 2.5
            },
            style: {
              stroke: '#00eaff', //绿
              fill: '#00eaff'
            },
            silent: true
          }
        },
        data: [0]
      }
    ]
  }
  )

}

const initLine = () => {
  const charts = echarts.init(document.querySelector('.box-left-line') as HTMLElement);

  charts.setOption({
    backgroundColor: '#223651',
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#999'
        }
      }
    },
    toolbox: {
      feature: {
        // dataView: { show: true, readOnly: false },
        magicType: {
          show: true,
          type: ['line', 'bar'],
          iconStyle: {
            color: '#fff'
          }
        },
        // restore: { show: true },
        saveAsImage: {
          show: true,
          iconStyle: {
            color: '#fff'
          }
        }
      }
    },
    legend: {
      data: [
        {
          name: '现存确诊',
          textStyle: {
            color: '#fff'
          }
        },
        {
          name: '新增确诊',
          textStyle: {
            color: '#fff'
          }
        }
      ]
    },
    xAxis: [
      {
        type: 'category',
        data: store.cityDetail.map(e => e.city),
        axisPointer: {
          type: 'shadow'
        },
        axisLine: {
          lineStyle: {
            color: '#fff'
          }
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: '现存确诊',
        min: 0,
        max: 9000,
        interval: 900,
        axisLabel: {
          formatter: '{value}'
        },
        axisLine: {
          lineStyle: {
            color: '#fff'
          }
        }
      },
      {
        type: 'value',
        name: '新增确诊',
        min: 0,
        max: 500,
        interval: 50,
        axisLabel: {
          formatter: '{value}'
        },
        axisLine: {
          lineStyle: {
            color: '#fff'
          }
        }
      }
    ],
    series: [
      {
        name: '现存确诊',
        type: 'bar',
        data: store.cityDetail.map(e => e.nowConfirm),
      },
      {
        name: '新增确诊',
        type: 'line',
        yAxisIndex: 1,
        data: store.cityDetail.map(e => e.confirmAdd),
      }
    ]
  })
}

const initEarth = () => {
  const charts = echarts.init(document.querySelector('.earth') as HTMLElement);
  const ROOT_PATH =
    'https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples';

  charts.setOption({
    backgroundColor: '#000',
    globe: {
      baseTexture: ROOT_PATH + '/data-gl/asset/earth.jpg',
      shading: 'lambert',
      environment: ROOT_PATH + '/data-gl/asset/starfield.jpg',
      atmosphere: {
        show: true
      },
      light: {
        ambient: {
          intensity: 0.25
        },
        main: {
          intensity: 1.5
        }
      }
    },
  })
}

onMounted(async () => {
  await store.getList()
  initCharts()
  initPie()
  initLine()
  initEarth()
})
</script>

<style lang="less">
* {
  padding: 0;
  margin: 0;
}

html,
body,
#app {
  overflow: hidden;
  height: 100%;
}

@itemBg: #223651;
@itemColor: #41b0db;
@itemBorder: #212020;

.box {
  overflow: hidden;
  height: 100%;
  width: 100%;
  display: flex;

  &-left {
    width: 450px;
    color: white;

    &-pie {
      height: 500px;
      margin-top: 20px;
    }

    &-line {
      height: 500px;
      margin-top: 20px;
    }

    &-card {
      display: grid;
      grid-template-columns: auto auto auto;
      grid-template-rows: auto auto;

      section {
        background: @itemBg;
        border: 1px solid @itemColor;
        padding: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;

        div:nth-child(2) {
          color: @itemColor;
          padding: 10px 0;
          font-size: 20px;
          font-weight: bold;
        }
      }
    }
  }

  &-center {
    flex: 1;
  }

  &-right {
    width: 400px;
  }
}

.earth {
  width: 100%;
  height: 400px;
  margin-top: 20px;
}

.table {
  width: 100%;
  background: #223651;
  color: white;

  tr {
    th {
      padding: 5px;
      white-space: nowrap;
      color: #0cccee
    }

    td {
      padding: 5px 10px;
      width: 100px;
      white-space: nowrap;
    }
  }
}
</style>
