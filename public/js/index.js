// Generated by CoffeeScript 1.8.0
(function() {
  var allRegionCurrentAreaTreeData, allRegionTrendData, confirmedLabelBgColor, confirmedLineColor, csvJSON, curedLabelBgColor, curedLineColor, deadLabelBgColor, deadLineColor, firstChart, getCityGeoArray, getProvinceGeoArray, getURLParamWithKey, isPhone, jumpToPage, labelConfig, mainChinaData, mapChart, mapHasUpdated, newsData, reload, reloadMapChart, reloadSecondChart, reloadSelect, reloadTabData, requestAllRegionCurrentAreaTreeData, requestMainChinaData, requestNewsData, requestallRegionTrendData, safeRegion, secondChart, selectedPageIndex, selectedRegion, seriousLabelBgColor, seriousLineColor, setSelectedRegion, startLoading, stopLoading, suspectedLabelBgColor, suspectedLineColor, timeStrWithUnix;

  confirmedLineColor = '#EFCC51';

  seriousLineColor = '#CD7543';

  curedLineColor = '#7ED03D';

  deadLineColor = '#891A1A';

  suspectedLineColor = '#DB70D0';

  confirmedLabelBgColor = '#866800';

  seriousLabelBgColor = '#8C3B0D';

  curedLabelBgColor = '#3A780A';

  deadLabelBgColor = '#841D1D';

  suspectedLabelBgColor = '#996294';

  allRegionTrendData = {};

  allRegionCurrentAreaTreeData = {};

  selectedRegion = "全国";

  mainChinaData = [];

  newsData = [];

  firstChart = null;

  secondChart = null;

  mapChart = null;

  selectedPageIndex = -1;

  safeRegion = ['全国', '湖北', '北京', '广东', '山东', '上海', '广西', '黑龙江', '江苏', '河北', '天津', '江西', '四川', '湖南', '云南', '浙江', '台湾', '河南', '重庆', '贵州', '香港', '安徽', '海南', '澳门', '辽宁', '福建', '山西', '宁夏', '吉林', '内蒙古', '陕西', '新疆', '甘肃', '青海', '西藏'];

  isPhone = function() {
    var Agents, flag, userAgentInfo, v, _i, _len;
    userAgentInfo = navigator.userAgent;
    Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
    flag = false;
    for (_i = 0, _len = Agents.length; _i < _len; _i++) {
      v = Agents[_i];
      if (userAgentInfo.indexOf(v) > 0) {
        flag = true;
        break;
      }
    }
    return flag;
  };

  csvJSON = function(csv) {
    var currentline, headers, i, j, lines, obj, result;
    lines = csv.split('\n');
    result = [];
    headers = lines[0].split(',');
    i = 1;
    while (i < lines.length) {
      obj = {};
      currentline = lines[i].split(',');
      j = 0;
      while (j < headers.length) {
        obj[headers[j]] = currentline[j];
        j++;
      }
      result.push(obj);
      i++;
    }
    return result;
  };

  labelConfig = function(bgColor, position) {
    if (!position) {
      position = 'top';
    }
    return {
      normal: {
        show: true,
        position: position,
        fontSize: 8,
        fontWeight: "bolder",
        backgroundColor: bgColor,
        padding: 3,
        borderRadius: 4
      }
    };
  };

  reload = function() {
    var M, confirmData, curedData, currentDate, dataOffset, date, deadData, i, isMainChina, isSars, item, legendData, mainChinaItem, myChart, nConData, option, provinceItem, seriousData, suspectedData, xAxisData, _i, _j, _len, _ref, _ref1;
    myChart = firstChart;
    isSars = jQuery("#select").val() === "sars";
    if (isSars) {
      reloadCompare();
    }
    reloadSecondChart();
    isMainChina = selectedRegion === "全国";
    legendData = ['确诊', '疑似', '死亡', '治愈'];
    nConData;
    if (isMainChina) {
      nConData = mainChinaData;
      jQuery("#regionName span").html("全国");
      jQuery("#title").html("全国新型冠状病毒相关各类人数折线图");
      jQuery("#confirmed_suffix").html("疑似");
      legendData = ['确诊', '疑似', '死亡', '治愈'];
    } else {
      nConData = allRegionTrendData[selectedRegion];
      jQuery("#title").html("" + selectedRegion + "新型冠状病毒相关各类人数折线图");
      jQuery("#regionName span").html("" + selectedRegion);
      jQuery("#confirmed_suffix").html("疑似");
      legendData = ['确诊'];
    }
    xAxisData = [];
    confirmData = [];
    seriousData = [];
    curedData = [];
    deadData = [];
    suspectedData = [];
    dataOffset = 0;
    if (nConData.length > 14) {
      dataOffset = nConData.length - 14 - 1;
    }
    for (i = _i = 0, _ref = nConData.length - dataOffset; _i < _ref; i = _i += 1) {
      item = nConData[i + dataOffset];
      date = new Date(item['date']);
      xAxisData[i] = item.date;
      confirmData[i] = item["confirmed"];
      curedData[i] = item["curedCase"];
      deadData[i] = item["dead"];
      suspectedData[i] = item["suspected"];
      i++;
    }
    currentDate = new Date();
    M = currentDate.getMinutes();
    if (M <= 9) {
      M = "0" + M;
    }
    jQuery("#desc").html("(截止至 " + (currentDate.getFullYear()) + "-" + (currentDate.getMonth() + 1) + "-" + (currentDate.getDate()) + " " + (currentDate.getHours()) + ":" + M + "   以国家卫建委发布数据制图)");
    option = {
      backgroundColor: "#00101010",
      title: {},
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
      },
      legend: {
        data: legendData,
        top: 10,
        textStyle: {
          fontSize: 10
        }
      },
      xAxis: [
        {
          "type": "category",
          data: xAxisData,
          axisLabel: {
            textStyle: {
              fontSize: 8
            }
          }
        }
      ],
      yAxis: [
        {
          name: '',
          type: 'value',
          axisLabel: {
            textStyle: {
              fontSize: 8
            }
          }
        }
      ],
      series: [
        {
          name: '确诊',
          type: 'line',
          data: confirmData,
          itemStyle: {
            normal: {
              color: confirmedLineColor
            }
          },
          label: labelConfig(confirmedLabelBgColor)
        }, {
          name: '死亡',
          type: 'line',
          data: deadData,
          itemStyle: {
            normal: {
              color: deadLineColor
            }
          },
          label: labelConfig(deadLabelBgColor)
        }, {
          name: '治愈',
          type: 'line',
          data: curedData,
          itemStyle: {
            normal: {
              color: curedLineColor
            }
          },
          label: labelConfig(curedLabelBgColor, "right")
        }, {
          name: '疑似',
          type: 'line',
          data: suspectedData,
          itemStyle: {
            normal: {
              color: suspectedLineColor
            }
          },
          label: {
            normal: {
              show: false
            }
          }
        }
      ]
    };
    if (isMainChina) {
      mainChinaItem = allRegionCurrentAreaTreeData.chinaTotal;
      jQuery("#confirmed").html(mainChinaItem.confirm);
      jQuery("#suspected").html(mainChinaItem.suspect);
      jQuery("#cured").html(mainChinaItem.heal);
      jQuery("#dead").html(mainChinaItem.dead);
    } else {
      _ref1 = allRegionCurrentAreaTreeData.areaTree[0].children;
      for (_j = 0, _len = _ref1.length; _j < _len; _j++) {
        provinceItem = _ref1[_j];
        if (provinceItem.name === selectedRegion) {
          jQuery("#confirmed").html(provinceItem.total.confirm);
          jQuery("#suspected").html(provinceItem.total.suspect);
          jQuery("#cured").html(provinceItem.total.heal);
          jQuery("#dead").html(provinceItem.total.dead);
          break;
        }
      }
    }
    myChart.clear();
    return myChart.setOption(option);
  };

  reloadSecondChart = function() {
    var cityItem, isMainChina, item, legendData, myChart, option, pieDataArray, provinceItem, xAxisAllDataArray, xAxisTodayDataArray, yAxisDataArray, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2;
    myChart = secondChart;
    isMainChina = selectedRegion === "全国";
    legendData = ['累计确诊', '今日确诊'];
    yAxisDataArray = [];
    xAxisAllDataArray = [];
    xAxisTodayDataArray = [];
    option = {};
    if (isMainChina) {
      jQuery("#secondContentHeaderTitle").html("全国 各省累计确诊人数");
      jQuery("#cardSubtitle").removeClass("hidden");
      _ref = allRegionCurrentAreaTreeData.areaTree[0].children;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        item = _ref[_i];
        yAxisDataArray.push(item.name);
        xAxisAllDataArray.push(item.total.confirm);
        xAxisTodayDataArray.push(item.today.confirm);
      }
      option = {
        backgroundColor: "#343a40",
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
          inverse: true
        },
        series: [
          {
            name: '累计确诊',
            type: 'bar',
            itemStyle: {
              normal: {
                color: confirmedLineColor
              }
            },
            label: {
              show: true,
              position: ['110%', '20%'],
              fontSize: 10,
              fontWeight: 600
            },
            data: xAxisAllDataArray
          }
        ]
      };
    } else {
      jQuery("#secondContentHeaderTitle").html("" + selectedRegion + " · 各地累计确诊人数");
      jQuery("#cardSubtitle").addClass("hidden");
      pieDataArray = [];
      _ref1 = allRegionCurrentAreaTreeData.areaTree[0].children;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        provinceItem = _ref1[_j];
        if (provinceItem.name === selectedRegion) {
          _ref2 = provinceItem.children;
          for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
            cityItem = _ref2[_k];
            if (cityItem.name === "地区待确认") {
              continue;
            }
            pieDataArray.push({
              value: cityItem.total.confirm,
              name: "" + cityItem.name + ":" + cityItem.total.confirm
            });
          }
          break;
        }
      }
      option = {
        backgroundColor: "#343a40",
        grid: {
          x: 0,
          y: 0,
          x2: 0,
          y2: 0
        },
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
            },
            label: {
              show: true,
              fontSize: 10
            }
          }
        ]
      };
    }
    myChart.clear();
    return myChart.setOption(option);
  };

  requestMainChinaData = function() {
    var apiUrl;
    startLoading();
    apiUrl = "http://view.inews.qq.com/g2/getOnsInfo?name=wuwei_ww_cn_day_counts";
    return jQuery.ajax({
      url: '/api_proxy/get?url=' + encodeURIComponent(apiUrl),
      success: function(result) {
        var item, jsonStr, _i, _len;
        jsonStr = result.data;
        mainChinaData = JSON.parse(jsonStr);
        for (_i = 0, _len = mainChinaData.length; _i < _len; _i++) {
          item = mainChinaData[_i];
          item.confirmed = item.confirm;
          item.curedCase = item.heal;
          item.suspected = item.suspect;
        }
        console.log(mainChinaData);
        mainChinaData.sort(function(a, b) {
          return parseFloat(a.date) - parseFloat(b.date);
        });
        return requestAllRegionCurrentAreaTreeData(function() {
          return requestallRegionTrendData(function() {
            reload();
            return stopLoading();
          });
        });
      }
    });
  };

  requestallRegionTrendData = function(callback) {
    return jQuery.ajax({
      url: "http://datanews.caixin.com/interactive/2020/iframe/pneumonia-new/data/data2.csv",
      success: function(result) {
        var allKeys, convertedJson, item, key, number, time, _i, _j, _len, _len1;
        convertedJson = csvJSON(result);
        allRegionTrendData = {};
        for (_i = 0, _len = convertedJson.length; _i < _len; _i++) {
          item = convertedJson[_i];
          allKeys = Object.keys(item);
          time;
          for (_j = 0, _len1 = allKeys.length; _j < _len1; _j++) {
            key = allKeys[_j];
            if (key === "time") {
              time = item[key];
            } else {
              number = item[key];
              if (!allRegionTrendData[key]) {
                allRegionTrendData[key.replace("\r", "")] = [];
              }
              allRegionTrendData[key.replace("\r", "")].push({
                date: time,
                confirmed: number
              });
            }
          }
        }
        if (callback) {
          return callback();
        }
      }
    });
  };

  requestAllRegionCurrentAreaTreeData = function(callback) {
    var apiUrl;
    apiUrl = "https://view.inews.qq.com/g2/getOnsInfo?name=disease_h5";
    return jQuery.ajax({
      url: '/api_proxy/get?url=' + encodeURIComponent(apiUrl),
      success: function(result) {
        var chinaTotal, jsonStr;
        jsonStr = result.data;
        allRegionCurrentAreaTreeData = JSON.parse(jsonStr);
        chinaTotal = allRegionCurrentAreaTreeData.chinaTotal;
        mainChinaData[mainChinaData.length - 1].curedCase = chinaTotal.heal;
        mainChinaData[mainChinaData.length - 1].confirmed = chinaTotal.confirm;
        mainChinaData[mainChinaData.length - 1].suspected = chinaTotal.suspect;
        mainChinaData[mainChinaData.length - 1].dead = chinaTotal.dead;
        jQuery("#tip").html("最后更新：" + allRegionCurrentAreaTreeData.lastUpdateTime + " <br> 点击折线图查看单日详细数据");
        console.log(allRegionCurrentAreaTreeData);
        reloadMapChart();
        if (callback) {
          return callback();
        }
      }
    });
  };

  mapHasUpdated = false;

  getProvinceGeoArray = function(province) {
    var item, _i, _len, _ref;
    _ref = window.cityGeoData;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      item = _ref[_i];
      if (item.name.indexOf(province) !== -1) {
        return item.children;
      }
    }
  };

  getCityGeoArray = function(provinceGeoArray, cityName) {
    var item, _i, _len;
    for (_i = 0, _len = provinceGeoArray.length; _i < _len; _i++) {
      item = provinceGeoArray[_i];
      if (item.name.indexOf(cityName) !== -1) {
        return [parseFloat(item.log), parseFloat(item.lat)];
      }
    }
    return [];
  };

  reloadMapChart = function() {
    var bmap, cityGeoArray, cityItem, confirmedDataArray, item, option, provinceGeoArray, provinceItem, _i, _j, _len, _len1, _ref, _ref1;
    if (mapHasUpdated) {
      return;
    }
    mapHasUpdated = true;
    confirmedDataArray = [];
    _ref = allRegionCurrentAreaTreeData.areaTree[0].children;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      provinceItem = _ref[_i];
      provinceGeoArray = getProvinceGeoArray(provinceItem.name);
      _ref1 = provinceItem.children;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        cityItem = _ref1[_j];
        cityGeoArray = getCityGeoArray(provinceGeoArray, cityItem.name);
        if (cityGeoArray.length === 0) {
          continue;
        }
        item = {
          name: cityItem.name,
          value: [cityGeoArray[0], cityGeoArray[1], cityItem.total.confirm]
        };
        confirmedDataArray.push(item);
      }
    }
    option = window.drawMapOption(confirmedDataArray);
    mapChart.clear();
    mapChart.setOption(option);
    bmap = mapChart.getModel().getComponent('bmap').getBMap();
    bmap.disableDragging();
    bmap.disableScrollWheelZoom();
    bmap.disablePinchToZoom();
    bmap.disableDoubleClickZoom();
    return bmap.setMaxZoom(6);
  };

  reloadTabData = function() {};

  reloadSelect = function() {
    var item, optionsHtml, _i, _len;
    optionsHtml = "";
    for (_i = 0, _len = safeRegion.length; _i < _len; _i++) {
      item = safeRegion[_i];
      optionsHtml += "<option value ='" + item + "'>" + item + "</option>";
    }
    jQuery("#select").html(optionsHtml);
    return jQuery("#select").val(selectedRegion);
  };

  timeStrWithUnix = function(timeStamp) {
    var day, month, monthStr, nowDate, nowYear, originalDate, timeDif, timeDifToHour, timeDifToMin, year;
    nowDate = new Date();
    originalDate = new Date(timeStamp);
    year = originalDate.getFullYear();
    month = originalDate.getMonth() + 1;
    day = originalDate.getDate();
    nowYear = nowDate.getFullYear();
    timeDif = (nowDate.getTime() - timeStamp) / 1000;
    if (timeDif <= 60 * 60) {
      timeDifToMin = parseInt(timeDif / 60);
      if (timeDifToMin === 0) {
        return "刚刚";
      } else {
        return "" + timeDifToMin + "分前";
      }
    } else if (timeDif <= 60 * 60 * 24) {
      timeDifToHour = parseInt(timeDif / 60 / 60);
      return "" + timeDifToHour + "小时前";
    } else {
      monthStr = originalDate.toString().substr(4, 3);
      if (nowYear === year) {
        return "" + day + " " + monthStr;
      } else {
        return "" + day + " " + monthStr + "," + year;
      }
    }
  };

  requestNewsData = function() {
    var url;
    if (newsData.length) {
      return;
    }
    startLoading();
    url = "";
    if (selectedRegion === '全国') {
      url = "https://lab.isaaclin.cn/nCoV/api/news?num=40";
    } else if (selectedRegion === '北京') {
      url = "https://lab.isaaclin.cn/nCoV/api/news?province=" + (encodeURIComponent(selectedRegion + '市')) + "&num=40";
    } else {
      url = "https://lab.isaaclin.cn/nCoV/api/news?province=" + (encodeURIComponent(selectedRegion + '省')) + "&num=40";
    }
    return jQuery.ajax({
      url: url,
      headers: {
        "Access-Control-Allow-Origin": "http://" + window.location.host
      },
      success: function(result) {
        var htmlStr, item, _i, _len, _ref;
        newsData = result.results;
        htmlStr = "";
        _ref = result.results;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          item = _ref[_i];
          htmlStr += "<div class='list-group'> <a href='" + item.sourceUrl + "' class='list-group-item list-group-item-action'> <div class='d-flex w-100 justify-content-between'> <h5 class='mb-1'>" + item.title + "</h5> </div> <p class='mb-1 newsSummary'>" + item.summary + "</p> <small>" + item.infoSource + " · " + (timeStrWithUnix(item.pubDate)) + "</small> </a> </div>";
        }
        jQuery("#newsPage").html(htmlStr);
        return stopLoading();
      }
    });
  };

  jumpToPage = function(index) {
    var currentPage, nextPage, pageArray;
    if (selectedPageIndex === index) {
      return;
    }
    jQuery("#tabNav li").removeClass("active");
    jQuery("#tabNav li").eq(index).addClass("active");
    pageArray = [jQuery("#chartPage"), jQuery("#a2nPage"), jQuery("#newsPage"), jQuery("#toolsPage")];
    currentPage = pageArray[selectedPageIndex];
    if (selectedPageIndex === -1) {
      currentPage = pageArray[0];
    }
    nextPage = pageArray[index];
    if (currentPage) {
      currentPage.fadeOut();
    }
    nextPage.fadeIn();
    selectedPageIndex = index;
    if (selectedPageIndex === 0) {
      if (allRegionCurrentAreaTreeData.chinaTotal) {
        reload();
      } else {
        requestMainChinaData();
      }
    }
    if (selectedPageIndex === 2) {
      if (newsData.length === 0) {
        requestNewsData();
      }
    } else {
      stopLoading();
    }
    return history.replaceState(null, null, "?p=" + selectedPageIndex);
  };

  startLoading = function() {
    return jQuery("#loadingContainer").fadeIn();
  };

  stopLoading = function() {
    return jQuery("#loadingContainer").fadeOut();
  };

  getURLParamWithKey = function(key) {
    var arr, i, pair, query, query_string, vars;
    query_string = {};
    query = window.location.search.substring(1);
    vars = query.split('&');
    i = 0;
    while (i < vars.length) {
      pair = vars[i].split('=');
      if (typeof query_string[pair[0]] === 'undefined') {
        query_string[pair[0]] = decodeURIComponent(pair[1]);
      } else if (typeof query_string[pair[0]] === 'string') {
        arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
        query_string[pair[0]] = arr;
      } else {
        query_string[pair[0]].push(decodeURIComponent(pair[1]));
      }
      i++;
    }
    return query_string[key];
  };

  setSelectedRegion = function(region) {
    var oldRegion;
    oldRegion = selectedRegion;
    selectedRegion = region;
    jQuery("#regionBtn").html(selectedRegion);
    jQuery("#newsTabBtn a").html("" + selectedRegion + "新闻");
    jQuery("#regionBtn").removeAttr("active");
    jQuery(document).attr("title", "" + selectedRegion + "疫情实时趋势&新闻");
    if (selectedRegion === '全国') {
      if (oldRegion !== '全国') {
        jQuery(".thirdContent").insertBefore(jQuery(".secondContent"));
      }
      jQuery("#secondChart").css("height", "800px");
      jQuery("#text").removeClass("threeItem");
      jQuery("#text .textItem").eq(1).removeClass("hidden");
    } else {
      if (oldRegion === '全国') {
        jQuery(".secondContent").insertBefore(jQuery(".thirdContent"));
      }
      jQuery("#secondChart").css("height", "260px");
      jQuery("#text").addClass("threeItem");
      jQuery("#text .textItem").eq(1).addClass("hidden");
    }
    jQuery("#chartTabBtn a").html("" + selectedRegion + "疫情");
    if (secondChart) {
      return secondChart.resize();
    } else {
      return secondChart = echarts.init(document.getElementById("secondChart"), 'dark');
    }
  };

  jQuery(document).ready(function() {
    var cookieRegion, width;
    cookieRegion = Cookies.get("selectedRegion");
    if (safeRegion.indexOf(cookieRegion) !== -1) {
      setSelectedRegion(cookieRegion);
    } else {
      setSelectedRegion("全国");
    }
    firstChart = echarts.init(document.getElementById("main"), 'dark');
    mapChart = echarts.init(document.getElementById("mapChart"), 'light');
    if (isPhone()) {
      console.log("dds");
      jQuery("#all").addClass("phone");
    } else {
      width = jQuery(window).width();
      if (width < 780) {
        jQuery("#all").css("transform", "scale(" + (width / 780.0) + ")");
      }
    }
    jQuery("#select").change(function() {
      setSelectedRegion(jQuery(this).val());
      Cookies.set("selectedRegion", selectedRegion);
      if (selectedPageIndex === 0) {
        return reload();
      } else if (selectedPageIndex === 1) {
        newsData = [];
        return requestNewsData();
      }
    });
    jQuery("#export").click(function() {
      return html2canvas(document.querySelector("#all")).then(function(canvas) {
        var a, isSars, isWuhan, now, time;
        a = document.createElement('a');
        a.href = canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");
        isWuhan = jQuery("#select").val() === "wuhan";
        isSars = jQuery("#select").val() === "sars";
        now = new Date();
        time = "" + (now.getFullYear()) + "-" + (now.getMonth() + 1) + "-" + (now.getDate());
        if (isWuhan) {
          a.download = "2019-nCov-wuhan-" + time + ".jpg";
        } else if (isSars) {
          a.download = "2019-nCov-vc-sars-" + time + ".jpg";
        } else {
          a.download = "2019-nCov-mainChina-" + time + ".jpg";
        }
        return a.click();
      });
    });
    jQuery("#collapseExample").on("shown.bs.collapse", function() {
      return jQuery("#secondContentCardHeader").addClass("dropup");
    });
    jQuery("#collapseExample").on("hidden.bs.collapse", function() {
      return jQuery("#secondContentCardHeader").removeClass("dropup");
    });
    jQuery("#tabNav li").click(function() {
      var index;
      index = jQuery(this).index();
      if (selectedPageIndex !== index) {
        return jumpToPage(index);
      }
    });
    setTimeout(function() {
      var urlPage;
      urlPage = getURLParamWithKey("p");
      if (urlPage && parseInt(urlPage) <= 2 && parseInt(urlPage) >= 0) {
        return jumpToPage(parseInt(urlPage));
      } else {
        return jumpToPage(0);
      }
    }, 300);
    return reloadSelect();
  });

}).call(this);
