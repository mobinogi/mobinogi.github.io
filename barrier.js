// barrier.js
document.addEventListener('DOMContentLoaded', function () {
  // 결계 알람 트리거 시간 (출현 3분 전)
  const barrierAlarmTriggerTimes = [
    { hour: 2, minute: 57 },
    { hour: 5, minute: 57 },
    { hour: 8, minute: 57 },
    { hour: 11, minute: 57 },
    { hour: 14, minute: 57 },
    { hour: 17, minute: 57 },
    { hour: 20, minute: 57 },
    { hour: 23, minute: 57 }
  ];

  const barrierAlarmSound = document.getElementById('barrier-alarm-sound');
  const mainToggleButton = document.getElementById('barrier-toggle');
  const optionsContainer = document.getElementById('barrier-options');

  let alarmActive = false;
  let intervalId;

  function checkAndTriggerBarrierAlarm() {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentSecond = now.getSeconds();

    if (currentSecond !== 0) return;

    barrierAlarmTriggerTimes.forEach(function(time) {
      if (currentHour === time.hour && currentMinute === time.minute) {
        console.log(`결계 알람 울림 (3분 전): ${time.hour}:${(time.minute < 10 ? '0' : '') + time.minute}`);
        // 소리 토글이 켜져 있으면 알람 소리 재생
        if ($("#barrier-sound-switch").val() == "1" && barrierAlarmSound) {
          barrierAlarmSound.currentTime = 0;
          barrierAlarmSound.play().catch(function(error) {
            console.error('결계 알람 소리 재생 오류:', error);
          });
        }
        // 알람 토글이 켜져 있으면 팝업 알림 실행
        if ($("#barrier-popup-switch").val() == "1") {
          if (Notification && Notification.permission === "granted") {
            new Notification("결계 알람", { body: "지정된 알람 시간입니다.", icon: "logo.png" });
          } else {
            alert("결계 알람: 지정된 알람 시간입니다.");
          }
        }
      }
    });
  }

  mainToggleButton.addEventListener('click', function () {
    if (!alarmActive) {
      alarmActive = true;
      mainToggleButton.innerText = "활성화";
      optionsContainer.style.display = "block";
      intervalId = setInterval(checkAndTriggerBarrierAlarm, 1000);
    } else {
      alarmActive = false;
      mainToggleButton.innerText = "비활성화";
      optionsContainer.style.display = "none";
      clearInterval(intervalId);
    }
  });
});
