// barrier.js
document.addEventListener('DOMContentLoaded', function () {
  // Barrier 이벤트 시간은 03:00, 06:00, 09:00, 12:00, 15:00, 18:00, 21:00, 24:00
  // 알람은 각 이벤트 3분 전에 울리므로 미리 계산한 trigger 시간은:
  const barrierAlarmTriggerTimes = [
    { hour: 2, minute: 57 },   // 03:00 출현 3분 전
    { hour: 5, minute: 57 },   // 06:00 출현 3분 전
    { hour: 8, minute: 57 },   // 09:00 출현 3분 전
    { hour: 11, minute: 57 },  // 12:00 출현 3분 전
    { hour: 14, minute: 57 },  // 15:00 출현 3분 전
    { hour: 17, minute: 57 },  // 18:00 출현 3분 전
    { hour: 20, minute: 57 },  // 21:00 출현 3분 전
    { hour: 23, minute: 57 }   // 24:00 출현 3분 전
  ];

  const barrierAlarmSound = document.getElementById('barrier-alarm-sound');
  const barrierStatus = document.getElementById('barrier-status');
  const toggleButton = document.getElementById('barrier-toggle');

  let alarmActive = false;
  let intervalId;

  function updateStatus(message) {
    if (barrierStatus) {
      barrierStatus.innerText = message;
    }
  }

  // 매 분 0초에 현재 시간이 trigger 시간과 일치하면 알람 재생
  function checkAndTriggerBarrierAlarm() {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentSecond = now.getSeconds();

    // 1분 내 여러 번 울리지 않도록 매분 0초에만 체크
    if (currentSecond !== 0) return;

    barrierAlarmTriggerTimes.forEach(function(time) {
      if (currentHour === time.hour && currentMinute === time.minute) {
        console.log(`Barrier 알람 울림 (3분 전): ${time.hour}:${(time.minute < 10 ? '0' : '') + time.minute}`);
        if (barrierAlarmSound) {
          barrierAlarmSound.currentTime = 0;
          barrierAlarmSound.play().catch(error => {
            console.error('Barrier 알람 소리 재생 오류:', error);
          });
        }
        updateStatus('알람 울림: ' + now.toLocaleTimeString());
      }
    });
  }

  // 토글 버튼: 활성화/비활성화 전환
  toggleButton.addEventListener('click', function () {
    if (!alarmActive) {
      alarmActive = true;
      toggleButton.innerText = "활성화"
      intervalId = setInterval(checkAndTriggerBarrierAlarm, 1000);
    } else {
      alarmActive = false;
      toggleButton.innerText = "비활성화";
      clearInterval(intervalId);
    }
  });
});
