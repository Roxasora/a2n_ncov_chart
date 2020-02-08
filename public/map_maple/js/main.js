var map
var Fujian_prov = []
var lastStyle
var lastObj

var bnd1
var bnd2
var bnd3
var bnd4
var bnd5

var perc100
var perc50
var perc20
var perc10
var perc5

var bboxProv
var bboxCity
var bboxSub

var provPlgs = []
var cityPlgs = []
var subPlgs = []

var cluster1; var cluster2; var cluster3; var cluster4; var cluster5; var cluster6
var cityCb_cfm = [0]
var cityCb_cured = [0]
var cityCb_dead = [0]
var provinceCb_cfm = [0]
var provinceCb_cured = [0]
var provinceCb_dead = [0]

var hospitalLayer

var data1

var clickedSeq = 0

var bndOpacity = 0.65

var cityRescue = {}
var cityFever = {}
var cityBoth = {}
var provinceRescue = {}
var provinceFever = {}
var provinceBoth = {}

var locations

var styles1 = [{ "color": "#000000", "fillColor": "#ffffb2", "fillOpacity": bndOpacity, "weight": 3 },
{ "color": "#000000", "fillColor": "#fed976", "fillOpacity": bndOpacity, "weight": 3 },
{ "color": "#000000", "fillColor": "#feb24c", "fillOpacity": bndOpacity, "weight": 3 },
{ "color": "#000000", "fillColor": "#fd8d3c", "fillOpacity": bndOpacity, "weight": 3 },
{ "color": "#000000", "fillColor": "#fc4e2a", "fillOpacity": bndOpacity, "weight": 3 },
{ "color": "#000000", "fillColor": "#e31a1c", "fillOpacity": bndOpacity, "weight": 3 },
{ "color": "#000000", "fillColor": "#b10026", "fillOpacity": bndOpacity, "weight": 3 },
]
var styles2 = [{ "color": "#a9a9a9", "fillColor": "#ffffb2", "fillOpacity": bndOpacity, "weight": 2 },
{ "color": "#a9a9a9", "fillColor": "#fed976", "fillOpacity": bndOpacity, "weight": 2 },
{ "color": "#a9a9a9", "fillColor": "#feb24c", "fillOpacity": bndOpacity, "weight": 2 },
{ "color": "#a9a9a9", "fillColor": "#fd8d3c", "fillOpacity": bndOpacity, "weight": 2 },
{ "color": "#a9a9a9", "fillColor": "#fc4e2a", "fillOpacity": bndOpacity, "weight": 2 },
{ "color": "#a9a9a9", "fillColor": "#e31a1c", "fillOpacity": bndOpacity, "weight": 2 },
{ "color": "#a9a9a9", "fillColor": "#b10026", "fillOpacity": bndOpacity, "weight": 2 },
]
var styles22 = [{ "color": "#000000", "fillColor": "#ffffb2", "fillOpacity": bndOpacity, "weight": 3 },
{ "color": "#000000", "fillColor": "#fed976", "fillOpacity": bndOpacity, "weight": 3 },
{ "color": "#000000", "fillColor": "#feb24c", "fillOpacity": bndOpacity, "weight": 3 },
{ "color": "#000000", "fillColor": "#fd8d3c", "fillOpacity": bndOpacity, "weight": 3 },
{ "color": "#000000", "fillColor": "#fc4e2a", "fillOpacity": bndOpacity, "weight": 3 },
{ "color": "#000000", "fillColor": "#e31a1c", "fillOpacity": bndOpacity, "weight": 3 },
{ "color": "#000000", "fillColor": "#b10026", "fillOpacity": bndOpacity, "weight": 3 },
]
var styles3 = [{ "color": "#959595", "fillColor": "#ffffb2", "fillOpacity": bndOpacity, "weight": 1.5 },
{ "color": "#959595", "fillColor": "#fed976", "fillOpacity": bndOpacity, "weight": 1.5 },
{ "color": "#959595", "fillColor": "#feb24c", "fillOpacity": bndOpacity, "weight": 1.5 },
{ "color": "#959595", "fillColor": "#fd8d3c", "fillOpacity": bndOpacity, "weight": 1.5 },
{ "color": "#959595", "fillColor": "#fc4e2a", "fillOpacity": bndOpacity, "weight": 1.5 },
{ "color": "#959595", "fillColor": "#e31a1c", "fillOpacity": bndOpacity, "weight": 1.5 },
{ "color": "#959595", "fillColor": "#b10026", "fillOpacity": bndOpacity, "weight": 1.5 },
]

