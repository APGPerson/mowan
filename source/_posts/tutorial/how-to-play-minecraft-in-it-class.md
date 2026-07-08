---
title: 如何在信息课上玩MC
date: 2000-01-01 00:00:00
tags: [教程]
categories: [教程]
copyright: BY
author: Mowan Official
sticky: 10000
---
{% note danger %}
{% label danger @作者声明 %}

我们不对上述内容造成的一切后果负责

该教程仅用于学习,请勿实践
{% endnote %}

# 论如何在信息课上玩Minecraft

###  众所周知,由于学校对于网络的限制,使得我们无法愉快的 ~~学习~~ **玩Minecraft**

### 所以我们需要一个方法来破解这一限制

---

## 已知限制

- 极域
- 联想教室助手 - 禁用U盘
- 无网络
- 可能的线下真实

---

## 针对 **极域** 的破解方法

- 您可以通过工具[JIYUTrainer](/files/JiYuTrainer.exe)解除限制
- 您也可以通过极域万能密码: **mythware_super_password** 修改频道解除限制
- 至于控制其他同学的机器,我们不建议您这么做,也不会提供对应的工具,请自行查找

---

## 针对 **联想教室助手** 的破解方法

### **很抱歉,目前无方法稳定使用U盘**

个人方法是:

- 若U盘已无法识别,则重启电脑
- 进入桌面后立刻按 **Ctrl + Shift + Esc** 打开任务管理器
- 结束 **DesktopCheck.exe进程** 及另一个 **相同图标(红色)** 的进程
- 插入U盘检测,若失败则重试该流程

---

## 针对 **线下真实** 的破解方法

# **！！！无解！！！**

只能通过如下策略尽可能减少概率

- 在老师开始讲课时再尝试插入U盘
- 熟练掌握 **Alt + Tab** 切换应用

---

## 针对 **无网络** 的破解方法


