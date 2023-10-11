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

    var data = {"OkPercent": 99.5607476635514, "KoPercent": 0.4392523364485981};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.9946261682242991, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "/api/product/item/interruptor-y-toma-250"], "isController": false}, {"data": [1.0, 500, 1500, "/87185.webp-329"], "isController": false}, {"data": [1.0, 500, 1500, "/1091.jpeg-273"], "isController": false}, {"data": [1.0, 500, 1500, "/clavo-liso-1.jpg-317"], "isController": false}, {"data": [1.0, 500, 1500, "/api/product/item/teja-luminit-10-341"], "isController": false}, {"data": [1.0, 500, 1500, "/api/review/interruptor-y-toma-251"], "isController": false}, {"data": [1.0, 500, 1500, "/1067.jpg-297"], "isController": false}, {"data": [1.0, 500, 1500, "/descarga.jpeg-255"], "isController": false}, {"data": [1.0, 500, 1500, "/46A998_AW01.jpeg-258"], "isController": false}, {"data": [1.0, 500, 1500, "/1085.jpg-279"], "isController": false}, {"data": [1.0, 500, 1500, "/1081.jpg-285"], "isController": false}, {"data": [1.0, 500, 1500, "/api/product/list-345"], "isController": false}, {"data": [0.975, 500, 1500, "/api/product/list/brand/productos-338"], "isController": false}, {"data": [1.0, 500, 1500, "/1089.jpg-275"], "isController": false}, {"data": [1.0, 500, 1500, "/teja-translucida-marfil-n8-luminit-perfil-7-gerfor-570303%20%281%29.jpg-330"], "isController": false}, {"data": [1.0, 500, 1500, "/api/review/tapon-soldado-pvc-1-247"], "isController": false}, {"data": [1.0, 500, 1500, "/202568.webp-331"], "isController": false}, {"data": [1.0, 500, 1500, "/265875.jpeg-256"], "isController": false}, {"data": [1.0, 500, 1500, "/api/product/list/search/tej-340"], "isController": false}, {"data": [1.0, 500, 1500, "/1064.jpg-299"], "isController": false}, {"data": [1.0, 500, 1500, "/pollo.png-326"], "isController": false}, {"data": [0.95, 500, 1500, "/api/product/list-339"], "isController": false}, {"data": [1.0, 500, 1500, "/1066.jpeg-298"], "isController": false}, {"data": [1.0, 500, 1500, "/amarre-plastico-42-x-4-8-mm-negro.jpg-321"], "isController": false}, {"data": [1.0, 500, 1500, "/tapon-roscado-presion-3~4----2905207-1.webp-325"], "isController": false}, {"data": [1.0, 500, 1500, "/1084.jpg-281"], "isController": false}, {"data": [1.0, 500, 1500, "/1093.jpg-271"], "isController": false}, {"data": [0.985, 500, 1500, "/api/product/list-291"], "isController": false}, {"data": [1.0, 500, 1500, "/1061.jpg-301"], "isController": false}, {"data": [1.0, 500, 1500, "/descarga%20%281%29.jpeg-254"], "isController": false}, {"data": [1.0, 500, 1500, "/1058.png-305"], "isController": false}, {"data": [1.0, 500, 1500, "/1079.jpg-286"], "isController": false}, {"data": [0.98, 500, 1500, "/api/product/list-324"], "isController": false}, {"data": [0.91, 500, 1500, "/api/product/list-323"], "isController": false}, {"data": [1.0, 500, 1500, "/1075.webp-290"], "isController": false}, {"data": [1.0, 500, 1500, "/1072.jpg-294"], "isController": false}, {"data": [1.0, 500, 1500, "/1092.webp-272"], "isController": false}, {"data": [1.0, 500, 1500, "/1088.jpg-276"], "isController": false}, {"data": [1.0, 500, 1500, "/VALV-TANQ-MET.jpg-259"], "isController": false}, {"data": [1.0, 500, 1500, "/1074.png-292"], "isController": false}, {"data": [1.0, 500, 1500, "/d7d9513b8fcb5429f358.svg-344"], "isController": false}, {"data": [1.0, 500, 1500, "/palustre-8--mango-madera-1.webp-320"], "isController": false}, {"data": [1.0, 500, 1500, "/api/review/union-pvc-1-2-265"], "isController": false}, {"data": [1.0, 500, 1500, "/api/category/list-343"], "isController": false}, {"data": [1.0, 500, 1500, "/0010016000113.png-263"], "isController": false}, {"data": [0.98, 500, 1500, "/api/product/list-280"], "isController": false}, {"data": [1.0, 500, 1500, "/api/category/list-225"], "isController": false}, {"data": [1.0, 500, 1500, "/v4/fullHashes:find-319"], "isController": false}, {"data": [1.0, 500, 1500, "/25-large_default.jpg-311"], "isController": false}, {"data": [0.98, 500, 1500, "/api/product/list-312"], "isController": false}, {"data": [1.0, 500, 1500, "/tanque-plastico-500-lts-solo-con-tapa-eternit-1.webp-309"], "isController": false}, {"data": [1.0, 500, 1500, "/api/brand/list-336"], "isController": false}, {"data": [1.0, 500, 1500, "/api/brand/list-335"], "isController": false}, {"data": [1.0, 500, 1500, "/api/brand/list-334"], "isController": false}, {"data": [1.0, 500, 1500, "/1094.jpeg-270"], "isController": false}, {"data": [1.0, 500, 1500, "/teja-luminit-marfil-diez-cubierta.jpg-328"], "isController": false}, {"data": [1.0, 500, 1500, "/api/brand/list-337"], "isController": false}, {"data": [1.0, 500, 1500, "/api/review/adaptador-macho-pvc-1-240"], "isController": false}, {"data": [1.0, 500, 1500, "/1078.webp-287"], "isController": false}, {"data": [1.0, 500, 1500, "/1060.jpg-303"], "isController": false}, {"data": [1.0, 500, 1500, "/tanque-plastico-1000-lts-solo-con-tapa-eternit-1.webp-315"], "isController": false}, {"data": [1.0, 500, 1500, "/lija-agua-negra-premier-no150.jpg-318"], "isController": false}, {"data": [1.0, 500, 1500, "/797153331.jpg-322"], "isController": false}, {"data": [1.0, 500, 1500, "/api/review/teja-luminit-10-342"], "isController": false}, {"data": [1.0, 500, 1500, "/23-large_default.jpg-313"], "isController": false}, {"data": [1.0, 500, 1500, "/1090.webp-274"], "isController": false}, {"data": [1.0, 500, 1500, "/api/product/list-266"], "isController": false}, {"data": [1.0, 500, 1500, "/1083.jpg-282"], "isController": false}, {"data": [1.0, 500, 1500, "/api/product/list-269"], "isController": false}, {"data": [0.945, 500, 1500, "/api/product/list-302"], "isController": false}, {"data": [1.0, 500, 1500, "/api/product/list-267"], "isController": false}, {"data": [0.98, 500, 1500, "/api/product/list-268"], "isController": false}, {"data": [1.0, 500, 1500, "/1087.jpg-277"], "isController": false}, {"data": [1.0, 500, 1500, "/1062.webp-300"], "isController": false}, {"data": [1.0, 500, 1500, "/D_NQ_NP_790050-MCO43301892418_082020-O.webp-260"], "isController": false}, {"data": [1.0, 500, 1500, "/1071.jpg-296"], "isController": false}, {"data": [1.0, 500, 1500, "/sika-1-por-2-kilos.jpg-304"], "isController": false}, {"data": [1.0, 500, 1500, "/1077.jpeg-288"], "isController": false}, {"data": [1.0, 500, 1500, "/Flex-metro-encauchetado-3-MTS-LF700-03-64332301-1.png-316"], "isController": false}, {"data": [1.0, 500, 1500, "/api/product/list-252"], "isController": false}, {"data": [1.0, 500, 1500, "/api/product/list-253"], "isController": false}, {"data": [1.0, 500, 1500, "/1076.jpeg-289"], "isController": false}, {"data": [1.0, 500, 1500, "/D_NQ_NP_2X_976660-MCO43779355374_102020-F.webp-261"], "isController": false}, {"data": [1.0, 500, 1500, "/luminit-eternit.jpg-308"], "isController": false}, {"data": [1.0, 500, 1500, "/sifon_aluminiogris.jpg-257"], "isController": false}, {"data": [1.0, 500, 1500, "/api/product/item/union-pvc-1-2-264"], "isController": false}, {"data": [1.0, 500, 1500, "/117556.jpeg-314"], "isController": false}, {"data": [1.0, 500, 1500, "/1057.jpg-307"], "isController": false}, {"data": [1.0, 500, 1500, "/1082.jpg-283"], "isController": false}, {"data": [1.0, 500, 1500, "/1068.jpg-295"], "isController": false}, {"data": [1.0, 500, 1500, "/api/product/list-248"], "isController": false}, {"data": [1.0, 500, 1500, "/api/review/colmallas-gallina-1-80x11-4x36mts-333"], "isController": false}, {"data": [0.895, 500, 1500, "/api/product/list-245"], "isController": false}, {"data": [0.94, 500, 1500, "Home"], "isController": false}, {"data": [1.0, 500, 1500, "/api/product/list-249"], "isController": false}, {"data": [1.0, 500, 1500, "/1086.jpg-278"], "isController": false}, {"data": [1.0, 500, 1500, "/1073.jpg-293"], "isController": false}, {"data": [0.94, 500, 1500, "/api/brand/list-224"], "isController": false}, {"data": [0.995, 500, 1500, "/api/product/item/colmallas-gallina-1-80x11-4x36mts-332"], "isController": false}, {"data": [1.0, 500, 1500, "/api/product/item/adaptador-macho-pvc-1-239"], "isController": false}, {"data": [1.0, 500, 1500, "/12122.jpeg-310"], "isController": false}, {"data": [1.0, 500, 1500, "/f25dd0_2157791c501441c4b7121ef53669c49b~mv2.webp-327"], "isController": false}, {"data": [1.0, 500, 1500, "/IMG-20210211-WA0151%20%282%29.jpg-262"], "isController": false}, {"data": [1.0, 500, 1500, "/20220905112129-TEJAS-PLASTICAS-Y-POLIPROPILENO-PERFIL-7-TEJA---LUMIN-P-7--No-5-TRANS-152mt-LUMI-2815202209051121299239.jpg-306"], "isController": false}, {"data": [1.0, 500, 1500, "/1080.jpeg-284"], "isController": false}, {"data": [1.0, 500, 1500, "/api/product/item/tapon-soldado-pvc-1-246"], "isController": false}, {"data": [0.97, 500, 1500, "/api/product/list-238"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 10700, 47, 0.4392523364485981, 35.437289719626236, 10, 1088, 22.0, 69.0, 83.0, 192.98999999999978, 38.53939302256896, 966.3449214050761, 16.136401087026993], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["/api/product/item/interruptor-y-toma-250", 100, 0, 0.0, 30.710000000000004, 24, 86, 28.0, 32.0, 48.89999999999998, 85.95999999999998, 32.50975292587776, 39.58951357282184, 13.08009590377113], "isController": false}, {"data": ["/87185.webp-329", 100, 0, 0.0, 18.040000000000003, 12, 67, 15.0, 27.600000000000023, 36.94999999999999, 66.99, 31.695721077654518, 335.55987519809827, 12.504952456418385], "isController": false}, {"data": ["/1091.jpeg-273", 100, 0, 0.0, 16.010000000000005, 12, 51, 14.0, 19.900000000000006, 28.94999999999999, 50.949999999999974, 33.56831151393085, 181.413121013763, 13.210966347767707], "isController": false}, {"data": ["/clavo-liso-1.jpg-317", 100, 0, 0.0, 43.85000000000001, 15, 126, 35.0, 77.9, 115.94999999999999, 125.97999999999999, 33.18951211417192, 3391.2615644706275, 13.288769498838368], "isController": false}, {"data": ["/api/product/item/teja-luminit-10-341", 100, 0, 0.0, 30.119999999999997, 21, 82, 28.0, 34.80000000000001, 38.89999999999998, 81.96999999999998, 30.609121518212426, 38.20161845730028, 12.225713575145393], "isController": false}, {"data": ["/api/review/interruptor-y-toma-251", 100, 0, 0.0, 29.339999999999996, 20, 80, 27.0, 32.0, 37.89999999999998, 79.99, 32.84072249589491, 20.974445812807883, 13.020833333333334], "isController": false}, {"data": ["/1067.jpg-297", 100, 0, 0.0, 13.819999999999993, 11, 25, 13.0, 15.0, 18.899999999999977, 24.989999999999995, 34.28179636612959, 1157.9145419094962, 13.458283339046966], "isController": false}, {"data": ["/descarga.jpeg-255", 100, 0, 0.0, 19.94, 11, 150, 14.0, 33.70000000000002, 49.94999999999999, 149.70999999999987, 31.725888324873093, 517.125783232868, 12.609801316624365], "isController": false}, {"data": ["/46A998_AW01.jpeg-258", 100, 0, 0.0, 16.339999999999993, 11, 56, 14.0, 26.0, 38.64999999999992, 55.93999999999997, 32.31017770597738, 842.3048768174474, 12.93669224555735], "isController": false}, {"data": ["/1085.jpg-279", 100, 0, 0.0, 17.07999999999999, 13, 62, 15.0, 19.900000000000006, 34.0, 61.81999999999991, 33.244680851063826, 1121.8456511801862, 13.051134474734042], "isController": false}, {"data": ["/1081.jpg-285", 100, 0, 0.0, 17.229999999999993, 11, 73, 14.0, 27.600000000000023, 39.94999999999999, 72.75999999999988, 33.145508783559826, 731.9848980775605, 13.012201690420948], "isController": false}, {"data": ["/api/product/list-345", 100, 0, 0.0, 38.349999999999994, 29, 92, 35.0, 46.0, 65.29999999999984, 91.92999999999996, 30.057108506161708, 193.61004658851817, 14.676322512774272], "isController": false}, {"data": ["/api/product/list/brand/productos-338", 100, 1, 1.0, 76.64999999999999, 13, 649, 43.5, 110.9, 195.24999999999915, 648.99, 30.959752321981423, 163.10407797987617, 12.365760448916408], "isController": false}, {"data": ["/1089.jpg-275", 100, 0, 0.0, 22.240000000000006, 13, 162, 17.0, 33.60000000000002, 48.74999999999994, 161.7999999999999, 33.200531208499335, 1140.3604332669322, 13.033802290836654], "isController": false}, {"data": ["/teja-translucida-marfil-n8-luminit-perfil-7-gerfor-570303%20%281%29.jpg-330", 100, 0, 0.0, 32.859999999999985, 22, 66, 29.0, 53.50000000000003, 58.94999999999999, 65.99, 31.416902293433864, 293.6437225102105, 14.266464420358153], "isController": false}, {"data": ["/api/review/tapon-soldado-pvc-1-247", 100, 0, 0.0, 30.070000000000004, 21, 82, 27.0, 33.0, 73.49999999999966, 82.0, 34.27004797806717, 21.887315798492118, 13.621005397532556], "isController": false}, {"data": ["/202568.webp-331", 100, 0, 0.0, 16.019999999999996, 10, 49, 15.0, 21.700000000000017, 32.0, 48.929999999999964, 31.555695803092455, 140.64472230987693, 12.480524218996528], "isController": false}, {"data": ["/265875.jpeg-256", 100, 0, 0.0, 37.53, 24, 93, 31.0, 59.900000000000006, 74.59999999999991, 92.94999999999997, 31.938677738741614, 195.25011977004152, 12.631996566592145], "isController": false}, {"data": ["/api/product/list/search/tej-340", 100, 0, 0.0, 26.850000000000005, 19, 79, 24.0, 29.900000000000006, 39.69999999999993, 78.99, 30.67484662576687, 69.88712615030676, 12.102185582822086], "isController": false}, {"data": ["/1064.jpg-299", 100, 0, 0.0, 16.099999999999998, 12, 81, 14.0, 18.700000000000017, 30.94999999999999, 80.57999999999979, 33.50083752093802, 445.9471838358459, 13.151695979899499], "isController": false}, {"data": ["/pollo.png-326", 100, 0, 0.0, 27.689999999999994, 18, 104, 24.0, 42.0, 57.29999999999984, 103.57999999999979, 31.152647975077883, 7983.778718847352, 12.260270638629283], "isController": false}, {"data": ["/api/product/list-339", 100, 4, 4.0, 80.17999999999998, 12, 506, 65.0, 115.0, 215.549999999999, 505.99, 30.93102381688834, 211.54041331580575, 15.042626817197648], "isController": false}, {"data": ["/1066.jpeg-298", 100, 0, 0.0, 14.899999999999997, 11, 39, 14.0, 17.0, 27.849999999999966, 38.969999999999985, 33.16749585406302, 840.2648217247098, 13.053223466003317], "isController": false}, {"data": ["/amarre-plastico-42-x-4-8-mm-negro.jpg-321", 100, 0, 0.0, 19.89999999999999, 12, 153, 15.0, 31.900000000000006, 44.69999999999993, 152.13999999999956, 34.494653328734046, 1282.2983140738186, 14.518745688168334], "isController": false}, {"data": ["/tapon-roscado-presion-3~4----2905207-1.webp-325", 100, 0, 0.0, 16.85, 12, 73, 15.0, 19.80000000000001, 34.69999999999993, 72.77999999999989, 31.948881789137378, 599.5095347444089, 13.634434904153355], "isController": false}, {"data": ["/1084.jpg-281", 100, 0, 0.0, 17.140000000000004, 12, 54, 14.5, 26.900000000000006, 35.94999999999999, 53.91999999999996, 32.69042170644001, 721.934762177182, 12.83354445897352], "isController": false}, {"data": ["/1093.jpg-271", 100, 0, 0.0, 16.130000000000003, 11, 44, 14.0, 24.0, 36.89999999999998, 43.989999999999995, 33.54579000335458, 1066.3564554679638, 13.169343341160685], "isController": false}, {"data": ["/api/product/list-291", 100, 1, 1.0, 106.97, 23, 508, 86.0, 148.70000000000002, 163.5499999999999, 506.71999999999935, 31.446540880503143, 195.49337902908803, 15.293337264150942], "isController": false}, {"data": ["/1061.jpg-301", 100, 0, 0.0, 23.63, 12, 98, 16.0, 50.80000000000001, 54.94999999999999, 97.85999999999993, 33.145508783559826, 2382.5276557838915, 13.012201690420948], "isController": false}, {"data": ["/descarga%20%281%29.jpeg-254", 100, 0, 0.0, 21.720000000000002, 11, 293, 15.0, 26.0, 41.849999999999966, 292.4299999999997, 31.836994587710922, 499.0075811843362, 12.964869866284623], "isController": false}, {"data": ["/1058.png-305", 100, 0, 0.0, 19.950000000000003, 11, 154, 14.0, 28.700000000000017, 47.94999999999999, 153.93999999999997, 32.90556103981573, 1039.2887257321486, 12.918003455083909], "isController": false}, {"data": ["/1079.jpg-286", 100, 0, 0.0, 21.790000000000003, 11, 165, 15.0, 32.900000000000006, 49.849999999999966, 164.5899999999998, 32.58390355164549, 898.3165831704139, 12.791727761485825], "isController": false}, {"data": ["/api/product/list-324", 100, 2, 2.0, 94.49000000000001, 13, 487, 66.0, 139.70000000000002, 259.79999999999995, 486.6199999999998, 31.47623544224111, 186.56923788164934, 15.338517075857727], "isController": false}, {"data": ["/api/product/list-323", 100, 9, 9.0, 94.27, 20, 313, 78.0, 157.8, 213.29999999999984, 312.31999999999965, 31.29890453834116, 188.455778071205, 15.221537558685446], "isController": false}, {"data": ["/1075.webp-290", 100, 0, 0.0, 16.240000000000016, 12, 42, 15.0, 19.0, 34.799999999999955, 41.989999999999995, 33.079722130334105, 365.0075979986768, 13.018679705590472], "isController": false}, {"data": ["/1072.jpg-294", 100, 0, 0.0, 17.739999999999995, 14, 49, 16.0, 19.900000000000006, 37.499999999999886, 49.0, 32.57328990228013, 342.21040309446255, 12.787561074918568], "isController": false}, {"data": ["/1092.webp-272", 100, 0, 0.0, 33.49999999999999, 22, 105, 29.0, 41.900000000000006, 57.59999999999991, 104.66999999999983, 32.1853878339234, 416.2412998873511, 12.666710251046025], "isController": false}, {"data": ["/1088.jpg-276", 100, 0, 0.0, 19.339999999999996, 15, 46, 18.0, 23.900000000000006, 34.94999999999999, 46.0, 33.200531208499335, 1714.1395356075698, 13.033802290836654], "isController": false}, {"data": ["/VALV-TANQ-MET.jpg-259", 100, 0, 0.0, 17.31, 11, 62, 14.0, 27.80000000000001, 33.94999999999999, 61.969999999999985, 32.6477309826967, 652.9865022037218, 13.103727962781585], "isController": false}, {"data": ["/1074.png-292", 100, 0, 0.0, 20.789999999999996, 14, 50, 17.0, 38.70000000000002, 44.94999999999999, 49.97999999999999, 33.3555703802535, 4423.684800283522, 13.094667278185456], "isController": false}, {"data": ["/d7d9513b8fcb5429f358.svg-344", 100, 0, 0.0, 20.73, 14, 33, 20.0, 25.0, 26.94999999999999, 32.95999999999998, 30.048076923076923, 22.85883976862981, 11.620154747596155], "isController": false}, {"data": ["/palustre-8--mango-madera-1.webp-320", 100, 0, 0.0, 19.26, 12, 66, 16.0, 31.80000000000001, 41.799999999999955, 65.90999999999995, 34.35245620061834, 521.6943812263827, 14.257611216076949], "isController": false}, {"data": ["/api/review/union-pvc-1-2-265", 100, 0, 0.0, 33.88999999999999, 24, 84, 30.0, 42.0, 63.94999999999999, 83.94999999999997, 33.886818027787186, 21.642557607590646, 13.270130887834632], "isController": false}, {"data": ["/api/category/list-343", 100, 0, 0.0, 28.529999999999994, 18, 127, 23.0, 31.80000000000001, 76.94999999999999, 126.51999999999975, 30.03003003003003, 31.173751876876878, 11.554523273273274], "isController": false}, {"data": ["/0010016000113.png-263", 100, 0, 0.0, 14.700000000000005, 10, 46, 13.0, 18.0, 26.64999999999992, 45.97999999999999, 32.98153034300792, 1262.9285022262534, 13.237704073218998], "isController": false}, {"data": ["/api/product/list-280", 100, 2, 2.0, 91.79, 14, 296, 69.0, 134.9, 181.69999999999993, 295.8499999999999, 32.99241174529858, 235.40343533487297, 16.045137743319035], "isController": false}, {"data": ["/api/category/list-225", 100, 0, 0.0, 26.439999999999998, 20, 84, 24.0, 29.0, 32.89999999999998, 83.91999999999996, 40.7000407000407, 42.25013990638991, 15.659976597476598], "isController": false}, {"data": ["/v4/fullHashes:find-319", 100, 0, 0.0, 26.99000000000001, 17, 60, 22.0, 44.900000000000006, 52.74999999999994, 60.0, 33.15649867374005, 18.909565649867375, 22.050366793766578], "isController": false}, {"data": ["/25-large_default.jpg-311", 100, 0, 0.0, 15.690000000000005, 12, 87, 14.0, 16.0, 34.29999999999984, 86.6199999999998, 32.23726627981947, 436.9031068665377, 13.03342601547389], "isController": false}, {"data": ["/api/product/list-312", 100, 2, 2.0, 89.33, 16, 451, 69.0, 126.9, 201.24999999999937, 450.5799999999998, 32.414910858995135, 208.54373480551052, 15.764282820097245], "isController": false}, {"data": ["/tanque-plastico-500-lts-solo-con-tapa-eternit-1.webp-309", 100, 0, 0.0, 14.3, 10, 67, 13.0, 16.0, 17.94999999999999, 66.75999999999988, 32.81916639317362, 773.5900578437808, 14.294285362651788], "isController": false}, {"data": ["/api/brand/list-336", 100, 0, 0.0, 27.139999999999997, 19, 80, 24.0, 31.900000000000006, 46.89999999999998, 79.95999999999998, 32.4254215304799, 26.662309500648508, 12.381191228923475], "isController": false}, {"data": ["/api/brand/list-335", 100, 0, 0.0, 27.35999999999999, 19, 80, 24.0, 32.70000000000002, 70.24999999999983, 79.99, 32.25806451612903, 26.52469758064516, 12.317288306451612], "isController": false}, {"data": ["/api/brand/list-334", 100, 0, 0.0, 27.48, 19, 84, 24.0, 30.900000000000006, 56.89999999999998, 83.94999999999997, 32.13367609254499, 26.42241725578406, 12.269792336118252], "isController": false}, {"data": ["/1094.jpeg-270", 100, 0, 0.0, 18.68, 11, 161, 14.0, 16.900000000000006, 39.59999999999991, 160.98, 33.43363423604146, 199.81820461384152, 13.157963473754597], "isController": false}, {"data": ["/teja-luminit-marfil-diez-cubierta.jpg-328", 100, 0, 0.0, 17.21999999999999, 12, 44, 15.0, 24.700000000000017, 36.69999999999993, 43.969999999999985, 31.908104658583277, 523.305380504148, 13.430071394384173], "isController": false}, {"data": ["/api/brand/list-337", 100, 0, 0.0, 29.03999999999999, 19, 92, 24.0, 36.900000000000006, 74.89999999999998, 91.89999999999995, 32.123353678124, 26.413929489238676, 12.265850867330549], "isController": false}, {"data": ["/api/review/adaptador-macho-pvc-1-240", 100, 0, 0.0, 34.600000000000016, 21, 310, 28.0, 44.80000000000001, 76.89999999999998, 307.71999999999883, 34.19972640218878, 21.842403385772915, 13.659851658686732], "isController": false}, {"data": ["/1078.webp-287", 100, 0, 0.0, 30.330000000000002, 14, 179, 18.0, 56.900000000000006, 105.64999999999992, 178.70999999999987, 32.03074951953876, 3416.4673086162716, 12.605851617552851], "isController": false}, {"data": ["/1060.jpg-303", 100, 0, 0.0, 16.649999999999995, 12, 84, 14.0, 18.900000000000006, 37.0, 83.97999999999999, 33.003300330033, 694.294038778878, 12.956373762376238], "isController": false}, {"data": ["/tanque-plastico-1000-lts-solo-con-tapa-eternit-1.webp-315", 100, 0, 0.0, 20.019999999999996, 12, 242, 16.0, 23.0, 28.899999999999977, 240.35999999999916, 34.02517863218782, 982.1115281558353, 14.852787938074174], "isController": false}, {"data": ["/lija-agua-negra-premier-no150.jpg-318", 100, 0, 0.0, 18.830000000000005, 12, 44, 17.0, 24.900000000000006, 33.849999999999966, 43.989999999999995, 33.65870077415012, 1248.527431841131, 14.0354152642208], "isController": false}, {"data": ["/797153331.jpg-322", 100, 0, 0.0, 17.589999999999993, 13, 41, 16.0, 25.900000000000006, 30.94999999999999, 41.0, 34.32887058015791, 2411.2343910916584, 13.644385084105734], "isController": false}, {"data": ["/api/review/teja-luminit-10-342", 100, 0, 0.0, 28.43, 21, 77, 26.0, 33.0, 41.94999999999999, 76.97999999999999, 30.712530712530715, 19.615229576167078, 12.087060426904177], "isController": false}, {"data": ["/23-large_default.jpg-313", 100, 0, 0.0, 43.9, 25, 197, 34.0, 67.70000000000002, 102.89999999999998, 196.65999999999983, 32.99241174529858, 446.1063799076212, 13.338728967337511], "isController": false}, {"data": ["/1090.webp-274", 100, 0, 0.0, 15.73, 12, 40, 14.0, 19.700000000000017, 29.849999999999966, 39.989999999999995, 33.863867253640365, 405.73807356925164, 13.327283694547917], "isController": false}, {"data": ["/api/product/list-266", 100, 0, 0.0, 72.92, 60, 128, 68.0, 85.0, 121.94999999999999, 127.97999999999999, 32.786885245901644, 233.2863729508197, 15.94518442622951], "isController": false}, {"data": ["/1083.jpg-282", 100, 0, 0.0, 15.930000000000005, 13, 34, 15.0, 18.900000000000006, 20.899999999999977, 33.949999999999974, 33.738191632928476, 1138.4992303475035, 13.244876012145749], "isController": false}, {"data": ["/api/product/list-269", 100, 0, 0.0, 72.78999999999994, 59, 135, 68.0, 79.80000000000001, 120.94999999999999, 135.0, 31.897926634768737, 218.89329146730464, 15.512858851674642], "isController": false}, {"data": ["/api/product/list-302", 100, 4, 4.0, 101.12999999999998, 12, 737, 69.0, 133.70000000000002, 220.69999999999993, 736.4499999999997, 32.341526520051744, 205.1476087483829, 15.72859395213454], "isController": false}, {"data": ["/api/product/list-267", 100, 0, 0.0, 78.95999999999998, 62, 314, 68.0, 115.70000000000013, 133.69999999999993, 312.97999999999945, 32.637075718015666, 236.3638218015666, 15.872327839425587], "isController": false}, {"data": ["/api/product/list-268", 100, 2, 2.0, 93.18000000000004, 15, 365, 70.0, 171.10000000000005, 259.49999999999943, 364.77999999999986, 32.17503217503218, 221.84244791666666, 15.647623069498069], "isController": false}, {"data": ["/1087.jpg-277", 100, 0, 0.0, 16.639999999999993, 10, 64, 15.0, 19.900000000000006, 29.0, 63.949999999999974, 33.222591362126245, 552.0335859634552, 13.042462624584719], "isController": false}, {"data": ["/1062.webp-300", 100, 0, 0.0, 14.759999999999998, 11, 48, 13.0, 16.900000000000006, 25.899999999999977, 47.95999999999998, 32.72251308900523, 1111.5748220713351, 12.878098412958115], "isController": false}, {"data": ["/D_NQ_NP_790050-MCO43301892418_082020-O.webp-260", 100, 0, 0.0, 17.28, 11, 81, 14.0, 31.900000000000006, 40.849999999999966, 80.67999999999984, 33.200531208499335, 120.35192563081009, 14.168586072377158], "isController": false}, {"data": ["/1071.jpg-296", 100, 0, 0.0, 58.439999999999976, 15, 165, 46.0, 131.9, 135.95, 164.99, 33.56831151393085, 3284.2855719201075, 13.178184793554884], "isController": false}, {"data": ["/sika-1-por-2-kilos.jpg-304", 100, 0, 0.0, 17.709999999999994, 13, 65, 15.0, 22.900000000000006, 42.74999999999994, 64.93999999999997, 33.03600925008259, 678.9480611992071, 13.420878757846051], "isController": false}, {"data": ["/1077.jpeg-288", 100, 0, 0.0, 16.359999999999996, 13, 56, 15.0, 18.0, 27.699999999999932, 55.81999999999991, 32.44646333549643, 801.9726435756003, 12.769457738481506], "isController": false}, {"data": ["/Flex-metro-encauchetado-3-MTS-LF700-03-64332301-1.png-316", 100, 0, 0.0, 45.94999999999999, 17, 194, 33.0, 85.70000000000002, 98.84999999999997, 193.8099999999999, 33.333333333333336, 7543.229166666667, 14.55078125], "isController": false}, {"data": ["/api/product/list-252", 100, 0, 0.0, 69.92999999999998, 58, 132, 67.0, 78.9, 98.59999999999991, 131.95999999999998, 31.32832080200501, 222.90834508145363, 15.235843515037594], "isController": false}, {"data": ["/api/product/list-253", 100, 0, 0.0, 67.21000000000001, 60, 125, 66.0, 71.0, 73.0, 124.94999999999997, 30.73140749846343, 202.69524047326368, 14.94554778733866], "isController": false}, {"data": ["/1076.jpeg-289", 100, 0, 0.0, 16.609999999999992, 11, 56, 14.0, 22.0, 36.799999999999955, 55.989999999999995, 33.738191632928476, 373.5911669197031, 13.27782346491228], "isController": false}, {"data": ["/D_NQ_NP_2X_976660-MCO43779355374_102020-F.webp-261", 100, 0, 0.0, 16.160000000000007, 11, 77, 14.0, 23.80000000000001, 35.89999999999998, 76.6199999999998, 33.3667000333667, 453.48082457457457, 14.337253920587255], "isController": false}, {"data": ["/luminit-eternit.jpg-308", 100, 0, 0.0, 12.94, 10, 35, 12.0, 14.0, 15.0, 34.95999999999998, 32.467532467532465, 778.1744622564935, 13.09481534090909], "isController": false}, {"data": ["/sifon_aluminiogris.jpg-257", 100, 0, 0.0, 16.519999999999996, 11, 56, 14.0, 23.900000000000006, 36.89999999999998, 55.969999999999985, 32.67973856209151, 616.4790134803922, 13.276143790849673], "isController": false}, {"data": ["/api/product/item/union-pvc-1-2-264", 100, 0, 0.0, 56.850000000000016, 38, 178, 49.0, 90.80000000000007, 112.89999999999998, 177.68999999999983, 32.07184092366902, 36.425342767799876, 12.747303960872355], "isController": false}, {"data": ["/117556.jpeg-314", 100, 0, 0.0, 16.879999999999995, 11, 78, 15.0, 21.0, 25.94999999999999, 77.64999999999982, 33.87533875338753, 181.28599254742548, 13.397961128048781], "isController": false}, {"data": ["/1057.jpg-307", 100, 0, 0.0, 14.340000000000002, 10, 77, 13.0, 16.900000000000006, 22.94999999999999, 76.50999999999975, 33.01419610432486, 1088.1788544073952, 12.960651205018157], "isController": false}, {"data": ["/1082.jpg-283", 100, 0, 0.0, 18.649999999999995, 12, 95, 14.0, 20.0, 78.29999999999961, 94.91999999999996, 33.32222592469177, 1124.4624187770744, 13.081576974341887], "isController": false}, {"data": ["/1068.jpg-295", 100, 0, 0.0, 38.050000000000004, 26, 93, 33.0, 52.900000000000006, 61.94999999999999, 92.95999999999998, 33.32222592469177, 1125.503738337221, 13.081576974341887], "isController": false}, {"data": ["/api/product/list-248", 100, 0, 0.0, 69.91000000000001, 60, 131, 66.0, 79.60000000000002, 115.94999999999999, 130.90999999999997, 33.003300330033, 234.82621699669969, 16.050433168316832], "isController": false}, {"data": ["/api/review/colmallas-gallina-1-80x11-4x36mts-333", 100, 0, 0.0, 54.61, 21, 457, 33.0, 93.60000000000002, 121.74999999999994, 456.8399999999999, 32.26847370119393, 20.60896660212972, 13.266628347854146], "isController": false}, {"data": ["/api/product/list-245", 100, 8, 8.0, 109.98000000000002, 11, 686, 66.0, 217.20000000000016, 640.349999999997, 685.97, 33.222591362126245, 218.0388289036545, 16.157080564784053], "isController": false}, {"data": ["Home", 100, 3, 3.0, 114.14000000000003, 34, 624, 51.0, 433.80000000000024, 584.95, 623.6699999999998, 34.08316291751875, 85.48350161895023, 15.943198278800272], "isController": false}, {"data": ["/api/product/list-249", 100, 0, 0.0, 69.68, 60, 124, 66.0, 80.40000000000003, 98.89999999999998, 124.0, 33.057851239669425, 232.43801652892563, 16.076962809917354], "isController": false}, {"data": ["/1086.jpg-278", 100, 0, 0.0, 33.16000000000002, 15, 91, 25.0, 61.900000000000006, 73.79999999999995, 90.89999999999995, 33.15649867374005, 7530.151690981433, 13.016516080901857], "isController": false}, {"data": ["/1073.jpg-293", 100, 0, 0.0, 16.679999999999996, 11, 48, 14.0, 24.900000000000006, 35.74999999999994, 47.97999999999999, 33.4001336005344, 994.6977287909151, 13.112161823647293], "isController": false}, {"data": ["/api/brand/list-224", 100, 6, 6.0, 32.48999999999998, 10, 94, 25.0, 77.60000000000002, 83.0, 93.91999999999996, 41.00041000410004, 32.21174789872899, 15.655429991799918], "isController": false}, {"data": ["/api/product/item/colmallas-gallina-1-80x11-4x36mts-332", 100, 0, 0.0, 42.519999999999996, 23, 1088, 29.0, 39.900000000000006, 75.74999999999994, 1077.9599999999948, 32.09242618741977, 41.807906771501926, 13.382290998074454], "isController": false}, {"data": ["/api/product/item/adaptador-macho-pvc-1-239", 100, 0, 0.0, 69.39999999999998, 24, 422, 29.0, 284.4000000000001, 348.9999999999998, 421.8599999999999, 34.176349965823654, 41.95280459671907, 13.850766831852358], "isController": false}, {"data": ["/12122.jpeg-310", 100, 0, 0.0, 15.030000000000001, 12, 46, 13.0, 17.900000000000006, 36.849999999999966, 45.949999999999974, 32.99241174529858, 293.000969152095, 13.01653744638733], "isController": false}, {"data": ["/f25dd0_2157791c501441c4b7121ef53669c49b~mv2.webp-327", 100, 0, 0.0, 18.75999999999999, 14, 43, 17.0, 25.900000000000006, 34.74999999999994, 42.949999999999974, 31.5955766192733, 1821.404768957346, 13.637934439178515], "isController": false}, {"data": ["/IMG-20210211-WA0151%20%282%29.jpg-262", 100, 0, 0.0, 17.210000000000004, 10, 83, 14.0, 28.50000000000003, 37.849999999999966, 82.75999999999988, 33.4448160535117, 652.4352006688963, 13.946227006688963], "isController": false}, {"data": ["/20220905112129-TEJAS-PLASTICAS-Y-POLIPROPILENO-PERFIL-7-TEJA---LUMIN-P-7--No-5-TRANS-152mt-LUMI-2815202209051121299239.jpg-306", 100, 0, 0.0, 15.490000000000006, 12, 65, 14.0, 17.0, 29.749999999999943, 64.81999999999991, 32.50975292587776, 1700.6029543237971, 16.38186768530559], "isController": false}, {"data": ["/1080.jpeg-284", 100, 0, 0.0, 17.360000000000003, 13, 48, 16.0, 18.900000000000006, 34.69999999999993, 47.989999999999995, 34.013605442176875, 357.0764243197279, 13.386213860544219], "isController": false}, {"data": ["/api/product/item/tapon-soldado-pvc-1-246", 100, 0, 0.0, 29.740000000000002, 24, 84, 28.0, 32.0, 36.0, 83.95999999999998, 33.523298692591354, 42.133286540395574, 13.520627304726785], "isController": false}, {"data": ["/api/product/list-238", 100, 3, 3.0, 95.10999999999997, 13, 393, 68.0, 161.20000000000022, 353.2499999999996, 392.9, 37.36920777279522, 258.1515233791106, 18.17369674887892], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["503/Service Unavailable", 47, 100.0, 0.4392523364485981], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 10700, 47, "503/Service Unavailable", 47, null, null, null, null, null, null, null, null], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["/api/product/list/brand/productos-338", 100, 1, "503/Service Unavailable", 1, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["/api/product/list-339", 100, 4, "503/Service Unavailable", 4, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["/api/product/list-291", 100, 1, "503/Service Unavailable", 1, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["/api/product/list-324", 100, 2, "503/Service Unavailable", 2, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["/api/product/list-323", 100, 9, "503/Service Unavailable", 9, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["/api/product/list-280", 100, 2, "503/Service Unavailable", 2, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["/api/product/list-312", 100, 2, "503/Service Unavailable", 2, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["/api/product/list-302", 100, 4, "503/Service Unavailable", 4, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": ["/api/product/list-268", 100, 2, "503/Service Unavailable", 2, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["/api/product/list-245", 100, 8, "503/Service Unavailable", 8, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["Home", 100, 3, "503/Service Unavailable", 3, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["/api/brand/list-224", 100, 6, "503/Service Unavailable", 6, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["/api/product/list-238", 100, 3, "503/Service Unavailable", 3, null, null, null, null, null, null, null, null], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
