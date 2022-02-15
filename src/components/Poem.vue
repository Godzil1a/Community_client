<template>
  <div>
    <div class="background">
      <el-container>
        <el-header>2021.5.9</el-header>
        <el-main style="height: 300px">
          <div style="float: left;display: block">朋友，你听不听deca joins</div>
          <br>
          <div style="float: right;display: block">听！但是听的不多！</div>
          <br>
          <div style="float: left;display: block">🎵Your Summer Dream🎵</div>
          <br>
          <div style="float: right;display: block">做一些夏天过了还在延续的梦</div>
        </el-main>
        <el-footer style="text-align: center;background: rgba(255,255,255,0.8);height: 100px">
          <div class="text">我们一起等待月亮</div>
          <div class="text">爬升到空中</div>
          <div class="text">让我为了你在那吧，为了你</div>
        </el-footer>
      </el-container>
    </div>
    <audio id="player" controls autoplay>
      <source src="../assets/Libidream.mp3" type="audio/mp3" />
    </audio>
  </div>
</template>

<script>
export default {
  name: 'Poem'
}
</script>

<style scoped>
.background{
  background-image: url("../assets/sunset.jpg");
  width: 1200px;
  height: 1200px;
  margin: auto;
}
.text{
  margin: 10px;
}
</style>