- 通过U盘携带游戏,并[分发](#游戏的分发)
- 携带无线网卡与手机,通过热点访问网络(**极高危险,不建议**)

---

## 游戏的分发

{% fold info @使用Python分发 %}

您需要先按 **Win + R** 按键打开 **运行** 窗口,输入**cmd**再点击**确定**

输入命令,按下 **Enter** 执行
```cmd
ipconfig
```

预计返回这样的显示

```cmd
Microsoft Windows [版本 10.0.22631.6199]
(c) Microsoft Corporation。保留所有权利。

C:\Users\xxx>ipconfig

Windows IP 配置

以太网适配器 VMware Network Adapter VMnet8: <---- 带VMware是错误的地址

   连接特定的 DNS 后缀 . . . . . . . :
   本地链接 IPv6 地址. . . . . . . . : x
   IPv4 地址 . . . . . . . . . . . . : x
   子网掩码  . . . . . . . . . . . . : x
   默认网关. . . . . . . . . . . . . :

无线局域网适配器 WLAN: <------- 由于个人使用的是无线网,所以显示WLAN,你们应该显示为以太网适配器

   连接特定的 DNS 后缀 . . . . . . . :
   IPv6 地址 . . . . . . . . . . . . : x
   临时 IPv6 地址. . . . . . . . . . : x
   本地链接 IPv6 地址. . . . . . . . : x
   IPv4 地址 . . . . . . . . . . . . : 192.168.x.x <-------- 以192.168开头,就是这个地址
   子网掩码  . . . . . . . . . . . . : x
   默认网关. . . . . . . . . . . . . : x
                                       x

C:\Users\xxx>
```

您应该选择一个 **不带VMware Network** 的 **IPv4** 地址且其以 **192.168** 开头

接下来本教程会把这个地址记为 **ADDR**

1. 通过任务栏找到Python并选择打开文件位置

![Step1](/img/find_python.png)

2. 再次选择打开文件位置

![Step2](/img/find_python_2.png)

3. 对刚进入的文件夹的路径复制,下文以 **DIR** 指代

![Step3](/img/find_python_3.png)

4. 复制你要共享的文件夹路径,下文以 **TARGET_DIR** 指代

5. 按照前面的方法打开`cmd`,输入以下命令并执行
```cmd
cd DIR
python -m http.server --directory TARGET_DIR
```

您应该得到如下回显
```cmd
Serving HTTP on :: port 8000 (http://[::]:8000/) ...
```

{% note info %}
{% label danger @错误 %}

如果显示`'python' 不是内部或外部命令，也不是可运行的程序或批处理文件。`

那么您需要重新执行本教程

{% endnote %}

6. 然后您就可以通过网址 **http://ADDR:8000** 来访问共享文件

比如 **http://192.168.172.53:8000**



{% endfold %}

{% fold info @使用我自己构建的服务器分发(支持黑名单/禁人) %}

1. 您应该把您需要共享的文件打包成一个**ZIP文件**(学校电脑不支持其他格式)
2. 解压我的[自写分发工具](/files/server.zip)
3. 修改配置文件
```json5
{
    "port": 3000, // 使用端口,不建议修改
    "user_id": "YUJUNSHENG", // 访问用户名
    "password": "123", // 访问密码
    "file_path": "./Minecraft.exe" // 共享文件,建议将你的文件,配置文件和server.exe放到同一目录并设置为 .\你的文件名.zip
}
```

若需要源码编译,请从[这里](#服务端源码)获取源码

4. 打开我的工具

其会显示 **通过 192.168.x.x:xxxx 访问** 浏览器输入网址即可访问

5. 您可以输入IP来ban人

{% endfold %}




## 服务端源码
基于Rust构建
{% fold info @Cargo.toml %}
```toml
[package]
name = "Server"
version = "0.1.0"
edition = "2024"

[dependencies]
actix-files = "0.6.10"
actix-web = "4.13.0"
netdev = "0.44.0"
actix-web-httpauth = "0.8.2"
serde = { version = "1.0.228", features = ["derive"] }
serde_json = "1.0"
tokio = { version = "1.51.1", features = ["io-std"] }
```
{% endfold %}
{% fold info @main.rs %}
```rust
mod getinputban;
mod get_local_ip;

use std::{fs, io};
use std::io::Write;
use actix_web::dev::ServiceRequest;
use actix_web::{App,web, HttpServer, Responder};
use actix_web_httpauth::extractors::basic::BasicAuth;
use actix_web_httpauth::middleware::HttpAuthentication;
use actix_files::NamedFile;
use serde::{Serialize,Deserialize};
use crate::getinputban::{get_console_ban_handler, ConsoleBan};
use crate::get_local_ip::get_local_ip;

async fn download(data: web::Data<Config>) -> impl Responder {
    NamedFile::open(&data.file_path)
}

#[derive(Serialize, Deserialize)]
struct Config {
    port: u16,
    user_id: String,
    password: String,
    file_path: String,
}

async fn validator(
    req: ServiceRequest,
    credentials: BasicAuth,
) -> Result<ServiceRequest, (actix_web::error::Error, ServiceRequest)> {
    let user_id = credentials.user_id();
    let app_data = req.app_data::<web::Data<Config>>().expect("No Config Data");
    let ban_data = req.app_data::<web::Data<ConsoleBan>>().expect("No Ban Data");
    let mut req_banned = false;
    {
        let conn_info = req.connection_info();
        let ip = conn_info.peer_addr().unwrap_or("Unknown Address");
        print!(
            "\nUser ID: {} / Password: {} / IP: {}\n>>",
            user_id,
            credentials.password().unwrap_or("No Password"),
            ip
        );
        io::stdout().flush().expect("[*] Flush Failed");
        if let Ok(list) = ban_data.list.lock() {
            for banned in list.iter() {
                println!("{}",banned.trim());
                if banned.trim() == ip {
                    req_banned = true;
                }
            }
        }
    }
    if req_banned{
        return Err((
            actix_web::error::ErrorUnauthorized("黑名单用户,禁止访问"),
            req,
        ))
    }
    if let Some(pwd) = credentials.password()
        && pwd == app_data.password
    {
        if user_id == app_data.user_id {
            return Ok(req);
        }
    }
    Err((
        actix_web::error::ErrorUnauthorized("未授权用户,禁止访问"),
        req,
    ))
}



#[actix_web::main]
async fn main() -> io::Result<()> {
    println!("Running");
    let local_ip = get_local_ip().expect("No Network");
    let config_data: Config = serde_json::from_str(&fs::read_to_string(r".\config.json").expect("No Config"))?;

    let config_data = web::Data::new(config_data);

    let ban_data = web::Data::new(ConsoleBan::new());

    println!(r" _____ ______   ___  ________   _______   ________  ________  ________  ________ _________        ________  _______   ________  ___      ___ _______   ________
|\   _ \  _   \|\  \|\   ___  \|\  ___ \ |\   ____\|\   __  \|\   __  \|\  _____\\___   ___\     |\   ____\|\  ___ \ |\   __  \|\  \    /  /|\  ___ \ |\   __  \
\ \  \\\__\ \  \ \  \ \  \\ \  \ \   __/|\ \  \___|\ \  \|\  \ \  \|\  \ \  \__/\|___ \  \_|     \ \  \___|\ \   __/|\ \  \|\  \ \  \  /  / | \   __/|\ \  \|\  \
 \ \  \\|__| \  \ \  \ \  \\ \  \ \  \_|/_\ \  \    \ \   _  _\ \   __  \ \   __\    \ \  \       \ \_____  \ \  \_|/_\ \   _  _\ \  \/  / / \ \  \_|/_\ \   _  _\
  \ \  \    \ \  \ \  \ \  \\ \  \ \  \_|\ \ \  \____\ \  \\  \\ \  \ \  \ \  \_|     \ \  \       \|____|\  \ \  \_|\ \ \  \\  \\ \    / /   \ \  \_|\ \ \  \\  \|
   \ \__\    \ \__\ \__\ \__\\ \__\ \_______\ \_______\ \__\\ _\\ \__\ \__\ \__\       \ \__\        ____\_\  \ \_______\ \__\\ _\\ \__/ /     \ \_______\ \__\\ _\
    \|__|     \|__|\|__|\|__| \|__|\|_______|\|_______|\|__|\|__|\|__|\|__|\|__|        \|__|       |\_________\|_______|\|__|\|__|\|__|/       \|_______|\|__|\|__|
                                                                                                    \|_________|");
    println!("Path: {}",config_data.file_path);
    println!("User Name: {} / Password: {}",config_data.user_id,config_data.password);
    println!("Start Listening from 0.0.0.0:{}",config_data.port);
    println!("通过 {}:{} 访问",local_ip.to_string(),config_data.port);

    tokio::spawn(get_console_ban_handler(ban_data.clone()));

    HttpServer::new({
        let value = config_data.clone();
        let banned_data = ban_data.clone();
    move || {
        App::new()
            .wrap(HttpAuthentication::basic(validator))
            .app_data(value.clone())
            .app_data(banned_data.clone())
            .route("/download", web::get().to(download))
            .service(web::redirect("/","/download"))
    }
    })
    .bind(("0.0.0.0", config_data.port))?
    .run()
    .await
}

```
{% endfold %}
{% fold info @get_local_ip.rs %}
```rust
use netdev::interface::get_interfaces;

fn is_private_ipv4(ip: std::net::Ipv4Addr) -> bool {
    match ip.octets() {
        [172, b, _, _] if b >= 16 && b <= 31 => true,
        [192, 168, _, _] => true,
        _ => false,
    }
}

pub fn get_local_ip() -> Option<std::net::Ipv4Addr> {
    let interfaces = get_interfaces();
    for iface in interfaces {
        if iface.is_loopback() { continue; }
        let name_lower = iface.name.to_lowercase();
        let desc_lower = iface.description.unwrap_or_default().to_lowercase();
        if name_lower.contains("vmware") || desc_lower.contains("vmware") {
            continue;
        }
        if let Some(ip) = iface.ipv4.iter().find(|x| {is_private_ipv4(x.addr())}){
            return Some(ip.addr());
        }
    }
    None
}
```
{% endfold %}
{% fold info @getinputban.rs %}
```rust
use actix_web::web::Data;
use std::sync::Mutex;
use tokio::io::{self, AsyncBufReadExt, AsyncWriteExt, BufReader, BufWriter};

pub struct ConsoleBan {
    pub list: Mutex<Vec<String>>,
}

impl ConsoleBan {
    pub fn new() -> Self {
        ConsoleBan {
            list: Mutex::new(Vec::new()),
        }
    }
}

pub async fn get_console_input_ban(webdata: &Data<ConsoleBan>) -> () {
    let mut input = String::new();
    let mut writer = BufWriter::new(io::stdout());
    writer
        .write_all(">>".as_bytes())
        .await
        .expect("[*] Write buf error");
    writer.flush().await.expect("[*] Flush Error");

    let mut reader = BufReader::new(io::stdin());
    if let Err(_) = reader.read_line(&mut input).await {
        return;
    }

    if let Ok(mut list) = webdata.list.lock() {
        println!("Banned {}",input);
        list.push(input);
    }
}

pub async fn get_console_ban_handler(data: Data<ConsoleBan>) {
    loop {
        get_console_input_ban(&data).await
    }
}

```
{% endfold %}
