confirmedLineColor = '#EFCC51'
seriousLineColor = '#CD7543'
curedLineColor = '#7ED03D'
deadLineColor = '#891A1A'
suspectedLineColor = '#DB70D0'

confirmedLabelBgColor = '#866800'
seriousLabelBgColor = '#8C3B0D'
curedLabelBgColor = '#3A780A'
deadLabelBgColor = '#841D1D'
suspectedLabelBgColor = '#996294'

allRegionTrendData = {}
allRegionCurrentAreaTreeData = {}
selectedRegion = "全国"

mainChinaData = []

firstChart = null
secondChart = null
mapChart = null

selectedPageIndex = -1

safeRegion = ['全国','湖北','北京','广东','山东','上海','广西','黑龙江','江苏','河北','天津','江西','四川','湖南','云南','浙江','台湾','河南','重庆','贵州','香港','安徽','海南','澳门','辽宁','福建','山西','宁夏','吉林','内蒙古','陕西','新疆','甘肃','青海','西藏']

isPhone = ()->
  userAgentInfo = navigator.userAgent;
  Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");  
  flag = false;  
  for v in Agents
    if (userAgentInfo.indexOf(v) > 0)
      flag = yes
      break

  return flag

csvJSON = (csv) ->
  lines = csv.split('\n')
  result = []
  # NOTE: If your columns contain commas in their values, you'll need
  # to deal with those before doing the next step
  # (you might convert them to &&& or something, then covert them back later)
  # jsfiddle showing the issue https://jsfiddle.net/
  headers = lines[0].split(',')
  i = 1
  while i < lines.length
    obj = {}
    currentline = lines[i].split(',')
    j = 0
    while j < headers.length
      obj[headers[j]] = currentline[j]
      j++
    result.push obj
    i++
  #return result; //JavaScript object
  return result
  #JSON


labelConfig = (bgColor, position) ->
  if not position
    position = 'top'

  return{
          normal: {
              show: true,
              position: position
              fontSize : 8
              fontWeight : "bolder"
              backgroundColor : bgColor
              padding : 3
              borderRadius: 4
          }
        }

