// ==UserScript==
// @name         闪电发辅助
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  闪电发辅助
// @author       xingkongqwq
// @match        *://fdc.shandjj.com/*
// @require      https://cdn.staticfile.org/jquery/3.6.0/jquery.min.js
// @grant        unsafeWindow
// ==/UserScript==
jQuery.noConflict();
(function($) {
    function gotoset(){
        $('head').after(`
        <style type="text/css">
        body{
            margin: 100px 100px;
        }
        .checkbox:checked {
            background:#E29F00;
        }
        .checkbox {
            -webkit-appearance:none;
            -moz-appearance:none;
            outline: none;
            width:20px;
            height:20px;
            background-color:#ffffff;
            border:solid 1px #dddddd;
            border-radius:50%;
            margin:0;
            padding:0;
            position:relative;
            display:inline-block;
            /*文字对齐方式*/
            vertical-align:top;
            transition:background-color ease 0.1s;
        }
        .checkbox:checked::after {
            content:'';
            top:3px;
            left:3px;
            position:absolute;
            border:#fff solid 2px;
            border-top:none;
            border-right:none;
            height:6px;
            width:10px;
            transform:rotate(-45deg);
        }
        .l-button { /* 按钮美化 */
        width: 100px; /* 宽度 */
        height: 60x; /* 高度 */
        border-width: 0px; /* 边框宽度 */
        border-radius: 3px; /* 边框半径 */
        background: #1E90FF; /* 背景颜色 */
        cursor: pointer; /* 鼠标移入按钮范围时出现手势 */
        outline: none; /* 不显示轮廓线 */
        font-family: Microsoft YaHei; /* 设置字体 */
        color: white; /* 字体颜色 */
        font-size: 17px; /* 字体大小 */
        }
        .l-button:hover { /* 鼠标移入按钮范围时改变颜色 */
        background: #5599FF;
        }
        </style>
        `);
        function removeElement(arr, item) {
            return arr.filter(function(i){
                return i!=item;
            })
        }
            $('body').hide();
            $('body').after(`
                <div>
                <span>尺码选择：&nbsp;&nbsp;</span>
                <label class="radio-item">
                    <input type="checkbox" class="checkbox" id="size1" checked>
                    <span>M-XXL</span>
                </label>
                <label class="radio-item">
                    <input type="checkbox" class="checkbox" id="size2">
                    <span>S-XXL</span>
                </label>
                </div>
                <div>
                <span>颜色设置：&nbsp;&nbsp;</span>
                <br id="sbr"/>
                <a herf="javascript:void(0);" id="add">增加</a>
                </div>
                <button class="l-button">保存</button>
            `);
            var sz = 1;
            var cl = [];
            var ii = 0;
            $('#size1').change(function() {
                if(!$('#size1').prop('checked')) {
                    $('#size2').prop('checked', true);
                    return;
                }
                if($('#size2').prop('checked')) {
                    $('#size2').prop('checked', false);
                }
                sz = 1;
            });
            $('#size2').change(function() {
                if(!$('#size2').prop('checked')) {
                    $('#size1').prop('checked', true);
                    return;
                }
                if($('#size1').prop('checked')) {
                    $('#size1').prop('checked', false);
                }
                sz = 2;
            });
            var adds = function() {
                var r = prompt("新增颜色 如 绿 不用加货号");
                if(r === '' || r === null) {
                    return;
                }
                ii = ii + 1;
                $('#sbr').after(`
                <div id="e${ii}"><span id="d${ii}">${r}</span><a herf="javascript:void(0);" class="rv${ii}" value=${ii}>删除</a></div>`);
                $(`.rv${ii}`).click(function() {
                    cl = removeElement(cl,$("#d"+$(this).attr("value")).text());
                    $("#e"+$(this).attr("value")).remove();
                });
                cl.push(r);
            }
            $('#add').click(adds);
            $('.l-button').click(function() {
                console.log(sz,cl);
                if(cl.length === 0){
                    alert("请设置颜色");
                    return;
                }
                localStorage.setItem('sz',sz);
                localStorage.setItem('cl',cl);
                location.reload();
                return false;
            });
    }
    if((localStorage.getItem("sz") === null|| localStorage.getItem("cl") === null) && location.href.indexOf('fdc.shandjj.com/index.php/addgood/index/tag/33/clear/1') !== -1){
        gotoset();
    }
    $('.h2_tt').append(`<h2 class="h2_tt">目前设置：尺码${localStorage.getItem('sz') == 2 ? "S-XXL" : "M-XXL"} 颜色：${localStorage.getItem('cl')} &nbsp; <a herf="javascript:void(0);" class="reset">重新设置</a></h2>`);
    $(".reset").click(function() {
        gotoset();
    });
    $('.help1').after(`&nbsp;  <a herf="javascript:void(0);" class="yset">一键设置</a>`);
    $('.help2').after(`&nbsp;  <a herf="javascript:void(0);" class="xset">一键添加</a>`);
    $('.yset').click(function(){
        $('#SeasonSelectElement3').prop('checked', true);
        $('#SeasonSelectElement4').prop('checked', true);
        $('.groupSelectElement[value="1"]').prop('checked', true);
        $('#groupGoodsSceneSelect1').prop('checked', true)
        $('#groupGoodsStylesSelect22').prop('checked', true);
        $('#GoodsBuyType').val("1");
        $("#GoodsSaleTypeAll").attr("checked",'checked');
    });
    var fst = true;
    var cl = localStorage.getItem('cl').includes(',') ? localStorage.getItem('cl').split(',') : [localStorage.getItem('cl')];
    function clicklast() {
        var lastc = $('.AddGoodsSkuButton').length;
        var iii = 0
        $('.AddGoodsSkuButton').each(function(){
            iii++
            if(lastc===iii){
                this.click();
            }
        });
    }
    $(".xset").click(function() {
        if($('#GoodsNoNumber').val() === ''){
            alert('请先设置货号');
            return;
        }
        var hh = $('#GoodsNoNumber').val();
        var ism = localStorage.getItem('sz') === '1'
        for(var i=0; i<cl.length; i++) {
            if(fst) {
                clicklast()
                clicklast()
                clicklast()
                if(!ism){
                    clicklast()
                }
                fst = false
            } else {
                clicklast()
                clicklast()
                clicklast()
                clicklast()
                if(!ism){
                    clicklast()
                }
            }
        }
        var xxh = ism ? 4 : 5;
        var ie = 1;
        function isInteger(obj) {
            return (obj | 0) === obj
        }
        $('.GoodsSkuCode').each(function(){
            let cs = ie / xxh
            if(isInteger(cs)){
                cs = cs - 1
            } else {
                cs = Math.floor(cs);
            }
            this.value = hh+cl[cs];
            ie++;
        })
        ie = 1;
        $('.GoodsSkuColor').each(function(){
            let cs = ie / xxh
            if(isInteger(cs)){
                cs = cs - 1
            } else {
                cs = Math.floor(cs);
            }
            this.value = hh+cl[cs];
            ie++;
        })
        ie = 1;
        var xxh_s = ism ? ['M','L','XL','2XL'] : ['S','M','L','XL','2XL'];
        $('.GoodsSkuSize').each(function() {
            ie = parseInt(this.id.replace('GoodsSkuSize',''));
            let cs = ie - xxh * Math.floor(ie / xxh) - 1;
            if(cs === -1) {
                cs = xxh_s.length - 1;
            }
            document.getElementById(`GoodsSkuSize${ie}`).setAttribute('type','text');
            document.getElementById(`GoodsSkuSize${ie}`).value = xxh_s[cs];
            document.getElementById(`chooseSize${ie}`).remove();
        })
        $('.GoodsSkuStock').each(function(){this.value = '30'})
    });
    $('#AddGoodsImportantParamButton').after(`
    <input type="button" id="nset" class="addparams default_bb" value="一键设置">
    `)
    $('#nset').click(function(){
        $("#GoodsParamsContent > span:nth-child(1) > span > input.input_text.GoodsParamsValue.notEmpty").val((new Date()).getFullYear())
        $("#GoodsParamsContent > span:nth-child(2) > span > input.input_text.GoodsParamsValue.notEmpty").val("秋，冬")
        $("#GoodsParamsContent > span:nth-child(3) > span > input.input_text.GoodsParamsValue.notEmpty").val("棉")
        $('.DeleteGoodsParamsButton').each(function(){this.click()})
    });
})(jQuery);

/*
<td>        <input id="GoodsSkuSize2" style="width:118px;" index="2" class="GoodsSkuSize input_text " type="text" name="GoodsSkuSize[]" value="2XL">               <span id="GoodsSkuSize2Tip" style="display: none;"></span>    </td>
*/

/*
<td>        <input id="GoodsSkuSize2" style="width:118px;" index="2" class="GoodsSkuSize input_text " type="hidden" name="GoodsSkuSize[]" value="">       <input type="button" class="chooseSize" id="chooseSize2" index="2" style="width:118px;" value="选择">        <span id="GoodsSkuSize2Tip" style="display: none;"></span>    </td>
*/