function initMap() {
    tianditu_sat_3857 = L.tileLayer('http://{s}.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILECOL={x}&TILEROW={y}&tk=c77ff55fbeec6f05de4685b93f816b9a', {
        // zoomOffset: 1,
        subdomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7']
    })

    tianditu_map_3857 = L.tileLayer('http://{s}.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILECOL={x}&TILEROW={y}&tk=c77ff55fbeec6f05de4685b93f816b9a', {
        // zoomOffset: 1,
        subdomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7']
    })

    tianditu_ter_3857 = L.tileLayer('http://{s}.tianditu.gov.cn/ter_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=ter&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILECOL={x}&TILEROW={y}&tk=c77ff55fbeec6f05de4685b93f816b9a', {
        // zoomOffset: 1,
        subdomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7']
    })

    tianditu_ibo_3857 = L.tileLayer('http://{s}.tianditu.gov.cn/ibo_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=ibo&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILECOL={x}&TILEROW={y}&tk=c77ff55fbeec6f05de4685b93f816b9a', {
        // zoomOffset: 1,
        subdomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7']
    })

    tianditu_cva_3857 = L.tileLayer('http://{s}.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILECOL={x}&TILEROW={y}&tk=c77ff55fbeec6f05de4685b93f816b9a', {
        // zoomOffset: 1,
        subdomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7']
    })
    var map1 = L.map('map', {
        crs: L.CRS.EPSG3857,
        layers: [tianditu_map_3857, tianditu_cva_3857],
        minZoom: 1,
        maxZoom: 16,
        worldCopyJump: true,
        maxBounds: [[180, -1800], [-180, 1800]],
        zoomSnap: 0.75,
        zoomDelta: 0.75
    })
    map1.setView([35.2, 110.7], 4)

    var baseMaps = {
        "天地图行政区划图": tianditu_map_3857,
        "天地图卫星图": tianditu_sat_3857,
        // "天地图矢量注记（经纬度投影）": tianditu_cva_3857,
    }

    var markerOverlays = {
        "地名注记（经纬度投影）": tianditu_cva_3857
    }

    $('.leaflet-top.leaflet-left .leaflet-control-zoom.leaflet-control').remove()

    L.control.layers(baseMaps, markerOverlays).addTo(map1);

    var zoomControl = L.control.zoom({
        position: 'topright'
    });

    map1.addControl(zoomControl);
    $('.leaflet-top.leaflet-right .leaflet-control-zoom.leaflet-bar.leaflet-control').css('margin-top', '12px').css('margin-right', '12px')

    // L.latlngGraticule({
    //     showLabel: true,
    //     dashArray: [4, 4],
    //     fontColor: '#999999',
    //     zoomInterval: graticule_zoom
    // }).addTo(map1);

    return map1
}

function loadProvinceHospitalDistrib() {
    console.log(provinceBoth)
}

function loadCityHospitalDistrib() {
    console.log(cityBoth)
}

function fetchChoroplethData() {
    var promises = []
    promises.push($.getJSON('data/2020-02-08/2020-02-08-16-20_2_perc10.topojson'))
    if (perc20 === undefined) {
        Promise.all(promises).then(loadProv)
    } else {
        loadChoropleth()
    }
}

function loadProv(data) {
    c20 = data[0]
    perc20 = topojson.feature(c20, c20.objects.combine_original_7)
    loadChoropleth()
}
function removeChoropleth() {
    if (map.hasLayer(bnd1)) { bnd1.removeFrom(map) }
    if (map.hasLayer(bnd2)) { bnd2.removeFrom(map) }
    statsLayer.drawing(removeFromCanvas)
    statsLayer.redraw()    
    return
}