reload = ()->
  myChart = firstChart

  isSars = jQuery("#select").val() == "sars"
  if isSars
    reloadCompare()

  reloadSecondChart()

  isMainChina = selectedRegion == "全国"

  legendData = ['确诊', '疑似', '死亡', '治愈']

  nConData
  if isMainChina
    nConData = mainChinaData
    jQuery("#regionName span").html "全国"
    jQuery("#title").html "全国新型冠状病毒相关各类人数折线图"
    jQuery("#confirmed_suffix").html "疑似"
    legendData = ['确诊', '疑似', '死亡', '治愈']
  else
    nConData = allRegionTrendData[selectedRegion]
    jQuery("#title").html "#{selectedRegion}新型冠状病毒相关各类人数折线图"
    jQuery("#regionName span").html "#{selectedRegion}"
    jQuery("#confirmed_suffix").html "疑似"
    legendData = ['确诊']


  xAxisData = []
  confirmData = []
  seriousData = []
  curedData = []
  deadData = []
  suspectedData = []

  # for item in nConData

  dataOffset = 0
  if nConData.length > 14
    dataOffset = nConData.length - 14 - 1
  
  # if isMainChina
  #   dataOffset = 7


  for i in [0...nConData.length-dataOffset] by 1
    item = nConData[i+dataOffset]

    date = new Date (item['date'])

    xAxisData[i] = item.date
    # if not isMainChina
    # else
    #   xAxisData[i] = "#{date.getMonth()+1}.#{date.getDate()}"
    # confirmData[i] = []
    # seriousData[i] = []
    # curedData[i] = []
    # deadData[i] = []
    # suspectedData[i] = []

    confirmData[i] = item["confirmed"]
    curedData[i] = item["curedCase"]
    deadData[i] = item["dead"]
    suspectedData[i] = item["suspected"]

    i++

  currentDate = new Date()

  M = currentDate.getMinutes()
  if M <= 9
    M = "0" + M


  jQuery("#desc").html "(截止至 #{currentDate.getFullYear()}-#{currentDate.getMonth()+1}-#{currentDate.getDate()} #{currentDate.getHours()}:#{M}   以国家卫建委发布数据制图)"
  option = {
            backgroundColor : "#00101010"
            title: {
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                  type: 'cross',
                  label: {
                      backgroundColor: '#283b56'
                  }
              }
            },
            grid: {
                x: 30, 
                y: 30, 
                x2: 30, 
                y2: 30 
            }
            legend: {
                data: legendData
                top : 10
                textStyle : {
                  fontSize: 10
                }
            },
            xAxis: [
              {
                "type" : "category",
                # min:new Date("2019/12/31")
                # max:new Date("2020/01/23")
                data : xAxisData,
                axisLabel: {
                  textStyle : {
                    fontSize: 8
                  }
                }
              },
              ],
            yAxis: [
                {
                    name: '',
                    type: 'value',
                    axisLabel: {
                      textStyle : {
                        fontSize: 8
                      }
                    }                    
                },
            ],
            # dataZoom: [{
            #     type: 'inside',
            #     startValue: xAxisData.length - 10,
            #     endValue: xAxisData.length-1,
            #     minSpan : 40,
            #     zoomOnMouseWheel: no,
            #     moveOnMouseMove: no,
            #     moveOnMouseWheel: no,
            #     reventDefaultMouseMove : no
            #   },
            #   {
            #       handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            #       handleSize: '80%',
            #       handleStyle: {
            #           color: '#fff',
            #           shadowBlur: 3,
            #           shadowColor: 'rgba(0, 0, 0, 0.6)',
            #           shadowOffsetX: 2,
            #           shadowOffsetY: 2
            #       }
            #   }
            # ]
            series: [
              {
                  name: '确诊',
                  type: 'line',
                  data: confirmData
                  itemStyle: {
                    normal: {
                        color: confirmedLineColor
                    },
                  }
                  label: labelConfig(confirmedLabelBgColor)
              },
              {
                  name: '死亡',
                  type: 'line',
                  data: deadData
                  itemStyle: {
                    normal: {
                        color: deadLineColor
                    },
                  }
                  label: labelConfig(deadLabelBgColor)
              },
              {
                  name: '治愈',
                  type: 'line',
                  data: curedData
                  itemStyle: {
                    normal: {
                        color: curedLineColor
                    },
                  }
                  label: labelConfig(curedLabelBgColor, "right"),
                  # xAxisIndex: 1,
                  # yAxisIndex: 1,
              },
              {
                  name: '疑似',
                  type: 'line',
                  data: suspectedData
                  itemStyle: {
                    normal: {
                        color: suspectedLineColor
                    },
                  }
                  label : {
                    normal: {
                      show: false
                    }
                  }
                  # label: labelConfig(suspectedLabelBgColor)
              },
            ]
        }

  if isMainChina
    mainChinaItem = allRegionCurrentAreaTreeData.chinaTotal
    jQuery("#confirmed").html mainChinaItem.confirm
    jQuery("#suspected").html mainChinaItem.suspect
    jQuery("#cured").html mainChinaItem.heal
    jQuery("#dead").html mainChinaItem.dead
  else
    for provinceItem in allRegionCurrentAreaTreeData.areaTree[0].children
      if provinceItem.name == selectedRegion
        jQuery("#confirmed").html provinceItem.total.confirm
        jQuery("#suspected").html provinceItem.total.suspect
        jQuery("#cured").html provinceItem.total.heal
        jQuery("#dead").html provinceItem.total.dead
        break

  myChart.clear()
  myChart.setOption option
  # sarsChart.setOption option

