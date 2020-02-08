import json

with open('2020-02-02_2_perc10.topojson','r') as fr:
    topoAll = json.loads(fr.read())

provinceCenters = {}
cityCenters = {}
for item in topoAll['objects']['combine_original_7']['geometries']:
    south = float(item['properties']['bbox'][1])
    north = float(item['properties']['bbox'][3])

    west = float(item['properties']['bbox'][0])
    east = float(item['properties']['bbox'][2])

    print(south, north, west, east)
    centerLatlng = [round(south + (north - south) / 2, 3), round(west + (east - west) / 2, 3)]

    if item['properties']['admin-level'] == 'province':
        provinceCenters[item['properties']['province']] = centerLatlng
    if item['properties']['admin-level'] == 'city':
        cityCenters[item['properties']['city']] = centerLatlng
with open('provinceCenters.json', 'w') as fw:
    fw.write(json.dumps(provinceCenters, ensure_ascii=False, separators=(',',':')))
with open('cityCenters.json', 'w') as fw:
    fw.write(json.dumps(cityCenters, ensure_ascii=False, separators=(',',':')))