<p class="tip">
  功能组件 src/components/   
  *banner,List,Msg,Nav,share,VideoList*    
</p>
<p class="tip">
  基础组件 src/components/base  
  *ListItem,section,status,Title*
</p>

***

### banner
> banner 组件主要是引用了swiper插件,轮播图片链接是前端写死的。如需增加修改需在此组件内修改


### VideoLive
>首页预告组件,此块的交互和请求数据，全在此组件内完成


### List
>视频列表组件，请求的数据在首页内传入。

<table>
  <tr>
    <th>props</th>
    <th>description</th>
    <th>type</th>
    <th>default</th>
  </tr>
  <tr>
    <td>videoData</td>
    <td>往期视频</td>
    <td>Array</td>
    <td>[]</td>
  </tr>
  <tr>
    <td>audioData</td>
    <td>往期音频</td>
    <td>Array</td>
    <td>[]</td>
  </tr>
</table>

### Msg
>预告详情页面，点击预约弹出的对话框。

<table>
  <tr>
    <th>event</th>
    <th>description</th>
    <th>type</th>
    <th>default</th>
  </tr>
  <tr>
    <td>hide</td>
    <td>隐藏对话框</td>
    <td>function</td>
    <td>{
        this.$emit('hide')
    }</td>
  </tr>
</table>

### Nav
>菜单导航组件，导航列表是前端写死。如果需要更改导航列表就要修改data里的navData对象


### share
>分享弹层，显示隐藏的控制函数全在掉用它的父组件中定义

### ListItem
>视频/音频列表子项的组件。


<table>
  <tr>
    <th>props</th>
    <th>description</th>
    <th>type</th>
    <th>default</th>
  </tr>
  <tr>
    <td>data</td>
    <td>视频/音频信息</td>
    <td>object</td>
    <td><p>{
            <p>id: '1',</p>
            <p>link: 'baidu.com', // 跳链接</p>
            <p>title: 'title', // 直播/预告 标题</p>
            <p>startTime: '2017.06.20', // 日期</p>
            <p>headUrl: '//usr.im/36x36', // 头像</p>
            <p>name: 'name', // 名字</p>
            <p>professionTitle: 'professionTitle', // 职称</p>
            <p>hospitalName: 'hospitalName', // 医院</p>
            <p>departmentName: 'departmentName', // 科室</p>
            <p>visited: '2000' // 访问量</p>
    <p>}</p></td>
  </tr>
</table>


### section
>预告页section区的title

<table>
  <tr>
    <th>props</th>
    <th>description</th>
    <th>type</th>
    <th>default</th>
  </tr>
  <tr>
    <td>text</td>
    <td>标题</td>
    <td>String</td>
    <td>section</td>
  </tr>
</table>


### status
>直播/预告状态显示

<table>
  <tr>
    <th>props</th>
    <th>description</th>
    <th>type</th>
    <th>default</th>
  </tr>
  <tr>
    <td>data</td>
    <td>1 正在直播   0 预告状态</td>
    <td>Number</td>
    <td>2</td>
  </tr>
  <tr>
    <td>time</td>
    <td>直播开始的时间戳</td>
    <td>Number</td>
    <td></td>
  </tr>
</table>


### Title
>首页不同区块的title


<table>
  <tr>
    <th>props</th>
    <th>description</th>
    <th>type</th>
    <th>default</th>
  </tr>
  <tr>
    <td>imgUrl</td>
    <td>图片地址</td>
    <td>String</td>
    <td></td>
  </tr>
</table>