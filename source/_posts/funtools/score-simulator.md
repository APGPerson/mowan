---
title: 中考成绩模拟器
date: 2026-07-09 13:34:04
tags: [工具]
categories: [工具]
copyright: BY-NC-SA
author: APG
archive: true
---

# 中考成绩模拟器

{% note danger %}
{% label danger @作者声明 %}

我们不对上述内容造成的一切后果负责

本工具仅用于娱乐用途,禁止用于伪造成绩
{% endnote %}

{% note info %}
{% label info @侵权声明 %}

若本工具对您构成了侵权,请通过域名登记邮箱联系我
{% endnote %}

<!-- more -->


<div style="max-width:600px;margin:0 auto;">
    <h3>持久数据储存,数据会自动加载</h3>
  <div style="margin-top:20px;">
    <button onclick="saveData()" style="font-size:1.2em; padding:8px 30px;">保存数据</button>
    <button onclick="deleteData()" style="font-size:1.2em; padding:8px 30px;">删除数据</button>
  </div>
  <div style="margin-bottom:10px;">
    <label>主标题：</label>
    <input id="title1Input" type="text" placeholder="例如：中考成绩查询系统" style="width:100%;">
  </div>
  <div style="margin-bottom:10px;">
    <label>副标题：</label>
    <input id="title2Input" type="text" placeholder="例如：2026年" style="width:100%;">
  </div>
  <div style="margin-bottom:10px;">
    <label>考生号：</label>
    <input id="stuidInput" type="text" style="width:100%;">
  </div>
  <div style="margin-bottom:10px;">
    <label>姓名：</label>
    <input id="stunameInput" type="text" style="width:100%;">
  </div>
  <div style="margin-bottom:10px;">
    <label>是否允许复核：</label>
    <button id="openReviewBtn" type="button"><span id="openReviewText">是</span></button>
  </div>
  <div style="margin-bottom:10px;">
    <label>是否已复核：</label>
    <button id="reviewedBtn" type="button"><span id="reviewedText">否</span></button>
  </div>
  <div style="margin-bottom:10px;">
    <label>复核开始时间：</label>
    <input id="reviewStart" type="datetime-local" style="width:100%;">
  </div>
  <div style="margin-bottom:10px;">
    <label>复核结束时间：</label>
    <input id="reviewEnd" type="datetime-local" style="width:100%;">
  </div>

<h3>成绩录入</h3>
  <table id="subjectTable" border="1" cellpadding="6" style="border-collapse:collapse; width:100%;">
    <thead>
      <tr>
        <th>科目</th>
        <th>成绩</th>
        <th>复核中</th>
        <th>操作</th>
      </tr>
    </thead>
    <tbody></tbody>
  </table>
  <button onclick="addSubjectRow()" style="margin-top:5px;">+ 添加科目</button>

  <div style="margin-top:20px;">
    <button onclick="goToResult()" style="font-size:1.2em; padding:8px 30px;">前往</button>
  </div>
    <div style="margin-bottom:10px;">
    <label>登录页标题1：</label>
    <input id="loginTitle1Input" type="text" style="width:100%;">
  </div>
<div style="margin-bottom:10px;">
    <label>登录页标题2：</label>
    <input id="loginTitle2Input" type="text" style="width:100%;">
  </div>
<div style="margin-bottom:10px;">
    <label>登录页标题3：</label>
    <input id="loginTitle3Input" type="text" style="width:100%;">
  </div>
<div style="margin-bottom:10px;">
    <label>座位号(为空则可为任意值)：</label>
    <input id="loginPlaceInput" type="text" style="width:100%;">
  </div>
    <div style="margin-top:20px;">
    <button onclick="goToLogin()" style="font-size:1.2em; padding:8px 30px;">前往登录页</button>
  </div>
    <div style="margin-top:20px;">
    <button onclick="reset()" style="font-size:1.2em; padding:8px 30px;">恢复到默认值</button>
  </div>
</div>

<style>
input {
  padding: 10px;
  border: 2px solid #ccc;
  border-radius: 10px;
  font-size: 16px;
  color: #555;
  outline: none;
}

