// Generated by CoffeeScript 1.8.0
(function() {
  var allRegionData, confirmedLabelBgColor, confirmedLineColor, csvJSON, curedLabelBgColor, curedLineColor, deadLabelBgColor, deadLineColor, isPhone, labelConfig, mainChinaData, reload, reloadCompare, reloadSelect, requestAllRegionData, requestMainChinaData, selectedRegion, seriousLabelBgColor, seriousLineColor, suspectedLabelBgColor, suspectedLineColor;

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

  allRegionData = {};

  selectedRegion = "全国";

  mainChinaData = [];

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
        fontSize: 12,
        fontWeight: "bolder",
        backgroundColor: bgColor,
        padding: 3
      }
    };
  };

  reloadCompare = function() {
    var M, confirmData, currentDate, date, deadData, i, item, last, legendData, myChart, nConData, option, sarsConfirmData, sarsData, sarsDeadData, timeStr, _i, _j, _len, _len1;
    jQuery("#title").html("新型冠状病毒 与 SARS 对比图");
    myChart = echarts.init(document.getElementById("main"), 'dark');
    legendData = ['2019-nCov确诊', '2019-nCov死亡', 'sars确诊', 'sars死亡'];
    nConData = window.nCon_data;
    sarsData = window.sars_china;
    jQuery("#region").html("2019-nCov");
    jQuery("#confirmed_suffix").html("");
    jQuery("#suspected").addClass("hidden");
    confirmData = [];
    deadData = [];
    sarsConfirmData = [];
    sarsDeadData = [];
    i = 0;
    for (_i = 0, _len = nConData.length; _i < _len; _i++) {
      item = nConData[_i];
      date = new Date(item['date']);
      timeStr = "" + (date.getMonth() + 1) + "." + (date.getDate());
      confirmData[i] = [];
      deadData[i] = [];
      confirmData[i][0] = timeStr;
      deadData[i][0] = timeStr;
      confirmData[i][1] = item["confirmed"];
      deadData[i][1] = item["dead"];
      i++;
    }
    i = 0;
    for (_j = 0, _len1 = sarsData.length; _j < _len1; _j++) {
      item = sarsData[_j];
      date = new Date(item['date']);
      timeStr = "" + (date.getMonth() + 1) + "." + (date.getDate());
      sarsConfirmData[i] = [];
      sarsDeadData[i] = [];
      sarsConfirmData[i][0] = timeStr;
      sarsDeadData[i][0] = timeStr;
      sarsConfirmData[i][1] = item["confirmed"];
      sarsDeadData[i][1] = item["dead"];
      i++;
    }
    currentDate = new Date();
    M = currentDate.getMinutes();
    if (M <= 9) {
      M = "0" + M;
    }
    jQuery("#desc").html("(截止至 " + (currentDate.getFullYear()) + "-" + (currentDate.getMonth() + 1) + "-" + (currentDate.getDate()) + " " + (currentDate.getHours()) + ":" + M + "   以 国家卫建委的新冠病毒数据 及 WHO的SARS数据 制图)");
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
      legend: {
        data: legendData,
        top: 30
      },
      xAxis: [
        {
          "type": "category"
        }
      ],
      yAxis: [
        {
          name: '人数',
          type: 'value'
        }
      ],
      series: [
        {
          name: '2019-nCov确诊',
          type: 'line',
          data: confirmData,
          smooth: true,
          itemStyle: {
            normal: {
              color: confirmedLineColor
            }
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: confirmedLineColor
              }, {
                offset: 1,
                color: '#C0D9FF'
              }
            ])
          }
        }, {
          name: '2019-nCov死亡',
          type: 'line',
          data: deadData,
          smooth: true,
          itemStyle: {
            normal: {
              color: deadLineColor
            }
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: deadLineColor
              }, {
                offset: 1,
                color: deadLineColor
              }
            ])
          }
        }, {
          name: 'sars确诊',
          type: 'line',
          data: sarsConfirmData,
          smooth: true,
          itemStyle: {
            normal: {
              color: "#4090A1"
            }
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: '#4090A1'
              }, {
                offset: 1,
                color: '#C0D9FF'
              }
            ])
          }
        }, {
          name: 'sars死亡',
          type: 'line',
          smooth: true,
          data: sarsDeadData,
          itemStyle: {
            normal: {
              color: "#D227E1"
            }
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: '#D227E1'
              }, {
                offset: 1,
                color: '#D227E1'
              }
            ])
          }
        }
      ]
    };
    last = nConData[nConData.length - 1];
    myChart.clear();
    return myChart.setOption(option);
  };

  reload = function() {
    var M, confirmData, curedData, currentDate, dataOffset, date, deadData, i, isMainChina, isSars, item, last, legendData, myChart, nConData, option, seriousData, suspectedData, xAxisData, _i, _ref;
    myChart = echarts.init(document.getElementById("main"), 'dark');
    isSars = jQuery("#select").val() === "sars";
    if (isSars) {
      reloadCompare();
    }
    isMainChina = selectedRegion === "全国";
    legendData = ['确诊', '疑似', '死亡', '治愈'];
    nConData;
    if (isMainChina) {
      nConData = window.nCon_data;
      jQuery("#region").html("全国");
      jQuery("#title").html("全国新型冠状病毒相关各类人数折线图");
      jQuery("#confirmed_suffix").html("例 疑似");
      jQuery("#suspected").removeClass("hidden");
      legendData = ['确诊', '疑似', '死亡', '治愈'];
    } else {
      nConData = window.nCon_data_wuhan;
      jQuery("#title").html("" + selectedRegion + "新型冠状病毒相关各类人数折线图");
      jQuery("#region").html("" + selectedRegion);
      jQuery("#confirmed_suffix").html("");
      jQuery("#suspected").addClass("hidden");
      legendData = ['确诊', '死亡', '治愈'];
    }
    xAxisData = [];
    confirmData = [];
    seriousData = [];
    curedData = [];
    deadData = [];
    suspectedData = [];
    dataOffset = 0;
    if (isMainChina) {
      dataOffset = 7;
    }
    for (i = _i = 0, _ref = nConData.length - dataOffset; _i < _ref; i = _i += 1) {
      item = nConData[i + dataOffset];
      date = new Date(item['date']);
      xAxisData[i] = "" + (date.getMonth() + 1) + "." + (date.getDate());
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
      legend: {
        data: legendData,
        top: 30
      },
      xAxis: [
        {
          "type": "category",
          data: xAxisData,
          axisTick: {
            show: false,
            interval: 5,
            length: 2
          }
        }
      ],
      yAxis: [
        {
          name: '人数',
          type: 'value'
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
    last = nConData[nConData.length - 1];
    jQuery("#confirmed").html("" + (parseInt(last.confirmed)));
    jQuery("#suspected").html("" + (parseInt(last.suspected)));
    jQuery("#cured").html("" + (parseInt(last.curedCase)));
    jQuery("#dead").html("" + (parseInt(last.dead)));
    return myChart.setOption(option);
  };

  requestMainChinaData = function() {
    var apiUrl;
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
        return requestAllRegionData();
      }
    });
  };

  requestAllRegionData = function() {
    return jQuery.ajax({
      url: "http://datanews.caixin.com/interactive/2020/iframe/pneumonia-new/data/data2.csv",
      success: function(result) {
        var allKeys, convertedJson, item, key, number, time, _i, _j, _len, _len1;
        convertedJson = csvJSON(result);
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
              if (!allRegionData[key]) {
                allRegionData[key.replace("\r", "")] = [];
              }
              allRegionData[key.replace("\r", "")].push({
                date: time,
                confirmed: number
              });
            }
          }
        }
        reloadSelect();
        return reload();
      }
    });
  };

  reloadSelect = function() {
    var item, key, optionsHtml, _i, _len, _ref;
    optionsHtml = "";
    _ref = Object.keys(allRegionData);
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      key = _ref[_i];
      item = allRegionData[key];
      optionsHtml += "<option value ='" + key + "'>" + key + "</option>";
    }
    return jQuery("#select").html(optionsHtml);
  };

  jQuery(document).ready(function() {
    var width;
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
      selectedRegion = jQuery(this).val();
      return reload();
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
    return reload();
  });

}).call(this);
