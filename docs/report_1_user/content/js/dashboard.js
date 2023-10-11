/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 100.0, "KoPercent": 0.0};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.9813084112149533, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "/api/product/item/interruptor-y-toma-250"], "isController": false}, {"data": [1.0, 500, 1500, "/87185.webp-329"], "isController": false}, {"data": [1.0, 500, 1500, "/1091.jpeg-273"], "isController": false}, {"data": [1.0, 500, 1500, "/clavo-liso-1.jpg-317"], "isController": false}, {"data": [1.0, 500, 1500, "/api/product/item/teja-luminit-10-341"], "isController": false}, {"data": [1.0, 500, 1500, "/api/review/interruptor-y-toma-251"], "isController": false}, {"data": [1.0, 500, 1500, "/1067.jpg-297"], "isController": false}, {"data": [1.0, 500, 1500, "/descarga.jpeg-255"], "isController": false}, {"data": [1.0, 500, 1500, "/46A998_AW01.jpeg-258"], "isController": false}, {"data": [1.0, 500, 1500, "/1085.jpg-279"], "isController": false}, {"data": [1.0, 500, 1500, "/1081.jpg-285"], "isController": false}, {"data": [1.0, 500, 1500, "/api/product/list-345"], "isController": false}, {"data": [1.0, 500, 1500, "/api/product/list/brand/productos-338"], "isController": false}, {"data": [1.0, 500, 1500, "/1089.jpg-275"], "isController": false}, {"data": [1.0, 500, 1500, "/teja-translucida-marfil-n8-luminit-perfil-7-gerfor-570303%20%281%29.jpg-330"], "isController": false}, {"data": [1.0, 500, 1500, "/api/review/tapon-soldado-pvc-1-247"], "isController": false}, {"data": [1.0, 500, 1500, "/202568.webp-331"], "isController": false}, {"data": [1.0, 500, 1500, "/265875.jpeg-256"], "isController": false}, {"data": [1.0, 500, 1500, "/api/product/list/search/tej-340"], "isController": false}, {"data": [1.0, 500, 1500, "/1064.jpg-299"], "isController": false}, {"data": [0.5, 500, 1500, "/pollo.png-326"], "isController": false}, {"data": [1.0, 500, 1500, "/api/product/list-339"], "isController": false}, {"data": [1.0, 500, 1500, "/1066.jpeg-298"], "isController": false}, {"data": [1.0, 500, 1500, "/amarre-plastico-42-x-4-8-mm-negro.jpg-321"], "isController": false}, {"data": [1.0, 500, 1500, "/tapon-roscado-presion-3~4----2905207-1.webp-325"], "isController": false}, {"data": [1.0, 500, 1500, "/1084.jpg-281"], "isController": false}, {"data": [1.0, 500, 1500, "/1093.jpg-271"], "isController": false}, {"data": [0.5, 500, 1500, "/api/product/list-291"], "isController": false}, {"data": [1.0, 500, 1500, "/1061.jpg-301"], "isController": false}, {"data": [1.0, 500, 1500, "/descarga%20%281%29.jpeg-254"], "isController": false}, {"data": [1.0, 500, 1500, "/1058.png-305"], "isController": false}, {"data": [1.0, 500, 1500, "/1079.jpg-286"], "isController": false}, {"data": [1.0, 500, 1500, "/api/product/list-324"], "isController": false}, {"data": [0.5, 500, 1500, "/api/product/list-323"], "isController": false}, {"data": [1.0, 500, 1500, "/1075.webp-290"], "isController": false}, {"data": [1.0, 500, 1500, "/1072.jpg-294"], "isController": false}, {"data": [1.0, 500, 1500, "/1092.webp-272"], "isController": false}, {"data": [1.0, 500, 1500, "/1088.jpg-276"], "isController": false}, {"data": [1.0, 500, 1500, "/VALV-TANQ-MET.jpg-259"], "isController": false}, {"data": [1.0, 500, 1500, "/1074.png-292"], "isController": false}, {"data": [1.0, 500, 1500, "/d7d9513b8fcb5429f358.svg-344"], "isController": false}, {"data": [1.0, 500, 1500, "/palustre-8--mango-madera-1.webp-320"], "isController": false}, {"data": [1.0, 500, 1500, "/api/review/union-pvc-1-2-265"], "isController": false}, {"data": [1.0, 500, 1500, "/api/category/list-343"], "isController": false}, {"data": [1.0, 500, 1500, "/0010016000113.png-263"], "isController": false}, {"data": [1.0, 500, 1500, "/api/product/list-280"], "isController": false}, {"data": [1.0, 500, 1500, "/api/category/list-225"], "isController": false}, {"data": [1.0, 500, 1500, "/v4/fullHashes:find-319"], "isController": false}, {"data": [1.0, 500, 1500, "/25-large_default.jpg-311"], "isController": false}, {"data": [1.0, 500, 1500, "/api/product/list-312"], "isController": false}, {"data": [1.0, 500, 1500, "/tanque-plastico-500-lts-solo-con-tapa-eternit-1.webp-309"], "isController": false}, {"data": [1.0, 500, 1500, "/api/brand/list-336"], "isController": false}, {"data": [1.0, 500, 1500, "/api/brand/list-335"], "isController": false}, {"data": [1.0, 500, 1500, "/api/brand/list-334"], "isController": false}, {"data": [1.0, 500, 1500, "/1094.jpeg-270"], "isController": false}, {"data": [1.0, 500, 1500, "/teja-luminit-marfil-diez-cubierta.jpg-328"], "isController": false}, {"data": [1.0, 500, 1500, "/api/brand/list-337"], "isController": false}, {"data": [1.0, 500, 1500, "/api/review/adaptador-macho-pvc-1-240"], "isController": false}, {"data": [1.0, 500, 1500, "/1078.webp-287"], "isController": false}, {"data": [1.0, 500, 1500, "/1060.jpg-303"], "isController": false}, {"data": [1.0, 500, 1500, "/tanque-plastico-1000-lts-solo-con-tapa-eternit-1.webp-315"], "isController": false}, {"data": [1.0, 500, 1500, "/lija-agua-negra-premier-no150.jpg-318"], "isController": false}, {"data": [1.0, 500, 1500, "/797153331.jpg-322"], "isController": false}, {"data": [1.0, 500, 1500, "/api/review/teja-luminit-10-342"], "isController": false}, {"data": [1.0, 500, 1500, "/23-large_default.jpg-313"], "isController": false}, {"data": [1.0, 500, 1500, "/1090.webp-274"], "isController": false}, {"data": [1.0, 500, 1500, "/api/product/list-266"], "isController": false}, {"data": [1.0, 500, 1500, "/1083.jpg-282"], "isController": false}, {"data": [1.0, 500, 1500, "/api/product/list-269"], "isController": false}, {"data": [1.0, 500, 1500, "/api/product/list-302"], "isController": false}, {"data": [1.0, 500, 1500, "/api/product/list-267"], "isController": false}, {"data": [1.0, 500, 1500, "/api/product/list-268"], "isController": false}, {"data": [1.0, 500, 1500, "/1087.jpg-277"], "isController": false}, {"data": [1.0, 500, 1500, "/1062.webp-300"], "isController": false}, {"data": [1.0, 500, 1500, "/D_NQ_NP_790050-MCO43301892418_082020-O.webp-260"], "isController": false}, {"data": [1.0, 500, 1500, "/1071.jpg-296"], "isController": false}, {"data": [1.0, 500, 1500, "/sika-1-por-2-kilos.jpg-304"], "isController": false}, {"data": [1.0, 500, 1500, "/1077.jpeg-288"], "isController": false}, {"data": [1.0, 500, 1500, "/Flex-metro-encauchetado-3-MTS-LF700-03-64332301-1.png-316"], "isController": false}, {"data": [1.0, 500, 1500, "/api/product/list-252"], "isController": false}, {"data": [1.0, 500, 1500, "/api/product/list-253"], "isController": false}, {"data": [1.0, 500, 1500, "/1076.jpeg-289"], "isController": false}, {"data": [1.0, 500, 1500, "/D_NQ_NP_2X_976660-MCO43779355374_102020-F.webp-261"], "isController": false}, {"data": [1.0, 500, 1500, "/luminit-eternit.jpg-308"], "isController": false}, {"data": [1.0, 500, 1500, "/sifon_aluminiogris.jpg-257"], "isController": false}, {"data": [1.0, 500, 1500, "/api/product/item/union-pvc-1-2-264"], "isController": false}, {"data": [1.0, 500, 1500, "/117556.jpeg-314"], "isController": false}, {"data": [1.0, 500, 1500, "/1057.jpg-307"], "isController": false}, {"data": [1.0, 500, 1500, "/1082.jpg-283"], "isController": false}, {"data": [1.0, 500, 1500, "/1068.jpg-295"], "isController": false}, {"data": [1.0, 500, 1500, "/api/product/list-248"], "isController": false}, {"data": [1.0, 500, 1500, "/api/review/colmallas-gallina-1-80x11-4x36mts-333"], "isController": false}, {"data": [1.0, 500, 1500, "/api/product/list-245"], "isController": false}, {"data": [0.5, 500, 1500, "Home"], "isController": false}, {"data": [1.0, 500, 1500, "/api/product/list-249"], "isController": false}, {"data": [1.0, 500, 1500, "/1086.jpg-278"], "isController": false}, {"data": [1.0, 500, 1500, "/1073.jpg-293"], "isController": false}, {"data": [1.0, 500, 1500, "/api/brand/list-224"], "isController": false}, {"data": [1.0, 500, 1500, "/api/product/item/colmallas-gallina-1-80x11-4x36mts-332"], "isController": false}, {"data": [1.0, 500, 1500, "/api/product/item/adaptador-macho-pvc-1-239"], "isController": false}, {"data": [1.0, 500, 1500, "/12122.jpeg-310"], "isController": false}, {"data": [1.0, 500, 1500, "/f25dd0_2157791c501441c4b7121ef53669c49b~mv2.webp-327"], "isController": false}, {"data": [1.0, 500, 1500, "/IMG-20210211-WA0151%20%282%29.jpg-262"], "isController": false}, {"data": [1.0, 500, 1500, "/20220905112129-TEJAS-PLASTICAS-Y-POLIPROPILENO-PERFIL-7-TEJA---LUMIN-P-7--No-5-TRANS-152mt-LUMI-2815202209051121299239.jpg-306"], "isController": false}, {"data": [1.0, 500, 1500, "/1080.jpeg-284"], "isController": false}, {"data": [1.0, 500, 1500, "/api/product/item/tapon-soldado-pvc-1-246"], "isController": false}, {"data": [1.0, 500, 1500, "/api/product/list-238"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 107, 0, 0.0, 209.9158878504673, 101, 804, 177.0, 385.0000000000001, 460.1999999999999, 798.7200000000001, 0.3647109750735387, 9.15259181257946, 0.1527040805022786], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["/api/product/item/interruptor-y-toma-250", 1, 0, 0.0, 173.0, 173, 173, 173.0, 173.0, 173.0, 173.0, 5.780346820809248, 7.039152817919076, 2.325686416184971], "isController": false}, {"data": ["/87185.webp-329", 1, 0, 0.0, 111.0, 111, 111, 111.0, 111.0, 111.0, 111.0, 9.00900900900901, 95.483178490991, 3.5543355855855854], "isController": false}, {"data": ["/1091.jpeg-273", 1, 0, 0.0, 104.0, 104, 104, 104.0, 104.0, 104.0, 104.0, 9.615384615384617, 51.96439302884615, 3.7841796875], "isController": false}, {"data": ["/clavo-liso-1.jpg-317", 1, 0, 0.0, 307.0, 307, 307, 307.0, 307.0, 307.0, 307.0, 3.257328990228013, 332.8296773208469, 1.3042039902280131], "isController": false}, {"data": ["/api/product/item/teja-luminit-10-341", 1, 0, 0.0, 184.0, 184, 184, 184.0, 184.0, 184.0, 184.0, 5.434782608695652, 6.782863451086957, 2.1707286005434785], "isController": false}, {"data": ["/api/review/interruptor-y-toma-251", 1, 0, 0.0, 201.0, 201, 201, 201.0, 201.0, 201.0, 201.0, 4.975124378109452, 3.177472014925373, 1.9725590796019898], "isController": false}, {"data": ["/1067.jpg-297", 1, 0, 0.0, 121.0, 121, 121, 121.0, 121.0, 121.0, 121.0, 8.264462809917356, 278.8852660123967, 3.244447314049587], "isController": false}, {"data": ["/descarga.jpeg-255", 1, 0, 0.0, 122.0, 122, 122, 122.0, 122.0, 122.0, 122.0, 8.196721311475411, 133.70101178278688, 3.257876536885246], "isController": false}, {"data": ["/46A998_AW01.jpeg-258", 1, 0, 0.0, 177.0, 177, 177, 177.0, 177.0, 177.0, 177.0, 5.649717514124294, 147.35059145480227, 2.2620939265536726], "isController": false}, {"data": ["/1085.jpg-279", 1, 0, 0.0, 124.0, 124, 124, 124.0, 124.0, 124.0, 124.0, 8.064516129032258, 272.13804183467744, 3.165952620967742], "isController": false}, {"data": ["/1081.jpg-285", 1, 0, 0.0, 108.0, 108, 108, 108.0, 108.0, 108.0, 108.0, 9.25925925925926, 204.48133680555557, 3.634982638888889], "isController": false}, {"data": ["/api/product/list-345", 1, 0, 0.0, 376.0, 376, 376, 376.0, 376.0, 376.0, 376.0, 2.6595744680851063, 17.13139960106383, 1.2986203457446808], "isController": false}, {"data": ["/api/product/list/brand/productos-338", 1, 0, 0.0, 217.0, 217, 217, 217.0, 217.0, 217.0, 217.0, 4.608294930875576, 24.51306883640553, 1.8406177995391706], "isController": false}, {"data": ["/1089.jpg-275", 1, 0, 0.0, 203.0, 203, 203, 203.0, 203.0, 203.0, 203.0, 4.926108374384237, 169.20027709359604, 1.9338823891625614], "isController": false}, {"data": ["/teja-translucida-marfil-n8-luminit-perfil-7-gerfor-570303%20%281%29.jpg-330", 1, 0, 0.0, 445.0, 445, 445, 445.0, 445.0, 445.0, 445.0, 2.247191011235955, 21.030108848314608, 1.0204529494382022], "isController": false}, {"data": ["/api/review/tapon-soldado-pvc-1-247", 1, 0, 0.0, 205.0, 205, 205, 205.0, 205.0, 205.0, 205.0, 4.878048780487805, 3.11547256097561, 1.9388338414634148], "isController": false}, {"data": ["/202568.webp-331", 1, 0, 0.0, 140.0, 140, 140, 140.0, 140.0, 140.0, 140.0, 7.142857142857142, 31.919642857142854, 2.8250558035714284], "isController": false}, {"data": ["/265875.jpeg-256", 1, 0, 0.0, 421.0, 421, 421, 421.0, 421.0, 421.0, 421.0, 2.375296912114014, 14.548693586698338, 0.9394484857482186], "isController": false}, {"data": ["/api/product/list/search/tej-340", 1, 0, 0.0, 185.0, 185, 185, 185.0, 185.0, 185.0, 185.0, 5.405405405405405, 12.315244932432433, 2.1326013513513513], "isController": false}, {"data": ["/1064.jpg-299", 1, 0, 0.0, 125.0, 125, 125, 125.0, 125.0, 125.0, 125.0, 8.0, 106.2421875, 3.140625], "isController": false}, {"data": ["/pollo.png-326", 1, 0, 0.0, 804.0, 804, 804, 804.0, 804.0, 804.0, 804.0, 1.243781094527363, 318.769919931592, 0.48949587997512434], "isController": false}, {"data": ["/api/product/list-339", 1, 0, 0.0, 229.0, 229, 229, 229.0, 229.0, 229.0, 229.0, 4.366812227074235, 31.070892467248907, 2.123703602620087], "isController": false}, {"data": ["/1066.jpeg-298", 1, 0, 0.0, 151.0, 151, 151, 151.0, 151.0, 151.0, 151.0, 6.622516556291391, 167.5677773178808, 2.6063224337748343], "isController": false}, {"data": ["/amarre-plastico-42-x-4-8-mm-negro.jpg-321", 1, 0, 0.0, 133.0, 133, 133, 133.0, 133.0, 133.0, 133.0, 7.518796992481203, 279.5024671052631, 3.1646499060150375], "isController": false}, {"data": ["/tapon-roscado-presion-3~4----2905207-1.webp-325", 1, 0, 0.0, 102.0, 102, 102, 102.0, 102.0, 102.0, 102.0, 9.803921568627452, 184.08203125, 4.18390012254902], "isController": false}, {"data": ["/1084.jpg-281", 1, 0, 0.0, 122.0, 122, 122, 122.0, 122.0, 122.0, 122.0, 8.196721311475411, 181.01626536885246, 3.2178534836065573], "isController": false}, {"data": ["/1093.jpg-271", 1, 0, 0.0, 112.0, 112, 112, 112.0, 112.0, 112.0, 112.0, 8.928571428571429, 283.8221958705357, 3.505161830357143], "isController": false}, {"data": ["/api/product/list-291", 1, 0, 0.0, 518.0, 518, 518, 518.0, 518.0, 518.0, 518.0, 1.9305019305019306, 12.118424227799228, 0.9388573841698842], "isController": false}, {"data": ["/1061.jpg-301", 1, 0, 0.0, 188.0, 188, 188, 188.0, 188.0, 188.0, 188.0, 5.319148936170213, 382.1787732712766, 2.0881815159574466], "isController": false}, {"data": ["/descarga%20%281%29.jpeg-254", 1, 0, 0.0, 211.0, 211, 211, 211.0, 211.0, 211.0, 211.0, 4.739336492890995, 74.33908471563981, 1.9299837085308058], "isController": false}, {"data": ["/1058.png-305", 1, 0, 0.0, 170.0, 170, 170, 170.0, 170.0, 170.0, 170.0, 5.88235294117647, 185.60431985294116, 2.309283088235294], "isController": false}, {"data": ["/1079.jpg-286", 1, 0, 0.0, 123.0, 123, 123, 123.0, 123.0, 123.0, 123.0, 8.130081300813009, 224.1409425813008, 3.191692073170732], "isController": false}, {"data": ["/api/product/list-324", 1, 0, 0.0, 219.0, 219, 219, 219.0, 219.0, 219.0, 219.0, 4.5662100456621, 27.597923801369863, 2.2251355593607305], "isController": false}, {"data": ["/api/product/list-323", 1, 0, 0.0, 566.0, 566, 566, 566.0, 566.0, 566.0, 566.0, 1.7667844522968197, 11.65318573321555, 0.8592369699646644], "isController": false}, {"data": ["/1075.webp-290", 1, 0, 0.0, 163.0, 163, 163, 163.0, 163.0, 163.0, 163.0, 6.134969325153374, 67.69435391104294, 2.414445935582822], "isController": false}, {"data": ["/1072.jpg-294", 1, 0, 0.0, 441.0, 441, 441, 441.0, 441.0, 441.0, 441.0, 2.2675736961451247, 23.82281037414966, 0.8901998299319728], "isController": false}, {"data": ["/1092.webp-272", 1, 0, 0.0, 447.0, 447, 447, 447.0, 447.0, 447.0, 447.0, 2.237136465324385, 28.932029502237135, 0.8804355425055929], "isController": false}, {"data": ["/1088.jpg-276", 1, 0, 0.0, 248.0, 248, 248, 248.0, 248.0, 248.0, 248.0, 4.032258064516129, 208.18501134072582, 1.582976310483871], "isController": false}, {"data": ["/VALV-TANQ-MET.jpg-259", 1, 0, 0.0, 106.0, 106, 106, 106.0, 106.0, 106.0, 106.0, 9.433962264150942, 188.7990123820755, 3.7864829009433962], "isController": false}, {"data": ["/1074.png-292", 1, 0, 0.0, 318.0, 318, 318, 318.0, 318.0, 318.0, 318.0, 3.1446540880503147, 416.9522651336478, 1.2345224056603774], "isController": false}, {"data": ["/d7d9513b8fcb5429f358.svg-344", 1, 0, 0.0, 120.0, 120, 120, 120.0, 120.0, 120.0, 120.0, 8.333333333333334, 6.339518229166667, 3.22265625], "isController": false}, {"data": ["/palustre-8--mango-madera-1.webp-320", 1, 0, 0.0, 142.0, 142, 142, 142.0, 142.0, 142.0, 142.0, 7.042253521126761, 106.94734815140846, 2.922810299295775], "isController": false}, {"data": ["/api/review/union-pvc-1-2-265", 1, 0, 0.0, 194.0, 194, 194, 194.0, 194.0, 194.0, 194.0, 5.154639175257732, 3.292123067010309, 2.0185647551546393], "isController": false}, {"data": ["/api/category/list-343", 1, 0, 0.0, 171.0, 171, 171, 171.0, 171.0, 171.0, 171.0, 5.847953216374268, 6.0706779970760225, 2.250091374269006], "isController": false}, {"data": ["/0010016000113.png-263", 1, 0, 0.0, 104.0, 104, 104, 104.0, 104.0, 104.0, 104.0, 9.615384615384617, 368.30491286057696, 3.8592998798076925], "isController": false}, {"data": ["/api/product/list-280", 1, 0, 0.0, 231.0, 231, 231, 231.0, 231.0, 231.0, 231.0, 4.329004329004329, 31.499425054112553, 2.1053165584415585], "isController": false}, {"data": ["/api/category/list-225", 1, 0, 0.0, 194.0, 194, 194, 194.0, 194.0, 194.0, 194.0, 5.154639175257732, 5.35095844072165, 1.9833279639175256], "isController": false}, {"data": ["/v4/fullHashes:find-319", 1, 0, 0.0, 163.0, 163, 163, 163.0, 163.0, 163.0, 163.0, 6.134969325153374, 3.498849693251534, 4.0799942484662575], "isController": false}, {"data": ["/25-large_default.jpg-311", 1, 0, 0.0, 109.0, 109, 109, 109.0, 109.0, 109.0, 109.0, 9.174311926605505, 124.05031536697248, 3.7091456422018347], "isController": false}, {"data": ["/api/product/list-312", 1, 0, 0.0, 225.0, 225, 225, 225.0, 225.0, 225.0, 225.0, 4.444444444444445, 29.15798611111111, 2.1614583333333335], "isController": false}, {"data": ["/tanque-plastico-500-lts-solo-con-tapa-eternit-1.webp-309", 1, 0, 0.0, 107.0, 107, 107, 107.0, 107.0, 107.0, 107.0, 9.345794392523365, 220.00036507009347, 4.070531542056075], "isController": false}, {"data": ["/api/brand/list-336", 1, 0, 0.0, 174.0, 174, 174, 174.0, 174.0, 174.0, 174.0, 5.747126436781609, 4.725664511494253, 2.1944594109195403], "isController": false}, {"data": ["/api/brand/list-335", 1, 0, 0.0, 167.0, 167, 167, 167.0, 167.0, 167.0, 167.0, 5.9880239520958085, 4.923746257485029, 2.286442739520958], "isController": false}, {"data": ["/api/brand/list-334", 1, 0, 0.0, 173.0, 173, 173, 173.0, 173.0, 173.0, 173.0, 5.780346820809248, 4.75298049132948, 2.2071441473988442], "isController": false}, {"data": ["/1094.jpeg-270", 1, 0, 0.0, 108.0, 108, 108, 108.0, 108.0, 108.0, 108.0, 9.25925925925926, 55.338541666666664, 3.6440248842592595], "isController": false}, {"data": ["/teja-luminit-marfil-diez-cubierta.jpg-328", 1, 0, 0.0, 159.0, 159, 159, 159.0, 159.0, 159.0, 159.0, 6.289308176100629, 103.22081367924528, 2.6471599842767297], "isController": false}, {"data": ["/api/brand/list-337", 1, 0, 0.0, 170.0, 170, 170, 170.0, 170.0, 170.0, 170.0, 5.88235294117647, 4.836856617647059, 2.24609375], "isController": false}, {"data": ["/api/review/adaptador-macho-pvc-1-240", 1, 0, 0.0, 198.0, 198, 198, 198.0, 198.0, 198.0, 198.0, 5.050505050505051, 3.2256155303030303, 2.0172427398989896], "isController": false}, {"data": ["/1078.webp-287", 1, 0, 0.0, 158.0, 158, 158, 158.0, 158.0, 158.0, 158.0, 6.329113924050633, 675.076641613924, 2.4908524525316453], "isController": false}, {"data": ["/1060.jpg-303", 1, 0, 0.0, 112.0, 112, 112, 112.0, 112.0, 112.0, 112.0, 8.928571428571429, 187.55231584821428, 3.505161830357143], "isController": false}, {"data": ["/tanque-plastico-1000-lts-solo-con-tapa-eternit-1.webp-315", 1, 0, 0.0, 116.0, 116, 116, 116.0, 116.0, 116.0, 116.0, 8.620689655172413, 248.82980872844826, 3.7631330818965516], "isController": false}, {"data": ["/lija-agua-negra-premier-no150.jpg-318", 1, 0, 0.0, 249.0, 249, 249, 249.0, 249.0, 249.0, 249.0, 4.016064257028112, 148.97088353413653, 1.6746674196787148], "isController": false}, {"data": ["/797153331.jpg-322", 1, 0, 0.0, 120.0, 120, 120, 120.0, 120.0, 120.0, 120.0, 8.333333333333334, 585.3271484375, 3.312174479166667], "isController": false}, {"data": ["/api/review/teja-luminit-10-342", 1, 0, 0.0, 179.0, 179, 179, 179.0, 179.0, 179.0, 179.0, 5.58659217877095, 3.567999301675978, 2.1986295391061454], "isController": false}, {"data": ["/23-large_default.jpg-313", 1, 0, 0.0, 446.0, 446, 446, 446.0, 446.0, 446.0, 446.0, 2.242152466367713, 30.317229540358746, 0.906495235426009], "isController": false}, {"data": ["/1090.webp-274", 1, 0, 0.0, 171.0, 171, 171, 171.0, 171.0, 171.0, 171.0, 5.847953216374268, 70.06693165204678, 2.3014894005847952], "isController": false}, {"data": ["/api/product/list-266", 1, 0, 0.0, 219.0, 219, 219, 219.0, 219.0, 219.0, 219.0, 4.5662100456621, 32.4896546803653, 2.2206763698630136], "isController": false}, {"data": ["/1083.jpg-282", 1, 0, 0.0, 110.0, 110, 110, 110.0, 110.0, 110.0, 110.0, 9.09090909090909, 306.7737926136364, 3.5688920454545454], "isController": false}, {"data": ["/api/product/list-269", 1, 0, 0.0, 221.0, 221, 221, 221.0, 221.0, 221.0, 221.0, 4.524886877828055, 31.051152432126695, 2.2005797511312215], "isController": false}, {"data": ["/api/product/list-302", 1, 0, 0.0, 220.0, 220, 220, 220.0, 220.0, 220.0, 220.0, 4.545454545454545, 29.993785511363637, 2.2105823863636362], "isController": false}, {"data": ["/api/product/list-267", 1, 0, 0.0, 228.0, 228, 228, 228.0, 228.0, 228.0, 228.0, 4.385964912280701, 31.763980263157894, 2.1330180921052633], "isController": false}, {"data": ["/api/product/list-268", 1, 0, 0.0, 226.0, 226, 226, 226.0, 226.0, 226.0, 226.0, 4.424778761061947, 31.111725663716815, 2.1518943584070795], "isController": false}, {"data": ["/1087.jpg-277", 1, 0, 0.0, 109.0, 109, 109, 109.0, 109.0, 109.0, 109.0, 9.174311926605505, 152.44230217889907, 3.6016341743119265], "isController": false}, {"data": ["/1062.webp-300", 1, 0, 0.0, 106.0, 106, 106, 106.0, 106.0, 106.0, 106.0, 9.433962264150942, 320.17430719339626, 3.712780070754717], "isController": false}, {"data": ["/D_NQ_NP_790050-MCO43301892418_082020-O.webp-260", 1, 0, 0.0, 331.0, 331, 331, 331.0, 331.0, 331.0, 331.0, 3.0211480362537766, 10.987065709969787, 1.2892985271903323], "isController": false}, {"data": ["/1071.jpg-296", 1, 0, 0.0, 278.0, 278, 278, 278.0, 278.0, 278.0, 278.0, 3.5971223021582737, 351.8259611061151, 1.4121515287769784], "isController": false}, {"data": ["/sika-1-por-2-kilos.jpg-304", 1, 0, 0.0, 141.0, 141, 141, 141.0, 141.0, 141.0, 141.0, 7.092198581560283, 145.53551640070924, 2.8812056737588656], "isController": false}, {"data": ["/1077.jpeg-288", 1, 0, 0.0, 111.0, 111, 111, 111.0, 111.0, 111.0, 111.0, 9.00900900900901, 222.67384572072072, 3.545537725225225], "isController": false}, {"data": ["/Flex-metro-encauchetado-3-MTS-LF700-03-64332301-1.png-316", 1, 0, 0.0, 305.0, 305, 305, 305.0, 305.0, 305.0, 305.0, 3.278688524590164, 741.9569672131148, 1.4312243852459017], "isController": false}, {"data": ["/api/product/list-252", 1, 0, 0.0, 211.0, 211, 211, 211.0, 211.0, 211.0, 211.0, 4.739336492890995, 33.72148992890995, 2.3048726303317535], "isController": false}, {"data": ["/api/product/list-253", 1, 0, 0.0, 237.0, 237, 237, 237.0, 237.0, 237.0, 237.0, 4.219409282700422, 27.829970991561183, 2.052017405063291], "isController": false}, {"data": ["/1076.jpeg-289", 1, 0, 0.0, 138.0, 138, 138, 138.0, 138.0, 138.0, 138.0, 7.246376811594203, 80.24088541666666, 2.8518455615942027], "isController": false}, {"data": ["/D_NQ_NP_2X_976660-MCO43779355374_102020-F.webp-261", 1, 0, 0.0, 101.0, 101, 101, 101.0, 101.0, 101.0, 101.0, 9.900990099009901, 134.6786045792079, 4.254331683168316], "isController": false}, {"data": ["/luminit-eternit.jpg-308", 1, 0, 0.0, 128.0, 128, 128, 128.0, 128.0, 128.0, 128.0, 7.8125, 187.00408935546875, 3.15093994140625], "isController": false}, {"data": ["/sifon_aluminiogris.jpg-257", 1, 0, 0.0, 108.0, 108, 108, 108.0, 108.0, 108.0, 108.0, 9.25925925925926, 174.77756076388889, 3.761574074074074], "isController": false}, {"data": ["/api/product/item/union-pvc-1-2-264", 1, 0, 0.0, 469.0, 469, 469, 469.0, 469.0, 469.0, 469.0, 2.1321961620469083, 2.4216251332622605, 0.8474646855010661], "isController": false}, {"data": ["/117556.jpeg-314", 1, 0, 0.0, 126.0, 126, 126, 126.0, 126.0, 126.0, 126.0, 7.936507936507936, 42.47271825396825, 3.138950892857143], "isController": false}, {"data": ["/1057.jpg-307", 1, 0, 0.0, 110.0, 110, 110, 110.0, 110.0, 110.0, 110.0, 9.09090909090909, 299.36079545454544, 3.5688920454545454], "isController": false}, {"data": ["/1082.jpg-283", 1, 0, 0.0, 112.0, 112, 112, 112.0, 112.0, 112.0, 112.0, 8.928571428571429, 301.2956891741071, 3.505161830357143], "isController": false}, {"data": ["/1068.jpg-295", 1, 0, 0.0, 109.0, 109, 109, 109.0, 109.0, 109.0, 109.0, 9.174311926605505, 309.5882310779817, 3.6016341743119265], "isController": false}, {"data": ["/api/product/list-248", 1, 0, 0.0, 226.0, 226, 226, 226.0, 226.0, 226.0, 226.0, 4.424778761061947, 31.483337942477874, 2.1518943584070795], "isController": false}, {"data": ["/api/review/colmallas-gallina-1-80x11-4x36mts-333", 1, 0, 0.0, 183.0, 183, 183, 183.0, 183.0, 183.0, 183.0, 5.46448087431694, 3.4900102459016393, 2.2466273907103824], "isController": false}, {"data": ["/api/product/list-245", 1, 0, 0.0, 218.0, 218, 218, 218.0, 218.0, 218.0, 218.0, 4.587155963302752, 32.63868979357798, 2.2308629587155964], "isController": false}, {"data": ["Home", 1, 0, 0.0, 738.0, 738, 738, 738.0, 738.0, 738.0, 738.0, 1.3550135501355014, 3.494717564363144, 0.633839346205962], "isController": false}, {"data": ["/api/product/list-249", 1, 0, 0.0, 236.0, 236, 236, 236.0, 236.0, 236.0, 236.0, 4.237288135593221, 29.79343220338983, 2.0607123940677967], "isController": false}, {"data": ["/1086.jpg-278", 1, 0, 0.0, 302.0, 302, 302, 302.0, 302.0, 302.0, 302.0, 3.3112582781456954, 752.017798013245, 1.2999275662251657], "isController": false}, {"data": ["/1073.jpg-293", 1, 0, 0.0, 199.0, 199, 199, 199.0, 199.0, 199.0, 199.0, 5.025125628140704, 149.65452261306532, 1.9727543969849246], "isController": false}, {"data": ["/api/brand/list-224", 1, 0, 0.0, 367.0, 367, 367, 367.0, 367.0, 367.0, 367.0, 2.7247956403269753, 2.2405057901907357, 1.0404248978201636], "isController": false}, {"data": ["/api/product/item/colmallas-gallina-1-80x11-4x36mts-332", 1, 0, 0.0, 197.0, 197, 197, 197.0, 197.0, 197.0, 197.0, 5.076142131979695, 6.612864847715736, 2.116711611675127], "isController": false}, {"data": ["/api/product/item/adaptador-macho-pvc-1-239", 1, 0, 0.0, 188.0, 188, 188, 188.0, 188.0, 188.0, 188.0, 5.319148936170213, 6.529463098404255, 2.15570977393617], "isController": false}, {"data": ["/12122.jpeg-310", 1, 0, 0.0, 134.0, 134, 134, 134.0, 134.0, 134.0, 134.0, 7.462686567164179, 66.04186100746269, 2.9442630597014925], "isController": false}, {"data": ["/f25dd0_2157791c501441c4b7121ef53669c49b~mv2.webp-327", 1, 0, 0.0, 288.0, 288, 288, 288.0, 288.0, 288.0, 288.0, 3.472222222222222, 200.20548502604169, 1.498752170138889], "isController": false}, {"data": ["/IMG-20210211-WA0151%20%282%29.jpg-262", 1, 0, 0.0, 174.0, 174, 174, 174.0, 174.0, 174.0, 174.0, 5.747126436781609, 112.18121408045978, 2.396506824712644], "isController": false}, {"data": ["/20220905112129-TEJAS-PLASTICAS-Y-POLIPROPILENO-PERFIL-7-TEJA---LUMIN-P-7--No-5-TRANS-152mt-LUMI-2815202209051121299239.jpg-306", 1, 0, 0.0, 107.0, 107, 107, 107.0, 107.0, 107.0, 107.0, 9.345794392523365, 488.59155957943926, 4.709404205607477], "isController": false}, {"data": ["/1080.jpeg-284", 1, 0, 0.0, 105.0, 105, 105, 105.0, 105.0, 105.0, 105.0, 9.523809523809526, 99.98139880952381, 3.748139880952381], "isController": false}, {"data": ["/api/product/item/tapon-soldado-pvc-1-246", 1, 0, 0.0, 216.0, 216, 216, 216.0, 216.0, 216.0, 216.0, 4.62962962962963, 5.818684895833333, 1.8672236689814814], "isController": false}, {"data": ["/api/product/list-238", 1, 0, 0.0, 249.0, 249, 249, 249.0, 249.0, 249.0, 249.0, 4.016064257028112, 28.57523845381526, 1.953125], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": []}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 107, 0, "", "", "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
