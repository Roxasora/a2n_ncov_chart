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

wuhanData = {}

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
              show: yes,
              position: position
              fontSize : 12
              fontWeight : "bolder"
              backgroundColor : bgColor
              padding : 3
          }
        }

reloadCompare = ()->
  jQuery("#title").html "新型冠状病毒 与 SARS 对比图"

  myChart = echarts.init document.getElementById("main"), 'dark'
  legendData = ['2019-nCov确诊', '2019-nCov死亡', 'sars确诊','sars死亡']

  nConData = window.nCon_data
  sarsData = window.sars_china
  jQuery("#region").html "2019-nCov"
  jQuery("#confirmed_suffix").html ""
  jQuery("#suspected").addClass "hidden"

  confirmData = []
  deadData = []

  sarsConfirmData = []
  sarsDeadData = []

  i = 0
  for item in nConData
    date = new Date (item['date'])
    timeStr = "#{date.getMonth()+1}.#{date.getDate()}"

    confirmData[i] = []
    deadData[i] = []

    confirmData[i][0] = timeStr
    deadData[i][0] = timeStr

    confirmData[i][1] = item["confirmed"]
    deadData[i][1] = item["dead"]

    i++

  i = 0
  for item in sarsData
    date = new Date (item['date'])
    timeStr = "#{date.getMonth()+1}.#{date.getDate()}"

    sarsConfirmData[i] = []
    sarsDeadData[i] = []

    sarsConfirmData[i][0] = timeStr
    sarsDeadData[i][0] = timeStr

    sarsConfirmData[i][1] = item["confirmed"]
    sarsDeadData[i][1] = item["dead"]

    i++

  currentDate = new Date()

  M = currentDate.getMinutes()
  if M <= 9
    M = "0" + M


  jQuery("#desc").html "(截止至 #{currentDate.getFullYear()}-#{currentDate.getMonth()+1}-#{currentDate.getDate()} #{currentDate.getHours()}:#{M}   以 国家卫健委的新冠病毒数据 及 WHO的SARS数据 制图)"
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
            legend: {
                data: legendData
                top : 30
            },
            xAxis: [
              {
                "type" : "category",
                # min:new Date("2019/12/31")
                # max:new Date("2020/01/23")
              },
              # {
              #   "type" : "category",
              #   # min:new Date("2019/12/31")
              #   # max:new Date("2020/01/23")
              #   gridIndex: 1,
              #   position: 'top',
              #   data : xAxisData
              # },
              ],
            yAxis: [
                {
                    name: '人数',
                    type: 'value',
                },
                # {
                #     gridIndex: 1,
                #     name: '人数',
                #     type: 'value',
                #     max: 1700,
                #     inverse: true
                # }
            ],
            series: [
              {
                  name: '2019-nCov确诊',
                  type: 'line',
                  data: confirmData
                  smooth: true,
                  itemStyle: {
                    normal: {
                        color: confirmedLineColor
                    },
                  }
                  areaStyle: {
                      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                          offset: 0,
                          color: confirmedLineColor
                      }, {
                          offset: 1,
                          color: '#C0D9FF'
                      }])
                  },
                  # label: labelConfig(confirmedLabelBgColor)
              },
              {
                  name: '2019-nCov死亡',
                  type: 'line',
                  data: deadData
                  smooth: true,
                  itemStyle: {
                    normal: {
                        color: deadLineColor
                    },
                  }
                  areaStyle: {
                      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                          offset: 0,
                          color: deadLineColor
                      }, {
                          offset: 1,
                          color: deadLineColor
                      }])
                  },
                  # label: labelConfig(deadLabelBgColor)
              },
              {
                  name: 'sars确诊',
                  type: 'line',
                  data: sarsConfirmData
                  smooth: true,
                  itemStyle: {
                    normal: {
                        color: "#4090A1"
                    },
                  }
                  areaStyle: {
                      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                          offset: 0,
                          color: '#4090A1'
                      }, {
                          offset: 1,
                          color: '#C0D9FF'
                      }])
                  },
                  # label: labelConfig(confirmedLabelBgColor)
              },
              {
                  name: 'sars死亡',
                  type: 'line',
                  smooth: true,
                  data: sarsDeadData
                  itemStyle: {
                    normal: {
                        color: "#D227E1"
                    },
                  },
                  areaStyle: {
                      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                          offset: 0,
                          color: '#D227E1'
                      }, {
                          offset: 1,
                          color: '#D227E1'
                      }])
                  },
                  # label: labelConfig(deadLabelBgColor)
              },
            ]
        }

  last = nConData[nConData.length-1]


  myChart.clear()
  myChart.setOption option


