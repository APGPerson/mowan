hexo.extend.tag.register(
    "day_counter",
    function (args) {
        const name = args[0];
        const date = Date.parse(args[1]); // Timestamp
        return `<div class="__day_counter_bg__"><div class="__day_counter_card__"><span>${name} 距离现在时间:<span class="__day_counter__" data-begin="${date}"></span></span></div></div>`
    },
);

hexo.extend.tag.register("day_counter_loader", function () {
    return `
<style>
.__day_counter_bg__ {
  background: linear-gradient(135deg, rgba(72, 92, 116, 0.4), rgba(72, 92, 116, 0.9), rgba(72, 92, 116, 0.4));
  padding: 1px;
  border-radius: 1.2rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  margin: 1rem;
}
.__day_counter_card__ {
  text-align: center;
  font-size: 1rem;
  color: var(--text-color, #3c4858);
  background: var(--board-bg-color, #fff);
  padding: 1.5rem;
  border-radius: 1.2rem;
  transition: color 0.3s, background 0.3s;
}
</style>
<script defer>
const elements = document.querySelectorAll(".__day_counter__")

function parseMillisecond(ms){
    const totalSeconds = Math.floor(ms / 1000);
    const days = Math.floor(totalSeconds / (24 * 3600));
    const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const parts = [];
    if (days) parts.push(days + '天');
    if (hours) parts.push(hours + '小时');
    if (minutes) parts.push(minutes + '分钟');
    if (seconds || parts.length === 0) parts.push(seconds + '秒');
    return parts.join('');
}

if(elements.length){
    setInterval(() => {
        const current_time = Date.now()
        for(const element of elements){
            if(!('begin' in element.dataset)) continue
            const begin_time = Number(element.dataset.begin)
            element.innerText = parseMillisecond(current_time - begin_time)
        }
    },1000)
}
</script>`;
});