function loadChoropleth() {
    statsLayer.drawing(loadStats)
    statsLayer.redraw()

    console.log('adding choro', perc20)
    bnd1 = L.geoJson(perc20, {
        style: function (feature) {
            cfm = feature['properties']['confirmed']
            // console.log('adding province', cfm, ['上海市', '北京市', '重庆市', '天津市'].includes(feature['properties']['province']),feature['properties']['province'] )
            if (['上海市', '北京市', '重庆市', '天津市'].includes(feature['properties']['province'])) {
                for (i = 0; i < 6; i++) {
                    if (cfm >= cityCb_cfm[i] && cfm <= cityCb_cfm[i + 1]) {
                        return styles22[i]
                    }
                }
            } else {
                return {
                    fillOpacity: 0,
                    color: '#000',
                    opacity: 1,
                    weight: 3
                }
            }
        },
        filter: function (feature) {
            if (feature['properties']['admin-level'] == 'province') {
                return true
            }
        }
    })

    bnd2 = L.geoJson(perc20, {
        style: function (feature) {
            // console.log(feature['properties'])
            cfm = feature['properties']['confirmed']
            for (i = 0; i < 6; i++) {
                if (cfm >= cityCb_cfm[i] && cfm <= cityCb_cfm[i + 1]) {
                    return styles2[i]
                }
            }
            return ({
                "color": "#a9a9a9",
                "fillColor": "#fff",
                "fillOpacity": '0.55',
                "weight": 2
            })
        },
        filter: function (feature) {
            if (feature['properties']['admin-level'] == 'city') {
                return true
            }
        },
        onEachFeature: function (feature, layer) {
            layer.on({
                mouseout: function (e) {
                    this.setStyle(lastStyle)
                },
                mouseover: function (e) {
                    lastStyle = this.options.style
                    this.setStyle({ color: "black", fillColor: '#e0e922', weight: 3.5 })
                }
            })
        }
    })

    bnd3 = L.geoJson(perc20, {
        style: {
            fillOpacity: 0.5,
            // fillColor: '#ef4030',

            color: '#959595',
            opacity: 1,
            weight: 1.5
        },
        filter: function (feature) {
            if ((feature['properties']['admin-level'] == 'city-district') || (feature['properties']['admin-level'] == 'dirAdmin-district')) {
                return true
            }
        },

    })
    // bnd3.addTo(map)
    bnd2.addTo(map)
    bnd1.addTo(map)
}

function update_legend(colors, grades, nameGrades, legendTitle) {
    // $('#contourfLegend').empty()
    for (var i = 5; i >= 0; i--) {
        if (i == 5) {
            document.getElementById('contourfLegend').innerHTML += '<i style="background:' + colors[i] + '"></i>' + nameGrades[i] + '&nbsp<br>';
        } else {
            document.getElementById('contourfLegend').innerHTML += '<i style="background:' + colors[i] + '"></i>' + nameGrades[i] + '&nbsp<br>';
        }
    }
}

function update_shape() {
    var cur_bound = map.getBounds()
    var zoom_p = map.getZoom()

    var north = cur_bound.getNorth()
    var south = cur_bound.getSouth()
    var west = cur_bound.getWest()
    var east = cur_bound.getEast()

    if (zoom_p < 5) {
        for (i = 0; i < bboxProv.length; i++) {
            if ((bboxProv[0] > west || bboxProv[2] < east) && (bboxProv[1] > south || bboxProv[3] < north)) {

            }
        }
    } else if (zoom_p == 6 || zoom_p == 7) {
        for (i = 0; i < perc10.length; i++) {

        }
    } else if (zoom_p == 8 || zoom_p == 9) {
        for (i = 0; i < perc20.length; i++) {

        }
    } else if (zoom_p == 10 || zoom_p == 11) {
        for (i = 0; i < perc50.length; i++) {

        }
    } else {
        for (i = 0; i < perc100.length; i++) {

        }
    }
}

