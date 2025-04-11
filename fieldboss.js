// fieldboss.js
document.addEventListener('DOMContentLoaded', function () {
  // Fieldboss 알람 트리거 시간 (예: 12:00 출현 → 11:57, 18:00 → 17:57, 20:00 → 19:57, 22:00 → 21:57)
  const fieldbossAlarmTriggerTimes = [
    { hour: 11, minute: 57 },
    { hour: 17, minute: 57 },
    { hour: 19, minute: 57 },
    { hour: 21, minute: 57 }
  ];

  const fieldbossAlarmSound = document.getElementById('fieldboss-alarm-sound');
  const fieldbossStatus = document.getElementById('fieldboss-status');
  const mainToggleButton = document.getElementById('fieldboss-toggle');
  const optionsContainer = document.getElementById('fieldboss-options');
  const soundSwitch = document.getElementById('fieldboss-sound-switch');
  const popupSwitch = document.getElementById('fieldboss-popup-switch');

  let alarmActive = false;
  let intervalId;

  function updateStatus(message) {
    if (fieldbossStatus) {
      fieldbossStatus.innerText = message;
    }
  }

  function checkAndTriggerFieldbossAlarm() {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentSecond = now.getSeconds();

    if (currentSecond !== 0) return;

    fieldbossAlarmTriggerTimes.forEach(function(time) {
      if (currentHour === time.hour && currentMinute === time.minute) {
        console.log(`Fieldboss 알람 울림 (3분 전): ${time.hour}:${(time.minute < 10 ? '0' : '') + time.minute}`);

        if (soundSwitch.checked && fieldbossAlarmSound) {
          fieldbossAlarmSound.currentTime = 0;
          fieldbossAlarmSound.play().catch(function(error) {
            console.error('Fieldboss 알람 소리 재생 오류:', error);
          });
        }

        if (popupSwitch.checked) {
          if (Notification && Notification.permission === "granted") {
            new Notification("Fieldboss 알람", { body: "지정된 알람 시간입니다.", icon: "logo.png" });
          } else {
            alert("Fieldboss 알람: 지정된 알람 시간입니다.");
          }
        }
        updateStatus("알람 울림: " + now.toLocaleTimeString());
      }
    });
  }

  mainToggleButton.addEventListener('click', function () {
    if (!alarmActive) {
      alarmActive = true;
      mainToggleButton.innerText = "전체 알람: 활성화";
      updateStatus("알람 활성화됨: " + new Date().toLocaleTimeString());
      optionsContainer.style.display = "block";
      
      if (popupSwitch.checked && Notification && Notification.permission !== "granted") {
        Notification.requestPermission();
      }
      intervalId = setInterval(checkAndTriggerFieldbossAlarm, 1000);
    } else {
      alarmActive = false;
      mainToggleButton.innerText = "전체 알람: 비활성화";
      updateStatus("알람 비활성화됨");
      optionsContainer.style.display = "none";
      clearInterval(intervalId);
    }
  });
});
