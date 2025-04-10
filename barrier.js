// barrier.js
document.addEventListener('DOMContentLoaded', function () {
  // Barrier 알람 설정 시간 (12:00, 15:00, 19:00, 21:00)
  const barrierAlarmTimes = [
    { hour: 12, minute: 0 },
    { hour: 15, minute: 0 },
    { hour: 19, minute: 0 },
    { hour: 21, minute: 0 }
  ];

  // 오디오 및 상태 요소 가져오기
  const barrierAlarmSound = document.getElementById('barrier-alarm-sound');
  const barrierStatus = document.getElementById('barrier-status');

  // 상태 표시 업데이트 함수 (옵션)
  function updateStatus(message) {
    if (barrierStatus) {
      barrierStatus.innerText = message;
    }
  }

  // 현재 시간이 설정한 시간에 해당하면 알람 실행하는 함수
  function checkAndTriggerBarrierAlarm() {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentSecond = now.getSeconds();

    // 매분 0초에만 체크
    if (currentSecond !== 0) return;

    barrierAlarmTimes.forEach(function(time) {
      if (currentHour === time.hour && currentMinute === time.minute) {
        console.log(`Barrier 알람 울림: ${time.hour}:${(time.minute < 10 ? '0' : '') + time.minute}`);
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

  // 1초마다 Barrier 알람 체크
  setInterval(checkAndTriggerBarrierAlarm, 1000);
});
