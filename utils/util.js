const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const transTime=time=>{
  const minute=parseInt(time/60)
  const second=parseInt(time-minute*60)
  return `${minute}:${second>9?second:'0'+second}`
}

module.exports = {
  formatTime: formatTime,
  transTime,

}
