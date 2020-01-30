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
              show: false,
              position: position
              fontSize : 12
              fontWeight : "bolder"
              backgroundColor : bgColor
              padding : 3
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
    jQuery("#regionName").html "全国"
    jQuery("#title").html "全国新型冠状病毒相关各类人数折线图"
    jQuery("#confirmed_suffix").html "疑似"
    legendData = ['确诊', '疑似', '死亡', '治愈']
  else
    nConData = allRegionTrendData[selectedRegion]
    jQuery("#title").html "#{selectedRegion}新型冠状病毒相关各类人数折线图"
    jQuery("#regionName").html "#{selectedRegion}"
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
  if isMainChina
    dataOffset = 7


  for i in [0...nConData.length-dataOffset] by 1
    item = nConData[i+dataOffset]

    date = new Date (item['date'])

    if not isMainChina
      xAxisData[i] = item.date
    else
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
            legend: {
                data: legendData
                top : 30
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
                    name: '人数',
                    type: 'value',
                    axisLabel: {
                      textStyle : {
                        fontSize: 8
                      }
                    }                    
                },
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
    last = nConData[nConData.length-1]
    jQuery("#confirmed").html "#{parseInt(last.confirmed)}"
    jQuery("#suspected").html "#{parseInt(last.suspected)}"
    jQuery("#cured").html "#{parseInt(last.curedCase)}"
    jQuery("#dead").html "#{parseInt(last.dead)}"
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

  if isMainChina
    jQuery("#secondContentHeaderTitle").html "全国 各省累计确诊人数"
    jQuery("#cardSubtitle").removeClass "hidden"
    for item in allRegionCurrentAreaTreeData.areaTree[0].children
      yAxisDataArray.push item.name
      xAxisAllDataArray.push item.total.confirm
      xAxisTodayDataArray.push item.today.confirm
  else
    jQuery("#secondContentHeaderTitle").html "#{selectedRegion} 各市累计确诊人数"
    jQuery("#cardSubtitle").addClass "hidden"
    for provinceItem in allRegionCurrentAreaTreeData.areaTree[0].children
      if provinceItem.name == selectedRegion
        for cityItem in provinceItem.children
          yAxisDataArray.push cityItem.name
          xAxisAllDataArray.push cityItem.total.confirm
          xAxisTodayDataArray.push cityItem.today.confirm
        break

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

  myChart.clear()
  myChart.setOption option

requestMainChinaData = ->
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
        requestallRegionTrendData()
      
  }


requestallRegionTrendData = (callback)->
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
            if not allRegionTrendData[key]
              allRegionTrendData[key.replace("\r", "")] = []
            allRegionTrendData[key.replace("\r", "")].push {
              date : time
              confirmed : number
            }

      # console.log allRegionTrendData
      reloadSelect()
      reload()
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

      jQuery("#tip").html "最后更新：#{allRegionCurrentAreaTreeData.lastUpdateTime} <br> 点击折线图查看单日详细数据"
      
      console.log allRegionCurrentAreaTreeData
      if callback
        callback()
      
  }

reloadSelect = ->
  optionsHtml = ""
  arrayStr = ""
  for key in Object.keys(allRegionTrendData)
    item = allRegionTrendData[key]
    optionsHtml += "<option value ='#{key}'>#{key}</option>"
    arrayStr += "'#{key}',"

  jQuery("#select").html optionsHtml
  jQuery("#select").val selectedRegion

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

safeRegion = ['全国','湖北','北京','广东','山东','上海','广西','黑龙江','江苏','河北','天津','江西','四川','湖南','云南','浙江','台湾','河南','重庆','贵州','香港','安徽','海南','澳门','辽宁','福建','山西','宁夏','吉林','内蒙古','陕西','新疆','甘肃','青海','西藏']

jQuery(document).ready ->

  cookieRegion = Cookies.get "selectedRegion"
  if safeRegion.indexOf(cookieRegion) != -1
    selectedRegion = cookieRegion
  else
    selectedRegion = "全国"

  jQuery("#regionBtn").html selectedRegion

  firstChart = echarts.init document.getElementById("main"), 'dark'
  secondChart = echarts.init document.getElementById("secondChart"), 'dark'

  if isPhone()
    console.log "dds"
    jQuery("#all").addClass "phone"
  else
    width = jQuery(window).width()
    if width < 780
      jQuery("#all").css "transform", "scale(#{width / 780.0})"

  jQuery("#select").change ->
    selectedRegion = jQuery(this).val()
    Cookies.set "selectedRegion", selectedRegion
    jQuery("#regionBtn").html selectedRegion
    jQuery("#regionBtn").removeAttr "active"
    reload()
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
  # requestallRegionTrendData()
  requestMainChinaData()