function testing() {
    var options = {
        maxZoom: 13,  // max zoom to preserve detail on; can't be higher than 24
        tolerance: 3, // simplification tolerance (higher means simpler)
        extent: 4096, // tile extent (both width and height)
        buffer: 64,   // tile buffer on each side
        debug: 0,     // logging level (0 to disable, 1 or 2)
        lineMetrics: false, // whether to enable line metrics tracking for LineString/MultiLineString features
        promoteId: null,    // name of a feature property to promote to feature.id. Cannot be used with `generateId`
        generateId: false,  // whether to generate feature ids. Cannot be used with `promoteId`
        indexMaxZoom: 13,       // max zoom in the initial tile index
        indexMaxPoints: 0 // max number of points per tile in the index
    }
    var options = { debug: 0 }

    L.geoJson(data[1], {
        style: {
            fillOpacity: 0.7,
            fillColor: '#ef4030',
            renderer: L.canvas(),

            color: '#000',
            opacity: 1,
            weight: 3.5
        },
        onEachFeature: function (feature, layer) {
        }
    }).addTo(map)

    L.geoJson(data[0], {
        style: {
            fillOpacity: 0.7,
            fillColor: '#ef4030',
            renderer: L.canvas(),

            color: '#a00905',
            opacity: 0.7,
            weight: 1.5
        },
        onEachFeature: function (feature, layer) {
            layer.on({
                mouseout: function (e) {
                    // lastStyle['fillOpacity'] = 0.85
                    this.setStyle(lastStyle)
                },
                mouseover: function (e) {
                    lastStyle = this.options.style
                    this.setStyle({ color: "black", fillColor: '#e0e922', weight: 3.5 })
                }
            })
        }
    }).addTo(map)
}

function getClusters() {

    clusters1 = ss.ckmeans(dataCities_cfm, 6)
    console.log(dataCities_cfm, cluster1)
    for (i = 0; i < clusters1.length; i++) { cityCb_cfm.push(clusters1[i][clusters1[i].length - 1]) }

    clusters2 = ss.ckmeans(dataCities_cured, 6)
    for (i = 0; i < clusters2.length; i++) { cityCb_cured.push(clusters2[i][clusters2[i].length - 1]) }

    clusters3 = ss.ckmeans(dataCities_dead, 6)
    for (i = 0; i < clusters3.length; i++) { cityCb_dead.push(clusters3[i][clusters3[i].length - 1]) }

    clusters4 = ss.ckmeans(dataProvinces_cfm, 6)
    for (i = 0; i < clusters4.length; i++) { provinceCb_cfm.push(clusters4[i][clusters4[i].length - 1]) }

    clusters5 = ss.ckmeans(dataProvinces_cured, 6)
    for (i = 0; i < clusters5.length; i++) { provinceCb_cured.push(clusters5[i][clusters5[i].length - 1]) }

    clusters6 = ss.ckmeans(dataProvinces_dead, 6)
    for (i = 0; i < clusters6.length; i++) { provinceCb_dead.push(clusters6[i][clusters6[i].length - 1]) }

    // console.log(provinceCb_cured)
}

var hospitalIconBoth = new Image()
hospitalIconBoth.src = 'data/icon/bothHospital.png'

var hospitalIconFever = new Image()
hospitalIconFever.src = 'data/icon/feverHospital.png'

var hospitalIconRescue = new Image()
hospitalIconRescue.src = 'data/icon/rescueHospital.png'

var scFtr = []
var scPos = []

