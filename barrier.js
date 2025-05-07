// barrier.js
document.addEventListener('DOMContentLoaded', function () {
  // 결계 알람 트리거 시간 (출현 3분 전)
  // 예: 이벤트 출현 03:00 → 알람: 2:57, 06:00 → 5:57, 등.
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
  const soundSwitch = document.getElementById('barrier-sound-switch');
  const popupSwitch = document.getElementById('barrier-popup-switch');

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

        // 소리 옵션: 소리 옵션이 체크되어 있으면 바로 재생
        if (soundSwitch.checked) {
          barrierAlarmSound.currentTime = 0;
          barrierAlarmSound.play().catch(function(error) {
            console.error('결계 알람 소리 재생 오류:', error);
          });
        }

        // 팝업 옵션: 소리와 동시에 작동 시 소리가 먼저 나오도록, 0.5초 지연 후 팝업 실행
        if (popupSwitch.checked) {
          if (soundSwitch.checked) {
            setTimeout(function() {
              if (Notification && Notification.permission === "granted") {
                new Notification("결계 알람", { body: "결계가 곧 생성됩니다.", icon: "logo.png" });
              } else {
                alert("결계 알람: 결계가 곧 생성됩니다.");
              }
            }, 500);
          } else {
            if (Notification && Notification.permission === "granted") {
              new Notification("결계 알람", { body: "결계가 곧 생성됩니다.", icon: "logo.png" });
            } else {
              alert("결계 알람: 결계가 곧 생성됩니다.");
            }
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
      if (popupSwitch.checked && Notification && Notification.permission !== "granted") {
        Notification.requestPermission();
      }
      intervalId = setInterval(checkAndTriggerBarrierAlarm, 1000);
    } else {
      alarmActive = false;
      mainToggleButton.innerText = "비활성화";
      optionsContainer.style.display = "none";
      clearInterval(intervalId);
    }
  });
});
});