reloadSecondChart = ()->
  myChart = secondChart

  isMainChina = selectedRegion == "全国"

  legendData = ['累计确诊', '今日确诊']

  yAxisDataArray = []
  xAxisAllDataArray = []
  xAxisTodayDataArray = []

  option = {}

  if isMainChina
    jQuery("#secondContentHeaderTitle").html "全国 各省累计确诊人数"
    jQuery("#cardSubtitle").removeClass "hidden"
    for item in allRegionCurrentAreaTreeData.areaTree[0].children
      yAxisDataArray.push item.name
      xAxisAllDataArray.push item.total.confirm
      xAxisTodayDataArray.push item.today.confirm

    option = {
      backgroundColor : "#343a40"
      tooltip: {
          trigger: 'axis',
          axisPointer: {
              type: 'shadow'
          }
      },
      legend: {
          data: legendData
      },
      xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01]
      },
      yAxis: {
          type: 'category',
          data: yAxisDataArray,
          inverse: yes
      },
      series: [
          {
              name: '累计确诊',
              type: 'bar',
              itemStyle: {
                      normal: {
                          color: confirmedLineColor
                      },
                    }
              label: {
                  show: true,
                  position: ['110%', '20%']
                  fontSize: 10
                  fontWeight : 600
              },
              data: xAxisAllDataArray
          },
          # {
          #     name: '今日确诊',
          #     type: 'bar',
          #     itemStyle: {
          #             normal: {
          #                 color: "#51D3EF"
          #             },
          #           }
          #     label: {
          #         show: true,
          #         position: ['100%', '50%']
          #     },
          #     data: xAxisTodayDataArray
          # }
      ]
    };
  else
    jQuery("#secondContentHeaderTitle").html "#{selectedRegion} · 各地累计确诊人数"
    jQuery("#cardSubtitle").addClass "hidden"
    pieDataArray = []
    for provinceItem in allRegionCurrentAreaTreeData.areaTree[0].children
      if provinceItem.name == selectedRegion
        for cityItem in provinceItem.children
          # yAxisDataArray.push cityItem.name
          # xAxisAllDataArray.push cityItem.total.confirm
          # xAxisTodayDataArray.push cityItem.today.confirm
          if cityItem.name == "地区待确认"
            continue
          
          pieDataArray.push {value:cityItem.total.confirm, name:"#{cityItem.name}:#{cityItem.total.confirm}"}
        break

    option = {
      backgroundColor : "#343a40"
      grid: {
           x: 0, 
           y: 0, 
           x2: 0, 
           y2: 0 
      }
      tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
          orient: 'vertical',
          left: 'left',
          data: ['直接访问:322', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
      },
      series: [
          {
              name: '确诊人数',
              type: 'pie',
              radius: '55%',
              center: ['50%', '50%'],
              data: pieDataArray,
              emphasis: {
                  itemStyle: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
              }
              label: {
                  show: true,
                  fontSize: 10
              },
          }
      ]
    }


  myChart.clear()
  myChart.setOption option

requestMainChinaData = ->
  startLoading()
  apiUrl = "http://view.inews.qq.com/g2/getOnsInfo?name=wuwei_ww_cn_day_counts"
  jQuery.ajax {
    url: '/api_proxy/get?url=' + encodeURIComponent apiUrl
    success: (result)->
      jsonStr = result.data
      mainChinaData = JSON.parse jsonStr
      for item in mainChinaData
        item.confirmed = item.confirm
        item.curedCase = item.heal
        item.suspected = item.suspect
      console.log mainChinaData
      mainChinaData.sort (a,b)->
        return parseFloat(a.date) - parseFloat(b.date)

      requestAllRegionCurrentAreaTreeData ()->
        requestallRegionTrendData ()->
          # reloadSelect()
          reload()
          stopLoading()
      
  }


requestallRegionTrendData = (callback)->
  jQuery.ajax {
    url : "http://datanews.caixin.com/interactive/2020/iframe/pneumonia-new/data/data2.csv"
    success : (result)->
      convertedJson = csvJSON result
      # console.log convertedJson

      allRegionTrendData = {}

      for item in convertedJson
        allKeys = Object.keys item
        time
        for key in allKeys
          if key == "time"
            #时间
            time = item[key]
          else
            number = item[key]
            if not allRegionTrendData[key]
              allRegionTrendData[key.replace("\r", "")] = []
            allRegionTrendData[key.replace("\r", "")].push {
              date : time
              confirmed : number
            }
      if callback
        callback()
      

      # console.log allRegionTrendData
      
  }

requestAllRegionCurrentAreaTreeData = (callback)->
  apiUrl = "https://view.inews.qq.com/g2/getOnsInfo?name=disease_h5"
  jQuery.ajax {
    url: '/api_proxy/get?url=' + encodeURIComponent apiUrl
    success: (result)->
      jsonStr = result.data
      allRegionCurrentAreaTreeData = JSON.parse jsonStr

      chinaTotal = allRegionCurrentAreaTreeData.chinaTotal
      mainChinaData[mainChinaData.length - 1].curedCase = chinaTotal.heal
      mainChinaData[mainChinaData.length - 1].confirmed = chinaTotal.confirm
      mainChinaData[mainChinaData.length - 1].suspected = chinaTotal.suspect
      mainChinaData[mainChinaData.length - 1].dead = chinaTotal.dead

      jQuery("#tip").html "最后更新：#{allRegionCurrentAreaTreeData.lastUpdateTime} <br> 点击折线图查看单日详细数据，拖动进度条查看早期数据"
      
      console.log allRegionCurrentAreaTreeData

      reloadMapChart()

      if callback
        callback()
  }

mapHasUpdated = no


getProvinceGeoArray = (province)->
  for item in window.cityGeoData
    if item.name.indexOf(province) != -1
      return item.children

