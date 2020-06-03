<template>
<div id="component-root">

    <div id="container_0">
        <div id="text_content">
            <h3>家園在眼淚裡</h3>
            <br>
            <p>漂泊多時 </p>
            <p>真想能</p>
            <p>安心寫寫代碼</p>
            <p>胡亂塗鴉</p>
            <p>偶爾附庸風雅</p>
            <br>
            <p>一座農舍</p>
            <p>一杯咖啡</p>
            <p>一盞清茶</p>
            <p>幾許綠色</p>
            <p>蟬鳴鳥歡</p>
            <p>伴着雨後泥土的清香</p>
            <br>
            <p>或許還有那麼一彎小溪</p>
            <p>牛郎的童年</p>
            <p>依然還在那裡流淌著</p>
            <p>只是依然還沒有</p>
            <p>她的下凡</p>
            <br>
            <p>遠離了那片土地</p>
            <p>聽不到無聲的哭泣</p>
            <p>簡陋的文字</p>
            <p>寫不了十幾億</p>
            <p>肚裡的眼淚</p>
        </div>

        <img src="https://www.mirrormedia.com.tw/assets/images/20191113163220-06bc0165230c6a509b4f48e9b92a4d2c-mobile.jpg" alt="">

    </div>

    <div id="container_1">
        <div class="text_content">
            <div class="col_0">
                <h3>梅來眼泣</h3>
                <br>
                <p>天堂有兩位絕世佳人 </p>
                <p>巾幗不讓鬚眉</p>
                <br>
                <p>紅色的恐怖</p>
                <p>恫嚇不了後來人</p>
                <p>野火燒不盡</p>
                <p>春風吹又生</p>
                <p>只要還剩一片綠洲</p>
                <p>華夏終返沃土</p>
                <br>
                <p>只可惜</p>
                <p>英雄不懂這病毒</p>
                <p>帶走了幾代人的</p>
                <p>回憶和渴望</p>
                <br>
                <p>純真的人們</p>
                <p>舉杯送走二戰</p>
                <p>卻悄悄迎來了另一場</p>
                <p>進化的戰爭</p>
                <p>而這戰場</p>
                <p>在你我的大腦裡</p>
                <p>在子孫的紅色血液裡</p>
                <br>
                <p>希特勒的殘暴</p>
                <p>加速了世界的同盟</p>

            </div>

            <div class="col_1" style="margin-top:100px;">
                <p>而偽善的病毒</p>
                <p>韜光養晦</p>
                <p>潤物細無聲</p>
                <p>卻難以激起人類的免疫</p>
                <p>直至牠們發展到足夠強大</p>
                <br>
                <p>願此生</p>
                <p>能迎來梅花遍地開的日子</p>
                <p>那一天</p>
                <p>我定會熱淚盈眶</p>
                <p>嚎啕痛哭</p>
                <p>所有的痛苦 委屈</p>
                <p>都不負此生</p>
                <br>
                <p>當我們踏上天堂路時</p>
                <p>可以欣慰地告訴她們</p>
                <p>你們的努力我們沒有辜負</p>
                <p>英雄的熱血沒有白流</p>
                <br>
                <p>我們銘記於心</p>
                <p>終生感恩</p>
                
                
            </div>

            <dir class="col_2" style="margin-top:100px;">
                <p>牠們可以銷毀硬盤的記憶</p>
                <p>卻永遠沒法銷毀我們的</p>
                <br>
                <p>我們銘記於心</p>
                <p>終生感恩</p>
                <p>我們不會讓英雄心寒</p>
                <br>
                <p>我們銘記於心</p>
                <p>終生感恩</p>
                <br>
                <p>永遠</p>
            </dir>
            
            
        </div>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS5lJw7_ic8VoCCVNgmkLPPv4OzaTziH6udCEEhW-8k-d8G_wVD&usqp=CAU" alt="">

    </div>    


</div>
    
</template>

<script>
export default {

    name: "Blog",

    data: ()=>{
        return {

        }
    }
}
</script>

<style scoped>

#component-root {
  display: flex;
  flex-direction: column;
  align-items: center;
  /* background-color: rgb(207, 210, 212); */
}

#container_0 {
    width: 100vw;
    height: 100vh;
    display: grid;
    position: relative;
    box-shadow: 10px 10px 20px 5px rgba(57, 65, 60); 
}

#text_content {
    height:100%;
    width: 50%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
}

#text_content > h3 {
    margin-top: 40px;
    text-align: center;
    color: white;
}

#text_content > p {
    margin: 0;
    text-align: center;
    /* font-weight: bold; */
    color: white;
}

#container_0 > img {
    height:100%;
    width: 100%;
    top:0;
    left:0;
    position: absolute;
    opacity: 0.8;
}

#container_1 {
    width: 100vw;
    height: 100vh;
    margin-top: 40px;
    display: grid;
    position: relative;
    box-shadow: 10px 10px 20px 5px rgba(57, 65, 60); 
}

#container_1 > .text_content {
    height:100%;
    width: 100%;
    display: grid;
    grid-template-columns: 33.3% 33.3% 33.3%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
}

#container_1 > .text_content  h3 {
    margin-top: 40px;
    text-align: center;
    /* color: white; */
}

#container_1 > .text_content  p {
    margin: 0;
    text-align: center;
    /* font-weight: bold; */
    /* color: white; */
}

#container_1  img {
    height:100%;
    width: 100%;
    top:0;
    left:0;
    position: absolute;
    opacity: 0.5;
}

</style>