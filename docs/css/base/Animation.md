# CSS 基础之动画

## 转换

改变元素在页面中位置、大小、角度以及形状的一种方式； 

### 属性

`transform`

* `none`：默认值，无任何转换效果；
* transform-function：一个或多个转换函数，多个的话，中间用空格隔开；

`transform-origin`：转换原点。取值个数：2个值，表示原点在x轴和y轴上的位置；3个值，表示原点在x轴、y轴和z轴上的位置；

* 以px为单位的数字
* 百分比
* 关键字 `left/center/right`、`top/center/bottom`

### 2D转换

只在x轴和y轴上发生转换效果； 

#### 位移

改变元素在页面中的位置；

`transform: translate(x)`：指定元素在x轴上的位移距离； 正值往右移，负值往左移；

`transform: translate(x,y)`：指定元素在x轴和y轴上的位移距离；y 正值往下移，负值往上移；

`transform: translateX(x)`：只设置x轴上的位移；

`transform: translateY(y)`：只设置y轴上的位移；

#### 缩放

改变元素在页面中的尺寸；

`transform: scale(value)`：value 代表横向和纵向的缩放比例，默认为1；大于1表示放大，0-1之间表示缩小，小于0表示翻转

`transform: scale(value1,value2)`：value1 代表x轴的缩放比例； value2 代表y轴的缩放比例；

`transform: scaleX(value)`：横向的缩放比例

`transform: scaleY(value)`：纵向的缩放比例

#### 旋转

改变元素在页面中的角度；

`transform:rotate(n deg)`：角度n为正值，顺时针旋转；角度n为负值，逆时针旋转；

旋转是连同坐标一起旋转的，会影响旋转之后的位移效果；

转换原点会影响最后的旋转效果；

#### 倾斜

改变元素在页面中的形状； 

`transform: skew(n deg)`：让元素向着x轴发生倾斜效果，实际上是改变y轴的角度；n为正值，y轴逆时针倾斜； n为负值，y轴顺时针倾斜；

`transform: skewY(n deg)`：让元素向着y轴发生倾斜效果，实际上是改变x轴的角度；n为正值，x轴顺时针倾斜； n为负值，x轴逆时针倾斜；

`transform: skew(x,y)`：

### 3D转换

增加了z轴的转换效果；

`transform: rotateX(xdeg)`：以x轴为中心轴，旋转元素的角度；

`transform: rotateY(ydeg)`：以y轴为中心轴，旋转元素的角度；

`transform: rotateZ(zdeg)`：以z轴为中心轴，旋转元素的角度；

`transform: rotate3D(x,y,z,ndeg)`：x,y,z取值大于0，表示参与旋转；取值为0，表示不参与；

## 过渡

**CSS属性**的值，在**一段时间**内**平缓**地变化；

- `transition-property`: 过渡属性
  - 默认`all`：能使用过渡的属性，一律用过渡体现；
  - 具体的属性名称：能够使用过渡的属性（颜色属性、取值为数字的属性、转换、阴影、渐变、visibility）
- `transition-duration`: 过渡时长，以s/ms为单位的数字
- `transition-timing-function`: 指定过渡时间曲线函数
  - `ease`：
- `transition-delay`: 指定过渡元素的延迟时间，以s/ms为单位的数字;

过渡属性编写的位置

* 将过渡放在元素声明的样式中，有去有回；
* 将过渡放在触发的操作中(hover)，只管去，不管回；

过渡的简写方式：`transition:property  duration  timing-function  delay`;    一个过渡最简洁的方式至少包含duration；

## 动画

使元素从一种样式逐渐变为另一种样式，就是将多个过渡效果结合到一起； 动画是通过“关键帧”，来控制动画的每一步；

**声明动画**：

```css
@keyframe 动画名称{
  0%{动画开始时的样式}
  25%{动画执行到1/4时的样式}
  50%{动画执行到1/2时的样式}
  100%{动画结束的时候的样式}
}
```

调用动画：

* `animation-name:动画名称;`：指定动画名称
* `animation-duration`：指定动画播放的一个周期
  * 以s/ms为单位的数字；
* `animation-timing-function`：指定动画播放的速度时间曲线函数
  * ease/linear/ease-in/ease-out/ease-in-out/
* `animation-delay`：指定动画的延迟
  * 以s/ms为单位的数字
* `animation-iteration-count`：指定动画的播放次数
  * 具体数字
  * `infinite`：无限次
* `animation-direction`：指定动画的执行方向
  * `normal`：默认值，正常播放，0-100
  * `reverse`：逆向播放，100-0
  * `alternate`：轮流播放，奇数次正向，偶数次逆向

简写方式：`animation: name  duration  timing-function  delay  iteration-count  direction; `

一个动画调用最简洁的方式至少包含name和duration ；

* `animation-fill-mode`：指定动画在播放前或者播放后的显示状态
  * `none`：默认值，不显示；
  * `forwards`：动画播放完成后，保存最后一帧的状态；
  * `backwards`：动画播放之前，在延时的过程中，动画显示第一帧；
  * `both`：同时设置forwards和backwards；
* `animation-play-state`：指定动画的播放状态
  * `paused`
  * `running`

动画的兼容性：如果要低版本浏览器兼容，需要在动画声明之前加前缀

```css
@keyframes 动画名称{关键帧}
@-webkit-keyframes 动画名称{关键帧}
@-ms-keyframes 动画名称{关键帧}
@-moz-keyframes 动画名称{关键帧}
@-o-keyframes 动画名称{关键帧}
```



[CSS3的动画属性](https://juejin.im/post/5a424a796fb9a045023be66c)

[css3系列之transform详解translate](https://www.cnblogs.com/yanggeng/p/11286250.html)

[css3系列之transform 详解scale](https://www.cnblogs.com/yanggeng/p/11277199.html)

[css3系列之transform 详解rotate](https://www.cnblogs.com/yanggeng/p/11275771.html)

[css3系列之transform 详解skew](https://www.cnblogs.com/yanggeng/p/11278028.html)

[css3系列之过渡transition](https://www.cnblogs.com/yanggeng/p/11251046.html)

[css3系列之animation](https://www.cnblogs.com/yanggeng/p/11253620.html)