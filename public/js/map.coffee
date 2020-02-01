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


requestAllRegionCurrentAreaTreeData = (callback)->
  apiUrl = "https://view.inews.qq.com/g2/getOnsInfo?name=disease_h5"
  jQuery.ajax {
    url: '/api_proxy/get?url=' + encodeURIComponent apiUrl
    success: (result)->
      jsonStr = result.data
      allRegionCurrentAreaTreeData = JSON.parse jsonStr

      jQuery("#tip").html "最后数据更新时间<br>#{allRegionCurrentAreaTreeData.lastUpdateTime} "
      
      console.log allRegionCurrentAreaTreeData

      reloadMapChart()

      stopLoading()
  }

mapHasUpdated = no


getProvinceGeoArray = (province)->
  for item in window.cityGeoData
    if item.name.indexOf(province) != -1
      return item.children

getCityGeoArray = (provinceGeoArray, cityName)->
  for item in provinceGeoArray
    if item.name.indexOf("台湾") != -1
      return [parseFloat(item.log), parseFloat(item.lat)]
    
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
  # bmap.disableDragging()
  # bmap.disableScrollWheelZoom()
  # bmap.disablePinchToZoom()
  # bmap.disableDoubleClickZoom()



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

  
jQuery(document).ready ->
  mapChart = echarts.init document.getElementById("mapChart"), 'light'

  footerHeight = jQuery(".footer").height() + 30
  windowHeight = jQuery(window).height()
  jQuery("#mapChart").css "height", "#{windowHeight-footerHeight}px"
  
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

  requestAllRegionCurrentAreaTreeData()

