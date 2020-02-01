// Generated by CoffeeScript 1.8.0
(function() {
  var allRegionCurrentAreaTreeData, allRegionTrendData, confirmedLabelBgColor, confirmedLineColor, curedLabelBgColor, curedLineColor, deadLabelBgColor, deadLineColor, firstChart, getCityGeoArray, getProvinceGeoArray, getURLParamWithKey, mainChinaData, mapChart, mapHasUpdated, reloadMapChart, requestAllRegionCurrentAreaTreeData, safeRegion, secondChart, selectedPageIndex, selectedRegion, seriousLabelBgColor, seriousLineColor, startLoading, stopLoading, suspectedLabelBgColor, suspectedLineColor, timeStrWithUnix;

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

  firstChart = null;

  secondChart = null;

  mapChart = null;

  selectedPageIndex = -1;

  safeRegion = ['全国', '湖北', '北京', '广东', '山东', '上海', '广西', '黑龙江', '江苏', '河北', '天津', '江西', '四川', '湖南', '云南', '浙江', '台湾', '河南', '重庆', '贵州', '香港', '安徽', '海南', '澳门', '辽宁', '福建', '山西', '宁夏', '吉林', '内蒙古', '陕西', '新疆', '甘肃', '青海', '西藏'];

  requestAllRegionCurrentAreaTreeData = function(callback) {
    var apiUrl;
    apiUrl = "https://view.inews.qq.com/g2/getOnsInfo?name=disease_h5";
    return jQuery.ajax({
      url: '/api_proxy/get?url=' + encodeURIComponent(apiUrl),
      success: function(result) {
        var jsonStr;
        jsonStr = result.data;
        allRegionCurrentAreaTreeData = JSON.parse(jsonStr);
        jQuery("#tip").html("最后数据更新时间<br>" + allRegionCurrentAreaTreeData.lastUpdateTime + " ");
        console.log(allRegionCurrentAreaTreeData);
        reloadMapChart();
        return stopLoading();
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
      if (item.name.indexOf("台湾") !== -1) {
        return [parseFloat(item.log), parseFloat(item.lat)];
      }
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
    return bmap = mapChart.getModel().getComponent('bmap').getBMap();
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

  jQuery(document).ready(function() {
    mapChart = echarts.init(document.getElementById("mapChart"), 'light');
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
    return requestAllRegionCurrentAreaTreeData();
  });

}).call(this);