function loadStats(canvasOverlay, info) {
    console.log(' loadin gstats')
    var zoom = map.getZoom()
    var ctx = info.canvas.getContext('2d');
    ctx.clearRect(0, 0, info.canvas.width, info.canvas.height);
    for (var i = 0; i < perc20['features'].length; i++) {
        // console.log('drawing', )

        if (zoom < 7 && perc20['features'][i]['properties']['admin-level'] == 'province') {
            // console.log('drawing province')
            // load province stats layer
            var d = perc20['features'][i];
            lon = d['properties']['cp'][0]
            lat = d['properties']['cp'][1]

            place = d['properties']['province']
            confirmed = d['properties']['confirmed']
            cured = d['properties']['cured']
            dead = d['properties']['dead']

            if (confirmed == '-1') { confirmed = 0 }
            if (cured == '-1') { cured = 0 }
            if (dead == '-1') { dead = 0 }

            if (info.bounds.contains([lat, lon])) {
                dot = map.latLngToContainerPoint([lat, lon]);

                ctx.beginPath()

                ctx.font = '14px bold serif';
                ctx.fillStyle = '#000'
                ctx.fillText(place, dot.x - 20, dot.y - 15)

                ctx.font = '12px serif';
                ctx.fillStyle = '#a20'
                ctx.fillText('确诊:' + confirmed, dot.x - 20, dot.y)
                
                ctx.fillStyle = '#1a0'
                ctx.fillText('治愈:' + cured, dot.x - 20, dot.y + 14)
                
                ctx.fillStyle = '#555'
                ctx.fillText('死亡:' + dead, dot.x - 20, dot.y + 28)

                ctx.closePath()
            }
        } else if ((zoom >= 7 && perc20['features'][i]['properties']['admin-level'] == 'city')) {
            var d = perc20['features'][i]
            lon = d['properties']['cp'][0]
            lat = d['properties']['cp'][1]
            
            place = d['properties']['city']
            confirmed = d['properties']['confirmed']
            cured = d['properties']['cured']
            dead = d['properties']['dead']

            if (confirmed == '-1') { confirmed = 0 }
            if (cured == '-1') { cured = 0 }
            if (dead == '-1') { dead = 0 }

            if (info.bounds.contains([lat, lon])) {
                dot = map.latLngToContainerPoint([lat, lon]);

                ctx.beginPath()

                ctx.font = '14px bold serif';
                ctx.fillStyle = '#000'
                ctx.fillText(place, dot.x - 20, dot.y - 15)

                ctx.font = '12px serif';
                ctx.fillStyle = '#a20'
                ctx.fillText('确诊:' + confirmed, dot.x - 20, dot.y)
                
                ctx.fillStyle = '#1a0'
                ctx.fillText('治愈:' + cured, dot.x - 20, dot.y + 14)
                
                ctx.fillStyle = '#555'
                ctx.fillText('死亡:' + dead, dot.x - 20, dot.y + 28)

                ctx.closePath()
            }
        }
    }
}

function loadLocations(canvasOverlay, info) {
    var zoom = map.getZoom()
    var ctx = info.canvas.getContext('2d');
    ctx.clearRect(0, 0, info.canvas.width, info.canvas.height);
    ctx.fillStyle = "rgba(100,100,100, 0.15)";
    ctx.fillRect(0, 0, info.canvas.width, info.canvas.height)
    for (var i = 0; i < locations.length; i++) {
        var d = locations[i];
        lon = parseFloat(d[0])
        lat = parseFloat(d[1])
        addr = d[5]
        if (info.bounds.contains([lat, lon])) {
            dot = map.latLngToContainerPoint([lat, lon]);

            ctx.beginPath();
            ctx.arc(dot.x, dot.y, 3, 0, Math.PI * 2);
            ctx.strokeStyle = '#000'
            ctx.fillStyle = '#d71000'
            ctx.fill();
            ctx.stroke()

            ctx.closePath();

            if (zoom > 11) {
                ctx.beginPath()
                ctx.font = '13px serif';
                ctx.fillStyle = '#000'
                ctx.fillText(addr, dot.x + 5, dot.y + 5)
                ctx.closePath()
            }
        }
    }
}