reload = ()->
  # reloadCompare()
  # return

  myChart = echarts.init document.getElementById("main"), 'dark'

  isSars = jQuery("#select").val() == "sars"
  if isSars
    reloadCompare()

  isMainChina = selectedRegion == "全国"

  legendData = ['确诊', '疑似', '死亡', '治愈']

  nConData
  if isMainChina
    nConData = mainChinaData
    jQuery("#region").html "全国"
    jQuery("#title").html "全国新型冠状病毒相关各类人数折线图"
    jQuery("#confirmed_suffix").html "例 疑似"
    jQuery("#suspected").removeClass "hidden"
    legendData = ['确诊', '疑似', '死亡', '治愈']
  else
    nConData = wuhanData.series
    nConData.pop()
    jQuery("#title").html "#{selectedRegion}新型冠状病毒相关各类人数折线图"
    jQuery("#region").html "#{selectedRegion}"
    jQuery("#confirmed_suffix").html ""
    jQuery("#suspected").addClass "hidden"
    legendData = ['确诊']


  xAxisData = []
  confirmData = []
  seriousData = []
  curedData = []
  deadData = []
  suspectedData = []

  # for item in nConData

  dataOffset = 0
  if nConData.length > 16
    nConData = nConData.slice(nConData.length - 1 - 16, nConData.length)
  
  for i in [0...nConData.length] by 1

    item = nConData[i]

    date = new Date (item['date'])

    # if not isMainChina
    #   xAxisData[i] = item.date
    # else
    xAxisData[i] = "#{date.getMonth()+1}.#{date.getDate()}"
    # confirmData[i] = []
    # seriousData[i] = []
    # curedData[i] = []
    # deadData[i] = []
    # suspectedData[i] = []

    confirmData[i] = item["confirmed"]
    curedData[i] = item["curedCase"]
    deadData[i] = item["dead"]
    suspectedData[i] = item["suspected"]

    # confirmData[i][0] = xAxisData[i]
    # confirmData[i][1] = item["confirmed"]

    # seriousData[i][0] = xAxisData[i]
    # seriousData[i][1] = item["serious"]

    # curedData[i][0] = xAxisData[i]
    # curedData[i][1] = item["curedCase"]

    # deadData[i][0] = xAxisData[i]
    # deadData[i][1] = item["dead"]

    # suspectedData[i][0] = xAxisData[i]
    # suspectedData[i][1] = item["suspected"]

    i++

  currentDate = new Date()

  M = currentDate.getMinutes()
  if M <= 9
    M = "0" + M


  jQuery("#desc").html "(截止至 #{currentDate.getFullYear()}-#{currentDate.getMonth()+1}-#{currentDate.getDate()} #{currentDate.getHours()}:#{M}   以国家卫健委发布数据制图)"
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
            legend: {
                data: legendData
                top : 30
            },
            # grid: [{
            #     left: 50,
            #     right: 50,
            #     height: '55%'
            # }, {
            #     left: 50,
            #     right: 50,
            #     top: '71.5%',
            #     height: '35%'
            # }],
            xAxis: [
              {
                "type" : "category",
                # min:new Date("2019/12/31")
                # max:new Date("2020/01/23")
                data : xAxisData,
                axisTick : {
                  show:false
                  interval : 5,
                  length: 2
                }
              },
              # {
              #   "type" : "category",
              #   # min:new Date("2019/12/31")
              #   # max:new Date("2020/01/23")
              #   gridIndex: 1,
              #   position: 'top',
              #   data : xAxisData
              # },
              ],
            yAxis: [
                {
                    name: '人数',
                    type: 'value',
                },
                # {
                #     gridIndex: 1,
                #     name: '人数',
                #     type: 'value',
                #     max: 1700,
                #     inverse: true
                # }
            ],
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
              # {
              #     name: '严重',
              #     type: 'line',
              #     data: seriousData
              #     itemStyle: {
              #       normal: {
              #           color: seriousLineColor
              #       },
              #     }
              #     label: labelConfig(seriousLabelBgColor)
              # },
              {
                  name: '死亡',
                  type: 'line',
                  data: deadData
                  itemStyle: {
                    normal: {
                        color: deadLineColor
                    },
                  }
                  label: labelConfig(deadLabelBgColor, 'bottom')
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
    jQuery("#confirmed").html wuhanData.cityTotal.confirmedTotal
    jQuery("#cured").html wuhanData.cityTotal.curesTotal
    jQuery("#dead").html wuhanData.cityTotal.deathsTotal

  myChart.setOption option
  # sarsChart.setOption option

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
        splicedATime = a.date.split "/"
        splicedBTime = b.date.split "/"
        return parseFloat(splicedATime[0]) * 1000 + parseFloat(splicedATime[1]) - (parseFloat(splicedBTime[0]) * 1000 + parseFloat(splicedBTime[1]))

      requestAllRegionCurrentAreaTreeData ()->
        requestWuhanData ()->
      #   requestallRegionTrendData ()->
      #     reloadSelect()
          reload()
          stopLoading()
      
  }

