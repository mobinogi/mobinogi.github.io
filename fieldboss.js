// fieldboss.js
document.addEventListener('DOMContentLoaded', function () {
  // 필드보스 알람 설정 시간 (12:00, 18:00, 20:00, 22:00)
  const fieldBossAlarmTimes = [
    { hour: 12, minute: 0 },
    { hour: 18, minute: 0 },
    { hour: 20, minute: 0 },
    { hour: 22, minute: 0 }
  ];

  // 오디오 및 상태 요소 가져오기
  const fieldBossAlarmSound = document.getElementById('fieldboss-alarm-sound');
  const fieldBossStatus = document.getElementById('fieldboss-status');

  // 상태 표시 업데이트 함수 (옵션)
  function updateStatus(message) {
    if (fieldBossStatus) {
      fieldBossStatus.innerText = message;
    }
  }

  // 현재 시간이 설정한 시간에 해당하면 알람 실행하는 함수
  function checkAndTriggerFieldBossAlarm() {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentSecond = now.getSeconds();

    // 매분 0초에만 체크
    if (currentSecond !== 0) return;

    fieldBossAlarmTimes.forEach(function(time) {
      if (currentHour === time.hour && currentMinute === time.minute) {
        console.log(`필드보스 알람 울림: ${time.hour}:${(time.minute < 10 ? '0' : '') + time.minute}`);
        if (fieldBossAlarmSound) {
          fieldBossAlarmSound.currentTime = 0;
          fieldBossAlarmSound.play().catch(error => {
            console.error('필드보스 알람 소리 재생 오류:', error);
          });
        }
        updateStatus('알람 울림: ' + now.toLocaleTimeString());
      }
    });
  }

  // 1초마다 필드보스 알람 체크
  setInterval(checkAndTriggerFieldBossAlarm, 1000);
});