getCityGeoArray = (provinceGeoArray, cityName)->
  for item in provinceGeoArray
    if item.name.indexOf(cityName) != -1
      return [parseFloat(item.log), parseFloat(item.lat)]

  return []
    

reloadMapChart = ()->
  if mapHasUpdated
    return

  mapHasUpdated = yes

  confirmedDataArray = []
  for provinceItem in allRegionCurrentAreaTreeData.areaTree[0].children
    provinceGeoArray = getProvinceGeoArray provinceItem.name
    for cityItem in provinceItem.children
      cityGeoArray = getCityGeoArray provinceGeoArray, cityItem.name
      if cityGeoArray.length == 0
        continue
      item = {
        name : cityItem.name
        value : [cityGeoArray[0], cityGeoArray[1], cityItem.total.confirm]
      }
      confirmedDataArray.push item
    
  option = window.drawMapOption(confirmedDataArray)
  mapChart.clear()
  mapChart.setOption option

  bmap = mapChart.getModel().getComponent('bmap').getBMap();
  # bmap.addControl(new BMap.MapTypeControl());
  bmap.disableDragging()
  bmap.disableScrollWheelZoom()
  bmap.disablePinchToZoom()
  bmap.disableDoubleClickZoom()


reloadTabData = ()->

reloadSelect = ->
  optionsHtml = ""
  # arrayStr = ""
  # for key in Object.keys(allRegionTrendData)
  for item in safeRegion
    # item = allRegionTrendData[key]
    optionsHtml += "<option value ='#{item}'>#{item}</option>"
    # arrayStr += "'#{key}',"

  jQuery("#select").html optionsHtml
  jQuery("#select").val selectedRegion


timeStrWithUnix = (timeStamp) ->
  nowDate = new Date()
  originalDate = new Date(timeStamp)

  year = originalDate.getFullYear()
  month = originalDate.getMonth() + 1
  day = originalDate.getDate()
  nowYear = nowDate.getFullYear()

  timeDif = (nowDate.getTime() - timeStamp) / 1000

  if timeDif <= 60 * 60
    timeDifToMin = parseInt timeDif / 60
    if timeDifToMin == 0
      return "刚刚"
    else
      return "#{timeDifToMin}分前"
  else if timeDif <= 60 * 60 * 24
    timeDifToHour = parseInt timeDif/60/60
    return "#{timeDifToHour}小时前"
  else
    monthStr = originalDate.toString().substr(4,3)
    if nowYear == year
      return "#{day} #{monthStr}"
    else
      return "#{day} #{monthStr},#{year}"

requestNewsData = ()->
  startLoading()
  url = ""
  if selectedRegion == '全国'
    url = "https://lab.isaaclin.cn/nCoV/api/news?num=40"
  else if selectedRegion == '北京'
    url = "https://lab.isaaclin.cn/nCoV/api/news?province=#{encodeURIComponent(selectedRegion+'市')}&num=40"
  else
    url = "https://lab.isaaclin.cn/nCoV/api/news?province=#{encodeURIComponent(selectedRegion+'省')}&num=40"
  
  jQuery.ajax
    url : url
    headers : {
      "Access-Control-Allow-Origin" : "http://#{window.location.host}"
    }
    success : (result)->
      htmlStr = ""
      for item in result.results
        htmlStr += "<div class='list-group'>
                      <a href='#{item.sourceUrl}' class='list-group-item list-group-item-action'>
                        <div class='d-flex w-100 justify-content-between'>
                          <h5 class='mb-1'>#{item.title}</h5>
                        </div>
                        <p class='mb-1 newsSummary'>#{item.summary}</p>
                        <small>#{item.infoSource} · #{timeStrWithUnix(item.pubDate)}</small>
                      </a>
                    </div>"

      jQuery("#newsPage").html htmlStr
      stopLoading()
    


jumpToPage = (index)->
  if selectedPageIndex == index
    return

  jQuery(".page-item").removeClass "active"
  jQuery(".page-item").eq(index).addClass "active"
  
  pageArray = [jQuery("#chartPage"), jQuery("#newsPage"), jQuery("#toolsPage")]
  currentPage = pageArray[selectedPageIndex]
  if selectedPageIndex == -1
    currentPage = pageArray[0]
  
  nextPage = pageArray[index]

  if currentPage
    currentPage.fadeOut()
  nextPage.fadeIn()

  selectedPageIndex = index

  if selectedPageIndex == 0
    requestMainChinaData()
  if selectedPageIndex == 1
    requestNewsData()
  else
    stopLoading()

  history.replaceState(null,null,"?p=#{selectedPageIndex}")


  