function loadHospitals(canvasOverlay, info) {
    if (!data1) return
    console.log('drawing hospital func called', canvasOverlay, info)
    console.log("HIGHLIGHTING---", clickedSeq)
    var zoomLv = map.getZoom()
    if (zoomLv < 10) { var addText = false } else { var addText = true }

    var addr; var lng; var lat; var province; var city; var district; var designatedRescue; var feverRegular
    var ctx = info.canvas.getContext('2d');
    ctx.clearRect(0, 0, info.canvas.width, info.canvas.height);
    ctx.fillStyle = "rgba(100,100,100,0.15)";
    ctx.fillRect(0, 0, info.canvas.width, info.canvas.height)

    var bothH = []; var rescueH = []; var feverH = []
    for (var i = 0; i < data1.length; i++) {
        var dThis = data1[i];
        if (dThis[1] == '') { continue }
        addr = dThis[0]
        lng = parseFloat(dThis[1])
        lat = parseFloat(dThis[2])
        province = dThis[3]
        city = dThis[4]

        if (dThis[6] == 'y') { designatedRescue = true } else { designatedRescue = false }
        if (dThis[7] == 'y') { feverRegular = true } else { feverRegular = false }
        // if (city == '南京市') { console.log(dThis[5], dThis[6], designatedRescue, feverRegular) }
        if (designatedRescue && feverRegular) { bothH.push([lat, lng, addr]) }
        else if (designatedRescue) { rescueH.push[lat, lng, addr] }
        else if (feverRegular) { feverH.push([lat, lng, addr]) }
        else { continue }
    }

    var ct = 0
    for (i = 0; i < feverH.length; i++) {
        lat = feverH[i][0]; lng = feverH[i][1]; addr = feverH[i][2]
        if (info.bounds.contains([lat, lng])) {
            dot = canvasOverlay._map.latLngToContainerPoint([lat, lng]);
            dotX = dot.x; dotY = dot.y
            if (ct == clickedSeq) { thisIcon = hospitalIconRescue; console.log(addr) } else { thisIcon = hospitalIconFever }
            ctx.drawImage(thisIcon, dotX - 10, dotY - 10, 20, 20)
            if (addText) {
                ctx.beginPath()
                ctx.font = '14px serif';
                ctx.fillStyle = '#000'
                ctx.fillText(addr, dot.x + 10, dot.y + 5)
                ctx.closePath()
            }
            scPos.push([dotX - 10, dotY - 10, dotX + 10, dotY + 10])
        }
        ct += 1
    }

    for (i = 0; i < rescueH.length; i++) {
        lat = rescueH[i][0]; lng = rescueH[i][1]; addr = rescueH[i][2]
        if (info.bounds.contains([lat, lng])) {
            dot = canvasOverlay._map.latLngToContainerPoint([lat, lng]);
            dotX = dot.x; dotY = dot.y
            if (ct == clickedSeq) { thisIcon = hospitalIconFever; console.log(addr) } else { thisIcon = hospitalIconRescue }
            ctx.drawImage(thisIcon, dotX - 10, dotY - 10, 20, 20)
            if (addText) {
                ctx.beginPath()
                ctx.font = '14px serif';
                ctx.fillStyle = '#000'
                ctx.fillText(addr, dot.x + 10, dot.y + 5)
                ctx.closePath()
            }
            scPos.push([dotX - 10, dotY - 10, dotX + 10, dotY + 10])
        }
        ct += 1
    }

    for (i = 0; i < bothH.length; i++) {
        lat = bothH[i][0]; lng = bothH[i][1]; addr = bothH[i][2]
        if (info.bounds.contains([lat, lng])) {
            dot = canvasOverlay._map.latLngToContainerPoint([lat, lng]);
            dotX = dot.x; dotY = dot.y
            if (ct == clickedSeq) { thisIcon = hospitalIconRescue } else { thisIcon = hospitalIconBoth }
            ctx.drawImage(thisIcon, dotX - 10, dotY - 10, 20, 20)
            if (addText) {
                ctx.beginPath()
                ctx.font = '14px serif';
                ctx.fillStyle = '#000'
                ctx.fillText(addr, dotX + 10, dotY + 5)
                ctx.closePath()
            }
            scPos.push([dotX - 10, dotY - 10, dotX + 10, dotY + 10])
        }
        ct += 1
    }
    console.log(ct)
    scPos.reverse()
}

function removeFromCanvas(canvasOverlay, info) {
    var ctx = info.canvas.getContext('2d');
    ctx.clearRect(0, 0, info.canvas.width, info.canvas.height);
}

function firstTimeLoadHospitalLayer() {
    hospitalLayer.drawing(loadHospitals)
    hospitalLayer.redraw()
}
function loadHospitalLayer() {
    console.log('drawing hospital layer')
    hospitalLayer.drawing(loadHospitals)
}
function removeHospitalLayer() {
    hospitalLayer.drawing(removeFromCanvas)
    hospitalLayer.redraw()
}

function firstTimeLoadLocationLayer() {
    locationLayer.drawing(loadLocations)
    locationLayer.redraw()
}
function loadLocationLayer() {
    console.log('drawing Location layer')
    locationLayer.drawing(loadLocations)
}
function removeLocationLayer() {
    locationLayer.drawing(removeFromCanvas)
    locationLayer.redraw()
}


