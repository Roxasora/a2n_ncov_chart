window.drawMapOption = function (confirmedDataArray) {

    var windowWidth = jQuery(document).width()
    var zoom = 0
    if (windowWidth < 500) {
        zoom = 4.0
    }
    else if (windowWidth <= 700) {
        zoom = 5.0
    } else {
        zoom = 5.4
    }


    option = {
        tooltip : {
            trigger: 'item',
            formatter: function (params) {
                console.log(params)
                return "" + params.name + "确诊:" + params.value[2];
            }
        },
        bmap: {
            center: [108.166129, 35.550339],
            zoom: zoom,
            roam: true,
            mapStyle: {
                styleJson: [
                    {
                        "featureType": "water",
                        "elementType": "all",
                        "stylers": {
                            "color": "#044161"
                        }
                    },
                    {
                        "featureType": "land",
                        "elementType": "all",
                        "stylers": {
                            "color": "#004981"
                        }
                    },
                    {
                        "featureType": "boundary",
                        "elementType": "geometry",
                        "stylers": {
                            "color": "#064f85"
                        }
                    },
                    {
                        "featureType": "railway",
                        "elementType": "all",
                        "stylers": {
                            "visibility": "off"
                        }
                    },
                    {
                        "featureType": "highway",
                        "elementType": "geometry",
                        "stylers": {
                            "color": "#004981"
                        }
                    },
                    {
                        "featureType": "highway",
                        "elementType": "geometry.fill",
                        "stylers": {
                            "color": "#005b96",
                            "lightness": 1
                        }
                    },
                    {
                        "featureType": "highway",
                        "elementType": "labels",
                        "stylers": {
                            "visibility": "off"
                        }
                    },
                    {
                        "featureType": "arterial",
                        "elementType": "geometry",
                        "stylers": {
                            "color": "#004981"
                        }
                    },
                    {
                        "featureType": "arterial",
                        "elementType": "geometry.fill",
                        "stylers": {
                            "color": "#00508b"
                        }
                    },
                    {
                        "featureType": "poi",
                        "elementType": "all",
                        "stylers": {
                            "visibility": "off"
                        }
                    },
                    {
                        "featureType": "green",
                        "elementType": "all",
                        "stylers": {
                            "color": "#056197",
                            "visibility": "off"
                        }
                    },
                    {
                        "featureType": "subway",
                        "elementType": "all",
                        "stylers": {
                            "visibility": "off"
                        }
                    },
                    {
                        "featureType": "manmade",
                        "elementType": "all",
                        "stylers": {
                            "visibility": "off"
                        }
                    },
                    {
                        "featureType": "local",
                        "elementType": "all",
                        "stylers": {
                            "visibility": "off"
                        }
                    },
                    {
                        "featureType": "arterial",
                        "elementType": "labels",
                        "stylers": {
                            "visibility": "off"
                        }
                    },
                    {
                        "featureType": "boundary",
                        "elementType": "geometry.fill",
                        "stylers": {
                            "color": "#029fd4"
                        }
                    },
                    {
                        "featureType": "building",
                        "elementType": "all",
                        "stylers": {
                            "color": "#1a5787"
                        }
                    },
                    {
                        "featureType": "label",
                        "elementType": "all",
                        "stylers": {
                            "visibility": "on",
                            opacity : 0.5
                        }
                    }
                ]
            }
        },
        series : [
        {
            name: '确诊人数',
            type: 'scatter',
            coordinateSystem: 'bmap',
            data: confirmedDataArray,
            symbolSize: function (val) {
                return 1.7 * Math.log2(val[2]);
            },
            label: {
                formatter: '{b}',
                position: 'right',
                show: false
            },
            itemStyle: {
                color: 'yellow',
                opacity : 0.7
            },
            emphasis: {
                label: {
                    show: false
                }
            }
        },
        {
            name: '确诊人数较多地区',
            type: 'effectScatter',
            coordinateSystem: 'bmap',
            data: confirmedDataArray.sort(function (a, b) {
                return b.value[2] - a.value[2];
            }).slice(0, 6),
            symbolSize: function (val) {
                return 1.2 * Math.log2(val[2]);
            },
            showEffectOn: 'render',
            rippleEffect: {
                brushType: 'stroke'
            },
            hoverAnimation: true,
            label: {
                formatter: '{b}',
                position: 'right',
                show: false,
            },
            itemStyle: {
                color: 'red',
                shadowBlur: 10,
                shadowColor: 'rgba(0,0,0,0.5)'
            },
            zlevel: 1
        }
        ]
    };
    return option;
}