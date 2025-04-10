// fieldboss.js
document.addEventListener('DOMContentLoaded', function () {
    // 필드보스 알람 설정 시간 (12:00, 18:00, 20:00, 22:00)
    const fieldBossAlarmTimes = [
      { hour: 12, minute: 0 },
      { hour: 18, minute: 0 },
      { hour: 20, minute: 0 },
      { hour: 22, minute: 0 }
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
  
    // 매분 0초에 설정한 시간에 도달하면 알람을 재생하는 함수
    function checkAndTriggerFieldBossAlarm() {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      const currentSecond = now.getSeconds();
  
      // 매분 0초에만 검사
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
  
    // 토글 버튼 클릭 시 동작: 활성화/비활성화 전환
    toggleButton.addEventListener('click', function () {
      if (!alarmActive) {
        // 활성화: 알람 체크 시작
        alarmActive = true;
        toggleButton.innerText = "활성화";
        updateStatus("알람 활성화됨: " + new Date().toLocaleTimeString());
        intervalId = setInterval(checkAndTriggerFieldBossAlarm, 1000);
      } else {
        // 비활성화: 알람 체크 중지
        alarmActive = false;
        toggleButton.innerText = "비활성화";
        updateStatus("알람 비활성화됨");
        clearInterval(intervalId);
      }
    });
  });
  