(function () {
    getClusters()

    var legendColors = ['#ffffb2', '#fed976', '#feb24c', '#fd8d3c', '#fc4e2a', '#e31a1c']
    var grades = 6
    var nameGrades = []
    nameGrades.push(cityCb_cfm[0] + '~' + cityCb_cfm[1])
    nameGrades.push(cityCb_cfm[1] + '~' + cityCb_cfm[2])
    nameGrades.push(cityCb_cfm[2] + '~' + cityCb_cfm[3])
    nameGrades.push(cityCb_cfm[3] + '~' + cityCb_cfm[4])
    nameGrades.push(cityCb_cfm[4] + '~' + cityCb_cfm[5])
    nameGrades.push(cityCb_cfm[5] + '~' + cityCb_cfm[6])

    update_legend(legendColors, grades, nameGrades, '确诊人数')
    map = initMap()

    // var marker = new L.Marker.SVGMarker(L.latLng([31.772752,119.946973]), {
    //     iconOptions: {
    //         color: "rgb(0,0,100)",
    //         iconSize: L.point(64, 64),
    //         // circleText: '温州' + String(122), fontSize: 20 
    //     }
    // }).addTo(map)

    $('#showContacted').click(function () {
        if (this.checked) {
            fetchChoroplethData()
        } else {
            removeChoropleth()
        }
    })

    // init hospital layer
    hospitalLayer = L.canvasOverlay().addTo(map)
    locationLayer = L.canvasOverlay().addTo(map)
    statsLayer = L.canvasOverlay().addTo(map)

    $('#map > div.leaflet-pane.leaflet-map-pane > div.leaflet-pane.leaflet-overlay-pane > canvas').css('z-index', '2500')

    // load hospital position data
    $.getJSON('data/allHospitals.json', function (result) {
        data1 = result['all']
        $('#showHospitals').click(function () {
            if (this.checked) {
                firstTimeLoadHospitalLayer()
                map.off('moveend', loadHospitalLayer).on('moveend', loadHospitalLayer)
            }
            else {
                map.off('moveend', loadHospitalLayer)
                removeHospitalLayer()
            }
        })
    })

    $.getJSON('data/hospitalStats_wc.json', function (result) {
        cityRescue = result['cityRescue']
        cityFever = result['cityFever']
        cityBoth = result['cityBoth']
        provinceRescue = result['provinceRescue']
        provinceFever = result['provinceFever']
        provinceBoth = result['provinceBoth']

        $('input[name="showHospitalDistrib"]').click(function () {
            if (this.value == 'provinceHospitalDistrib') {
                loadProvinceHospitalDistrib()
            } else if (this.value == 'cityHospitalDistrib') {
                loadCityHospitalDistrib()
            }
        })
    })

    $.getJSON('data/details.json', function (result) {
        locations = result['all']
        $('#showLocations').click(function () {
            if (this.checked) {
                firstTimeLoadLocationLayer()
                map.off('moveend', loadLocationLayer).on('moveend', loadLocationLayer)
            }
            else {
                map.off('moveend', loadLocationLayer)
                removeLocationLayer()
            }
        })
    })

    $('#cancelHospitalDistrib').click(function () {
        this.click
    })


    // $('#map').click(function (e) {
    //     console.log(e)
    //     var latlngP = map.containerPointToLatLng(L.point(e.offsetX, e.offsetY))
    //     var latlng = [latlngP.lat, latlngP.lng]
    //     console.log(latlng, e.offsetX, e.offsetY)

    //     clickedSeq = -1
    //     for (i = 0; i < scPos.length; i++) {
    //         // console.log(e.offsetY, scPos[0])
    //         if ((e.offsetX > scPos[i][0]) && (e.offsetX < scPos[i][2]) && (e.offsetY > scPos[i][1]) && (e.offsetY < scPos[i][3])) {
    //             clickedSeq = i
    //             break
    //         }
    //     }
    //     hospitalLayer.redraw()
    // })

    // map.on('click', function () {
    //     var popup = L.popup({ keepInView: false, autoPan: false })//{offset: L.point(0,-4)})
    //         .setLatLng(L.latLng(latlng[0], latlng[1]))
    //         .setContent('<p>Hello world!<br />This is a nice popup.</p>')
    //         .openOn(map);
    // })

    // map.on('moveend', function () {
    //     update_shape() 
    // })
})()