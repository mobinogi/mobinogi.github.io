// fieldboss.js
document.addEventListener('DOMContentLoaded', function () {
  // 필드 보스 알람 트리거 시간 (출현 3분 전: 예) 
  // 12:00 → 11:57, 18:00 → 17:57, 20:00 → 19:57, 22:00 → 21:57
  const fieldbossAlarmTriggerTimes = [
    { hour: 11, minute: 57 },
    { hour: 17, minute: 57 },
    { hour: 19, minute: 57 },
    { hour: 21, minute: 57 }
  ];

  const fieldbossAlarmSound = document.getElementById('fieldboss-alarm-sound');
  const mainToggleButton = document.getElementById('fieldboss-toggle');
  const optionsContainer = document.getElementById('fieldboss-options');

  let alarmActive = false;
  let intervalId;

  function checkAndTriggerFieldbossAlarm() {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentSecond = now.getSeconds();

    if (currentSecond !== 0) return;

    fieldbossAlarmTriggerTimes.forEach(function(time) {
      if (currentHour === time.hour && currentMinute === time.minute) {
        console.log(`필드 보스 알람 울림 (3분 전): ${time.hour}:${(time.minute < 10 ? '0' : '') + time.minute}`);
        if ($("#fieldboss-sound-switch").val() == "1" && fieldbossAlarmSound) {
          fieldbossAlarmSound.currentTime = 0;
          fieldbossAlarmSound.play().catch(function(error) {
            console.error('필드 보스 알람 소리 재생 오류:', error);
          });
        }
        if ($("#fieldboss-popup-switch").val() == "1") {
          if (Notification && Notification.permission === "granted") {
            new Notification("필드 보스 알람", { body: "지정된 알람 시간입니다.", icon: "logo.png" });
          } else {
            alert("필드 보스 알람: 지정된 알람 시간입니다.");
          }
        }
      }
    });
  }

  mainToggleButton.addEventListener('click', function () {
    if (!alarmActive) {
      alarmActive = true;
      mainToggleButton.innerText = "활성화중";
      optionsContainer.style.display = "block";
      intervalId = setInterval(checkAndTriggerFieldbossAlarm, 1000);
    } else {
      alarmActive = false;
      mainToggleButton.innerText = "비활성화";
      optionsContainer.style.display = "none";
      clearInterval(intervalId);
    }
  });
});
