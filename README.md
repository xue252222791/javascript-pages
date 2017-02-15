# javascript-pages
自己写的一个JavaScript的分页，放在这保存，自己方便使用

##方法示例
Page(option,callback);<br/>
方法第一个参数option 为分页的一些配置，callback 为分页跳转的回调
###option参数配置如下

####content  必填<br/>		
分页所在的容器  传入 dom对象
####pages  必填<br/>
总共有多少页
####groups <br/>
显示几个分页按钮， 默认为5；
####currt<br/>
初始显示第几页
####first<br/>
第一页按钮对应的文本内容，默认值：首页
####last<br/>最后一页按钮对应的文本内容， 默认值： 末页
####prev <br/>上一页按钮对应的文本内容，默认值：上一页
####next <br/>下一页按钮对应的文本内容，默认值：下一页
####skin<br/> 当前页显示颜色 ， 默认：#009688'
####skip <br/>是否开启 跳转到第几页功能 ， 默认：false

###callback<br/>
分页跳转的回调函数，callback(index);<br/>
index表示跳转到的页数
