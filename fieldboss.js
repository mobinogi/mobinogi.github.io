// fieldboss.js
document.addEventListener('DOMContentLoaded', function () {
  // 필드보스의 출현시간은 12:00, 18:00, 20:00, 22:00
  // 알람은 출현 3분 전인 11:57, 17:57, 19:57, 21:57에 울리도록 설정
  const fieldBossAlarmTriggerTimes = [
    { hour: 11, minute: 57 },  // 12:00 출현 3분 전
    { hour: 17, minute: 57 },  // 18:00 출현 3분 전
    { hour: 19, minute: 57 },  // 20:00 출현 3분 전
    { hour: 21, minute: 57 }   // 22:00 출현 3분 전
  ];

  const fieldBossAlarmSound = document.getElementById('fieldboss-alarm-sound');
  const fieldBossStatus = document.getElementById('fieldboss-status');
  const toggleButton = document.getElementById('fieldboss-toggle');

  let alarmActive = false;
  let intervalId;

  function updateStatus(message) {
    if (fieldBossStatus) {
      fieldBossStatus.innerText = message;
    }
  }

  // 매분 0초에 현재 시간이 trigger 시간과 일치하면 알람 재생
  function checkAndTriggerFieldBossAlarm() {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentSecond = now.getSeconds();

    // 매분 0초에만 체크하여 여러 번 울리는 것 방지
    if (currentSecond !== 0) return;

    fieldBossAlarmTriggerTimes.forEach(function(time) {
      if (currentHour === time.hour && currentMinute === time.minute) {
        console.log(`필드보스 알람 울림 (3분 전): ${time.hour}:${(time.minute < 10 ? '0' : '') + time.minute}`);
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

  // 토글 버튼 클릭 시 활성화/비활성화 전환
  toggleButton.addEventListener('click', function () {
    if (!alarmActive) {
      alarmActive = true;
      toggleButton.innerText = "활성화";
      updateStatus("알람 활성화됨: " + new Date().toLocaleTimeString());
      intervalId = setInterval(checkAndTriggerFieldBossAlarm, 1000);
    } else {
      alarmActive = false;
      toggleButton.innerText = "비활성화";
      updateStatus("알람 비활성화됨");
      clearInterval(intervalId);
    }
  });
});
