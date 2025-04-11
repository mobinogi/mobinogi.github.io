// barrier.js
document.addEventListener('DOMContentLoaded', function () {
  // Barrier 알람 트리거 시간 (예: 이벤트 출현 03:00 → 알람: 2:57 등)
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
  const barrierStatus = document.getElementById('barrier-status');
  const mainToggleButton = document.getElementById('barrier-toggle');
  const optionsContainer = document.getElementById('barrier-options');
  const soundSwitch = document.getElementById('barrier-sound-switch');
  const popupSwitch = document.getElementById('barrier-popup-switch');

  let alarmActive = false;
  let intervalId;

  function updateStatus(message) {
    if (barrierStatus) {
      barrierStatus.innerText = message;
    }
  }

  function checkAndTriggerBarrierAlarm() {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentSecond = now.getSeconds();

    // 매분 0초에만 실행 (중복 실행 방지)
    if (currentSecond !== 0) return;

    barrierAlarmTriggerTimes.forEach(function(time) {
      if (currentHour === time.hour && currentMinute === time.minute) {
        console.log(`Barrier 알람 울림 (3분 전): ${time.hour}:${(time.minute < 10 ? '0' : '') + time.minute}`);

        // 소리 옵션 체크: 선택되어 있다면 음원 재생
        if (soundSwitch.checked && barrierAlarmSound) {
          barrierAlarmSound.currentTime = 0;
          barrierAlarmSound.play().catch(function(error) {
            console.error('Barrier 알람 소리 재생 오류:', error);
          });
        }
        
        // 팝업 옵션 체크: 선택되어 있다면 팝업 실행
        if (popupSwitch.checked) {
          if (Notification && Notification.permission === "granted") {
            new Notification("Barrier 알람", { body: "지정된 알람 시간입니다.", icon: "logo.png" });
          } else {
            alert("Barrier 알람: 지정된 알람 시간입니다.");
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
      
      // 팝업 옵션이 켜져 있으면 권한 요청 (이미 동의하지 않았다면)
      if (popupSwitch.checked && Notification && Notification.permission !== "granted") {
        Notification.requestPermission();
      }
      intervalId = setInterval(checkAndTriggerBarrierAlarm, 1000);
    } else {
      alarmActive = false;
      mainToggleButton.innerText = "전체 알람: 비활성화";
      updateStatus("알람 비활성화됨");
      optionsContainer.style.display = "none";
      clearInterval(intervalId);
    }
  });
});
