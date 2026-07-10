---
title: 中考成绩模拟器
date: 2026-07-09 13:34:04
tags: [Fun]
---

# 中考成绩模拟器


{% note danger %}
{% label danger @作者声明 %}

我们不对上述内容造成的一切后果负责

本工具仅用于娱乐用途,禁止用于伪造成绩
{% endnote %}

<!-- more -->


<div style="max-width:600px;margin:0 auto;">
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
    <label>座位号：</label>
    <input id="loginPlaceInput" type="text" style="width:100%;">
  </div>
    <div style="margin-top:20px;">
    <button onclick="goToLogin()" style="font-size:1.2em; padding:8px 30px;">前往登录页</button>
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

</style>
<script>
(function() {
  // ---------- 默认科目 ----------
  const DEFAULT_SUBJECTS = [
    "语文", "数学", "外语", "化学", "物理",
    "道德与法治", "历史", "体育平时", "体育测试",
    "加分", "地理", "生物学", "总分"
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
  function renderRow(subject, scoreVal = "", underReview = false) {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${escapeHtml(subject)}</td>
      <td><input type="number" class="score-input" value="${escapeHtml(scoreVal)}" ${underReview ? 'disabled' : ''}></td>
      <td><input type="checkbox" class="review-checkbox" ${underReview ? 'checked' : ''}></td>
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
    DEFAULT_SUBJECTS.forEach(sub => {
      tableBody.appendChild(renderRow(sub, "", false));
    });
  }

  // 添加自定义科目
  window.addSubjectRow = function() {
    const name = prompt("请输入科目名称：");
    if (name && name.trim()) {
      tableBody.appendChild(renderRow(name.trim(), "", false));
    }
  };

  // ---------- 从 sessionStorage 加载数据并填充表单 ----------
  function loadFromStorage() {
    const raw = sessionStorage.getItem("__zksim_data");
    if (!raw) {
      // 无数据时，加载默认设置
      title1Input.value = "2026年天津市初中";
      title2Input.value = "学业水平考试成绩查询";
      stuidInput.value = "20260001";
      stunameInput.value = "考生";
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
    
    
    loginTitle1.value = sessionStorage.getItem("__zksim_login_title1") ?? "2026年天津市初中"
    loginTitle2.value = sessionStorage.getItem("__zksim_login_title2") ?? "学业水平考试"
    loginTitle3.value = sessionStorage.getItem("__zksim_login_title3") ?? "成绩查询"
    loginPlace.value = sessionStorage.getItem("__zksim_login_stuplace") ?? ""

    // 填充基础字段
    title1Input.value = sessionStorage.getItem("__zksim_title1") ?? "2026年天津市初中";
    title2Input.value = sessionStorage.getItem("__zksim_title2") ?? "学业水平考试成绩查询";
    stuidInput.value = data.stuid || 20260001;
    stunameInput.value = data.stuname || "考生";

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
    const scoreData = data.score || {};
    // 如果 score 中没有保存科目，则按默认科目填充（值设为 false）
    if (Object.keys(scoreData).length === 0) {
      loadDefaultSubjects();
      return;
    }

    // 遍历 score 中的每个科目生成行
    for (const [subj, val] of Object.entries(scoreData)) {
      let scoreStr = "";
      let underReview = false;
      if (typeof val === "number" && Number.isInteger(val)) {
        scoreStr = val.toString();
        underReview = false;
      } else {
        // false 或其它一律视为复核中
        scoreStr = "";
        underReview = true;
      }
      const row = renderRow(subj, scoreStr, underReview);
      tableBody.appendChild(row);
    }
  }

  // ---------- 收集表单数据并保存到 sessionStorage，然后跳转 ----------
  window.goTo = function(isResult) {
    // 收集基础信息
    const title1 = title1Input.value.trim() || "2026年天津市初中";
    const title2 = title2Input.value.trim() || "学业水平考试成绩查询";
    const stuid = parseInt(stuidInput.value, 10) || 20260001;
    const stuname = stunameInput.value.trim() || "考生";

    // 构建 score 对象
    const score = {};
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
        score[subjectName] = false;
      } else {
        const val = parseInt(scoreInput.value, 10);
        score[subjectName] = (Number.isInteger(val) && !isNaN(val)) ? val : false;
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
    

    sessionStorage.setItem("__zksim_login_title1",loginTitle1.value || "2026年天津市初中");
    sessionStorage.setItem("__zksim_login_title2",loginTitle2.value || "学业水平考试");
    sessionStorage.setItem("__zksim_login_title3",loginTitle3.value || "成绩查询");
    sessionStorage.setItem("__zksim_login_stuid",stuid)
    sessionStorage.setItem("__zksim_login_stuplace",loginPlace.value.trim() || "")

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

  // 页面加载时填充表单
  loadFromStorage();

  // 如果没有 sessionStorage 数据，也保证主副标题有默认值
  if (!title1Input.value) title1Input.value = "2026年天津市初中";
  if (!title2Input.value) title2Input.value = "学业水平考试成绩查询";
})();
</script>