requestWuhanData = (callback)->
  apiUrl = "https://i.snssdk.com/forum/ncov_data/?data_type=%5B1%5D&city_code=%5B%22420100%22%5D"
  jQuery.ajax {
    url: '/api_proxy/get?url=' + encodeURIComponent apiUrl
    success : (result)->
      wuhanData = JSON.parse (JSON.parse result).ncov_city_data['420100']

      for item in wuhanData.series
        item.confirmed = item.confirmedNum
        item.curedCase = item.curesNum
        item.dead = item.deathsNum

      wuhanData.series.sort (a,b)->
        splicedATime = a.date.split "-"
        splicedBTime = b.date.split "-"
        return parseFloat(splicedATime[1]) * 1000 + parseFloat(splicedATime[2]) - (parseFloat(splicedBTime[1]) * 1000 + parseFloat(splicedBTime[2]))
      
      console.log wuhanData

      if callback
        callback()
      

      # console.log allRegionTrendData
  }

requestallRegionTrendData = (callback)->
  jQuery.ajax {
    url : "http://datanews.caixin.com/interactive/2020/pneumonia-h5/data/data2.csv"
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

      jQuery("#timeStamp").html "截止至：#{allRegionCurrentAreaTreeData.lastUpdateTime}"
      
      console.log allRegionCurrentAreaTreeData

      if callback
        callback()
  }

requestAllRegionData = ->
  jQuery.ajax {
    url : "http://datanews.caixin.com/interactive/2020/iframe/pneumonia-new/data/data2.csv"
    success : (result)->
      convertedJson = csvJSON result
      # console.log convertedJson

      for item in convertedJson
        allKeys = Object.keys item
        time
        for key in allKeys
          if key == "time"
            #时间
            time = item[key]
          else
            number = item[key]
            if not allRegionData[key]
              allRegionData[key.replace("\r", "")] = []
            allRegionData[key.replace("\r", "")].push {
              date : time
              confirmed : number
            }

      # console.log allRegionData
      reloadSelect()
      reload()

  }

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


jQuery(document).ready ->

  if isPhone()
    console.log "dds"
    jQuery("#all").addClass "phone"
  else
    width = jQuery(window).width()
    if width < 780
      jQuery("#all").css "transform", "scale(#{width / 780.0})"

  jQuery("#select").change ->
    selectedRegion = jQuery(this).val()
    reload()
  jQuery("#export").click ->
    html2canvas(document.querySelector("#all")).then (canvas) ->
      # base64Image = canvas.toDataURL('image/png').substring(22)

      a = document.createElement('a');
      #toDataURL defaults to png, so we need to request a jpeg, then convert for file download.
      a.href = canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");
      isWuhan = jQuery("#select").val() == "武汉"
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

  # reload()
  # requestAllRegionData()
  requestMainChinaData()

startLoading = () ->
  jQuery("#loadingContainer").fadeIn()

stopLoading = () ->
  jQuery("#loadingContainer").fadeOut()