startLoading = () ->
  jQuery("#loadingContainer").fadeIn()

stopLoading = () ->
  jQuery("#loadingContainer").fadeOut()

getURLParamWithKey = (key) ->
  # This function is anonymous, is executed immediately and 
  # the return value is assigned to QueryString!
  query_string = {}
  query = window.location.search.substring(1)
  vars = query.split('&')
  i = 0
  while i < vars.length
    pair = vars[i].split('=')
    # If first entry with this name
    if typeof query_string[pair[0]] == 'undefined'
      query_string[pair[0]] = decodeURIComponent(pair[1])
      # If second entry with this name
    else if typeof query_string[pair[0]] == 'string'
      arr = [
        query_string[pair[0]]
        decodeURIComponent(pair[1])
      ]
      query_string[pair[0]] = arr
      # If third or later entry with this name
    else
      query_string[pair[0]].push decodeURIComponent(pair[1])
    i++
  return query_string[key]



setSelectedRegion = (region)->
  selectedRegion = region

  jQuery("#regionBtn").html selectedRegion
  jQuery("#newsTabBtn a").html "#{selectedRegion}新闻"
  jQuery("#regionBtn").removeAttr "active"
  jQuery(document).attr "title", "#{selectedRegion}疫情实时趋势&新闻"

  if selectedRegion == '全国'
    jQuery("#secondChart").css "height","800px"
    # jQuery("#thirdContent").insertBefore jQuery("#secondContent")
  else
    jQuery("#secondChart").css "height","260px"
    jQuery("#secondContent").insertBefore jQuery("#thirdContent")

  jQuery("#chartTabBtn a").html "#{selectedRegion}疫情"

  if secondChart
    secondChart.resize()
  else
    secondChart = echarts.init document.getElementById("secondChart"), 'dark'

  
jQuery(document).ready ->
  

  cookieRegion = Cookies.get "selectedRegion"
  if safeRegion.indexOf(cookieRegion) != -1
    setSelectedRegion cookieRegion
  else
    setSelectedRegion "全国"
    
  # jQuery("#newsTabBtn a").html "#{selectedRegion}新闻"
  # jQuery("#regionBtn").html selectedRegion
  # jQuery(document).attr "title", "#{selectedRegion}疫情实时趋势&新闻"

  firstChart = echarts.init document.getElementById("main"), 'dark'
  mapChart = echarts.init document.getElementById("mapChart"), 'light'
  

  if isPhone()
    console.log "dds"
    jQuery("#all").addClass "phone"
  else
    width = jQuery(window).width()
    if width < 780
      jQuery("#all").css "transform", "scale(#{width / 780.0})"

  jQuery("#select").change ->
    setSelectedRegion jQuery(this).val()
    Cookies.set "selectedRegion", selectedRegion


    if selectedPageIndex == 0
      reload()
    else if selectedPageIndex == 1
      requestNewsData()

  jQuery("#export").click ->
    html2canvas(document.querySelector("#all")).then (canvas) ->
      # base64Image = canvas.toDataURL('image/png').substring(22)

      a = document.createElement('a');
      #toDataURL defaults to png, so we need to request a jpeg, then convert for file download.
      a.href = canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");
      isWuhan = jQuery("#select").val() == "wuhan"
      isSars = jQuery("#select").val() == "sars"
      now = new Date()
      time = "#{now.getFullYear()}-#{now.getMonth()+1}-#{now.getDate()}"
      if isWuhan
        a.download = "2019-nCov-wuhan-#{time}.jpg";
      else if isSars
        a.download = "2019-nCov-vc-sars-#{time}.jpg";
      else
        a.download = "2019-nCov-mainChina-#{time}.jpg";

      a.click();


  # jQuery("#collapseExample").collapse()
  jQuery("#collapseExample").on "shown.bs.collapse", ->
    jQuery("#secondContentCardHeader").addClass "dropup"
  jQuery("#collapseExample").on "hidden.bs.collapse", ->
    jQuery("#secondContentCardHeader").removeClass "dropup"

  jQuery(".page-item").click ->
    index = jQuery(this).index()
    if selectedPageIndex != index
      jumpToPage index

  # requestallRegionTrendData()
  setTimeout ()->
    urlPage = getURLParamWithKey "p"
    if urlPage and parseInt(urlPage) <= 2 and parseInt(urlPage) >= 0
      jumpToPage parseInt urlPage
    else
      jumpToPage 0
  , 300

  reloadSelect()