input:focus {
  border-color: #007bff;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

button {
  --green: #1BFD9C;
  font-size: 15px;
  padding: 0.7em 2.7em;
  position: relative;
  font-family: inherit;
  border-radius: 0.6em;
  overflow: hidden;
  transition: all 0.3s;
  line-height: 1.4em;
  border: 2px solid var(--green);
  background: linear-gradient(to right, rgba(27, 253, 156, 0.1) 1%, transparent 40%,transparent 60% , rgba(27, 253, 156, 0.1) 100%);
  color: var(--green);
  box-shadow: inset 0 0 10px rgba(27, 253, 156, 0.4), 0 0 9px 3px rgba(27, 253, 156, 0.1);
}

button:hover {
  color: #82ffc9;
  box-shadow: inset 0 0 10px rgba(27, 253, 156, 0.6), 0 0 9px 3px rgba(27, 253, 156, 0.2);
}

button:before {
  content: "";
  position: absolute;
  left: -4em;
  width: 4em;
  height: 100%;
  top: 0;
  transition: transform .4s ease-in-out;
  background: linear-gradient(to right, transparent 1%, rgba(27, 253, 156, 0.1) 40%,rgba(27, 253, 156, 0.1) 60% , transparent 100%);
}

button:hover:before {
  transform: translateX(15em);
}

/* From UIVerse https://uiverse.io/adamgiebl/ugly-robin-41 */

</style>
<script>
(function() {
    // ----- 常量 ---------
    const LOGINTITLE1_DEFAULT = "2026年天津市初中"
    const LOGINTITLE2_DEFAULT = "学业水平考试"
    const LOGINTITLE3_DEFAULT = "成绩查询"
    const LOGINPLACE_DEFAULT = ""
    const TITLE1_DEFAULT = "2026年天津市初中"
    const TITLE2_DEFAULT = "学业水平考试成绩查询"
    const STUID_DEFAULT = "20260001"
    const STUNAME_DEFAULT = "考生"
  // ---------- 默认科目 ----------
  const DEFAULT_SUBJECTS = [
    ["语文",120], ["数学",120], ["外语",120], ["化学",100], ["物理",100],
    ["道德与法治",100], ["历史",100], ["体育平时",18], ["体育测试",22],
    ["加分",5], ["地理","优秀"], ["生物学","优秀"], ["总分",805]
  ];

  // ---------- DOM 元素 ----------
  const title1Input = document.getElementById("title1Input");
  const title2Input = document.getElementById("title2Input");
  const stuidInput = document.getElementById("stuidInput");
  const stunameInput = document.getElementById("stunameInput");
  const openReviewBtn = document.getElementById("openReviewBtn");
  const openReviewText = document.getElementById("openReviewText");
  const reviewedBtn = document.getElementById("reviewedBtn");
  const reviewedText = document.getElementById("reviewedText");
  const reviewStartInput = document.getElementById("reviewStart");
  const reviewEndInput = document.getElementById("reviewEnd");
  const tableBody = document.querySelector("#subjectTable tbody");

  const loginTitle1 = document.getElementById("loginTitle1Input")
  const loginTitle2 = document.getElementById("loginTitle2Input")
  const loginTitle3 = document.getElementById("loginTitle3Input")
  const loginPlace = document.getElementById("loginPlaceInput")

  // 内部状态
  let reviewOpen = true;
  let reviewed = false;

    window.reset = () => {
        sessionStorage.removeItem("__zksim_data")
        sessionStorage.removeItem("__zksim_login_stuid")
sessionStorage.removeItem("__zksim_login_stuplace")
sessionStorage.removeItem("__zksim_login_title1")
sessionStorage.removeItem("__zksim_login_title2")
sessionStorage.removeItem("__zksim_login_title3")
sessionStorage.removeItem("__zksim_title1")
sessionStorage.removeItem("__zksim_title2")
location.reload()
}

// Try to move,if not have will do nothing
function moveLocalToSession(key){
    if(localStorage.getItem(key)){
        sessionStorage.setItem(key,localStorage.getItem(key))
    }
}

window.deleteData = () => {
    localStorage.removeItem("__zksim_data")
localStorage.removeItem("__zksim_login_stuid")
localStorage.removeItem("__zksim_login_stuplace")
localStorage.removeItem("__zksim_login_title1")
localStorage.removeItem("__zksim_login_title2")
localStorage.removeItem("__zksim_login_title3")
localStorage.removeItem("__zksim_title1")
localStorage.removeItem("__zksim_title2")
}

window.saveData = () => {
    // 收集基础信息
    const title1 = title1Input.value.trim() || TITLE1_DEFAULT;
    const title2 = title2Input.value.trim() || TITLE2_DEFAULT;
    const stuid = stuidInput.value.trim() || STUID_DEFAULT;
    const stuname = stunameInput.value.trim() || STUNAME_DEFAULT;

    // 构建 score 对象
    const score = new Array;
    const rows = tableBody.querySelectorAll("tr");
    rows.forEach(row => {
      const cells = row.querySelectorAll("td");
      if (cells.length < 4) return;
      const subjectName = cells[0].textContent.trim();
      const scoreInput = cells[1].querySelector("input");
      const reviewCheckbox = cells[2].querySelector("input[type='checkbox']");
      if (!subjectName || !scoreInput || !reviewCheckbox) return;

      const isUnderReview = reviewCheckbox.checked;
      if (isUnderReview) {
        score.push([subjectName,false])
      } else {
        score.push([subjectName,scoreInput.value])
      }
    });

    // 构建 review 对象
    const review = {
      open: reviewOpen,
      reviewed: reviewed,
      startTime: reviewStartInput.value,
      endTime: reviewEndInput.value
    };

    const data = {
      stuid: stuid,
      stuname: stuname,
      score: score,
      review: review
    };

    // 也可将标题暂存到 sessionStorage，但这里只按要求存储 data
    // 为了方便目标页获取标题，也可额外存储，但通过 URL 传参更可靠。
    localStorage.setItem("__zksim_data", JSON.stringify(data));
    localStorage.setItem("__zksim_title1",title1)    
    localStorage.setItem("__zksim_title2",title2)
    localStorage.setItem("__zksim_login_title1",loginTitle1.value || LOGINTITLE1_DEFAULT);
    localStorage.setItem("__zksim_login_title2",loginTitle2.value || LOGINTITLE2_DEFAULT);
    localStorage.setItem("__zksim_login_title3",loginTitle3.value || LOGINTITLE3_DEFAULT);
    localStorage.setItem("__zksim_login_stuid",stuid)
    localStorage.setItem("__zksim_login_stuplace",loginPlace.value.trim() || LOGINPLACE_DEFAULT)
}

  // ---------- 切换按钮逻辑 ----------
  openReviewBtn.addEventListener("click", () => {
    reviewOpen = !reviewOpen;
    openReviewText.textContent = reviewOpen ? "是" : "否";
  });

  reviewedBtn.addEventListener("click", () => {
    reviewed = !reviewed;
    reviewedText.textContent = reviewed ? "是" : "否";
  });

  // ---------- 表格行管理 ----------
  // 每一行数据结构：{ subjectName, scoreValue (字符串), underReview (bool) }
  function renderRow(subject, scoreVal = "") {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${escapeHtml(subject)}</td>
      <td><input type="text" class="score-input" value="${escapeHtml(scoreVal)}" ${scoreVal === "" ? 'disabled' : ''}></td>
      <td><input type="checkbox" class="review-checkbox" ${scoreVal === "" ? 'checked' : ''}></td>
      <td><button class="delete-btn">删除</button></td>
    `;

    // 绑定 checkbox 变化事件：勾选时禁用输入框
    const checkbox = tr.querySelector(".review-checkbox");
    const scoreInput = tr.querySelector(".score-input");
    checkbox.addEventListener("change", () => {
      scoreInput.disabled = checkbox.checked;
    });

    // 删除按钮事件
    tr.querySelector(".delete-btn").addEventListener("click", () => {
      tr.remove();
    });

    return tr;
  }

  // 清空表格并重新填充默认科目
  function loadDefaultSubjects() {
    tableBody.innerHTML = "";
    DEFAULT_SUBJECTS.forEach(([sub,score]) => {
      tableBody.appendChild(renderRow(sub, score));
    });
  }

  // 添加自定义科目
  window.addSubjectRow = function() {
    const name = prompt("请输入科目名称：");
    if (name && name.trim()) {
      tableBody.appendChild(renderRow(name.trim(), ""));
    }
  };

  // ---------- 从 sessionStorage 加载数据并填充表单 ----------
  function loadFromStorage() {
    loginTitle1.value = sessionStorage.getItem("__zksim_login_title1") ?? LOGINTITLE1_DEFAULT
    loginTitle2.value = sessionStorage.getItem("__zksim_login_title2") ?? LOGINTITLE2_DEFAULT
    loginTitle3.value = sessionStorage.getItem("__zksim_login_title3") ?? LOGINTITLE3_DEFAULT
    loginPlace.value = sessionStorage.getItem("__zksim_login_stuplace") ?? LOGINPLACE_DEFAULT

    // 填充基础字段
    title1Input.value = sessionStorage.getItem("__zksim_title1") ?? TITLE1_DEFAULT;
    title2Input.value = sessionStorage.getItem("__zksim_title2") ?? TITLE2_DEFAULT;


    const raw = sessionStorage.getItem("__zksim_data");
    if (!raw) {
      // 无数据时，加载默认设置
      stuidInput.value = STUID_DEFAULT;
      stunameInput.value = STUNAME_DEFAULT;
      reviewOpen = true;
      reviewed = false;
      openReviewText.textContent = "是";
      reviewedText.textContent = "否";
      reviewStartInput.value = "";
      reviewEndInput.value = "";
      loadDefaultSubjects();
      return;
    }

    let data;
    try {
      data = JSON.parse(raw);
    } catch (e) {
      loadDefaultSubjects();
      return;
    }

    stuidInput.value = data.stuid || STUID_DEFAULT;
    stunameInput.value = data.stuname || STUNAME_DEFAULT;

    // review 状态
    if (data.review) {
      reviewOpen = data.review.open !== false;  // 默认为 true
      reviewed = data.review.reviewed === true;
      reviewStartInput.value = data.review.startTime || "";
      reviewEndInput.value = data.review.endTime || "";
    } else {
      reviewOpen = true;
      reviewed = false;
    }
    openReviewText.textContent = reviewOpen ? "是" : "否";
    reviewedText.textContent = reviewed ? "是" : "否";

    // 填充成绩表格
    tableBody.innerHTML = "";
    const scoreData = data.score || [];
    // 如果 score 不是list
    if (!Array.isArray(scoreData)) {
      loadDefaultSubjects();
      return;
    }

    // 遍历 score 中的每个科目生成行
    for (const [subj, val] of scoreData) {
      let scoreStr = "";
      if (val !== false) {
        scoreStr = val
      }
      const row = renderRow(subj, scoreStr);
      tableBody.appendChild(row);
    }
  }

  // ---------- 收集表单数据并保存到 sessionStorage，然后跳转 ----------
  window.goTo = function(isResult) {
    // 收集基础信息
    const title1 = title1Input.value.trim() || TITLE1_DEFAULT;
    const title2 = title2Input.value.trim() || TITLE2_DEFAULT;
    const stuid = stuidInput.value.trim() || STUID_DEFAULT;
    const stuname = stunameInput.value.trim() || STUNAME_DEFAULT;

    // 构建 score 对象
    const score = new Array;
    const rows = tableBody.querySelectorAll("tr");
    rows.forEach(row => {
      const cells = row.querySelectorAll("td");
      if (cells.length < 4) return;
      const subjectName = cells[0].textContent.trim();
      const scoreInput = cells[1].querySelector("input");
      const reviewCheckbox = cells[2].querySelector("input[type='checkbox']");
      if (!subjectName || !scoreInput || !reviewCheckbox) return;

      const isUnderReview = reviewCheckbox.checked;
      if (isUnderReview) {
        score.push([subjectName,false])
      } else {
        score.push([subjectName,scoreInput.value])
      }
    });

    // 构建 review 对象
    const review = {
      open: reviewOpen,
      reviewed: reviewed,
      startTime: reviewStartInput.value,
      endTime: reviewEndInput.value
    };

    const data = {
      stuid: stuid,
      stuname: stuname,
      score: score,
      review: review
    };

    // 也可将标题暂存到 sessionStorage，但这里只按要求存储 data
    // 为了方便目标页获取标题，也可额外存储，但通过 URL 传参更可靠。
    sessionStorage.setItem("__zksim_data", JSON.stringify(data));
    sessionStorage.setItem("__zksim_title1",title1)    
    sessionStorage.setItem("__zksim_title2",title2)
    sessionStorage.setItem("__zksim_login_title1",loginTitle1.value || LOGINTITLE1_DEFAULT);
    sessionStorage.setItem("__zksim_login_title2",loginTitle2.value || LOGINTITLE2_DEFAULT);
    sessionStorage.setItem("__zksim_login_title3",loginTitle3.value || LOGINTITLE3_DEFAULT);
    sessionStorage.setItem("__zksim_login_stuid",stuid)
    sessionStorage.setItem("__zksim_login_stuplace",loginPlace.value.trim() || LOGINPLACE_DEFAULT)

    let targetUrl = `/website/score/login.html`;
    // 跳转
    if(isResult){
        targetUrl = `/website/score/cfzk.html`;
    }
    
    window.location.href = targetUrl;
  };
    window.goToResult = () => {
        window.goTo(true)
}
window.goToLogin = () => {
    window.goTo(false)
}
  // 辅助函数：转义 HTML
  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }
    moveLocalToSession("__zksim_data")
moveLocalToSession("__zksim_login_stuid")
moveLocalToSession("__zksim_login_stuplace")
moveLocalToSession("__zksim_login_title1")
moveLocalToSession("__zksim_login_title2")
moveLocalToSession("__zksim_login_title3")
moveLocalToSession("__zksim_title1")
moveLocalToSession("__zksim_title2")


  // 页面加载时填充表单
  loadFromStorage();

  // 如果没有 sessionStorage 数据，也保证主副标题有默认值
  if (!title1Input.value) title1Input.value = TITLE1_DEFAULT;
  if (!title2Input.value) title2Input.value = TITLE2_DEFAULT;
})();

</script>

{% fold info @组件开源协议 %}

# BUTTON

Copyright - 2026 adamgiebl (Adam Giebl)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
documentation files (the "Software"), to deal in the Software without restriction, including without limitation the
rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit
persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the
Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

# INPUT

Copyright - 2026 JayRamoliya (Jay Ramoliya)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
documentation files (the "Software"), to deal in the Software without restriction, including without limitation the
rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit
persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the
Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


# Website

Copyright - 2026 TAEA
{% endfold %}